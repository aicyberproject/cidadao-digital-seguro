import process from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const contentModules = {
  modules: '/src/content/modules/index.js',
  questionBank: '/src/content/questionBank/index.js',
  finalAssessment: '/src/content/finalAssessment.js',
}

const isPresent = (value) =>
  value !== undefined &&
  value !== null &&
  (!Array.isArray(value) || value.length > 0) &&
  (typeof value !== 'string' || value.trim().length > 0)

const isNonEmptyArray = (value) => Array.isArray(value) && value.length > 0

const hasContentBlock = (moduleItem, type) =>
  Array.isArray(moduleItem?.content) &&
  moduleItem.content.some((item) => item?.type === type)

const hasChecklist = (moduleItem) => {
  const checklistBlock = Array.isArray(moduleItem?.content)
    ? moduleItem.content.find((item) => item?.type === 'checklist')
    : null

  return (
    isNonEmptyArray(moduleItem?.checklist) ||
    isNonEmptyArray(checklistBlock?.items)
  )
}

const hasResources = (moduleItem) => {
  const linksBlock = Array.isArray(moduleItem?.content)
    ? moduleItem.content.find((item) => item?.type === 'links')
    : null

  return (
    isNonEmptyArray(moduleItem?.resources) ||
    isNonEmptyArray(moduleItem?.links) ||
    isNonEmptyArray(moduleItem?.complementaryLinks) ||
    isNonEmptyArray(linksBlock?.items)
  )
}

const getModuleLabel = (moduleItem, index) =>
  moduleItem?.id
    ? `${moduleItem.id} (${moduleItem.title || `Modulo ${index + 1}`})`
    : `Modulo ${index + 1}`

async function loadContent() {
  const server = await createServer({
    root: projectRoot,
    configFile: false,
    logLevel: 'silent',
    appType: 'custom',
    server: {
      middlewareMode: true,
    },
  })

  try {
    const [modulesModule, questionBankModule, finalAssessmentModule] =
      await Promise.all([
        server.ssrLoadModule(contentModules.modules),
        server.ssrLoadModule(contentModules.questionBank),
        server.ssrLoadModule(contentModules.finalAssessment),
      ])

    return {
      modules: modulesModule.modules,
      questionBank: questionBankModule.questionBank,
      finalAssessment: finalAssessmentModule.finalAssessment,
    }
  } finally {
    await server.close()
  }
}

function validateQuestion(questionItem, context, errors) {
  if (!isPresent(questionItem?.question)) {
    errors.push(`${context}: question obrigatorio ausente.`)
  }

  if (!Array.isArray(questionItem?.options)) {
    errors.push(`${context}: options deve ser array.`)
  } else if (questionItem.options.length < 4) {
    errors.push(`${context}: options deve ter pelo menos 4 alternativas.`)
  }

  if (typeof questionItem?.answer !== 'number' || Number.isNaN(questionItem.answer)) {
    errors.push(`${context}: answer deve ser number.`)
    return
  }

  if (
    !Number.isInteger(questionItem.answer) ||
    !Array.isArray(questionItem?.options) ||
    questionItem.answer < 0 ||
    questionItem.answer >= questionItem.options.length
  ) {
    errors.push(`${context}: answer deve apontar para indice valido em options.`)
  }
}

