import process from 'node:process'
import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import { ZipArchive } from 'archiver'

// Gera um pacote SCORM 1.2 do curso Cidadão Digital Seguro (6 módulos + avaliação final)
// para importação no Moodle. NÃO inclui o módulo de formação de multiplicadores: por
// decisão de projeto (docs/analise-adequacao-capacitacao-multiplicadores.md), esse módulo
// fica fora da matriz homologada de 6 módulos e tem controle de acesso próprio (certificado),
// que não tem equivalente em SCORM estático.
//
// Limitações conhecidas, documentadas para quem for importar no Moodle:
// - Vídeos ainda são placeholders ("Em preparação"); o roteiro é exibido como texto.
// - O quiz de cada módulo usa o conjunto fixo de 10 questões já curado em `module.quiz`
//   (sem sorteio dinâmico; pacote estático não tem esse comportamento).
// - O certificado do curso Cidadão Digital Seguro (com hash validável) é gerado pelo app
//   React, não pelo SCORM; a conclusão fica registrada via cmi.core.lesson_status de cada
//   SCO, e cabe ao Moodle emitir certificado próprio a partir disso, se configurado.

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = resolve(projectRoot, 'dist-scorm')

const contentModules = {
  courseIntro: '/src/content/courseIntro.js',
  modules: '/src/content/modules/index.js',
  finalAssessment: '/src/content/finalAssessment.js',
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderContentBlock(block) {
  switch (block.type) {
    case 'text':
      return `
        <section class="cds-block cds-text">
          ${block.title ? `<h3>${escapeHtml(block.title)}</h3>` : ''}
          ${(block.body || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n')}
        </section>`
    case 'transition':
      return `
        <section class="cds-block cds-transition">
          <h3>${escapeHtml(block.title || 'Transição')}</h3>
          <p>${escapeHtml(block.description)}</p>
        </section>`
    case 'scenario':
      return `
        <section class="cds-block cds-scenario">
          <h3>${escapeHtml(block.title || 'Cenário')}</h3>
          <p>${escapeHtml(block.prompt)}</p>
        </section>`
    case 'tip':
      return `
        <section class="cds-block cds-tip">
          <h3>${escapeHtml(block.title || 'Palavra do especialista')}</h3>
          <p>${escapeHtml(block.text)}</p>
        </section>`
    case 'scam':
      return `
        <section class="cds-block cds-scam">
          <h3>${escapeHtml(block.title || 'Momento É Golpe!')}</h3>
          <p>${escapeHtml(block.text)}</p>
        </section>`
    case 'checklist':
      return `
        <section class="cds-block cds-checklist">
          <h3>${escapeHtml(block.title || 'Checklist')}</h3>
          <ul>${(block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </section>`
    case 'links':
      return `
        <section class="cds-block cds-links">
          <h3>${escapeHtml(block.title || 'Material complementar')}</h3>
          <ul>
            ${(block.items || [])
              .map((link) =>
                link.url
                  ? `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a></li>`
                  : `<li>${escapeHtml(link.label)}${link.note ? `, ${escapeHtml(link.note)}` : ''}</li>`,
              )
              .join('')}
          </ul>
        </section>`
    case 'activity':
      return `
        <section class="cds-block cds-activity">
          <h3>${escapeHtml(block.title || 'Atividade prática')}</h3>
          <p>${escapeHtml(block.prompt)}</p>
          <details>
            <summary>Ver orientação de resposta</summary>
            <p>${escapeHtml(block.reflection)}</p>
          </details>
        </section>`
    default:
      return ''
  }
}

function renderVideoBlock(video) {
  if (!video) return ''

  return `
    <section class="cds-block cds-video">
      <h3>${escapeHtml(video.title || 'Videoaula do módulo')}</h3>
      <p class="cds-muted">Duração sugerida: ${escapeHtml(video.duration)}; status: ${escapeHtml(video.status)}</p>
      <p>${escapeHtml(video.script)}</p>
      ${
        Array.isArray(video.objectives) && video.objectives.length > 0
          ? `<h4>Objetivos</h4><ul>${video.objectives.map((o) => `<li>${escapeHtml(o)}</li>`).join('')}</ul>`
          : ''
      }
      ${
        Array.isArray(video.topics) && video.topics.length > 0
          ? `<h4>Tópicos</h4><ul>${video.topics.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>`
          : ''
      }
    </section>`
}

function renderQuizSection(quiz) {
  const quizJson = JSON.stringify(quiz.map((q) => ({ question: q.question, options: q.options, answer: q.answer })))

  return `
    <section class="cds-block cds-quiz">
      <h3>Quiz do módulo</h3>
      <p class="cds-muted">Aproveitamento mínimo para aprovação: 70%.</p>
      <form id="cds-quiz-form" onsubmit="event.preventDefault(); cdsCheckAnswers();">
        ${quiz
          .map(
            (q, index) => `
          <fieldset class="cds-question" data-question="${index}">
            <legend>${index + 1}. ${escapeHtml(q.question)}</legend>
            ${q.options
              .map(
                (option, optionIndex) => `
              <label class="cds-option">
                <input type="radio" name="q${index}" value="${optionIndex}" />
                <span>${escapeHtml(option)}</span>
              </label>`,
              )
              .join('')}
          </fieldset>`,
          )
          .join('')}
        <button type="submit">Corrigir respostas</button>
      </form>
      <div id="cds-quiz-feedback" class="cds-feedback" role="status"></div>
      <script>window.CDS_QUIZ = ${quizJson};</script>
    </section>`
}

function pageShell({ title, bodyHtml, includeQuizScript }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="shared/style.css" />
  <script src="shared/scorm-api.js"></script>
</head>
<body>
  <main class="cds-page">
    <h1>${escapeHtml(title)}</h1>
    ${bodyHtml}
  </main>
  ${includeQuizScript ? '<script src="shared/quiz.js"></script>' : ''}
</body>
</html>`
}

async function loadContent() {
  const server = await createServer({
    root: projectRoot,
    configFile: false,
    logLevel: 'silent',
    appType: 'custom',
    server: { middlewareMode: true },
  })

  try {
    const [courseIntroModule, modulesModule, finalAssessmentModule] = await Promise.all([
      server.ssrLoadModule(contentModules.courseIntro),
      server.ssrLoadModule(contentModules.modules),
      server.ssrLoadModule(contentModules.finalAssessment),
    ])

    return {
      courseIntro: courseIntroModule.courseIntro,
      modules: modulesModule.modules,
      finalAssessment: finalAssessmentModule.finalAssessment,
    }
  } finally {
    await server.close()
  }
}

const SHARED_CSS = `
  :root { color-scheme: light; }
  body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; margin: 0; background: #f7f7f5; color: #232f37; }
  .cds-page { max-width: 860px; margin: 0 auto; padding: 24px 20px 64px; }
  h1 { font-size: 1.5rem; margin-bottom: 8px; }
  h3 { font-size: 1.1rem; margin-bottom: 4px; }
  .cds-block { background: #fff; border: 1px solid #e2e2df; border-radius: 8px; padding: 16px 20px; margin: 16px 0; }
  .cds-block ul { padding-left: 1.1em; }
  .cds-block ul > li { list-style-type: "- "; }
  .cds-muted { color: #5b6470; font-size: 0.9rem; }
  .cds-scam { border-left: 4px solid #b3462c; }
  .cds-tip { border-left: 4px solid #235337; }
  .cds-transition { border-left: 4px solid #8b5e34; font-style: italic; }
  .cds-question { border: none; margin: 16px 0; padding: 0; }
  .cds-question legend { font-weight: 600; margin-bottom: 8px; }
  .cds-option { display: block; margin: 6px 0; padding: 8px; border-radius: 6px; border: 1px solid #dcdcd8; cursor: pointer; }
  .cds-option.correct { border-color: #2f7a4f; background: #eaf6ee; }
  .cds-option.incorrect { border-color: #b3462c; background: #fbeceb; }
  .cds-feedback { margin-top: 12px; padding: 12px; border-radius: 6px; font-weight: 600; }
  .cds-feedback.pass { background: #eaf6ee; color: #2f7a4f; }
  .cds-feedback.fail { background: #fbeceb; color: #b3462c; }
  button { background: #233752; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-size: 1rem; }
`

const SCORM_API_JS = `
function cdsFindAPI(win) {
  var attempts = 0;
  while (win.API == null && win.parent != null && win.parent !== win && attempts < 500) {
    attempts += 1;
    win = win.parent;
  }
  return win.API || null;
}

function cdsGetAPI() {
  var api = cdsFindAPI(window);
  if (!api && window.opener) api = cdsFindAPI(window.opener);
  return api;
}

window.CDS_SCORM = (function () {
  var api = null;
  var initialized = false;

  function init() {
    api = cdsGetAPI();
    if (api) {
      var result = api.LMSInitialize('');
      initialized = result === 'true' || result === true;
    }
    return initialized;
  }

  function setStatus(status) {
    if (api && initialized) api.LMSSetValue('cmi.core.lesson_status', status);
  }

  function setScore(raw) {
    if (api && initialized) api.LMSSetValue('cmi.core.score.raw', String(raw));
  }

  function commit() {
    if (api && initialized) api.LMSCommit('');
  }

  function finish() {
    if (api && initialized) {
      api.LMSFinish('');
      initialized = false;
    }
  }

  return { init: init, setStatus: setStatus, setScore: setScore, commit: commit, finish: finish };
})();

window.addEventListener('load', function () {
  window.CDS_SCORM.init();
  window.CDS_SCORM.setStatus('incomplete');
  window.CDS_SCORM.commit();
});

window.addEventListener('beforeunload', function () {
  window.CDS_SCORM.commit();
  window.CDS_SCORM.finish();
});
`

const QUIZ_JS = `
function cdsCheckAnswers() {
  var quiz = window.CDS_QUIZ || [];
  var total = quiz.length;
  var correct = 0;

  quiz.forEach(function (q, i) {
    var checked = document.querySelector('input[name="q' + i + '"]:checked');
    var answered = checked ? Number(checked.value) : -1;
    var optionEls = document.querySelectorAll('[data-question="' + i + '"] .cds-option');

    optionEls.forEach(function (el, idx) {
      el.classList.remove('correct', 'incorrect');
      if (idx === q.answer) el.classList.add('correct');
      else if (idx === answered) el.classList.add('incorrect');
    });

    if (answered === q.answer) correct += 1;
  });

  var pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  var passed = pct >= 70;
  var feedbackEl = document.getElementById('cds-quiz-feedback');

  feedbackEl.textContent = 'Resultado: ' + correct + '/' + total + ' (' + pct + '%). ' +
    (passed ? 'Aprovado.' : 'Aproveitamento insuficiente (mínimo 70%).');
  feedbackEl.className = 'cds-feedback ' + (passed ? 'pass' : 'fail');

  window.CDS_SCORM.setScore(pct);
  window.CDS_SCORM.setStatus(passed ? 'passed' : 'failed');
  window.CDS_SCORM.commit();
}
`

function buildManifest(modules) {
  const moduleItems = modules
    .map(
      (moduleItem, index) =>
        `      <item identifier="ITEM-M${index + 1}" identifierref="RES-M${index + 1}">
        <title>${escapeHtml(moduleItem.title)}</title>
      </item>`,
    )
    .join('\n')

  const moduleResources = modules
    .map(
      (moduleItem, index) => `
    <resource identifier="RES-M${index + 1}" type="webcontent" adlcp:scormtype="sco" href="modulo-${index + 1}.html">
      <file href="modulo-${index + 1}.html"/>
      <file href="shared/style.css"/>
      <file href="shared/scorm-api.js"/>
      <file href="shared/quiz.js"/>
    </resource>`,
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="CIDADAO_DIGITAL_SEGURO_SCORM" version="1"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-CDS">
    <organization identifier="ORG-CDS">
      <title>Cidadão Digital Seguro</title>
${moduleItems}
      <item identifier="ITEM-FINAL" identifierref="RES-FINAL">
        <title>Avaliação final</title>
      </item>
    </organization>
  </organizations>
  <resources>${moduleResources}
    <resource identifier="RES-FINAL" type="webcontent" adlcp:scormtype="sco" href="avaliacao-final.html">
      <file href="avaliacao-final.html"/>
      <file href="shared/style.css"/>
      <file href="shared/scorm-api.js"/>
      <file href="shared/quiz.js"/>
    </resource>
  </resources>
</manifest>
`
}

async function main() {
  const { courseIntro, modules, finalAssessment } = await loadContent()

  fs.mkdirSync(outputDir, { recursive: true })

  const archivePath = resolve(outputDir, 'cidadao-digital-seguro-scorm.zip')
  const output = fs.createWriteStream(archivePath)
  const archive = new ZipArchive({ zlib: { level: 9 } })

  const closed = new Promise((resolvePromise, rejectPromise) => {
    output.on('close', resolvePromise)
    archive.on('error', rejectPromise)
  })

  archive.pipe(output)

  archive.append(buildManifest(modules), { name: 'imsmanifest.xml' })
  archive.append(SHARED_CSS, { name: 'shared/style.css' })
  archive.append(SCORM_API_JS, { name: 'shared/scorm-api.js' })
  archive.append(QUIZ_JS, { name: 'shared/quiz.js' })

  modules.forEach((moduleItem, index) => {
    const bodyHtml = `
      <p class="cds-muted">${escapeHtml(courseIntro.title)}. ${escapeHtml(moduleItem.theme || '')}</p>
      <p><strong>Objetivo:</strong> ${escapeHtml(moduleItem.goal || '')}</p>
      ${(moduleItem.content || []).map(renderContentBlock).join('\n')}
      ${renderVideoBlock(moduleItem.video)}
      ${renderQuizSection(moduleItem.quiz || (moduleItem.questionBank || []).slice(0, moduleItem.quizSize || 10))}
    `

    archive.append(pageShell({ title: moduleItem.title, bodyHtml, includeQuizScript: true }), {
      name: `modulo-${index + 1}.html`,
    })
  })

  const finalBodyHtml = `
    <p class="cds-muted">Avaliação final, ${escapeHtml(courseIntro.title)}</p>
    <p>Responda às ${finalAssessment.length} questões abaixo. Aproveitamento mínimo para aprovação: 70%.</p>
    ${renderQuizSection(finalAssessment)}
  `

  archive.append(pageShell({ title: 'Avaliação final', bodyHtml: finalBodyHtml, includeQuizScript: true }), {
    name: 'avaliacao-final.html',
  })

  await archive.finalize()
  await closed

  console.log(`Pacote SCORM gerado em ${archivePath}`)
  console.log(
    'Limitações: vídeos são placeholders (roteiro em texto); quiz de cada módulo usa o conjunto fixo de 10 questões de module.quiz (sem sorteio); módulo de multiplicadores não incluso (fora da matriz homologada, com gate próprio por certificado).',
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
