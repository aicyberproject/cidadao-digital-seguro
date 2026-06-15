import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { jsPDF } from 'jspdf'
import {
  Shield,
  AlertTriangle,
  FileCheck,
  FileText,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  ListChecks,
  Award,
  ChevronRight,
  Home,
  RotateCcw,
  ExternalLink,
  Search,
  MessageSquare,
  XCircle,
  AlertOctagon,
} from 'lucide-react'

import { courseIntro } from './content/courseIntro'
import { modules } from './content/modules'
import { finalAssessment } from './content/finalAssessment'
import { glossaryCategories, glossaryEntries } from './content/glossary'
import { libraryDocuments, librarySources, libraryCategories, libraryTypes } from './content/library'
import { educationalVideos, videoModules, videoSources, videoThemes } from './content/videos'
import { practicalChecklists, checklistCategories, checklistModules } from './content/checklists'
import { quickSimulations, simulationCategories, simulationModules } from './content/simulations'
import { CharacterAvatar } from './components/CharacterAvatar'
import packageInfo from '../package.json'

const STORAGE_KEY = 'cidadao-digital-seguro-progress-v2'
const COURSE_VERSION = packageInfo.version
const CERTIFICATE_WORKLOAD = '12 a 18 horas'
const FINAL_ASSESSMENT_VERSION = createFinalAssessmentVersion(finalAssessment)
const MODULE_LOCKED_MESSAGE = 'Conclua o módulo anterior para liberar esta etapa.'
const FINAL_ASSESSMENT_LOCKED_MESSAGE = 'Conclua todos os módulos para liberar a avaliação final.'

function createFinalAssessmentVersion(assessment) {
  const source = assessment
    .map(({ question, options, answer }) => {
      const optionText = Array.isArray(options) ? options.join('|') : ''

      return `${question}|${optionText}|${answer}`
    })
    .join('||')
  let hash = 0

  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0
  }

  return `${assessment.length}-${hash.toString(36)}`
}

function formatCertificateDate(date) {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function createCertificateCode(name, date, timestamp) {
  const source = `${name.trim().toLowerCase()}|${date.toISOString().slice(0, 10)}|${timestamp}`
  let hash = 0

  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0
  }

  return `CDS-${COURSE_VERSION.replace(/\D/g, '')}-${hash.toString(36).toUpperCase().padStart(7, '0')}`
}

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
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...data,
      finalAssessmentVersion: FINAL_ASSESSMENT_VERSION,
    }),
  )
}

