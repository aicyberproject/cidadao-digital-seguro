import process from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const contentModules = {
  modules: '/src/content/modules/index.js',
  questionBank: '/src/content/questionBank/index.js',
  finalAssessment: '/src/content/finalAssessment.js',
  glossary: '/src/content/glossary.js',
  library: '/src/content/library.js',
  videos: '/src/content/videos.js',
  checklists: '/src/content/checklists.js',
  simulations: '/src/content/simulations.js',
  videoLibrary: '/src/content/videoLibrary.js',
}

const allowedResourceTaxonomy = [
  'Golpes e fraudes digitais',
  'Autenticação e contas',
  'Privacidade e proteção de dados',
  'Dispositivos e redes',
  'Transações e consumo seguro',
  'Desinformação e conteúdo falso',
  'Resposta a incidentes e denúncia',
  'Campanhas educativas',
]

const allowedVideoStatuses = ['Disponível', 'Em preparação']
const allowedVideoLibraryPriorities = ['High', 'Medium', 'Low']
const allowedVideoLibraryStatuses = ['Curated', 'Pending Validation', 'Placeholder', 'Deprecated']
const allowedVideoLibraryPlatforms = ['YouTube', 'Website', 'Other']
const allowedCourseModules = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5', 'Módulo 6']

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

const getResourceLabel = (resourceItem, index, fallback = 'Item') =>
  resourceItem?.title ||
  resourceItem?.term ||
  resourceItem?.id ||
  `${fallback} ${index + 1}`

const getDuplicateValues = (values) => {
  const seen = new Set()
  const duplicates = new Set()

  values.forEach((value) => {
    if (seen.has(value)) {
      duplicates.add(value)
      return
    }

    seen.add(value)
  })

  return [...duplicates]
}

function validateDeclaredList(list, context, report) {
  const { errors, warnings } = report

  if (!Array.isArray(list)) {
    errors.push(`${context}: lista declarada deve ser array.`)
    return false
  }

  const duplicates = getDuplicateValues(list)
  if (duplicates.length > 0) {
    warnings.push(
      `${context}: lista declarada possui valores duplicados: ${duplicates.join(', ')}.`,
    )
  }

  list.forEach((value, index) => {
    if (!isPresent(value)) {
      warnings.push(`${context}: valor vazio na posicao ${index + 1}.`)
    }
  })

  return true
}

function validateDeclaredTaxonomyList(list, context, report) {
  if (!validateDeclaredList(list, context, report)) {
    return
  }

  list.forEach((value) => {
    if (isPresent(value) && !allowedResourceTaxonomy.includes(value)) {
      report.warnings.push(`${context}: "${value}" fora da taxonomia permitida.`)
    }
  })
}

function validateTaxonomyField(value, context, fieldName, report) {
  if (!isPresent(value)) {
    report.warnings.push(`${context}: ${fieldName} ausente.`)
    return
  }

  if (!allowedResourceTaxonomy.includes(value)) {
    report.warnings.push(`${context}: ${fieldName} "${value}" fora da taxonomia permitida.`)
  }
}