function validateModule(moduleItem, index, questionBankIndex, report) {
  const { errors, warnings, moduleQuestionTotals } = report
  const label = getModuleLabel(moduleItem, index)
  const questionCount = Array.isArray(moduleItem?.questionBank)
    ? moduleItem.questionBank.length
    : 0

  moduleQuestionTotals.push({
    label,
    total: questionCount,
  })

  if (!isPresent(moduleItem?.id)) {
    errors.push(`${label}: id obrigatorio ausente.`)
  }

  if (!isPresent(moduleItem?.title)) {
    errors.push(`${label}: title obrigatorio ausente.`)
  }

  if (!isPresent(moduleItem?.shortTitle)) {
    errors.push(`${label}: shortTitle obrigatorio ausente.`)
  }

  if (!isPresent(moduleItem?.subtitle) && !isPresent(moduleItem?.theme)) {
    errors.push(`${label}: subtitle ou theme obrigatorio ausente.`)
  }

  if (!isPresent(moduleItem?.icon)) {
    errors.push(`${label}: icon obrigatorio ausente.`)
  }

  if (
    !isPresent(moduleItem?.goal) &&
    !isPresent(moduleItem?.summary) &&
    !isNonEmptyArray(moduleItem?.objectives)
  ) {
    errors.push(`${label}: objectives, goal ou summary obrigatorio ausente.`)
  }

  if (!isNonEmptyArray(moduleItem?.content) && !isNonEmptyArray(moduleItem?.lessons)) {
    errors.push(`${label}: content ou lessons deve ter ao menos 1 item.`)
  }

  if (!isPresent(moduleItem?.video) && !hasContentBlock(moduleItem, 'video')) {
    errors.push(`${label}: video obrigatorio ausente.`)
  }

  if (!hasChecklist(moduleItem)) {
    errors.push(`${label}: checklist deve ser array com ao menos 1 item.`)
  }

  if (!isPresent(moduleItem?.practicalActivity) && !hasContentBlock(moduleItem, 'activity')) {
    errors.push(`${label}: practicalActivity obrigatorio ausente.`)
  }

  if (!hasResources(moduleItem)) {
    warnings.push(
      `${label}: resources, links ou complementaryLinks ausente. Recomendado adicionar links complementares.`,
    )
  }

  if (!Array.isArray(moduleItem?.questionBank)) {
    errors.push(`${label}: questionBank obrigatorio deve ser array.`)
  }

  if (moduleItem?.id && questionBankIndex && !Array.isArray(questionBankIndex[moduleItem.id])) {
    warnings.push(
      `${label}: src/content/questionBank/index.js nao possui array para o id ${moduleItem.id}.`,
    )
  }

  const hasValidQuizSize =
    typeof moduleItem?.quizSize === 'number' &&
    Number.isFinite(moduleItem.quizSize) &&
    moduleItem.quizSize > 0

  if (!hasValidQuizSize) {
    errors.push(`${label}: quizSize obrigatorio deve ser maior que 0.`)
  }

  if (
    Array.isArray(moduleItem?.questionBank) &&
    hasValidQuizSize &&
    moduleItem.questionBank.length < moduleItem.quizSize
  ) {
    errors.push(`${label}: questionBank.length deve ser maior ou igual a quizSize.`)
  }

  if ('quiz' in (moduleItem || {}) && !Array.isArray(moduleItem.quiz)) {
    errors.push(`${label}: quiz fallback, se existir, deve ser array.`)
  }

  if (Array.isArray(moduleItem?.questionBank)) {
    moduleItem.questionBank.forEach((questionItem, questionIndex) => {
      validateQuestion(
        questionItem,
        `${label} questao ${questionIndex + 1}`,
        errors,
      )
    })
  }
}

function validateContent({ modules, questionBank, finalAssessment }) {
  const report = {
    errors: [],
    warnings: [],
    totalModules: Array.isArray(modules) ? modules.length : 0,
    moduleQuestionTotals: [],
    totalFinalAssessment: Array.isArray(finalAssessment) ? finalAssessment.length : 0,
  }

  if (!Array.isArray(modules)) {
    report.errors.push('src/content/modules/index.js deve exportar modules como array.')
  } else {
    modules.forEach((moduleItem, index) => {
      validateModule(moduleItem, index, questionBank, report)
    })
  }

  if (!questionBank || typeof questionBank !== 'object' || Array.isArray(questionBank)) {
    report.warnings.push('src/content/questionBank/index.js nao exporta questionBank como objeto.')
  }

  if (!Array.isArray(finalAssessment)) {
    report.errors.push('finalAssessment deve ser array.')
  } else if (finalAssessment.length === 0) {
    report.errors.push('finalAssessment deve ter ao menos 1 questao.')
  } else {
    finalAssessment.forEach((questionItem, questionIndex) => {
      validateQuestion(
        questionItem,
        `Avaliacao final questao ${questionIndex + 1}`,
        report.errors,
      )
    })
  }

  return report
}

function printList(title, items, emptyText) {
  console.log(`\n${title}`)

  if (items.length === 0) {
    console.log(`- ${emptyText}`)
    return
  }

  items.forEach((item) => {
    console.log(`- ${item}`)
  })
}

function printReport(report) {
  console.log('Validacao automatica de conteudo')

  printList('Relatorio de erros', report.errors, 'Nenhum erro encontrado.')
  printList('Relatorio de warnings', report.warnings, 'Nenhum warning encontrado.')

  console.log('\nTotais')
  console.log(`- Total de modulos: ${report.totalModules}`)
  report.moduleQuestionTotals.forEach(({ label, total }) => {
    console.log(`- ${label}: ${total} questoes`)
  })
  console.log(`- Total da avaliacao final: ${report.totalFinalAssessment}`)
}

async function main() {
  try {
    const content = await loadContent()
    const report = validateContent(content)

    printReport(report)

    return report.errors.length > 0 ? 1 : 0
  } catch (error) {
    console.error('Erro ao carregar ou validar conteudo.')
    console.error(error?.stack || error)
    return 1
  }
}

const exitCode = await main()
process.exit(exitCode)
