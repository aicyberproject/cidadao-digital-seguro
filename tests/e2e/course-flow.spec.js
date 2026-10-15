import { expect, test } from '@playwright/test'

const COURSE_URL = 'http://localhost:5173/cidadao-digital-seguro/'

test('valida atalho de acesso ao conteúdo e ausência de rolagem horizontal', async ({ page }) => {
  await page.goto(COURSE_URL)

  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Pular para o conteúdo principal' })
  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#conteudo-principal')).toBeFocused()

  const transversalViews = [
    'Glossário',
    'Biblioteca',
    'Vídeos',
    'Checklists',
    'Simulações',
    'Multiplicadores',
    'Início',
  ]

  for (const viewName of transversalViews) {
    await page
      .getByRole('navigation', { name: 'Navegação principal do curso' })
      .getByRole('button', { name: viewName })
      .click()

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    expect(hasHorizontalOverflow, `A visão "${viewName}" não deve gerar rolagem horizontal.`).toBe(false)
  }
})

// O fluxo completo (módulos, quiz final e certificado) exige conta no Supabase e não roda aqui, para não
// criar usuários no banco de produção. Este teste cobre só o bloqueio sem sessão.
test('bloqueia a trilha de módulos sem sessão', async ({ page }) => {
  await page.goto(COURSE_URL)

  const moduleChips = page.locator('.module-chip')
  await expect(moduleChips).toHaveCount(6)
  await expect(moduleChips.first()).toBeDisabled()
  await expect(page.getByRole('button', { name: /Começar agora/ })).toHaveCount(0)
})
