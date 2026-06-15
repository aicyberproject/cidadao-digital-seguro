import { expect, test } from '@playwright/test'

import { finalAssessment } from '../../src/content/finalAssessment.js'
import { modules } from '../../src/content/modules/index.js'

const COURSE_URL = 'http://localhost:5173/cidadao-digital-seguro/'
const STORAGE_KEY = 'cidadao-digital-seguro-progress-v2'

async function readProgress(page) {
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  }, STORAGE_KEY)
}

async function waitForModuleFlag(page, moduleId, flag) {
  await expect
    .poll(async () => {
      const progress = await readProgress(page)
      return !!progress?.moduleState?.[moduleId]?.[flag]
    })
    .toBe(true)
}

async function advanceModuleContent(page, moduleId) {
  for (let step = 0; step < 50; step += 1) {
    if (await page.getByRole('heading', { name: /^Quiz do / }).isVisible()) {
      await expect(page.getByText('Para concluir o módulo, a atividade prática e a videoaula precisam estar marcadas como concluídas.')).toHaveCount(0)
      await waitForModuleFlag(page, moduleId, 'videoDone')
      await waitForModuleFlag(page, moduleId, 'activityDone')
      return
    }

    await expect(page.getByRole('button', { name: 'Marcar etapa como lida' })).toHaveCount(0)

    const hasVideoAction = await page.getByRole('button', { name: 'Registrar videoaula como assistida' }).isVisible()
    const hasActivityAction = await page.getByRole('button', { name: 'Registrar atividade como concluída' }).isVisible()

    await page.getByRole('button', { name: 'Registrar tela e avançar' }).click()

    if (hasVideoAction) {
      await waitForModuleFlag(page, moduleId, 'videoDone')
    }

    if (hasActivityAction) {
      await waitForModuleFlag(page, moduleId, 'activityDone')
    }
  }

  throw new Error(`Quiz do módulo ${moduleId} não foi alcançado.`)
}

async function getModuleQuizVariant(page, moduleId) {
  await expect
    .poll(async () => {
      const progress = await readProgress(page)
      return progress?.quizVariants?.[moduleId]?.length || 0
    })
    .toBe(10)

  const progress = await readProgress(page)
  return progress.quizVariants[moduleId]
}

async function answerModuleQuiz(page, moduleId) {
  const quiz = await getModuleQuizVariant(page, moduleId)
  expect(quiz).toHaveLength(10)
  await expect(page.locator('.quiz-box')).toHaveCount(10)

  for (const [index, question] of quiz.entries()) {
    const options = page.locator(`input[type="radio"][name="${moduleId}-${index}"]`)
    await expect(options).toHaveCount(question.options.length)
    await options.nth(question.answer).check()
  }

  await expect(page.getByText('Resultado atual: 10/10 acertos. Aproveitamento mínimo: 70%.')).toBeVisible()
}

async function answerFinalAssessment(page) {
  await expect(page.locator('.quiz-box')).toHaveCount(finalAssessment.length)

  for (const [index, question] of finalAssessment.entries()) {
    const options = page.locator(`input[type="radio"][name="final-${index}"]`)
    await expect(options).toHaveCount(question.options.length)
    await options.nth(question.answer).check()
  }
}

test('valida o fluxo principal do curso até a certificação', async ({ page }) => {
  await page.goto(COURSE_URL)
  await page.evaluate((key) => window.localStorage.removeItem(key), STORAGE_KEY)
  await page.reload()

  const moduleChips = page.locator('.module-chip')
  await expect(moduleChips).toHaveCount(6)
  await expect(moduleChips.first()).toBeEnabled()
  await expect(moduleChips.nth(1)).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Marcar etapa como lida' })).toHaveCount(0)

  await page.getByRole('button', { name: /Começar agora/ }).click()

  for (const [moduleIndex, moduleItem] of modules.entries()) {
    await expect(page.getByRole('heading', { name: moduleItem.title })).toBeVisible()

    await advanceModuleContent(page, moduleItem.id)
    await answerModuleQuiz(page, moduleItem.id)

    const nextButtonName =
      moduleIndex === modules.length - 1
        ? 'Ir para a revisão final'
        : 'Concluir módulo e liberar próximo módulo'

    const moduleAction = page.getByRole('main').getByRole('button', { name: nextButtonName })
    await expect(moduleAction).toBeEnabled()
    await moduleAction.click()
  }

  await expect(page.getByRole('heading', { name: 'Revisão geral do curso' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Iniciar avaliação final integradora' })).toBeEnabled()

  await page.getByRole('button', { name: 'Iniciar avaliação final integradora' }).click()
  await answerFinalAssessment(page)

  await expect(page.getByRole('button', { name: 'Ir para certificação' })).toBeEnabled()
  await page.getByRole('button', { name: 'Ir para certificação' }).click()

  await expect(page.getByRole('heading', { name: 'Certificação' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Baixar certificado em PDF' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Marcar etapa como lida' })).toHaveCount(0)
})