function shuffleArray(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
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

function getModuleContent(moduleItem) {
  const baseContent = Array.isArray(moduleItem.content)
    ? moduleItem.content
    : Array.isArray(moduleItem.lessons)
      ? moduleItem.lessons
      : []

  const normalized = [...baseContent]

  if (moduleItem.video) {
    normalized.push({
      type: 'video',
      title: moduleItem.video.title || 'Videoaula do módulo',
      description:
        moduleItem.video.script ||
        moduleItem.video.description ||
        'Videoaula em preparação. Na versão final, este espaço receberá a videoaula oficial do módulo.',
      duration: moduleItem.video.duration || 'Em preparação',
      status: moduleItem.video.status,
      objectives: moduleItem.video.objectives,
      topics: moduleItem.video.topics,
    })
  }

  const linkItems = moduleItem.links || moduleItem.resources || moduleItem.complementaryLinks || []

  if (Array.isArray(linkItems) && linkItems.length > 0) {
    normalized.push({
      type: 'links',
      title: 'Material complementar',
      items: linkItems,
    })
  }

  if (Array.isArray(moduleItem.checklist) && moduleItem.checklist.length > 0) {
    normalized.push({
      type: 'checklist',
      title: 'Checklist de prevenção',
      items: moduleItem.checklist,
    })
  }

  if (moduleItem.practicalActivity) {
    normalized.push({
      type: 'activity',
      title: moduleItem.practicalActivity.title || 'Atividade prática',
      prompt:
        moduleItem.practicalActivity.description ||
        moduleItem.practicalActivity.prompt ||
        'Atividade prática do módulo.',
      reflection:
        Array.isArray(moduleItem.practicalActivity.steps)
          ? moduleItem.practicalActivity.steps.join(' ')
          : moduleItem.practicalActivity.reflection ||
            'Registre os sinais de alerta, a conduta segura e as evidências que devem ser preservadas.',
    })
  }

  return normalized
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
    finalAssessmentVersion: FINAL_ASSESSMENT_VERSION,
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

  const finalAssessmentVersionMatches =
    loaded.finalAssessmentVersion === FINAL_ASSESSMENT_VERSION
  const finalAssessmentAnswers = finalAssessmentVersionMatches
    ? loaded.finalAssessmentAnswers || {}
    : {}
  const finalAssessmentPassed = finalAssessmentVersionMatches
    ? scoreQuiz(finalAssessment, finalAssessmentAnswers).passed
    : false

  return {
    ...fresh,
    ...loaded,
    moduleState: normalizedModuleState,
    quizVariants: loaded.quizVariants || {},
    finalAssessmentAnswers,
    finalAssessmentVersion: FINAL_ASSESSMENT_VERSION,
    finalAssessmentPassed,
    certificateUnlocked: finalAssessmentPassed,
  }
}

function getResumeTarget(progressState) {
  if (progressState.certificateUnlocked || progressState.finalAssessmentPassed) {
    return { view: 'certificate' }
  }

  const allModulesCompleted = modules.every((moduleItem) => progressState.moduleState[moduleItem.id]?.completed)

  if (allModulesCompleted) {
    return { view: 'final-review' }
  }

  const pendingModule = modules.find((moduleItem) => {
    const state = progressState.moduleState[moduleItem.id]

    return state?.unlocked && !state.completed
  })

  if (!pendingModule) {
    return { view: 'home' }
  }

  const state = progressState.moduleState[pendingModule.id]
  const content = getModuleContent(pendingModule)
  const pendingScreenIndex = content.findIndex((_, index) => !state.contentSeen?.[index])

  if (pendingScreenIndex >= 0) {
    return { view: 'module', moduleId: pendingModule.id, screenIndex: pendingScreenIndex }
  }

  if (!state.videoDone) {
    const videoIndex = content.findIndex((item) => item.type === 'video')

    if (videoIndex >= 0) {
      return { view: 'module', moduleId: pendingModule.id, screenIndex: videoIndex }
    }
  }

  if (!state.activityDone) {
    const activityIndex = content.findIndex((item) => item.type === 'activity')

    if (activityIndex >= 0) {
      return { view: 'module', moduleId: pendingModule.id, screenIndex: activityIndex }
    }
  }

  if (!state.quizPassed) {
    return { view: 'module', moduleId: pendingModule.id, screenIndex: content.length }
  }

  return { view: 'module', moduleId: pendingModule.id, screenIndex: 0 }
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

function ProgressBar({ value, label = 'Progresso' }) {
  return (
    <div
      className="progress-shell"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={label}
    >
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
  const totalScreens = getModuleContent(mod).length

  const completedScreens = state?.contentSeen
    ? Object.values(state.contentSeen).filter(Boolean).length
    : 0

  const quizSource = getQuizSource(mod)
  const totalQuestions = Array.isArray(quizSource) ? Math.min(getQuizSize(mod), quizSource.length) : 0

  const answeredQuestions = state?.quizAnswers
    ? Object.keys(state.quizAnswers).length
    : 0

  const contentProgress = totalScreens > 0
    ? Math.min(completedScreens / totalScreens, 1)
    : 0

  const quizProgress = totalQuestions > 0
    ? Math.min(answeredQuestions / totalQuestions, 1)
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
          const title = normalizeSearchText(block.title)
          const isAlert =
            title.includes('alerta') ||
            title.includes('risco') ||
            title.includes('cuidado') ||
            title.includes('atencao') ||
            title.includes('golpe')

          return (
            <div key={index} className={`ludic-box ${isAlert ? 'scam' : 'expert'}`}>
              <div className="ludic-header">
                <div className="ludic-icon">
                  <CharacterAvatar type={isAlert ? 'radar' : 'siga'} size={36} />
                  <div className="ludic-status-badge">
                    {isAlert ? <AlertTriangle size={12} aria-hidden="true" focusable="false" /> : <Shield size={12} aria-hidden="true" focusable="false" />}
                  </div>
                </div>
                <span className="ludic-title">{block.title || (isAlert ? 'Atenção' : 'Dica')}</span>
              </div>
              <div className="ludic-body">{block.text}</div>
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
              <Icon size={18} aria-hidden="true" focusable="false" />
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
  const [glossaryQuery, setGlossaryQuery] = useState('')
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState('Todos')
  const [libraryQuery, setLibraryQuery] = useState('')
  const [selectedLibrarySource, setSelectedLibrarySource] = useState('Todos')
  const [selectedLibraryType, setSelectedLibraryType] = useState('Todos')
  const [selectedLibraryCategory, setSelectedLibraryCategory] = useState('Todos')
  const [videoQuery, setVideoQuery] = useState('')
  const [selectedVideoSource, setSelectedVideoSource] = useState('Todos')
  const [selectedVideoTheme, setSelectedVideoTheme] = useState('Todos')
  const [selectedVideoModule, setSelectedVideoModule] = useState('Todos')
  const [checklistQuery, setChecklistQuery] = useState('')
  const [selectedChecklistCategory, setSelectedChecklistCategory] = useState('Todos')
  const [selectedChecklistModule, setSelectedChecklistModule] = useState('Todos')
  const [checkedChecklistItems, setCheckedChecklistItems] = useState({})
  const [simulationQuery, setSimulationQuery] = useState('')
  const [selectedSimulationCategory, setSelectedSimulationCategory] = useState('Todos')
  const [selectedSimulationModule, setSelectedSimulationModule] = useState('Todos')
  const [simulationAnswers, setSimulationAnswers] = useState({})

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

  const selectedModuleContent = getModuleContent(selectedModule)
  const currentItem = selectedModuleContent[screenIndex] || selectedModuleContent[0] || null

  const allModulesCompleted = modules.every((m) => progressState.moduleState[m.id]?.completed)
  const activeModuleQuiz = progressState.quizVariants?.[selectedModule.id] || selectedModule.quiz || []
  const moduleQuizResult = scoreQuiz(activeModuleQuiz, selectedModuleState.quizAnswers || {})
  const finalResult = scoreQuiz(finalAssessment, progressState.finalAssessmentAnswers || {})
  const glossaryCategoryOptions = useMemo(() => ['Todos', ...glossaryCategories], [])
  const filteredGlossaryEntries = useMemo(() => {
    const query = normalizeSearchText(glossaryQuery)

    return glossaryEntries.filter((entry) => {
      const matchesCategory =
        selectedGlossaryCategory === 'Todos' || entry.category === selectedGlossaryCategory
      const searchableText = normalizeSearchText(
        `${entry.term} ${entry.category} ${entry.module} ${entry.definition} ${entry.guidance}`,
      )

      return matchesCategory && (!query || searchableText.includes(query))
    })
  }, [glossaryQuery, selectedGlossaryCategory])
  const librarySourceOptions = useMemo(() => ['Todos', ...librarySources], [])
  const libraryTypeOptions = useMemo(() => ['Todos', ...libraryTypes], [])
  const libraryCategoryOptions = useMemo(() => ['Todos', ...libraryCategories], [])
  const videoSourceOptions = useMemo(() => ['Todos', ...videoSources], [])
  const videoThemeOptions = useMemo(() => ['Todos', ...videoThemes], [])
  const videoModuleOptions = useMemo(() => ['Todos', ...videoModules], [])

  const checklistCategoryOptions = useMemo(() => ['Todos', ...checklistCategories], [])
  const checklistModuleOptions = useMemo(() => ['Todos', ...checklistModules], [])

  const simulationCategoryOptions = useMemo(() => ['Todos', ...simulationCategories], [])
  const simulationModuleOptions = useMemo(() => ['Todos', ...simulationModules], [])

  const filteredChecklists = useMemo(() => {
    const query = normalizeSearchText(checklistQuery)

    return practicalChecklists.filter((item) => {
      const matchesCategory =
        selectedChecklistCategory === 'Todos' || item.category === selectedChecklistCategory
      const matchesModule =
        selectedChecklistModule === 'Todos' || item.relatedModule === selectedChecklistModule

      const searchableText = normalizeSearchText(
        `${item.title} ${item.situation} ${item.category} ${item.relatedModule} ${item.description} ${item.items.join(' ')} ${item.finalGuidance}`,
      )

      return matchesCategory && matchesModule && (!query || searchableText.includes(query))
    })
  }, [checklistQuery, selectedChecklistCategory, selectedChecklistModule])

  const filteredSimulations = useMemo(() => {
    const query = normalizeSearchText(simulationQuery)

    return quickSimulations.filter((item) => {
      const matchesCategory =
        selectedSimulationCategory === 'Todos' || item.category === selectedSimulationCategory
      const matchesModule =
        selectedSimulationModule === 'Todos' || item.relatedModule === selectedSimulationModule

      const searchableText = normalizeSearchText(
        `${item.title} ${item.situation} ${item.category} ${item.relatedModule} ${item.scenario} ${item.warningSigns.join(' ')} ${item.finalGuidance}`,
      )

      return matchesCategory && matchesModule && (!query || searchableText.includes(query))
    })
  }, [simulationQuery, selectedSimulationCategory, selectedSimulationModule])

  const filteredLibraryDocuments = useMemo(() => {
    const query = normalizeSearchText(libraryQuery)

    return libraryDocuments.filter((documentItem) => {
      const matchesSource =
        selectedLibrarySource === 'Todos' || documentItem.source === selectedLibrarySource
      const matchesType = selectedLibraryType === 'Todos' || documentItem.type === selectedLibraryType
      const matchesCategory =
        selectedLibraryCategory === 'Todos' || documentItem.category === selectedLibraryCategory
      const searchableText = normalizeSearchText(
        `${documentItem.title} ${documentItem.description} ${documentItem.source} ${documentItem.type} ${documentItem.category} ${documentItem.relatedModule} ${documentItem.url}`,
      )

      return matchesSource && matchesType && matchesCategory && (!query || searchableText.includes(query))
    })
  }, [libraryQuery, selectedLibrarySource, selectedLibraryCategory, selectedLibraryType])

  const filteredVideos = useMemo(() => {
    const query = normalizeSearchText(videoQuery)

    return educationalVideos.filter((videoItem) => {
      const matchesSource =
        selectedVideoSource === 'Todos' || videoItem.source === selectedVideoSource
      const matchesTheme =
        selectedVideoTheme === 'Todos' || videoItem.theme === selectedVideoTheme
      const matchesModule =
        selectedVideoModule === 'Todos' || videoItem.relatedModule === selectedVideoModule

      const searchableText = normalizeSearchText(
        `${videoItem.title} ${videoItem.description} ${videoItem.source} ${videoItem.theme} ${videoItem.relatedModule} ${videoItem.url} ${videoItem.status}`,
      )

      return (
        matchesSource &&
        matchesTheme &&
        matchesModule &&
        (!query || searchableText.includes(query))
      )
    })
  }, [videoQuery, selectedVideoSource, selectedVideoTheme, selectedVideoModule])

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

    const cleanName = participantName.trim()

    if (!cleanName) {
      window.alert('Informe o nome completo do participante antes de emitir o certificado.')
      return
    }

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const issuedAt = new Date()
    const completionDate = formatCertificateDate(issuedAt)
    const verificationCode = createCertificateCode(cleanName, issuedAt, issuedAt.getTime())
    const courseName = courseIntro.title

    doc.setFillColor(248, 247, 244)
    doc.rect(0, 0, 297, 210, 'F')

    doc.setFillColor(255, 255, 255)
    doc.roundedRect(14, 14, 269, 182, 2, 2, 'F')

    doc.setDrawColor(35, 55, 82)
    doc.setLineWidth(1.4)
    doc.rect(10, 10, 277, 190)
    doc.setLineWidth(0.4)
    doc.rect(16, 16, 265, 178)

    doc.setFillColor(35, 55, 82)
    doc.rect(10, 10, 277, 14, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('CIDADÃO DIGITAL SEGURO', 148.5, 19, { align: 'center' })

    doc.setTextColor(35, 55, 82)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(26)
    doc.text('CERTIFICADO DE CONCLUSÃO', 148.5, 43, { align: 'center' })

    doc.setDrawColor(139, 94, 52)
    doc.setLineWidth(0.6)
    doc.line(92, 49, 205, 49)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(13)
    doc.setTextColor(72, 77, 86)
    doc.text('Certificamos que', 148.5, 62, { align: 'center' })

    doc.setFillColor(244, 247, 250)
    doc.roundedRect(42, 69, 213, 22, 1.5, 1.5, 'F')
    doc.setDrawColor(205, 214, 224)
    doc.roundedRect(42, 69, 213, 22, 1.5, 1.5, 'S')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.setTextColor(35, 55, 82)
    doc.text(cleanName.toUpperCase(), 148.5, 83, { align: 'center', maxWidth: 200 })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(13)
    doc.setTextColor(72, 77, 86)
    const lines = doc.splitTextToSize(
      `concluiu com aproveitamento o curso ${courseName}, em formato online autoinstrucional, com carga horária sugerida de ${CERTIFICATE_WORKLOAD}.`,
      220,
    )
    doc.text(lines, 148.5, 105, { align: 'center' })

    doc.setFillColor(250, 249, 247)
    doc.roundedRect(38, 121, 221, 32, 1.5, 1.5, 'F')
    doc.setDrawColor(222, 216, 206)
    doc.roundedRect(38, 121, 221, 32, 1.5, 1.5, 'S')

    doc.setFontSize(10)
    doc.setTextColor(91, 70, 51)
    doc.setFont('helvetica', 'bold')
    doc.text('DADOS DO CERTIFICADO', 148.5, 129, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(72, 77, 86)
    doc.text(`Curso: ${courseName}`, 46, 138, { maxWidth: 120 })
    doc.text(`Carga horária sugerida: ${CERTIFICATE_WORKLOAD}`, 46, 146)
    doc.text(`Data de conclusão: ${completionDate}`, 164, 138)
    doc.text('Status: aprovado', 164, 146)
    doc.text(`Versão do curso: ${COURSE_VERSION}`, 46, 154)
    doc.text(`Código verificador: ${verificationCode}`, 164, 154)

    doc.setDrawColor(139, 94, 52)
    doc.line(95, 171, 202, 171)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(35, 55, 82)
    doc.text('Cidadão Digital Seguro', 148.5, 178, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(100, 104, 112)
    doc.text('Certificação digital gerada pela aplicação do curso', 148.5, 185, { align: 'center' })
    doc.text(`Emitido em ${completionDate}. Validação local pelo código ${verificationCode}.`, 148.5, 191, {
      align: 'center',
    })

    const fileName = `certificado-cidadao-digital-seguro-${cleanName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/gi, '-')}.pdf`

    doc.save(fileName)
  }

  function startCourse() {
    if (progressState.started) {
      const target = getResumeTarget(progressState)

      setCurrentView(target.view)

      if (target.moduleId) {
        setSelectedModuleId(target.moduleId)
      }

      if (typeof target.screenIndex === 'number') {
        setScreenIndex(target.screenIndex)
      } else {
        setScreenIndex(0)
      }

      return
    }

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

  function completeCurrentStepAndAdvance() {
    setProgressState((prev) => {
      const currentModuleState = prev.moduleState[selectedModule.id]

      return {
        ...prev,
        moduleState: {
          ...prev.moduleState,
          [selectedModule.id]: {
            ...currentModuleState,
            contentSeen: {
              ...currentModuleState.contentSeen,
              [screenIndex]: true,
            },
            videoDone:
              currentItem?.type === 'video'
                ? true
                : currentModuleState.videoDone,
            activityDone:
              currentItem?.type === 'activity'
                ? true
                : currentModuleState.activityDone,
          },
        },
      }
    })

    setScreenIndex((s) => Math.min(selectedModuleContent.length, s + 1))
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
        finalAssessmentVersion: FINAL_ASSESSMENT_VERSION,
        finalAssessmentPassed: result.passed,
        certificateUnlocked: result.passed,
      }
    })
  }

  function toggleCheckedChecklistItem(checklistId, itemIndex) {
    setCheckedChecklistItems((prev) => {
      const currentChecklist = prev[checklistId] || {}

      return {
        ...prev,
        [checklistId]: {
          ...currentChecklist,
          [itemIndex]: !currentChecklist[itemIndex],
        },
      }
    })
  }

  function clearChecklist(checklistId) {
    setCheckedChecklistItems((prev) => {
      const next = { ...prev }
      delete next[checklistId]

      return next
    })
  }

  function resetCourse() {
    const shouldReset = window.confirm(
      'Tem certeza de que deseja reiniciar o curso? Essa ação apagará o progresso dos módulos, respostas, avaliação final e dados do certificado salvos neste dispositivo.',
    )

    if (!shouldReset) return

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
            <Shield size={14} aria-hidden="true" focusable="false" /> Curso online com progressão por conclusão de atividades
          </div>
          <h1>{courseIntro.title}</h1>
          <p className="subtitle">{courseIntro.subtitle}</p>
        </div>

        <div className="top-actions">
          <button className="button button-outline" onClick={goHome}>
            <Home size={16} aria-hidden="true" focusable="false" /> Início
          </button>
          <button className="button button-outline" onClick={() => setCurrentView('glossary')}>
            <BookOpen size={16} aria-hidden="true" focusable="false" /> Glossário
          </button>
          <button className="button button-outline" onClick={() => setCurrentView('library')}>
            <FileText size={16} aria-hidden="true" focusable="false" /> Biblioteca
          </button>
          <button className="button button-outline" onClick={() => setCurrentView('videos')}>
            <PlayCircle size={16} aria-hidden="true" focusable="false" /> Vídeos
          </button>
          <button className="button button-outline" onClick={() => setCurrentView('checklists')}>
            <ListChecks size={16} aria-hidden="true" focusable="false" /> Checklists
          </button>
          <button className="button button-outline" onClick={() => setCurrentView('simulations')}>
            <MessageSquare size={16} aria-hidden="true" focusable="false" /> Simulações
          </button>
          <button className="button button-outline" onClick={resetCourse}>
            <RotateCcw size={16} aria-hidden="true" focusable="false" /> Reiniciar
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
                const moduleStatusLabel = state.completed
                  ? 'Concluído'
                  : state.unlocked
                    ? 'Disponível'
                    : `Bloqueado. ${MODULE_LOCKED_MESSAGE}`

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
                    aria-label={`Módulo ${idx + 1}: ${m.shortTitle}. ${moduleStatusLabel}`}
                  >
                    <div className="module-chip-head">
                      <div className="module-chip-left">
                        <div className="icon-box small">
                          <Icon size={16} aria-hidden="true" focusable="false" />
                        </div>
                        <div>
                          <div className="mini-muted">Etapa {idx + 1}</div>
                          <div className="module-chip-title">{m.shortTitle}</div>
                        </div>
                      </div>
                      {state.completed ? <CheckCircle2 className="success-icon" size={18} aria-hidden="true" focusable="false" /> : null}
                    </div>
                    <ModuleProgress mod={m} state={state} />
                    {!state.unlocked ? <div className="mini-muted">{MODULE_LOCKED_MESSAGE}</div> : null}
                  </button>
                )
              })}

              <div className="final-box">
                <div className="final-box-head">
                  <span>Avaliação final</span>
                  {progressState.finalAssessmentPassed ? (
                    <CheckCircle2 className="success-icon" size={18} aria-hidden="true" focusable="false" />
                  ) : null}
                </div>

                <ProgressBar
                  value={finalResult.passed ? 100 : Math.round((finalResult.correct / finalResult.total) * 100) || 0}
                />

                <button
                  className="button full"
                  disabled={!allModulesCompleted}
                  onClick={() => setCurrentView('final-review')}
                  aria-label={allModulesCompleted ? 'Ir para a etapa final' : `Avaliação final bloqueada. ${FINAL_ASSESSMENT_LOCKED_MESSAGE}`}
                >
                  Ir para a etapa final
                </button>
                {!allModulesCompleted ? <div className="mini-muted">{FINAL_ASSESSMENT_LOCKED_MESSAGE}</div> : null}
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
                    {progressState.started ? 'Continuar curso' : 'Começar agora'} <ChevronRight size={16} aria-hidden="true" focusable="false" />
                  </button>
                  <button className="button button-outline" onClick={() => setCurrentView('structure')}>
                    Como funciona a trilha
                  </button>
                  <button className="button button-outline" onClick={() => setCurrentView('glossary')}>
                    Consultar glossário
                  </button>
                  <button className="button button-outline" onClick={() => setCurrentView('library')}>
                    Ver biblioteca
                  </button>
                  <button className="button button-outline" onClick={() => setCurrentView('videos')}>
                    Vídeos educativos
                  </button>
                  <button className="button button-outline" onClick={() => setCurrentView('simulations')}>
                    Simulações rápidas
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

                <Card>
                  <div className="card-header">
                    <h2>Glossário</h2>
                  </div>
                  <div className="card-body muted-body">
                    Termos essenciais ficam disponíveis para consulta durante todo o curso, sem afetar a progressão dos módulos.
                  </div>
                </Card>

                <Card>
                  <div className="card-header">
                    <h2>Biblioteca</h2>
                  </div>
                  <div className="card-body muted-body">
                    Documentos públicos oficiais ficam reunidos em área transversal, separados da trilha principal.
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {currentView === 'glossary' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Glossário" icon={BookOpen}>
                <p className="muted-body">
                  Consulte termos e conceitos essenciais sobre segurança digital em linguagem simples e orientada à ação. Use a busca ou os filtros por categoria para navegar.
                </p>

                <div className="glossary-controls">
                  <div className="search-field">
                    <Search size={18} aria-hidden="true" focusable="false" />
                    <input
                      className="text-input glossary-search"
                      type="search"
                      value={glossaryQuery}
                      onChange={(event) => setGlossaryQuery(event.target.value)}
                      placeholder="Buscar termo, orientação ou módulo"
                      aria-label="Buscar termo no glossário"
                    />
                  </div>

                  <nav className="filter-row" aria-label="Filtrar glossário por categoria">
                    {glossaryCategoryOptions.map((category) => (
                      <button
                        key={category}
                        type="button"
                        className={`filter-chip ${selectedGlossaryCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedGlossaryCategory(category)}
                        aria-pressed={selectedGlossaryCategory === category}
                      >
                        {category}
                      </button>
                    ))}
                  </nav>

                  <div className="muted-small" aria-live="polite">
                    {filteredGlossaryEntries.length} de {glossaryEntries.length} termos exibidos.
                  </div>
                </div>

                {filteredGlossaryEntries.length > 0 ? (
                  <div className="resource-grid">
                    {filteredGlossaryEntries.map((entry) => (
                      <article key={entry.term} className="resource-card">
                        <div className="resource-card-head">
                          <h3>{entry.term}</h3>
                          <span className="tag">{entry.module}</span>
                        </div>
                        <div className="mini-muted">{entry.category}</div>
                        <div className="resource-card-body">
                          <p className="muted-body">{entry.definition}</p>
                        </div>
                        {entry.guidance ? (
                          <div className="ludic-box expert glossary-tip" style={{ padding: '16px', margin: '0' }}>
                            <div className="ludic-header">
                              <div className="ludic-icon" style={{ width: '32px', height: '32px' }}>
                                <CharacterAvatar type="siga" size={24} />
                                <div className="ludic-status-badge">
                                  <Shield size={10} aria-hidden="true" focusable="false" />
                                </div>
                              </div>
                              <span className="ludic-title" style={{ fontSize: '0.75rem' }}>Orientação prática</span>
                            </div>
                            <div className="ludic-body" style={{ fontSize: '0.875rem' }}>{entry.guidance}</div>
                          </div>
                        ) : null}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="info-box muted-body">
                    Nenhum termo encontrado para a busca ou categoria selecionada.
                  </div>
                )}
              </ScreenCard>
            </motion.div>
          )}

          {currentView === 'library' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Biblioteca de documentos públicos" icon={FileText}>
                <p className="muted-body">
                  Consulte materiais oficiais e públicos usados como apoio ao curso. A biblioteca é transversal e não interfere na progressão dos módulos.
                </p>

                <div className="glossary-controls">
                  <div className="search-field">
                    <Search size={18} aria-hidden="true" focusable="false" />
                    <input
                      className="text-input glossary-search"
                      type="search"
                      value={libraryQuery}
                      onChange={(event) => setLibraryQuery(event.target.value)}
                      placeholder="Buscar título, fonte, tema, módulo ou URL"
                      aria-label="Buscar documento na biblioteca"
                    />
                  </div>

                  <div className="library-filter-grid">
                    <label className="stack-sm">
                      <span className="mini-muted">Fonte</span>
                      <select
                        className="text-input"
                        value={selectedLibrarySource}
                        onChange={(event) => setSelectedLibrarySource(event.target.value)}
                        aria-label="Filtrar por fonte"
                      >
                        {librarySourceOptions.map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="stack-sm">
                      <span className="mini-muted">Tipo</span>
                      <select
                        className="text-input"
                        value={selectedLibraryType}
                        onChange={(event) => setSelectedLibraryType(event.target.value)}
                        aria-label="Filtrar por tipo de material"
                      >
                        {libraryTypeOptions.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="stack-sm">
                      <span className="mini-muted">Categoria</span>
                      <select
                        className="text-input"
                        value={selectedLibraryCategory}
                        onChange={(event) => setSelectedLibraryCategory(event.target.value)}
                        aria-label="Filtrar por categoria"
                      >
                        {libraryCategoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="muted-small" aria-live="polite">
                    {filteredLibraryDocuments.length} de {libraryDocuments.length} documentos exibidos.
                  </div>
                </div>

                {filteredLibraryDocuments.length > 0 ? (
                  <div className="resource-grid">
                    {filteredLibraryDocuments.map((documentItem) => (
                      <article key={documentItem.url} className="resource-card">
                        <div className="resource-card-head">
                          <h3>{documentItem.title}</h3>
                          <span className="tag" aria-label={`Tipo: ${documentItem.type}`}>{documentItem.type}</span>
                        </div>

                        <div className="resource-card-body">
                          <p className="muted-body">{documentItem.description}</p>
                        </div>

                        <div className="resource-card-meta">
                          <span className="resource-meta-chip">Fonte: {documentItem.source}</span>
                          <span className="resource-meta-chip">Categoria: {documentItem.category}</span>
                          <span className="resource-meta-chip">{documentItem.relatedModule}</span>
                        </div>

                        <a
                          href={documentItem.url}
                          target="_blank"
                          rel="noreferrer"
                          className="button button-outline full"
                          aria-label={`Abrir documento ${documentItem.title} em nova aba (material externo)`}
                        >
                          Abrir documento <ExternalLink size={16} aria-hidden="true" focusable="false" />
                        </a>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="info-box muted-body" role="alert">
                    Nenhum documento encontrado para a busca ou filtros selecionados.
                  </div>
                )}
              </ScreenCard>
            </motion.div>
          )}

          {currentView === 'videos' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Vídeos educativos" icon={PlayCircle}>
                <p className="muted-body">
                  Assista a vídeos complementares sobre segurança digital. Estes vídeos são materiais de apoio transversal e não substituem as videoaulas obrigatórias de cada módulo.
                </p>

                <div className="glossary-controls">
                  <div className="search-field">
                    <Search size={18} aria-hidden="true" focusable="false" />
                    <input
                      className="text-input glossary-search"
                      type="search"
                      value={videoQuery}
                      onChange={(event) => setVideoQuery(event.target.value)}
                      placeholder="Buscar título, descrição, fonte ou tema"
                      aria-label="Buscar vídeo educativo"
                    />
                  </div>

                  <div className="library-filter-grid">
                    <label className="stack-sm">
                      <span className="mini-muted">Módulo relacionado</span>
                      <select
                        className="text-input"
                        value={selectedVideoModule}
                        onChange={(event) => setSelectedVideoModule(event.target.value)}
                        aria-label="Filtrar por módulo relacionado"
                      >
                        {videoModuleOptions.map((mod) => (
                          <option key={mod} value={mod}>
                            {mod}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="stack-sm">
                      <span className="mini-muted">Fonte</span>
                      <select
                        className="text-input"
                        value={selectedVideoSource}
                        onChange={(event) => setSelectedVideoSource(event.target.value)}
                        aria-label="Filtrar por fonte do vídeo"
                      >
                        {videoSourceOptions.map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="stack-sm">
                      <span className="mini-muted">Tema</span>
                      <select
                        className="text-input"
                        value={selectedVideoTheme}
                        onChange={(event) => setSelectedVideoTheme(event.target.value)}
                        aria-label="Filtrar por tema do vídeo"
                      >
                        {videoThemeOptions.map((theme) => (
                          <option key={theme} value={theme}>
                            {theme}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="muted-small" aria-live="polite">
                    {filteredVideos.length} de {educationalVideos.length} vídeos exibidos.
                  </div>
                </div>

                {filteredVideos.length > 0 ? (
                  <div className="resource-grid">
                    {filteredVideos.map((videoItem) => (
                      <article key={videoItem.title} className="resource-card">
                        <div className="resource-card-head">
                          <h3>{videoItem.title}</h3>
                          <span className={`tag ${videoItem.status === 'Disponível' ? '' : 'muted'}`} aria-label={`Status: ${videoItem.status}`}>
                            {videoItem.status}
                          </span>
                        </div>

                        <div className="resource-card-body">
                          <p className="muted-body">{videoItem.description}</p>
                        </div>

                        <div className="resource-card-meta">
                          <span className="resource-meta-chip">Fonte: {videoItem.source}</span>
                          <span className="resource-meta-chip">Tema: {videoItem.theme}</span>
                          {videoItem.type && <span className="resource-meta-chip">{videoItem.type}</span>}
                          {videoItem.duration && <span className="resource-meta-chip">Duração: {videoItem.duration}</span>}
                          <span className="resource-meta-chip">{videoItem.relatedModule}</span>
                        </div>

                        {videoItem.status === 'Disponível' && videoItem.url ? (
                          <a
                            href={videoItem.url}
                            target="_blank"
                            rel="noreferrer"
                            className="button button-outline full"
                            aria-label={`Assistir vídeo ${videoItem.title} em nova aba (material externo)`}
                          >
                            Assistir vídeo <ExternalLink size={16} aria-hidden="true" focusable="false" />
                          </a>
                        ) : (
                          <div className="info-box muted-body" style={{ margin: 0 }} role="status">
                            <PlayCircle size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} aria-hidden="true" focusable="false" />
                            Vídeo em produção ou URL não disponível publicamente.
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="info-box muted-body" role="alert">
                    Nenhum vídeo encontrado para a busca ou filtros selecionados.
                  </div>
                )}
              </ScreenCard>
            </motion.div>
          )}

          {currentView === 'checklists' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Checklists Interativos" icon={ListChecks}>
                <p className="muted-body">
                  Listas práticas para orientar sua conduta em situações comuns de segurança digital. Use como guia rápido para identificar riscos e agir corretamente.
                </p>

                <div className="glossary-controls">
                  <div className="search-field">
                    <Search size={18} aria-hidden="true" focusable="false" />
                    <input
                      className="text-input glossary-search"
                      type="search"
                      value={checklistQuery}
                      onChange={(event) => setChecklistQuery(event.target.value)}
                      placeholder="Buscar situação, categoria ou item"
                      aria-label="Buscar checklist"
                    />
                  </div>

                  <div className="library-filter-grid">
                    <label className="stack-sm">
                      <span className="mini-muted">Categoria</span>
                      <select
                        className="text-input"
                        value={selectedChecklistCategory}
                        onChange={(event) => setSelectedChecklistCategory(event.target.value)}
                        aria-label="Filtrar por categoria do checklist"
                      >
                        {checklistCategoryOptions.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="stack-sm">
                      <span className="mini-muted">Módulo</span>
                      <select
                        className="text-input"
                        value={selectedChecklistModule}
                        onChange={(event) => setSelectedChecklistModule(event.target.value)}
                        aria-label="Filtrar por módulo relacionado"
                      >
                        {checklistModuleOptions.map((mod) => (
                          <option key={mod} value={mod}>
                            {mod}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="muted-small" aria-live="polite">
                    {filteredChecklists.length} de {practicalChecklists.length} checklists exibidos.
                  </div>
                </div>

                {filteredChecklists.length > 0 ? (
                  <div className="resource-grid">
                    {filteredChecklists.map((checklist) => {
                      const checkedItems = checkedChecklistItems[checklist.id] || {}
                      const checkedCount = Object.values(checkedItems).filter(Boolean).length
                      const totalItems = checklist.items.length
                      const progress = Math.round((checkedCount / totalItems) * 100)

                      return (
                        <article key={checklist.id} className="resource-card">
                          <div className="resource-card-head">
                            <h3>{checklist.title}</h3>
                            <span className="tag" aria-label={`Categoria: ${checklist.category}`}>{checklist.category}</span>
                          </div>

                          <div className="info-box" style={{ padding: '12px' }}>
                            <div className="mini-muted">Situação:</div>
                            <div className="muted-body" style={{ fontStyle: 'italic', fontSize: '0.875rem' }}>{checklist.situation}</div>
                          </div>

                          <div className="resource-card-body">
                            <p className="muted-body" style={{ marginBottom: '12px' }}>{checklist.description}</p>
                            <fieldset className="stack-sm" style={{ border: 'none', padding: 0, margin: 0 }}>
                              <legend className="sr-only">Itens do checklist: {checklist.title}</legend>
                              {checklist.items.map((item, idx) => (
                                <label key={idx} className="checklist-item-row" style={{ opacity: checkedItems[idx] ? 0.6 : 1 }}>
                                  <input
                                    type="checkbox"
                                    checked={!!checkedItems[idx]}
                                    onChange={() => toggleCheckedChecklistItem(checklist.id, idx)}
                                    aria-label={item}
                                  />
                                  <span style={{ textDecoration: checkedItems[idx] ? 'line-through' : 'none', fontSize: '0.9rem' }}>
                                    {item}
                                  </span>
                                </label>
                              ))}
                            </fieldset>
                          </div>

                          <div className="ludic-box expert" style={{ padding: '12px', margin: '0' }}>
                            <div className="ludic-header">
                              <Shield size={14} className="success-icon" aria-hidden="true" focusable="false" />
                              <span className="ludic-title" style={{ fontSize: '0.75rem' }}>Orientação final</span>
                            </div>
                            <div className="ludic-body" style={{ fontSize: '0.8125rem' }}>{checklist.finalGuidance}</div>
                          </div>

                          <div className="checklist-progress-container">
                            <div className="actions-between" style={{ marginBottom: '8px' }}>
                              <span className="mini-muted" aria-live="polite">
                                {checkedCount} de {totalItems} concluídos ({progress}%)
                              </span>
                              <button
                                className="button button-outline"
                                style={{ padding: '4px 8px', fontSize: '0.7rem', height: 'auto' }}
                                onClick={() => clearChecklist(checklist.id)}
                                disabled={checkedCount === 0}
                                aria-label={`Limpar checklist: ${checklist.title}`}
                              >
                                <RotateCcw size={12} aria-hidden="true" focusable="false" /> Limpar
                              </button>
                            </div>
                            <ProgressBar
                              value={progress}
                              label={`Progresso do checklist ${checklist.title}: ${checkedCount} de ${totalItems} concluídos`}
                            />
                          </div>
                          
                          <div className="mini-muted">
                            Relacionado ao {checklist.relatedModule}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ) : (
                  <div className="info-box muted-body" role="alert">
                    Nenhum checklist encontrado para a busca ou filtros selecionados.
                  </div>
                )}
              </ScreenCard>
            </motion.div>
          )}

          {currentView === 'simulations' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Simulações Rápidas" icon={MessageSquare}>
                <p className="muted-body">
                  <strong>Você identificaria o golpe?</strong> Treine sua tomada de decisão diante de situações reais de risco digital. Escolha a melhor conduta e receba orientações do especialista.
                </p>

                <div className="glossary-controls">
                  <div className="search-field">
                    <Search size={18} aria-hidden="true" focusable="false" />
                    <input
                      className="text-input glossary-search"
                      type="search"
                      value={simulationQuery}
                      onChange={(event) => setSimulationQuery(event.target.value)}
                      placeholder="Buscar título, situação ou categoria"
                      aria-label="Buscar simulação"
                    />
                  </div>

                  <div className="library-filter-grid">
                    <label className="stack-sm">
                      <span className="mini-muted">Categoria</span>
                      <select
                        className="text-input"
                        value={selectedSimulationCategory}
                        onChange={(event) => setSelectedSimulationCategory(event.target.value)}
                        aria-label="Filtrar por categoria da simulação"
                      >
                        {simulationCategoryOptions.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="stack-sm">
                      <span className="mini-muted">Módulo</span>
                      <select
                        className="text-input"
                        value={selectedSimulationModule}
                        onChange={(event) => setSelectedSimulationModule(event.target.value)}
                        aria-label="Filtrar por módulo relacionado"
                      >
                        {simulationModuleOptions.map((mod) => (
                          <option key={mod} value={mod}>
                            {mod}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="muted-small" aria-live="polite">
                    {filteredSimulations.length} de {quickSimulations.length} simulações exibidas.
                  </div>
                </div>

                {filteredSimulations.length > 0 ? (
                  <div className="resource-grid">
                    {filteredSimulations.map((sim) => {
                      const selectedOptionIndex = simulationAnswers[sim.id]
                      const hasAnswered = typeof selectedOptionIndex === 'number'
                      const isCorrect = hasAnswered && sim.options[selectedOptionIndex].isCorrect

                      return (
                        <article key={sim.id} className="resource-card">
                          <div className="resource-card-head">
                            <h3>{sim.title}</h3>
                            <span className="tag" aria-label={`Categoria: ${sim.category}`}>{sim.category}</span>
                          </div>

                          <div className="info-box" style={{ padding: '12px' }}>
                            <div className="mini-muted">Situação:</div>
                            <div className="muted-body" style={{ fontStyle: 'italic', fontSize: '0.875rem' }}>{sim.situation}</div>
                          </div>

                          <div className="ludic-box scam simulation-scenario">
                            <div className="ludic-header">
                              <AlertTriangle size={14} className="error-icon" aria-hidden="true" focusable="false" />
                              <span className="ludic-title" style={{ fontSize: '0.75rem' }}>Cenário simulado</span>
                            </div>
                            <div className="ludic-body" aria-label={`Cenário: ${sim.scenario}`}>
                              "{sim.scenario}"
                            </div>
                          </div>

                          <div className="resource-card-body">
                            {!hasAnswered ? (
                              <nav className="stack-sm" aria-label={`Opções de resposta para: ${sim.title}`}>
                                <div className="mini-muted" id={`label-options-${sim.id}`}>O que você faria?</div>
                                {sim.options.map((opt, idx) => (
                                  <button
                                    key={idx}
                                    className="button button-outline interactive-option-btn full"
                                    onClick={() => setSimulationAnswers(prev => ({ ...prev, [sim.id]: idx }))}
                                    aria-labelledby={`label-options-${sim.id}`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </nav>
                            ) : (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stack-md" role="region" aria-live="polite">
                                <div className={`info-box ${isCorrect ? 'success' : 'error'}`} style={{ borderLeftWidth: '4px' }}>
                                  <div className="ludic-header" style={{ marginBottom: '8px' }}>
                                    {isCorrect ? <CheckCircle2 size={18} className="success-icon" aria-hidden="true" focusable="false" /> : <XCircle size={18} className="error-icon" aria-hidden="true" focusable="false" />}
                                    <span className="ludic-title" style={{ fontSize: '0.875rem' }}>
                                      {isCorrect ? 'Conduta Segura!' : 'Risco Identificado'}
                                    </span>
                                  </div>
                                  <div className="muted-body" style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
                                    {sim.options[selectedOptionIndex].feedback}
                                  </div>
                                </div>

                                <div className="info-box" style={{ padding: '12px' }}>
                                  <div className="ludic-header" style={{ marginBottom: '8px' }}>
                                    <AlertOctagon size={16} className="error-icon" aria-hidden="true" focusable="false" />
                                    <span className="ludic-title" style={{ fontSize: '0.75rem' }}>Sinais de alerta</span>
                                  </div>
                                  <ul className="warning-signs-list">
                                    {sim.warningSigns.map(tag => (
                                      <li key={tag} className="tag muted" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{tag}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="ludic-box expert" style={{ padding: '12px', margin: '0' }}>
                                  <div className="ludic-header">
                                    <Shield size={14} className="success-icon" aria-hidden="true" focusable="false" />
                                    <span className="ludic-title" style={{ fontSize: '0.75rem' }}>Dica do Especialista</span>
                                  </div>
                                  <div className="ludic-body" style={{ fontSize: '0.8125rem' }}>{sim.finalGuidance}</div>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <div className="actions-between" style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                            <div className="mini-muted" style={{ fontSize: '0.7rem' }}>Relacionado ao {sim.relatedModule}</div>
                            {hasAnswered && (
                              <button
                                className="button button-outline"
                                style={{ padding: '4px 8px', fontSize: '0.7rem', height: 'auto' }}
                                onClick={() => setSimulationAnswers(prev => {
                                  const next = { ...prev }
                                  delete next[sim.id]
                                  return next
                                })}
                                aria-label={`Tentar novamente simulação: ${sim.title}`}
                              >
                                <RotateCcw size={12} aria-hidden="true" focusable="false" /> Tentar novamente
                              </button>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ) : (
                  <div className="info-box muted-body" role="alert">
                    Nenhuma simulação encontrada para a busca ou filtros selecionados.
                  </div>
                )}
              </ScreenCard>
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
                    <div>Material complementar</div>
                    <div>Checklist</div>
                    <div>Atividade prática</div>
                    <div>Quiz do módulo</div>
                  </div>
                </div>

                <div className="info-box">
                  <h3>Regras de desbloqueio</h3>
                  <div className="line-list">
                    <div>Ao clicar em Próxima etapa, a leitura da tela atual é registrada automaticamente</div>
                    <div>O quiz do módulo exige aproveitamento mínimo de 70%</div>
                    <div>A videoaula, a atividade prática e o quiz são obrigatórios para conclusão do módulo</div>
                    <div>A avaliação final só abre após todos os módulos disponíveis serem concluídos</div>
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
                  
                  {currentItem.type === 'tip' && (
                    <div className="ludic-box expert">
                      <div className="ludic-header">
                        <div className="ludic-icon">
                          <CharacterAvatar type="siga" size={36} />
                          <div className="ludic-status-badge">
                            <Shield size={12} aria-hidden="true" focusable="false" />
                          </div>
                        </div>
                        <span className="ludic-title">{currentItem.title || 'Palavra do Especialista'}</span>
                      </div>
                      <div className="ludic-body">{currentItem.text}</div>
                    </div>
                  )}

                  {currentItem.type === 'scam' && (
                    <div className="ludic-box scam">
                      <div className="ludic-header">
                        <div className="ludic-icon">
                          <CharacterAvatar type="radar" size={36} />
                          <div className="ludic-status-badge">
                            <AlertTriangle size={12} aria-hidden="true" focusable="false" />
                          </div>
                        </div>
                        <span className="ludic-title">{currentItem.title || 'Momento É Golpe!'}</span>
                      </div>
                      <div className="ludic-body">{currentItem.text}</div>
                    </div>
                  )}

                  {currentItem.type === 'video' && (
                    <div className="stack-md">
                      <div className="video-box">
                        <PlayCircle size={42} aria-hidden="true" focusable="false" />
                        <div className="video-title">{currentItem.title}</div>
                        <div className="muted-small">Duração sugerida: {currentItem.duration}</div>
                      </div>

                      {currentItem.status ? (
                        <div className="tags-row">
                          <SectionTag>Status: {currentItem.status}</SectionTag>
                        </div>
                      ) : null}

                      <div className="info-box video-detail-box video-script-box">
                        <div className="link-card-title">Roteiro preliminar</div>
                        <p className="muted-body">{currentItem.description}</p>
                      </div>

                      {Array.isArray(currentItem.objectives) && currentItem.objectives.length > 0 ? (
                        <div className="info-box video-detail-box">
                          <div className="link-card-title">Objetivos da videoaula</div>
                          <ul className="muted-body">
                            {currentItem.objectives.map((objective) => (
                              <li key={objective}>{objective}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {Array.isArray(currentItem.topics) && currentItem.topics.length > 0 ? (
                        <div className="info-box video-detail-box">
                          <div className="link-card-title">Tópicos abordados</div>
                          <ul className="muted-body">
                            {currentItem.topics.map((topic) => (
                              <li key={topic}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      <button
                        className="button video-complete-button"
                        onClick={() => {
                          setVideoDone()
                          markSeen(screenIndex)
                        }}
                      >
                        Registrar videoaula como assistida
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
                        Registrar atividade como concluída
                      </button>
                    </div>
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
                      onClick={completeCurrentStepAndAdvance}
                    >
                      Registrar tela e avançar
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
                      Refazer quiz do módulo
                    </button>

                    <button
                      className="button"
                      disabled={!(selectedModuleState.activityDone && selectedModuleState.videoDone && moduleQuizResult.passed)}
                      onClick={completeModule}
                    >
                      {modules.findIndex((m) => m.id === selectedModule.id) === modules.length - 1
                        ? 'Ir para a revisão final'
                        : 'Concluir módulo e liberar próximo módulo'}
                    </button>
                  </div>

                  {!selectedModuleState.activityDone || !selectedModuleState.videoDone ? (
                    <div className="warning-text">
                      Para concluir o módulo, registre a videoaula e conclua a atividade prática.
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
                  Você concluiu todos os módulos. Revise o percurso antes de iniciar a avaliação final integradora.
                </p>

                <div className="grid-2">
                  {modules.map((m) => (
                    <div key={m.id} className="info-box">
                      <div className="link-card-title">{m.shortTitle}</div>
                      <div className="muted-small">{m.goal || m.subtitle || m.summary}</div>
                    </div>
                  ))}
                </div>

                <button className="button" onClick={() => setCurrentView('final-assessment')}>
                  Iniciar avaliação final integradora
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
                  <div className="muted-small">
                    Preencha o nome do participante abaixo para emitir o certificado em PDF.
                  </div>
                </div>

                <div className="tabs-grid">
                  <div className="info-box">
                    <div className="link-card-title">Emitir certificado</div>
                    <div className="line-list">
                      <div>Curso: Cidadão Digital Seguro — Prevenção e Combate a Crimes Cibernéticos</div>
                      <div>Carga horária sugerida: 12 a 18 horas</div>
                      <div>Status: concluído com aproveitamento</div>
                    </div>

                    <p className="muted-body">
                      Digite o nome completo exatamente como deve aparecer no certificado e clique em “Baixar certificado em PDF”. O documento será gerado no navegador com data de conclusão, versão do curso e código verificador.
                    </p>

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
