import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { jsPDF } from 'jspdf'
import {
  Shield,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  ListChecks,
  Award,
  ChevronRight,
  Home,
  RotateCcw,
  ExternalLink,
} from 'lucide-react'

import { courseIntro } from './content/courseIntro'
import { modules } from './content/modules'
import { finalAssessment } from './content/finalAssessment'

const STORAGE_KEY = 'cidadao-digital-seguro-progress-v2'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function shuffleArray(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}

function getQuizSource(moduleItem) {
  if (Array.isArray(moduleItem.questionBank) && moduleItem.questionBank.length > 0) {
    return moduleItem.questionBank
  }

  if (Array.isArray(moduleItem.quiz) && moduleItem.quiz.length > 0) {
    return moduleItem.quiz
  }

  return []
}

function getQuizSize(moduleItem) {
  if (typeof moduleItem.quizSize === 'number' && moduleItem.quizSize > 0) {
    return moduleItem.quizSize
  }

  return 10
}

function randomizeQuiz(quizSource, size = 10) {
  const selectedQuestions = shuffleArray(quizSource).slice(0, Math.min(size, quizSource.length))

  return selectedQuestions.map((questionItem) => {
    const correctOption = questionItem.options[questionItem.answer]
    const shuffledOptions = shuffleArray(questionItem.options)

    return {
      ...questionItem,
      options: shuffledOptions,
      answer: shuffledOptions.indexOf(correctOption),
    }
  })
}

function defaultProgress() {
  const moduleState = Object.fromEntries(
    modules.map((m, index) => [
      m.id,
      {
        unlocked: index === 0,
        contentSeen: {},
        checklist: {},
        activityDone: false,
        videoDone: false,
        quizAnswers: {},
        quizPassed: false,
        completed: false,
      },
    ]),
  )

  return {
    started: false,
    introSeen: false,
    moduleState,
    quizVariants: {},
    finalAssessmentAnswers: {},
    finalAssessmentPassed: false,
    certificateUnlocked: false,
  }
}

function normalizeProgress(loaded) {
  const fresh = defaultProgress()

  if (!loaded || typeof loaded !== 'object') return fresh

  const normalizedModuleState = { ...fresh.moduleState }

  modules.forEach((moduleItem) => {
    normalizedModuleState[moduleItem.id] = {
      ...fresh.moduleState[moduleItem.id],
      ...(loaded.moduleState?.[moduleItem.id] || {}),
      contentSeen: {
        ...fresh.moduleState[moduleItem.id].contentSeen,
        ...(loaded.moduleState?.[moduleItem.id]?.contentSeen || {}),
      },
      checklist: {
        ...fresh.moduleState[moduleItem.id].checklist,
        ...(loaded.moduleState?.[moduleItem.id]?.checklist || {}),
      },
      quizAnswers: {
        ...fresh.moduleState[moduleItem.id].quizAnswers,
        ...(loaded.moduleState?.[moduleItem.id]?.quizAnswers || {}),
      },
    }
  })

  return {
    ...fresh,
    ...loaded,
    moduleState: normalizedModuleState,
    quizVariants: loaded.quizVariants || {},
    finalAssessmentAnswers: loaded.finalAssessmentAnswers || {},
    finalAssessmentPassed: !!loaded.finalAssessmentPassed,
    certificateUnlocked: !!loaded.certificateUnlocked,
  }
}

function scoreQuiz(quiz, answers) {
  let correct = 0

  quiz.forEach((q, i) => {
    if (answers[i] === q.answer) correct += 1
  })

  return {
    correct,
    total: quiz.length,
    passed: quiz.length > 0 ? correct / quiz.length >= 0.7 : false,
  }
}