function validateRelatedModule(resourceItem, context, report) {
  if (!isPresent(resourceItem?.relatedModule)) {
    report.warnings.push(`${context}: relatedModule ausente.`)
  }
}

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
    const [
      modulesModule,
      questionBankModule,
      finalAssessmentModule,
      glossaryModule,
      libraryModule,
      videosModule,
      checklistsModule,
      simulationsModule,
      videoLibraryModule,
    ] = await Promise.all([
      server.ssrLoadModule(contentModules.modules),
      server.ssrLoadModule(contentModules.questionBank),
      server.ssrLoadModule(contentModules.finalAssessment),
      server.ssrLoadModule(contentModules.glossary),
      server.ssrLoadModule(contentModules.library),
      server.ssrLoadModule(contentModules.videos),
      server.ssrLoadModule(contentModules.checklists),
      server.ssrLoadModule(contentModules.simulations),
      server.ssrLoadModule(contentModules.videoLibrary),
    ])

    return {
      modules: modulesModule.modules,
      questionBank: questionBankModule.questionBank,
      finalAssessment: finalAssessmentModule.finalAssessment,
      glossary: {
        categories: glossaryModule.glossaryCategories,
        entries: glossaryModule.glossaryEntries,
      },
      library: {
        categories: libraryModule.libraryCategories,
        documents: libraryModule.libraryDocuments,
        sources: libraryModule.librarySources,
        types: libraryModule.libraryTypes,
      },
      videos: {
        themes: videosModule.videoThemes,
        sources: videosModule.videoSources,
        modules: videosModule.videoModules,
        items: videosModule.educationalVideos,
      },
      checklists: {
        categories: checklistsModule.checklistCategories,
        modules: checklistsModule.checklistModules,
        items: checklistsModule.practicalChecklists,
      },
      simulations: {
        categories: simulationsModule.simulationCategories,
        modules: simulationsModule.simulationModules,
        items: simulationsModule.quickSimulations,
      },
      videoLibrary: videoLibraryModule.videoLibrary,
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

function validateGlossary(glossary, report) {
  validateDeclaredTaxonomyList(glossary?.categories, 'Glossario categorias', report)

  if (!Array.isArray(glossary?.entries)) {
    report.errors.push('src/content/glossary.js deve exportar glossaryEntries como array.')
    return
  }

  report.resourceTotals.push({
    label: 'Glossario',
    total: glossary.entries.length,
  })

  glossary.entries.forEach((entry, index) => {
    const context = `Glossario ${getResourceLabel(entry, index, 'Termo')}`

    validateTaxonomyField(entry?.category, context, 'category', report)

    if (!isPresent(entry?.definition)) {
      report.errors.push(`${context}: definition obrigatorio ausente.`)
    }

    if (!isPresent(entry?.guidance)) {
      report.errors.push(`${context}: guidance obrigatorio ausente.`)
    }
  })
}

function validateLibrary(library, report) {
  validateDeclaredTaxonomyList(library?.categories, 'Biblioteca categorias', report)
  validateDeclaredList(library?.sources, 'Biblioteca fontes', report)
  validateDeclaredList(library?.types, 'Biblioteca tipos', report)

  if (!Array.isArray(library?.documents)) {
    report.errors.push('src/content/library.js deve exportar libraryDocuments como array.')
    return
  }

  report.resourceTotals.push({
    label: 'Biblioteca',
    total: library.documents.length,
  })

  library.documents.forEach((documentItem, index) => {
    const context = `Biblioteca ${getResourceLabel(documentItem, index, 'Documento')}`

    validateTaxonomyField(documentItem?.category, context, 'category', report)
    validateRelatedModule(documentItem, context, report)

    if (!isPresent(documentItem?.url)) {
      report.errors.push(`${context}: url obrigatoria ausente.`)
    }
  })
}

function validateVideos(videos, report) {
  validateDeclaredTaxonomyList(videos?.themes, 'Videos temas', report)
  validateDeclaredList(videos?.sources, 'Videos fontes', report)
  validateDeclaredList(videos?.modules, 'Videos modulos', report)

  if (!Array.isArray(videos?.items)) {
    report.errors.push('src/content/videos.js deve exportar educationalVideos como array.')
    return
  }

  report.resourceTotals.push({
    label: 'Videos educacionais',
    total: videos.items.length,
  })

  videos.items.forEach((videoItem, index) => {
    const context = `Video ${getResourceLabel(videoItem, index, 'Video')}`

    validateTaxonomyField(videoItem?.theme, context, 'theme', report)
    validateRelatedModule(videoItem, context, report)

    if (!isPresent(videoItem?.status)) {
      report.warnings.push(`${context}: status ausente.`)
    } else if (!allowedVideoStatuses.includes(videoItem.status)) {
      report.warnings.push(
        `${context}: status "${videoItem.status}" fora dos valores permitidos (${allowedVideoStatuses.join(', ')}).`,
      )
    }

    if (videoItem?.status === 'Disponível' && !isPresent(videoItem?.url)) {
      report.errors.push(`${context}: video Disponível deve possuir url.`)
    }
  })
}

function validateChecklists(checklists, report) {
  validateDeclaredTaxonomyList(checklists?.categories, 'Checklists categorias', report)
  validateDeclaredList(checklists?.modules, 'Checklists modulos', report)

  if (!Array.isArray(checklists?.items)) {
    report.errors.push('src/content/checklists.js deve exportar practicalChecklists como array.')
    return
  }

  report.resourceTotals.push({
    label: 'Checklists praticos',
    total: checklists.items.length,
  })

  checklists.items.forEach((checklistItem, index) => {
    const context = `Checklist ${getResourceLabel(checklistItem, index, 'Checklist')}`

    validateTaxonomyField(checklistItem?.category, context, 'category', report)
    validateRelatedModule(checklistItem, context, report)

    if (!isNonEmptyArray(checklistItem?.items)) {
      report.errors.push(`${context}: items deve ser array com ao menos 1 item.`)
    }
  })
}

function validateSimulations(simulations, report) {
  validateDeclaredTaxonomyList(simulations?.categories, 'Simulacoes categorias', report)
  validateDeclaredList(simulations?.modules, 'Simulacoes modulos', report)

  if (!Array.isArray(simulations?.items)) {
    report.errors.push('src/content/simulations.js deve exportar quickSimulations como array.')
    return
  }

  report.resourceTotals.push({
    label: 'Simulacoes rapidas',
    total: simulations.items.length,
  })

  simulations.items.forEach((simulationItem, index) => {
    const context = `Simulacao ${getResourceLabel(simulationItem, index, 'Simulacao')}`

    validateTaxonomyField(simulationItem?.category, context, 'category', report)
    validateRelatedModule(simulationItem, context, report)

    if (!isNonEmptyArray(simulationItem?.warningSigns)) {
      report.errors.push(`${context}: warningSigns deve ser array com ao menos 1 item.`)
    }

    if (!isNonEmptyArray(simulationItem?.options)) {
      report.errors.push(`${context}: options deve ser array com ao menos 1 opcao.`)
      return
    }

    const correctOptions = simulationItem.options.filter((option) => option?.isCorrect === true)

    if (correctOptions.length !== 1) {
      report.errors.push(`${context}: options deve possuir exatamente 1 opcao correta.`)
    }
  })
}

function validateVideoLibrary(videoLibrary, report) {
  if (!Array.isArray(videoLibrary)) {
    report.errors.push('src/content/videoLibrary.js deve exportar videoLibrary como array.')
    return
  }

  report.resourceTotals.push({
    label: 'Biblioteca de videos curados',
    total: videoLibrary.length,
  })

  const ids = []

  videoLibrary.forEach((video, index) => {
    const label = getResourceLabel(video, index, 'Video Curado')
    const context = `VideoLibrary ${label}`

    if (!isPresent(video.id)) {
      report.errors.push(`${context}: id obrigatorio ausente.`)
    } else {
      ids.push(video.id)
    }

    if (!isPresent(video.title)) {
      report.errors.push(`${context}: title obrigatorio ausente.`)
    }

    if (!isPresent(video.provider)) {
      report.errors.push(`${context}: provider obrigatorio ausente.`)
    }

    if (!isPresent(video.url)) {
      report.errors.push(`${context}: url obrigatoria ausente.`)
    } else if (!video.url.startsWith('https://')) {
      report.errors.push(`${context}: url deve começar com https://.`)
    }

    if (!isPresent(video.platform)) {
      report.errors.push(`${context}: platform obrigatoria ausente.`)
    } else if (!allowedVideoLibraryPlatforms.includes(video.platform)) {
      report.errors.push(
        `${context}: platform "${video.platform}" inválida. Esperado: ${allowedVideoLibraryPlatforms.join(', ')}.`,
      )
    }

    if (!isPresent(video.language)) {
      report.errors.push(`${context}: language obrigatoria ausente.`)
    }

    if (!isNonEmptyArray(video.modules)) {
      report.errors.push(`${context}: modules deve ser array nao vazio.`)
    } else {
      video.modules.forEach((mod) => {
        if (!allowedCourseModules.includes(mod)) {
          report.errors.push(`${context}: module "${mod}" inválido.`)
        }
      })
    }

    if (!isNonEmptyArray(video.topics)) {
      report.errors.push(`${context}: topics deve ser array nao vazio.`)
    }

    if (!isPresent(video.priority)) {
      report.errors.push(`${context}: priority obrigatoria ausente.`)
    } else if (!allowedVideoLibraryPriorities.includes(video.priority)) {
      report.errors.push(`${context}: priority "${video.priority}" inválida.`)
    }

    if (!isPresent(video.status)) {
      report.errors.push(`${context}: status obrigatorio ausente.`)
    } else if (!allowedVideoLibraryStatuses.includes(video.status)) {
      report.errors.push(`${context}: status "${video.status}" inválido.`)
    }
  })

  const duplicates = getDuplicateValues(ids)
  if (duplicates.length > 0) {
    report.errors.push(`VideoLibrary: ids duplicados encontrados: ${duplicates.join(', ')}.`)
  }
}

function validateContent({
  modules,
  questionBank,
  finalAssessment,
  glossary,
  library,
  videos,
  checklists,
  simulations,
  videoLibrary,
}) {
  const report = {
    errors: [],
    warnings: [],
    totalModules: Array.isArray(modules) ? modules.length : 0,
    moduleQuestionTotals: [],
    totalFinalAssessment: Array.isArray(finalAssessment) ? finalAssessment.length : 0,
    resourceTotals: [],
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

  validateGlossary(glossary, report)
  validateLibrary(library, report)
  validateVideos(videos, report)
  validateChecklists(checklists, report)
  validateSimulations(simulations, report)
  validateVideoLibrary(videoLibrary, report)

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
  report.resourceTotals.forEach(({ label, total }) => {
    console.log(`- ${label}: ${total} itens`)
  })
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