function ProgressBar({ value }) {
  return (
    <div className="progress-shell">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  )
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`.trim()}>{children}</div>
}

function SectionTag({ children }) {
  return <span className="tag">{children}</span>
}

function ModuleProgress({ mod, state }) {
  const totalScreens = Array.isArray(mod?.screens)
    ? mod.screens.length
    : Array.isArray(mod?.lessons)
      ? mod.lessons.length
      : 0

  const completedScreens = state?.contentSeen
    ? Object.values(state.contentSeen).filter(Boolean).length
    : 0

  const quizSource = getQuizSource(mod)
  const totalQuestions = Array.isArray(quizSource) ? quizSource.length : 0

  const answeredQuestions = Array.isArray(state?.quizAnswers)
    ? state.quizAnswers.length
    : 0

  const contentProgress = totalScreens > 0
    ? completedScreens / totalScreens
    : 0

  const quizProgress = totalQuestions > 0
    ? answeredQuestions / totalQuestions
    : 0

  const progressValue = state?.completed
    ? 100
    : Math.round(((contentProgress + quizProgress) / 2) * 100)

  return <ProgressBar value={progressValue} />
}

function renderLessonContent(blocks) {
  if (!Array.isArray(blocks)) return null

  return (
    <div className="stack-md">
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className="muted-body">
              {block.text}
            </p>
          )
        }

        if (block.type === 'list') {
          return (
            <div key={index} className="info-box">
              {block.title ? <div className="link-card-title">{block.title}</div> : null}
              <ul className="muted-body">
                {(block.items || []).map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          )
        }

        if (block.type === 'callout') {
          return (
            <div key={index} className="tip-box">
              {block.title ? <strong>{block.title}</strong> : null}
              {block.text ? <p>{block.text}</p> : null}
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

function ScreenCard({ title, children, icon: Icon }) {
  return (
    <Card>
      <div className="card-header">
        <div className="icon-title">
          {Icon ? (
            <div className="icon-box">
              <Icon size={18} />
            </div>
          ) : null}
          <h2>{title}</h2>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </Card>
  )
}

export default function App() {
  const [progressState, setProgressState] = useState(defaultProgress())
  const [currentView, setCurrentView] = useState('home')
  const [selectedModuleId, setSelectedModuleId] = useState(modules[0].id)
  const [screenIndex, setScreenIndex] = useState(0)
  const [participantName, setParticipantName] = useState('')

  useEffect(() => {
    const loaded = loadProgress()
    if (loaded) setProgressState(normalizeProgress(loaded))
  }, [])

  useEffect(() => {
    saveProgress(progressState)
  }, [progressState])

  const selectedModule = useMemo(
    () => modules.find((m) => m.id === selectedModuleId) || modules[0],
    [selectedModuleId],
  )

  const selectedModuleState =
  progressState.moduleState[selectedModule.id] || defaultProgress().moduleState[selectedModule.id]

  const selectedModuleContent = Array.isArray(selectedModule.content)
  ? selectedModule.content
  : Array.isArray(selectedModule.lessons)
    ? selectedModule.lessons
    : []

  const currentItem = selectedModuleContent[screenIndex] || selectedModuleContent[0] || null

  const allModulesCompleted = modules.every((m) => progressState.moduleState[m.id]?.completed)
  const activeModuleQuiz = progressState.quizVariants?.[selectedModule.id] || selectedModule.quiz || []
  const moduleQuizResult = scoreQuiz(activeModuleQuiz, selectedModuleState.quizAnswers || {})
  const finalResult = scoreQuiz(finalAssessment, progressState.finalAssessmentAnswers || {})

  useEffect(() => {
    const isQuizScreen = screenIndex === selectedModuleContent.length

    if (!isQuizScreen) return

    setProgressState((prev) => {
      if (prev.quizVariants?.[selectedModule.id]) return prev

      return {
        ...prev,
        quizVariants: {
          ...(prev.quizVariants || {}),
          [selectedModule.id]: randomizeQuiz(
            getQuizSource(selectedModule),
            getQuizSize(selectedModule),
          ),
        },
      }
    })
  }, [screenIndex, selectedModule.id, selectedModuleContent.length, selectedModule])

  function generateCertificatePdf() {
    if (!progressState.certificateUnlocked) return

    const cleanName = participantName.trim() || 'Participante'
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const today = new Date().toLocaleDateString('pt-BR')

    doc.setFillColor(248, 245, 240)
    doc.rect(0, 0, 297, 210, 'F')

    doc.setDrawColor(139, 94, 52)
    doc.setLineWidth(2)
    doc.rect(10, 10, 277, 190)
    doc.setLineWidth(0.6)
    doc.rect(14, 14, 269, 182)

    doc.setTextColor(91, 70, 51)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(26)
    doc.text('CERTIFICADO DE CONCLUSAO', 148.5, 38, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(13)
    doc.text('Certificamos que', 148.5, 58, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(24)
    doc.text(cleanName.toUpperCase(), 148.5, 76, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(13)
    const lines = doc.splitTextToSize(
      'concluiu com aproveitamento o curso Cidadão Digital Seguro: Prevenção e Combate a Crimes Cibernéticos, em formato online autoinstrucional, com carga horária sugerida de 12 a 18 horas, contemplando identificação de riscos, prevenção de fraudes e resposta a incidentes digitais.',
      220,
    )
    doc.text(lines, 148.5, 92, { align: 'center' })

    doc.setFontSize(12)
    doc.text(`Data de conclusão: ${today}`, 148.5, 132, { align: 'center' })
    doc.text('Status: aprovado na avaliação final integradora', 148.5, 141, { align: 'center' })

    doc.setDrawColor(139, 94, 52)
    doc.line(95, 164, 202, 164)
    doc.setFont('helvetica', 'bold')
    doc.text('Cidadão Digital Seguro', 148.5, 171, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.text('Certificação digital gerada pela aplicação do curso', 148.5, 178, { align: 'center' })

    const fileName = `certificado-cidadao-digital-seguro-${cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '-')}.pdf`

    doc.save(fileName)
  }

  function startCourse() {
    setProgressState((prev) => ({ ...prev, started: true, introSeen: true }))
    setCurrentView('module')
    setSelectedModuleId(modules[0].id)
    setScreenIndex(0)
  }

  function goHome() {
    setCurrentView('home')
    setScreenIndex(0)
  }

  function markSeen(itemIndex) {
    setProgressState((prev) => ({
      ...prev,
      moduleState: {
        ...prev.moduleState,
        [selectedModule.id]: {
          ...prev.moduleState[selectedModule.id],
          contentSeen: {
            ...prev.moduleState[selectedModule.id].contentSeen,
            [itemIndex]: true,
          },
        },
      },
    }))
  }

  function toggleChecklist(item) {
    setProgressState((prev) => ({
      ...prev,
      moduleState: {
        ...prev.moduleState,
        [selectedModule.id]: {
          ...prev.moduleState[selectedModule.id],
          checklist: {
            ...prev.moduleState[selectedModule.id].checklist,
            [item]: !prev.moduleState[selectedModule.id].checklist[item],
          },
        },
      },
    }))
  }

  function setVideoDone() {
    setProgressState((prev) => ({
      ...prev,
      moduleState: {
        ...prev.moduleState,
        [selectedModule.id]: {
          ...prev.moduleState[selectedModule.id],
          videoDone: true,
        },
      },
    }))
  }

  function setActivityDone() {
    setProgressState((prev) => ({
      ...prev,
      moduleState: {
        ...prev.moduleState,
        [selectedModule.id]: {
          ...prev.moduleState[selectedModule.id],
          activityDone: true,
        },
      },
    }))
  }

  function answerModuleQuiz(idx, answer) {
    setProgressState((prev) => {
      const quizForScoring = prev.quizVariants?.[selectedModule.id] || selectedModule.quiz || []
      const nextAnswers = {
        ...prev.moduleState[selectedModule.id].quizAnswers,
        [idx]: answer,
      }
      const result = scoreQuiz(quizForScoring, nextAnswers)

      return {
        ...prev,
        moduleState: {
          ...prev.moduleState,
          [selectedModule.id]: {
            ...prev.moduleState[selectedModule.id],
            quizAnswers: nextAnswers,
            quizPassed: result.passed,
          },
        },
      }
    })
  }

  function retryModuleQuiz() {
    setProgressState((prev) => {
      const randomizedQuiz = randomizeQuiz(
        getQuizSource(selectedModule),
        getQuizSize(selectedModule),
      )

      return {
        ...prev,
        quizVariants: {
          ...(prev.quizVariants || {}),
          [selectedModule.id]: randomizedQuiz,
        },
        moduleState: {
          ...prev.moduleState,
          [selectedModule.id]: {
            ...prev.moduleState[selectedModule.id],
            quizAnswers: {},
            quizPassed: false,
          },
        },
      }
    })
  }

  function completeModule() {
    const moduleIndex = modules.findIndex((m) => m.id === selectedModule.id)
    const nextModule = modules[moduleIndex + 1]

    setProgressState((prev) => {
      const updated = {
        ...prev,
        moduleState: {
          ...prev.moduleState,
          [selectedModule.id]: {
            ...prev.moduleState[selectedModule.id],
            completed: true,
          },
        },
      }

      if (nextModule) {
        updated.moduleState[nextModule.id] = {
          ...updated.moduleState[nextModule.id],
          unlocked: true,
        }
      }

      return updated
    })

    if (nextModule) {
      setSelectedModuleId(nextModule.id)
      setScreenIndex(0)
    } else {
      setCurrentView('final-review')
    }
  }

  function answerFinalAssessment(idx, answer) {
    setProgressState((prev) => {
      const nextAnswers = {
        ...prev.finalAssessmentAnswers,
        [idx]: answer,
      }
      const result = scoreQuiz(finalAssessment, nextAnswers)

      return {
        ...prev,
        finalAssessmentAnswers: nextAnswers,
        finalAssessmentPassed: result.passed,
        certificateUnlocked: result.passed,
      }
    })
  }

  function resetCourse() {
    const fresh = defaultProgress()
    setProgressState(fresh)
    saveProgress(fresh)
    setCurrentView('home')
    setSelectedModuleId(modules[0].id)
    setScreenIndex(0)
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div className="eyebrow">
            <Shield size={14} /> Curso online com progressão por conclusão de atividades
          </div>
          <h1>{courseIntro.title}</h1>
          <p className="subtitle">{courseIntro.subtitle}</p>
        </div>

        <div className="top-actions">
          <button className="button button-outline" onClick={goHome}>
            <Home size={16} /> Início
          </button>
          <button className="button button-outline" onClick={resetCourse}>
            <RotateCcw size={16} /> Reiniciar
          </button>
        </div>
      </div>

      <div className="layout-grid">
        <aside className="sidebar">
          <Card>
            <div className="card-header">
              <h2>Trilha do curso</h2>
              <p className="muted">Os módulos são liberados progressivamente.</p>
            </div>

            <div className="card-body sidebar-list">
              {modules.map((m, idx) => {
                const state = progressState.moduleState[m.id]
                const Icon = m.icon

                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`module-chip ${state.unlocked ? '' : 'locked'}`}
                    onClick={() => {
                      if (!state.unlocked) return
                      setSelectedModuleId(m.id)
                      setCurrentView('module')
                      setScreenIndex(0)
                    }}
                    disabled={!state.unlocked}
                  >
                    <div className="module-chip-head">
                      <div className="module-chip-left">
                        <div className="icon-box small">
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="mini-muted">Etapa {idx + 1}</div>
                          <div className="module-chip-title">{m.shortTitle}</div>
                        </div>
                      </div>
                      {state.completed ? <CheckCircle2 className="success-icon" size={18} /> : null}
                    </div>
                    <ModuleProgress mod={m} state={state} />
                  </button>
                )
              })}

              <div className="final-box">
                <div className="final-box-head">
                  <span>Avaliação final</span>
                  {progressState.finalAssessmentPassed ? (
                    <CheckCircle2 className="success-icon" size={18} />
                  ) : null}
                </div>

                <ProgressBar
                  value={finalResult.passed ? 100 : Math.round((finalResult.correct / finalResult.total) * 100) || 0}
                />

                <button className="button full" disabled={!allModulesCompleted} onClick={() => setCurrentView('final-review')}>
                  Ir para a etapa final
                </button>
              </div>
            </div>
          </Card>
        </aside>

        <main className="content-column">
          {currentView === 'home' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Bem-vindo ao curso" icon={Shield}>
                <p className="muted-body">{courseIntro.description}</p>

                <div className="grid-2">
                  {courseIntro.outcomes.map((item) => (
                    <div key={item} className="info-box">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="tags-row">
                  <SectionTag>Identificar</SectionTag>
                  <SectionTag>Prevenir</SectionTag>
                  <SectionTag>Reagir</SectionTag>
                </div>

                <div className="actions-row">
                  <button className="button" onClick={startCourse}>
                    Começar agora <ChevronRight size={16} />
                  </button>
                  <button className="button button-outline" onClick={() => setCurrentView('structure')}>
                    Como funciona a trilha
                  </button>
                </div>
              </ScreenCard>

              <div className="grid-3">
                <Card>
                  <div className="card-header">
                    <h2>Formato</h2>
                  </div>
                  <div className="card-body muted-body">
                    Curso autoinstrucional em trilha progressiva, com conteúdos, atividades práticas, quizzes e avaliação final integradora.
                  </div>
                </Card>

                <Card>
                  <div className="card-header">
                    <h2>Liberação</h2>
                  </div>
                  <div className="card-body muted-body">
                    Cada módulo é liberado após a conclusão da etapa anterior, incluindo atividade obrigatória e quiz com aproveitamento mínimo.
                  </div>
                </Card>

                <Card>
                  <div className="card-header">
                    <h2>Certificação</h2>
                  </div>
                  <div className="card-body muted-body">
                    O certificado é liberado ao final da trilha, após aprovação na avaliação integradora.
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {currentView === 'structure' && (
            <ScreenCard title="Como funciona esta trilha" icon={ListChecks}>
              <div className="grid-2">
                <div className="info-box">
                  <h3>Etapas de cada módulo</h3>
                  <div className="line-list">
                    <div>Conteúdo principal</div>
                    <div>Videoaula do módulo</div>
                    <div>Dica de especialista</div>
                    <div>Momento É Golpe!</div>
                    <div>Checklist</div>
                    <div>Leitura complementar</div>
                    <div>Atividade prática</div>
                    <div>Quiz do módulo</div>
                  </div>
                </div>

                <div className="info-box">
                  <h3>Regras de desbloqueio</h3>
                  <div className="line-list">
                    <div>A próxima etapa só é liberada após a conclusão da anterior</div>
                    <div>O quiz do módulo exige aproveitamento mínimo de 70%</div>
                    <div>A atividade prática e o checklist são obrigatórios</div>
                    <div>A avaliação final só abre após os seis módulos concluídos</div>
                  </div>
                </div>
              </div>

              <button className="button" onClick={startCourse}>
                Ir para a trilha
              </button>
            </ScreenCard>
          )}

          {currentView === 'module' && selectedModule && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title={selectedModule.title} icon={selectedModule.icon}>
                 <p className="muted-body">{selectedModule.subtitle || selectedModule.theme}</p>

                 <div className="muted-small">
    		   <strong>Objetivo:</strong>{' '}
    		   {selectedModule.goal || selectedModule.objectives?.[0] || selectedModule.summary}
  		 </div>

  <ModuleProgress mod={selectedModule} state={selectedModuleState} />

                <div className="tags-row">
                  <SectionTag>Etapa {modules.findIndex((m) => m.id === selectedModule.id) + 1}</SectionTag>
                  {selectedModuleState.completed ? <SectionTag>Concluído</SectionTag> : null}
                </div>
              </ScreenCard>

              {screenIndex < selectedModuleContent.length && currentItem && (
                <ScreenCard
                  title={currentItem.title}
		  icon={
                    currentItem.type === 'video'
                      ? PlayCircle
                      : currentItem.type === 'links'
                        ? BookOpen
                        : currentItem.type === 'checklist'
                          ? ListChecks
                          : currentItem.type === 'activity'
                            ? FileCheck
                            : AlertTriangle
                  }
                >
                  {currentItem.content && renderLessonContent(currentItem.content)}

 		  {currentItem.type === 'text' && Array.isArray(currentItem.body) && (
  		     <div className="stack-md">
    		       {currentItem.body.map((p) => (
     			 <p className="muted-body" key={p}>
        		   {p}
     			 </p>
  		       ))}
		      </div>
		    )}

                  {currentItem.type === 'scenario' && <div className="scenario-box">{currentItem.prompt}</div>}
                  {currentItem.type === 'tip' && <div className="tip-box">{currentItem.text}</div>}
                  {currentItem.type === 'scam' && <div className="scam-box">{currentItem.text}</div>}

                  {currentItem.type === 'video' && (
                    <div className="stack-md">
                      <div className="video-box">
                        <PlayCircle size={42} />
                        <div className="video-title">{currentItem.description}</div>
                        <div className="muted-small">Duração sugerida: {currentItem.duration}</div>
                      </div>

                      <button
                        className="button"
                        onClick={() => {
                          setVideoDone()
                          markSeen(screenIndex)
                        }}
                      >
                        Marcar videoaula como assistida
                      </button>
                    </div>
                  )}

                  {currentItem.type === 'checklist' && (
                    <div className="stack-md">
                      {currentItem.items.map((item) => (
                        <label key={item} className="check-row">
                          <input
                            type="checkbox"
                            checked={!!selectedModuleState.checklist[item]}
                            onChange={() => toggleChecklist(item)}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {currentItem.type === 'links' && (
                    <div className="grid-2">
                      {currentItem.items.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="link-card">
                          <div className="link-card-title">{link.label}</div>
                          <div className="link-card-url">{link.url}</div>
                          <ExternalLink size={16} />
                        </a>
                      ))}
                    </div>
                  )}

                  {currentItem.type === 'activity' && (
                    <div className="stack-md">
                      <div className="info-box">{currentItem.prompt}</div>
                      <details className="details-box">
                        <summary>Ver orientação de resposta</summary>
                        <p>{currentItem.reflection}</p>
                      </details>

                      <button
                        className="button"
                        onClick={() => {
                          setActivityDone()
                          markSeen(screenIndex)
                        }}
                      >
                        Marcar atividade como concluída
                      </button>
                    </div>
                  )}

                  {currentItem.type !== 'video' && currentItem.type !== 'activity' && (
                    <button className="button" onClick={() => markSeen(screenIndex)}>
                      Marcar etapa como lida
                    </button>
                  )}

                  <div className="actions-between">
                    <button
                      className="button button-outline"
                      disabled={screenIndex === 0}
                      onClick={() => setScreenIndex((s) => Math.max(0, s - 1))}
                    >
                      Voltar
                    </button>

                    <button
                      className="button"
                      onClick={() => setScreenIndex((s) => Math.min(selectedModuleContent.length, s + 1))}
                      disabled={!selectedModuleState.contentSeen[screenIndex] && currentItem.type !== 'checklist'}
                    >
                      Próxima etapa
                    </button>
                  </div>
                </ScreenCard>
              )}

              {screenIndex === selectedModuleContent.length && (
                <ScreenCard title={`Quiz do ${selectedModule.shortTitle}`} icon={CheckCircle2}>
                  <div className="stack-lg">
                    {activeModuleQuiz.map((q, idx) => (
                      <div key={`${selectedModule.id}-${idx}-${q.question}`} className="quiz-box">
                        <div className="quiz-question">
                          {idx + 1}. {q.question}
                        </div>

                        <div className="stack-sm">
                          {q.options.map((opt, optionIndex) => (
                            <label key={`${selectedModule.id}-${idx}-${optionIndex}-${opt}`} className="radio-row">
                              <input
                                type="radio"
                                name={`${selectedModule.id}-${idx}`}
                                checked={selectedModuleState.quizAnswers[idx] === optionIndex}
                                onChange={() => answerModuleQuiz(idx, optionIndex)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="info-box muted-body">
                    Resultado atual: {moduleQuizResult.correct}/{moduleQuizResult.total} acertos. Aproveitamento mínimo: 70%.
                  </div>

                  <div className="actions-row">
                    <button
                      className="button button-outline"
                      onClick={() => setScreenIndex(selectedModuleContent.length - 1)}
                    >
                      Voltar ao conteúdo
                    </button>

                    <button
                      className="button button-outline"
                      onClick={retryModuleQuiz}
                      disabled={selectedModuleState.completed || Object.keys(selectedModuleState.quizAnswers || {}).length === 0}
                    >
                      Nova tentativa
                    </button>

                    <button
                      className="button"
                      disabled={!(selectedModuleState.activityDone && selectedModuleState.videoDone && moduleQuizResult.passed)}
                      onClick={completeModule}
                    >
                      {modules.findIndex((m) => m.id === selectedModule.id) === modules.length - 1
                        ? 'Ir para a etapa final'
                        : 'Concluir módulo e liberar próximo'}
                    </button>
                  </div>

                  {!selectedModuleState.activityDone || !selectedModuleState.videoDone ? (
                    <div className="warning-text">
                      Para concluir o módulo, a atividade prática e a videoaula precisam estar marcadas como concluídas.
                    </div>
                  ) : null}
                </ScreenCard>
              )}
            </motion.div>
          )}

          {currentView === 'final-review' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Revisão geral do curso" icon={BookOpen}>
                <p className="muted-body">
                  Você concluiu a trilha principal. Agora, revise a jornada completa antes de realizar a avaliação final integradora.
                </p>

                <div className="grid-2">
                  {modules.map((m) => (
                    <div key={m.id} className="info-box">
                      <div className="link-card-title">{m.shortTitle}</div>
                      <div className="muted-small">{m.goal}</div>
                    </div>
                  ))}
                </div>

                <button className="button" onClick={() => setCurrentView('final-assessment')}>
                  Iniciar avaliação final
                </button>
              </ScreenCard>
            </motion.div>
          )}

          {currentView === 'final-assessment' && (
            <ScreenCard title="Avaliação final integradora" icon={Award}>
              <p className="muted-body">
                Estudo de caso transversal para verificar identificação do golpe, falhas preventivas, ordem correta da reação, preservação de provas e escolha do canal institucional adequado.
              </p>

              <div className="stack-lg">
                {finalAssessment.map((q, idx) => (
                  <div key={q.question} className="quiz-box">
                    <div className="quiz-question">
                      {idx + 1}. {q.question}
                    </div>

                    <div className="stack-sm">
                      {q.options.map((opt, optionIndex) => (
                        <label key={opt} className="radio-row">
                          <input
                            type="radio"
                            name={`final-${idx}`}
                            checked={progressState.finalAssessmentAnswers[idx] === optionIndex}
                            onChange={() => answerFinalAssessment(idx, optionIndex)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="info-box muted-body">
                Resultado atual: {finalResult.correct}/{finalResult.total} acertos. Aproveitamento mínimo: 70%.
              </div>

              <div className="actions-row">
                <button
                  className="button"
                  onClick={() => setCurrentView('certificate')}
                  disabled={!progressState.finalAssessmentPassed}
                >
                  Ir para certificação
                </button>
              </div>

              {!progressState.finalAssessmentPassed ? (
                <div className="warning-text">
                  Conclua a avaliação com aproveitamento mínimo para liberar o certificado.
                </div>
              ) : null}
            </ScreenCard>
          )}

          {currentView === 'certificate' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Certificação" icon={Award}>
                <div className="certificate-box">
                  <Award size={48} />
                  <h3>Parabéns pela conclusão</h3>
                  <p>
                    Você concluiu a trilha formativa e foi aprovado na avaliação final integradora. O curso reforça a tríade: identificar o risco, prevenir com método e reagir com segurança.
                  </p>
                  <div className="muted-small">Certificado em PDF disponível para emissão imediata</div>
                </div>

                <div className="tabs-grid">
                  <div className="info-box">
                    <div className="link-card-title">Emitir certificado</div>
                    <div className="line-list">
                      <div>Curso: Cidadão Digital Seguro — Prevenção e Combate a Crimes Cibernéticos</div>
                      <div>Carga horária sugerida: 12 a 18 horas</div>
                      <div>Status: concluído com aproveitamento</div>
                    </div>

                    <div className="stack-sm" style={{ marginTop: '12px' }}>
                      <label htmlFor="participantName" className="muted-body">
                        Nome do participante para o PDF
                      </label>

                      <input
                        id="participantName"
                        className="text-input"
                        type="text"
                        placeholder="Digite o nome completo"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                      />

                      <button className="button" onClick={generateCertificatePdf}>
                        Baixar certificado em PDF
                      </button>
                    </div>
                  </div>

                  <div className="info-box">
                    <div className="link-card-title">Materiais permanentes</div>
                    <div className="line-list">
                      <div>Revisar módulos concluídos</div>
                      <div>Retomar checklists e atividades</div>
                      <div>Consultar leituras complementares</div>
                      <div>Usar a trilha como referência de prevenção</div>
                    </div>
                  </div>
                </div>

                <div className="info-box">
                  <div className="link-card-title">Orientação final</div>
                  <div className="line-list">
                    <div>Guarde o certificado em local seguro.</div>
                    <div>Revise periodicamente os checklists do curso.</div>
                    <div>Em caso de golpe ou incidente digital, utilize canais oficiais de atendimento e preserve evidências.</div>
                  </div>
                </div>
              </ScreenCard>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}