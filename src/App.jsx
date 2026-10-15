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
  GraduationCap,
  Lock,
  LogOut,
} from 'lucide-react'

import { courseIntro } from './content/courseIntro'
import { modules } from './content/modules'
import { glossaryCategories, glossaryEntries } from './content/glossary'
import { libraryDocuments, librarySources, libraryCategories, libraryTypes } from './content/library'
import { educationalVideos, videoModules, videoSources, videoThemes } from './content/videos'
import { videoLibrary } from './content/videoLibrary'
import { practicalChecklists, checklistCategories, checklistModules } from './content/checklists'
import { quickSimulations, simulationCategories, simulationModules } from './content/simulations'
import { moduloMultiplicador } from './content/moduloMultiplicador'
import { supabase, validarCertificado, registrarCertificadoEmitido } from './lib/supabaseClient'
import { AcessoCurso } from './components/AcessoCurso'
import {
  carregarModulosConcluidos,
  carregarSituacaoFinal,
  concluirModuloNoServidor,
  enviarQuizFinal,
  iniciarQuizFinal,
  mensagemDeErroServidor,
  responderQuestaoModulo,
  responderQuestaoMultiplicador,
  sortearQuestoesModulo,
  sortearQuestoesMultiplicador,
} from './lib/cursoServidor'
import { CharacterAvatar } from './components/CharacterAvatar'
import { ScamAlertBlock, SpecialistWordBlock, LudicTransition } from './components/LudicBlocks'
import packageInfo from '../package.json'

// Progresso dos módulos vem do servidor (concluir_modulo / progresso_modulos). No navegador fica só um
// cache de tela, por usuário, com as etapas lidas e os checks de atividade. O progresso local antigo
// (v2, sem conta) é descartado.
const STORAGE_KEY_ANTIGA = 'cidadao-digital-seguro-progress-v2'
const CACHE_TELA_PREFIXO = 'cds-cache-tela-v1:'
const COURSE_VERSION = packageInfo.version
const CERTIFICATE_WORKLOAD = '12 a 18 horas'
// Limite de tentativas da avaliação final: mesmo valor da RPC iniciar_quiz_final (2 tentativas).
const TENTATIVAS_FINAL_MAX = 2
// Views que exigem sessão (módulos, revisão, avaliação final e certificado). Glossário, biblioteca,
// vídeos, checklists, simulações e multiplicadores continuam públicos.
const PRIVATE_VIEWS = ['module', 'final-review', 'final-assessment', 'certificate']
const MODULE_LOCKED_MESSAGE = 'Conclua o módulo anterior para liberar esta etapa.'
const FINAL_ASSESSMENT_LOCKED_MESSAGE = 'Conclua todos os módulos para liberar a avaliação final.'

function formatCertificateDate(date) {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function lerCacheTela(userId) {
  try {
    const raw = window.localStorage.getItem(`${CACHE_TELA_PREFIXO}${userId}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function gravarCacheTela(userId, progress) {
  try {
    window.localStorage.setItem(
      `${CACHE_TELA_PREFIXO}${userId}`,
      JSON.stringify({
        started: !!progress.started,
        moduleState: Object.fromEntries(
          modules.map((m) => [
            m.id,
            {
              contentSeen: progress.moduleState[m.id]?.contentSeen || {},
              checklist: progress.moduleState[m.id]?.checklist || {},
              activityDone: !!progress.moduleState[m.id]?.activityDone,
              videoDone: !!progress.moduleState[m.id]?.videoDone,
            },
          ]),
        ),
      }),
    )
  } catch {
    // Cache de tela: a falha não deve impedir o uso do curso.
  }
}

function removerCacheTela(userId) {
  try {
    window.localStorage.removeItem(`${CACHE_TELA_PREFIXO}${userId}`)
  } catch {
    // Mesmo critério do cache de tela.
  }
}

function descartarProgressoAntigo() {
  try {
    window.localStorage.removeItem(STORAGE_KEY_ANTIGA)
  } catch {
    // Sem acesso ao armazenamento local, não há nada a descartar.
  }
}

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function getVideoPriorityLabel(priority) {
  const map = {
    high: 'Alta prioridade',
    medium: 'Prioridade média',
    low: 'Baixa prioridade',
    High: 'Alta prioridade',
    Medium: 'Prioridade média',
    Low: 'Baixa prioridade',
  }
  return map[priority] || priority
}

function getVideoStatusLabel(status) {
  const map = {
    curated: 'Curado',
    'pending-validation': 'Pendente de validação',
    placeholder: 'Placeholder',
    deprecated: 'Descontinuado',
    Curated: 'Curado',
    'Pending Validation': 'Pendente de validação',
    Placeholder: 'Placeholder',
    Deprecated: 'Descontinuado',
  }
  return map[status] || status
}

function getQuizSize(moduleItem) {
  if (typeof moduleItem.quizSize === 'number' && moduleItem.quizSize > 0) {
    return moduleItem.quizSize
  }

  return 10
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

function getMultiplicadorContent() {
  const base = getModuleContent(moduloMultiplicador)

  if (moduloMultiplicador.habilitacao) {
    base.push({
      type: 'habilitacao',
      title: 'Requisitos de habilitação',
      observacao: moduloMultiplicador.habilitacao.observacao,
      requisitos: moduloMultiplicador.habilitacao.requisitos,
    })
  }

  return base
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
    finalAssessmentPassed: false,
    certificateUnlocked: false,
    multAccessCodigo: null,
    multQuizVariant: null,
    multState: {
      contentSeen: {},
      checklist: {},
      videoDone: false,
      activityDone: false,
      quizAnswers: {},
      quizPassed: false,
      completed: false,
    },
  }
}

// Monta o progresso a partir do servidor. `concluidos` tem os números de módulo (1 a 6) concluídos.
// `cache` traz só as etapas de tela (lidas, checklists, atividade e vídeo) deste usuário.
function montarProgresso(concluidos, cache, aprovadaFinal) {
  const fresh = defaultProgress()

  const moduleState = Object.fromEntries(
    modules.map((moduleItem, index) => {
      const completed = concluidos.has(index + 1)
      const ui = cache?.moduleState?.[moduleItem.id] || {}

      return [
        moduleItem.id,
        {
          ...fresh.moduleState[moduleItem.id],
          unlocked: index === 0 || concluidos.has(index) || completed,
          completed,
          contentSeen: ui.contentSeen || {},
          checklist: ui.checklist || {},
          activityDone: !!ui.activityDone,
          videoDone: !!ui.videoDone,
        },
      ]
    }),
  )

  return {
    ...fresh,
    started: !!cache?.started || concluidos.size > 0,
    moduleState,
    finalAssessmentPassed: aprovadaFinal,
    certificateUnlocked: aprovadaFinal,
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

// Pontuação de quiz cujas respostas vêm do servidor: cada entrada guarda `correta`, conferida pela RPC.
function scoreQuizServidor(quiz, answers) {
  let correct = 0

  quiz.forEach((_, i) => {
    if (answers[i]?.correta === true) correct += 1
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

  const totalQuestions = getQuizSize(mod)

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

          if (isAlert) {
            return <ScamAlertBlock key={index} title={block.title || 'Atenção'} text={block.text} />
          }
          return <SpecialistWordBlock key={index} title={block.title || 'Dica'} text={block.text} />
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
  const [quizFinal, setQuizFinal] = useState(null)
  const [respostasFinal, setRespostasFinal] = useState({})
  const [resultadoFinal, setResultadoFinal] = useState(null)
  const [carregandoFinal, setCarregandoFinal] = useState(false)
  const [enviandoFinal, setEnviandoFinal] = useState(false)
  const [erroFinal, setErroFinal] = useState('')
  const [certificado, setCertificado] = useState(null)
  const [emitindoCertificado, setEmitindoCertificado] = useState(false)
  const [erroCertificado, setErroCertificado] = useState('')
  const [glossaryQuery, setGlossaryQuery] = useState('')
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState('Todos')
  const [libraryQuery, setLibraryQuery] = useState('')
  const [selectedLibrarySource, setSelectedLibrarySource] = useState('Todos')
  const [selectedLibraryType, setSelectedLibraryType] = useState('Todos')
  const [selectedLibraryCategory, setSelectedLibraryCategory] = useState('Todos')
  const [selectedLibraryModule, setSelectedLibraryModule] = useState('Todos')
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
  const [multScreenIndex, setMultScreenIndex] = useState(0)
  const [multAccessCode, setMultAccessCode] = useState('')
  const [multAccessError, setMultAccessError] = useState('')
  const [multAccessChecking, setMultAccessChecking] = useState(false)
  const [session, setSession] = useState(null)
  const [authPronto, setAuthPronto] = useState(!supabase)
  const [recoveryMode, setRecoveryMode] = useState(false)

  const userId = session?.user?.id ?? null
  const [progressoCarregado, setProgressoCarregado] = useState(false)
  const [erroProgresso, setErroProgresso] = useState('')
  const [erroModulo, setErroModulo] = useState('')
  const [concluindoModulo, setConcluindoModulo] = useState(false)
  const [versaoProgresso, setVersaoProgresso] = useState(0)
  const [carregandoQuiz, setCarregandoQuiz] = useState(false)
  const [erroQuiz, setErroQuiz] = useState('')
  const [respondendoQuiz, setRespondendoQuiz] = useState(false)
  const [carregandoMultQuiz, setCarregandoMultQuiz] = useState(false)
  const [erroMultQuiz, setErroMultQuiz] = useState('')
  const [respondendoMultQuiz, setRespondendoMultQuiz] = useState(false)

  useEffect(() => {
    descartarProgressoAntigo()
  }, [])

  useEffect(() => {
    if (!userId || !supabase) {
      setProgressoCarregado(false)
      return undefined
    }

    let ativo = true

    setProgressoCarregado(false)
    setErroProgresso('')

    Promise.all([carregarModulosConcluidos(userId), carregarSituacaoFinal(userId)])
      .then(([concluidos, aprovadaFinal]) => {
        if (!ativo) return
        setProgressState(montarProgresso(concluidos, lerCacheTela(userId), aprovadaFinal))
        setProgressoCarregado(true)
      })
      .catch((error) => {
        if (!ativo) return
        setErroProgresso(mensagemDeErroServidor(error))
      })

    return () => {
      ativo = false
    }
  }, [userId, versaoProgresso])

  useEffect(() => {
    if (!userId || !progressoCarregado) return
    gravarCacheTela(userId, progressState)
  }, [userId, progressoCarregado, progressState])

  useEffect(() => {
    if (!supabase) return undefined

    let ativo = true

    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return
      setSession(data?.session ?? null)
      setAuthPronto(true)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!ativo) return
      if (event === 'PASSWORD_RECOVERY') setRecoveryMode(true)
      if (event === 'SIGNED_OUT') setRecoveryMode(false)
      setSession(nextSession ?? null)
      setAuthPronto(true)
    })

    return () => {
      ativo = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const sessaoAtiva = !!session && !recoveryMode
  const viewPrivada = PRIVATE_VIEWS.includes(currentView)
  const mostrarAcesso = authPronto && (recoveryMode || (!sessaoAtiva && (currentView === 'home' || viewPrivada)))

  const selectedModule = useMemo(
    () => modules.find((m) => m.id === selectedModuleId) || modules[0],
    [selectedModuleId],
  )

  const selectedModuleState =
    progressState.moduleState[selectedModule.id] || defaultProgress().moduleState[selectedModule.id]

  const selectedModuleContent = getModuleContent(selectedModule)
  const currentItem = selectedModuleContent[screenIndex] || selectedModuleContent[0] || null
  const currentContentStepNumber = Math.min(screenIndex + 1, selectedModuleContent.length)
  const totalContentSteps = selectedModuleContent.length

  const allModulesCompleted = modules.every((m) => progressState.moduleState[m.id]?.completed)
  const activeModuleQuiz = progressState.quizVariants?.[selectedModule.id] || []
  const moduleQuizResult = scoreQuizServidor(activeModuleQuiz, selectedModuleState.quizAnswers || {})

  const answeredQuestionsCount = Object.keys(selectedModuleState.quizAnswers || {}).length
  const totalQuizQuestions = moduleQuizResult.total
  const hasAnsweredQuestions = answeredQuestionsCount > 0
  const hasAnsweredAllQuestions = answeredQuestionsCount === totalQuizQuestions

  const quizStatusLabel = selectedModuleState.completed
    ? 'Módulo concluído'
    : !hasAnsweredQuestions
      ? 'Responda às questões para acompanhar seu desempenho'
      : !hasAnsweredAllQuestions
        ? 'Continue respondendo'
        : moduleQuizResult.passed
          ? 'Aproveitamento suficiente'
          : 'Aproveitamento insuficiente'

  const quizStatusTone =
    selectedModuleState.completed || moduleQuizResult.passed
      ? 'success'
      : hasAnsweredAllQuestions
        ? 'warning'
        : 'neutral'

  const multiplicadorContent = getMultiplicadorContent()
  const multCurrentItem = multiplicadorContent[multScreenIndex] || null
  const multCurrentStepNumber = Math.min(multScreenIndex + 1, multiplicadorContent.length)
  const multTotalSteps = multiplicadorContent.length
  const multAccessGranted = !!progressState.multAccessCodigo

  const activeMultQuiz = progressState.multQuizVariant || []
  const multQuizResult = scoreQuizServidor(activeMultQuiz, progressState.multState.quizAnswers || {})
  const multAnsweredCount = Object.keys(progressState.multState.quizAnswers || {}).length
  const multTotalQuestions = multQuizResult.total
  const multHasAnsweredQuestions = multAnsweredCount > 0
  const multHasAnsweredAllQuestions = multAnsweredCount === multTotalQuestions

  const multQuizStatusLabel = progressState.multState.completed
    ? 'Módulo concluído'
    : !multHasAnsweredQuestions
      ? 'Responda às questões para acompanhar seu desempenho'
      : !multHasAnsweredAllQuestions
        ? 'Continue respondendo'
        : multQuizResult.passed
          ? 'Aproveitamento suficiente'
          : 'Aproveitamento insuficiente'

  const multQuizStatusTone =
    progressState.multState.completed || multQuizResult.passed
      ? 'success'
      : multHasAnsweredAllQuestions
        ? 'warning'
        : 'neutral'

  const multCompletedScreens = Object.values(progressState.multState.contentSeen || {}).filter(Boolean).length
  const multContentProgress = multTotalSteps > 0 ? Math.min(multCompletedScreens / multTotalSteps, 1) : 0
  const multQuizProgressRatio = multTotalQuestions > 0 ? Math.min(multAnsweredCount / multTotalQuestions, 1) : 0
  const multProgressValue = progressState.multState.completed
    ? 100
    : Math.round(((multContentProgress + multQuizProgressRatio) / 2) * 100)

  const finalTotalQuestions = quizFinal?.perguntas.length || 0
  const finalAnsweredCount = Object.keys(respostasFinal).length
  const hasAnsweredAllFinalQuestions = finalTotalQuestions > 0 && finalAnsweredCount === finalTotalQuestions
  const finalAprovadaAgora = progressState.finalAssessmentPassed || resultadoFinal?.aprovada === true

  const finalAssessmentStatusLabel = finalAprovadaAgora
    ? 'Avaliação aprovada'
    : resultadoFinal
      ? 'Aproveitamento insuficiente para certificação'
      : !hasAnsweredAllFinalQuestions
        ? 'Responda às questões para habilitar o envio'
        : 'Todas as questões respondidas. Envie a avaliação.'

  const finalAssessmentStatusTone = finalAprovadaAgora
    ? 'success'
    : resultadoFinal
      ? 'warning'
      : 'neutral'
  const glossaryCategoryOptions = useMemo(() => ['Todos', ...glossaryCategories], [])
  const filteredGlossaryEntries = useMemo(() => {
    const query = normalizeSearchText(glossaryQuery)

    const filtered = glossaryEntries.filter((entry) => {
      const matchesCategory =
        selectedGlossaryCategory === 'Todos' || entry.category === selectedGlossaryCategory
      const searchableText = normalizeSearchText(
        `${entry.term} ${entry.category} ${entry.module} ${entry.definition} ${entry.guidance} ${entry.example || ''}`,
      )

      return matchesCategory && (!query || searchableText.includes(query))
    })

    return filtered.sort((a, b) => {
      if (a.priority === b.priority) return 0
      return a.priority ? -1 : 1
    })
  }, [glossaryQuery, selectedGlossaryCategory])
  const librarySourceOptions = useMemo(() => ['Todos', ...librarySources], [])
  const libraryTypeOptions = useMemo(() => ['Todos', ...libraryTypes], [])
  const libraryCategoryOptions = useMemo(() => ['Todos', ...libraryCategories], [])
  const libraryModuleOptions = useMemo(() => ['Todos', 'Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5', 'Módulo 6'], [])
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

      let matchesModule = true
      if (selectedSimulationModule !== 'Todos') {
        if (Array.isArray(item.modules)) {
          matchesModule = item.modules.includes(selectedSimulationModule)
        } else if (item.relatedModule) {
          matchesModule = item.relatedModule === selectedSimulationModule
        } else {
          matchesModule = false
        }
      }

      const tagsText = Array.isArray(item.tags) ? item.tags.join(' ') : ''
      const modulesText = Array.isArray(item.modules) ? item.modules.join(' ') : ''
      const searchableText = normalizeSearchText(
        `${item.title} ${item.situation} ${item.category} ${item.relatedModule || ''} ${modulesText} ${tagsText} ${item.scenario} ${item.warningSigns.join(' ')} ${item.recommendedAction || ''} ${item.finalGuidance}`,
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

      let matchesModule = true
      if (selectedLibraryModule !== 'Todos') {
        if (Array.isArray(documentItem.modules)) {
          matchesModule = documentItem.modules.includes(selectedLibraryModule)
        } else if (documentItem.relatedModule) {
          matchesModule = documentItem.relatedModule.includes(selectedLibraryModule)
        } else {
          matchesModule = false
        }
      }

      const tagsText = Array.isArray(documentItem.tags) ? documentItem.tags.join(' ') : ''
      const modulesText = Array.isArray(documentItem.modules) ? documentItem.modules.join(' ') : ''
      const searchableText = normalizeSearchText(
        `${documentItem.title} ${documentItem.description} ${documentItem.source} ${documentItem.type} ${documentItem.category} ${documentItem.relatedModule || ''} ${modulesText} ${tagsText} ${documentItem.url}`,
      )

      return matchesSource && matchesType && matchesCategory && matchesModule && (!query || searchableText.includes(query))
    })
  }, [libraryQuery, selectedLibrarySource, selectedLibraryCategory, selectedLibraryType, selectedLibraryModule])

  const filteredVideos = useMemo(() => {
    const query = normalizeSearchText(videoQuery)

    return educationalVideos.filter((videoItem) => {
      const matchesSource =
        selectedVideoSource === 'Todos' || videoItem.source === selectedVideoSource
      const matchesTheme =
        selectedVideoTheme === 'Todos' || videoItem.theme === selectedVideoTheme
      
      let matchesModule = false
      if (selectedVideoModule === 'Todos') {
        matchesModule = true
      } else if (Array.isArray(videoItem.modules)) {
        matchesModule = videoItem.modules.includes(selectedVideoModule)
      } else {
        matchesModule = videoItem.relatedModule === selectedVideoModule
      }

      const modulesStr = Array.isArray(videoItem.modules) ? videoItem.modules.join(' ') : videoItem.relatedModule
      const tagsStr = Array.isArray(videoItem.tags) ? videoItem.tags.join(' ') : ''
      const searchableText = normalizeSearchText(
        `${videoItem.title} ${videoItem.description} ${videoItem.source} ${videoItem.theme} ${modulesStr} ${tagsStr} ${videoItem.url} ${videoItem.status}`,
      )

      return (
        matchesSource &&
        matchesTheme &&
        matchesModule &&
        (!query || searchableText.includes(query))
      )
    })
  }, [videoQuery, selectedVideoSource, selectedVideoTheme, selectedVideoModule])

  const filteredVideoLibrary = useMemo(() => {
    const query = normalizeSearchText(videoQuery)

    return videoLibrary.filter((video) => {
      const matchesSource =
        selectedVideoSource === 'Todos' || video.provider === selectedVideoSource
      const matchesModule =
        selectedVideoModule === 'Todos' || video.modules.includes(selectedVideoModule)

      const searchableText = normalizeSearchText(
        `${video.title} ${video.provider} ${video.language} ${video.modules.join(' ')} ${video.topics.join(' ')} ${video.url} ${video.status} ${video.notes || ''}`,
      )

      return (
        matchesSource &&
        matchesModule &&
        (!query || searchableText.includes(query))
      )
    })
  }, [videoQuery, selectedVideoSource, selectedVideoModule])

  useEffect(() => {
    const quizVisivel = currentView === 'module' && sessaoAtiva && screenIndex === selectedModuleContent.length

    if (!quizVisivel || progressState.quizVariants?.[selectedModule.id]) return undefined

    let ativo = true

    setCarregandoQuiz(true)
    setErroQuiz('')

    sortearQuizDoModulo(selectedModule)
      .then((questoes) => {
        if (!ativo) return
        setProgressState((prev) => ({
          ...prev,
          quizVariants: { ...(prev.quizVariants || {}), [selectedModule.id]: questoes },
        }))
      })
      .catch((error) => {
        if (ativo) setErroQuiz(mensagemDeErroServidor(error))
      })
      .finally(() => {
        if (ativo) setCarregandoQuiz(false)
      })

    return () => {
      ativo = false
    }
  }, [currentView, sessaoAtiva, screenIndex, selectedModule.id, selectedModuleContent.length])

  useEffect(() => {
    const certificadoVisivel = currentView === 'certificate' && sessaoAtiva && progressState.finalAssessmentPassed

    if (certificadoVisivel && !certificado && !emitindoCertificado) {
      emitirCertificado()
    }
  }, [currentView, sessaoAtiva, progressState.finalAssessmentPassed])

  useEffect(() => {
    const quizMultVisivel =
      currentView === 'multiplicadores' && multAccessGranted && multScreenIndex === multiplicadorContent.length

    if (!quizMultVisivel || progressState.multQuizVariant) return undefined

    let ativo = true

    setCarregandoMultQuiz(true)
    setErroMultQuiz('')

    sortearQuestoesMultiplicador(progressState.multAccessCodigo)
      .then((questoes) => {
        if (!ativo) return
        setProgressState((prev) => ({ ...prev, multQuizVariant: questoes }))
      })
      .catch((error) => {
        if (ativo) setErroMultQuiz(mensagemDeErroServidor(error))
      })
      .finally(() => {
        if (ativo) setCarregandoMultQuiz(false)
      })

    return () => {
      ativo = false
    }
  }, [currentView, multScreenIndex, multAccessGranted, multiplicadorContent.length])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentView, screenIndex, selectedModuleId, multScreenIndex])

  // Nome e código vêm do servidor (emitir-certificado). Sem eles, o PDF não é gerado.
  function generateCertificatePdf() {
    if (!progressState.certificateUnlocked || !certificado) return

    const cleanName = String(certificado.nome || '').trim()
    const verificationCode = certificado.codigo

    if (!cleanName || !verificationCode) {
      setErroCertificado('Os dados do certificado ainda não foram recebidos. Tente emitir novamente.')
      return
    }

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const issuedAt = new Date()
    const completionDate = formatCertificateDate(issuedAt)
    const courseName = `${courseIntro.title} — ${courseIntro.subtitle}`

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
    doc.setFontSize(cleanName.length > 44 ? 16 : 22)
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
    doc.text(`Curso: ${courseIntro.title}`, 46, 138, { maxWidth: 120 })
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

  function limparEstadoFinal() {
    setQuizFinal(null)
    setRespostasFinal({})
    setResultadoFinal(null)
    setErroFinal('')
    setCertificado(null)
    setErroCertificado('')
  }

  async function sair() {
    if (supabase) await supabase.auth.signOut()
    setProgressState(defaultProgress())
    limparEstadoFinal()
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

  // Sorteio no servidor: as questões chegam sem gabarito, na ordem original das alternativas.
  async function sortearQuizDoModulo(moduleItem) {
    const numero = modules.findIndex((m) => m.id === moduleItem.id) + 1

    return sortearQuestoesModulo(numero)
  }

  // Cada resposta é conferida no servidor. A alternativa fica travada após a primeira resposta.
  async function answerModuleQuiz(idx, optionIndex) {
    const questao = activeModuleQuiz[idx]

    if (!questao || respondendoQuiz || selectedModuleState.quizAnswers?.[idx] !== undefined) return

    setRespondendoQuiz(true)
    setErroQuiz('')

    let resultado
    try {
      resultado = await responderQuestaoModulo(questao.id, optionIndex)
    } catch (error) {
      setRespondendoQuiz(false)
      setErroQuiz(mensagemDeErroServidor(error))
      return
    }

    setRespondendoQuiz(false)

    setProgressState((prev) => {
      const moduleAtual = prev.moduleState[selectedModule.id]
      const nextAnswers = {
        ...moduleAtual.quizAnswers,
        [idx]: { alternativa: optionIndex, correta: resultado.correta },
      }
      const result = scoreQuizServidor(prev.quizVariants?.[selectedModule.id] || [], nextAnswers)

      return {
        ...prev,
        moduleState: {
          ...prev.moduleState,
          [selectedModule.id]: {
            ...moduleAtual,
            quizAnswers: nextAnswers,
            quizPassed: result.passed,
          },
        },
      }
    })
  }

  async function retryModuleQuiz() {
    setCarregandoQuiz(true)
    setErroQuiz('')

    try {
      const questoes = await sortearQuizDoModulo(selectedModule)

      setProgressState((prev) => ({
        ...prev,
        quizVariants: {
          ...(prev.quizVariants || {}),
          [selectedModule.id]: questoes,
        },
        moduleState: {
          ...prev.moduleState,
          [selectedModule.id]: {
            ...prev.moduleState[selectedModule.id],
            quizAnswers: {},
            quizPassed: false,
          },
        },
      }))
    } catch (error) {
      setErroQuiz(mensagemDeErroServidor(error))
    } finally {
      setCarregandoQuiz(false)
    }
  }

  async function completeModule() {
    const moduleIndex = modules.findIndex((m) => m.id === selectedModule.id)
    const nextModule = modules[moduleIndex + 1]

    setErroModulo('')
    setConcluindoModulo(true)

    try {
      await concluirModuloNoServidor(moduleIndex + 1)
    } catch (error) {
      setConcluindoModulo(false)
      setErroModulo(mensagemDeErroServidor(error))
      return
    }

    setConcluindoModulo(false)

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

  function markMultSeen(itemIndex) {
    setProgressState((prev) => ({
      ...prev,
      multState: {
        ...prev.multState,
        contentSeen: {
          ...prev.multState.contentSeen,
          [itemIndex]: true,
        },
      },
    }))
  }

  function toggleMultChecklist(item) {
    setProgressState((prev) => ({
      ...prev,
      multState: {
        ...prev.multState,
        checklist: {
          ...prev.multState.checklist,
          [item]: !prev.multState.checklist[item],
        },
      },
    }))
  }

  function setMultVideoDone() {
    setProgressState((prev) => ({
      ...prev,
      multState: { ...prev.multState, videoDone: true },
    }))
  }

  function setMultActivityDone() {
    setProgressState((prev) => ({
      ...prev,
      multState: { ...prev.multState, activityDone: true },
    }))
  }

  function completeMultCurrentStepAndAdvance() {
    setProgressState((prev) => ({
      ...prev,
      multState: {
        ...prev.multState,
        contentSeen: {
          ...prev.multState.contentSeen,
          [multScreenIndex]: true,
        },
        videoDone: multCurrentItem?.type === 'video' ? true : prev.multState.videoDone,
        activityDone: multCurrentItem?.type === 'activity' ? true : prev.multState.activityDone,
      },
    }))

    setMultScreenIndex((s) => Math.min(multiplicadorContent.length, s + 1))
  }

  // Respostas do módulo de multiplicadores são conferidas no servidor, com o código verificador como chave.
  async function answerMultQuiz(idx, optionIndex) {
    const questao = activeMultQuiz[idx]
    const codigo = progressState.multAccessCodigo

    if (!questao || !codigo || respondendoMultQuiz || progressState.multState.quizAnswers?.[idx] !== undefined) return

    setRespondendoMultQuiz(true)
    setErroMultQuiz('')

    let resultado
    try {
      resultado = await responderQuestaoMultiplicador(codigo, questao.id, optionIndex)
    } catch (error) {
      setRespondendoMultQuiz(false)
      setErroMultQuiz(mensagemDeErroServidor(error))
      return
    }

    setRespondendoMultQuiz(false)

    setProgressState((prev) => {
      const nextAnswers = {
        ...prev.multState.quizAnswers,
        [idx]: { alternativa: optionIndex, correta: resultado.correta },
      }
      const result = scoreQuizServidor(prev.multQuizVariant || [], nextAnswers)

      return {
        ...prev,
        multState: {
          ...prev.multState,
          quizAnswers: nextAnswers,
          quizPassed: result.passed,
        },
      }
    })
  }

  async function retryMultQuiz() {
    const codigo = progressState.multAccessCodigo

    if (!codigo) return

    setCarregandoMultQuiz(true)
    setErroMultQuiz('')

    try {
      const questoes = await sortearQuestoesMultiplicador(codigo)

      setProgressState((prev) => ({
        ...prev,
        multQuizVariant: questoes,
        multState: {
          ...prev.multState,
          quizAnswers: {},
          quizPassed: false,
        },
      }))
    } catch (error) {
      setErroMultQuiz(mensagemDeErroServidor(error))
    } finally {
      setCarregandoMultQuiz(false)
    }
  }

  function completeMultiplicadores() {
    setProgressState((prev) => ({
      ...prev,
      multState: { ...prev.multState, completed: true },
    }))
  }

  async function handleMultAccessSubmit(event) {
    event.preventDefault()
    setMultAccessChecking(true)
    setMultAccessError('')

    const result = await validarCertificado(multAccessCode)

    setMultAccessChecking(false)

    if (!result.valido) {
      setMultAccessError(result.error || 'Código verificador inválido.')
      return
    }

    setProgressState((prev) => ({
      ...prev,
      multAccessCodigo: multAccessCode.trim().toUpperCase(),
    }))
  }

  // Abre uma tentativa da avaliação final (ou retoma a aberta). O servidor confere os seis módulos.
  async function iniciarAvaliacaoFinal() {
    setCarregandoFinal(true)
    setErroFinal('')

    try {
      const quiz = await iniciarQuizFinal()

      setQuizFinal(quiz)
      setRespostasFinal({})
      setResultadoFinal(null)
      setCurrentView('final-assessment')
    } catch (error) {
      const texto = mensagemDeErroServidor(error)

      if (String(error?.message || '').includes('quiz_ja_aprovado')) {
        setProgressState((prev) => ({ ...prev, finalAssessmentPassed: true, certificateUnlocked: true }))
        setCurrentView('certificate')
      } else {
        setErroFinal(texto)
      }
    } finally {
      setCarregandoFinal(false)
    }
  }

  function answerFinalAssessment(idx, optionIndex) {
    if (enviandoFinal || resultadoFinal) return

    setRespostasFinal((prev) => ({ ...prev, [idx]: optionIndex }))
  }

  // Envia as 18 respostas. Só a pontuação e a aprovação voltam do servidor.
  async function enviarAvaliacaoFinal() {
    if (!quizFinal || !hasAnsweredAllFinalQuestions || enviandoFinal || resultadoFinal) return

    setEnviandoFinal(true)
    setErroFinal('')

    const respostas = quizFinal.perguntas.map((pergunta, idx) => ({
      pergunta_id: pergunta.id,
      alternativa: respostasFinal[idx],
    }))

    try {
      const resultado = await enviarQuizFinal(quizFinal.tentativaId, respostas)

      setResultadoFinal(resultado)

      if (resultado.aprovada) {
        setProgressState((prev) => ({ ...prev, finalAssessmentPassed: true, certificateUnlocked: true }))
      }
    } catch (error) {
      setErroFinal(mensagemDeErroServidor(error))
    } finally {
      setEnviandoFinal(false)
    }
  }

  // Emissão idempotente no servidor: se o certificado já existe, a função devolve o mesmo código.
  async function emitirCertificado() {
    if (!session?.access_token) {
      setErroCertificado('Entre na sua conta para emitir o certificado.')
      return
    }

    setEmitindoCertificado(true)
    setErroCertificado('')

    const resultado = await registrarCertificadoEmitido({
      accessToken: session.access_token,
      versao: COURSE_VERSION,
    })

    setEmitindoCertificado(false)

    if (!resultado) {
      setErroCertificado('Não foi possível emitir o certificado agora. Tente novamente em alguns instantes.')
      return
    }

    setCertificado(resultado)
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
      'Tem certeza de que deseja reiniciar a visão do curso neste navegador? Isso apaga as etapas lidas, os checklists marcados e as respostas dos quizzes desta sessão. Os módulos já concluídos na sua conta são mantidos.',
    )

    if (!shouldReset) return

    if (userId) removerCacheTela(userId)
    setProgressState(defaultProgress())
    limparEstadoFinal()
    setVersaoProgresso((versao) => versao + 1)
    setCurrentView('home')
    setSelectedModuleId(modules[0].id)
    setScreenIndex(0)
    setMultScreenIndex(0)
    setMultAccessCode('')
    setMultAccessError('')
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <header className="topbar">
        <div>
          <div className="eyebrow">
            <Shield size={14} aria-hidden="true" focusable="false" /> Curso online com progressão por conclusão de atividades
          </div>
          <h1>{courseIntro.title}</h1>
          <p className="subtitle">{courseIntro.subtitle}</p>
        </div>

        <nav className="top-actions" aria-label="Navegação principal do curso">
          <button
            className={`button button-outline ${currentView === 'home' ? 'active' : ''}`}
            onClick={goHome}
            aria-current={currentView === 'home' ? 'page' : undefined}
          >
            <Home size={16} aria-hidden="true" focusable="false" /> Início
          </button>
          <button
            className={`button button-outline ${currentView === 'glossary' ? 'active' : ''}`}
            onClick={() => setCurrentView('glossary')}
            aria-current={currentView === 'glossary' ? 'page' : undefined}
          >
            <BookOpen size={16} aria-hidden="true" focusable="false" /> Glossário
          </button>
          <button
            className={`button button-outline ${currentView === 'library' ? 'active' : ''}`}
            onClick={() => setCurrentView('library')}
            aria-current={currentView === 'library' ? 'page' : undefined}
          >
            <FileText size={16} aria-hidden="true" focusable="false" /> Biblioteca
          </button>
          <button
            className={`button button-outline ${currentView === 'videos' ? 'active' : ''}`}
            onClick={() => setCurrentView('videos')}
            aria-current={currentView === 'videos' ? 'page' : undefined}
          >
            <PlayCircle size={16} aria-hidden="true" focusable="false" /> Vídeos
          </button>
          <button
            className={`button button-outline ${currentView === 'checklists' ? 'active' : ''}`}
            onClick={() => setCurrentView('checklists')}
            aria-current={currentView === 'checklists' ? 'page' : undefined}
          >
            <ListChecks size={16} aria-hidden="true" focusable="false" /> Checklists
          </button>
          <button
            className={`button button-outline ${currentView === 'simulations' ? 'active' : ''}`}
            onClick={() => setCurrentView('simulations')}
            aria-current={currentView === 'simulations' ? 'page' : undefined}
          >
            <MessageSquare size={16} aria-hidden="true" focusable="false" /> Simulações
          </button>
          <button
            className={`button button-outline ${currentView === 'multiplicadores' ? 'active' : ''}`}
            onClick={() => setCurrentView('multiplicadores')}
            aria-current={currentView === 'multiplicadores' ? 'page' : undefined}
          >
            <GraduationCap size={16} aria-hidden="true" focusable="false" /> Multiplicadores
          </button>
          {sessaoAtiva ? (
            <button className="button button-outline" onClick={sair}>
              <LogOut size={16} aria-hidden="true" focusable="false" /> Sair
            </button>
          ) : null}
          <button className="button button-outline" onClick={resetCourse}>
            <RotateCcw size={16} aria-hidden="true" focusable="false" /> Reiniciar
          </button>
        </nav>
      </header>

      <div className="layout-grid">
        <aside className="sidebar" aria-label="Trilha do curso">
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
                const isActiveModule = currentView === 'module' && selectedModuleId === m.id

                return (
                  <button
                    key={m.id}
                    type="button"
                    className={[
                      'module-chip',
                      state.unlocked ? '' : 'locked',
                      isActiveModule ? 'module-chip-active' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => {
                      if (!sessaoAtiva || !state.unlocked) return
                      setSelectedModuleId(m.id)
                      setCurrentView('module')
                      setScreenIndex(0)
                    }}
                    disabled={!sessaoAtiva || !state.unlocked}
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
                  value={
                    progressState.finalAssessmentPassed
                      ? 100
                      : finalTotalQuestions > 0
                        ? Math.round((finalAnsweredCount / finalTotalQuestions) * 100)
                        : 0
                  }
                />

                <button
                  className="button full"
                  disabled={!sessaoAtiva || !allModulesCompleted}
                  onClick={() => setCurrentView('final-review')}
                  aria-label={allModulesCompleted ? 'Ir para a revisão final' : `Avaliação final bloqueada. ${FINAL_ASSESSMENT_LOCKED_MESSAGE}`}
                >
                  Ir para a revisão final
                </button>
                {!allModulesCompleted ? <div className="mini-muted">{FINAL_ASSESSMENT_LOCKED_MESSAGE}</div> : null}
              </div>
            </div>
          </Card>
        </aside>

        <main id="conteudo-principal" className="content-column" tabIndex={-1}>
          {!authPronto && supabase ? <p className="muted-body">Verificando sua sessão...</p> : null}

          {mostrarAcesso ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              {viewPrivada && !recoveryMode ? (
                <div className="info-box muted-body" role="status">
                  Esta etapa exige login. Entre na sua conta ou crie uma para continuar.
                </div>
              ) : null}
              <AcessoCurso
                supabase={supabase}
                courseIntro={courseIntro}
                cargaHoraria={CERTIFICATE_WORKLOAD}
                apresentacao={currentView === 'home' && !recoveryMode}
                recoveryMode={recoveryMode}
                onRecoveryDone={() => setRecoveryMode(false)}
              />
            </motion.div>
          ) : null}

          {currentView === 'home' && sessaoAtiva && (
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
                  <button className="button" onClick={startCourse} disabled={!progressoCarregado}>
                    {progressState.started ? 'Continuar curso' : 'Começar agora'} <ChevronRight size={16} aria-hidden="true" focusable="false" />
                  </button>
                  {erroProgresso ? (
                    <div className="warning-text" role="alert">
                      Não foi possível carregar seu progresso: {erroProgresso} Recarregue a página para tentar de novo.
                    </div>
                  ) : null}
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
                  <div className="resource-grid glossary-grid">
                    {filteredGlossaryEntries.map((entry) => (
                      <article key={entry.term} className={`resource-card ${entry.priority ? 'glossary-priority-card' : ''}`}>
                        <div className="resource-card-head">
                          <div className="glossary-title-row resource-title-row">
                            <h3>{entry.term}</h3>
                            {entry.priority && <Shield size={16} className="success-icon" aria-label="Termo essencial" />}
                          </div>
                          <span className="tag" aria-label={`Relacionado ao ${entry.module}`}>{entry.module}</span>
                        </div>
                        <div className="mini-muted">{entry.category}</div>
                        <div className="resource-card-body">
                          <p className="muted-body">{entry.definition}</p>
                          {entry.example && (
                            <div className="muted-body glossary-example">
                              <strong>Exemplo prático:</strong> {entry.example}
                            </div>
                          )}
                        </div>
                        {entry.guidance ? (
                          <div className="ludic-box expert glossary-tip">
                            <div className="ludic-header">
                              <div className="ludic-icon">
                                <CharacterAvatar type="siga" size={24} />
                                <div className="ludic-status-badge">
                                  <Shield size={10} aria-hidden="true" focusable="false" />
                                </div>
                              </div>
                              <span className="ludic-title text-title-small">Orientação prática</span>
                            </div>
                            <div className="ludic-body text-body-medium">{entry.guidance}</div>
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

                    <label className="stack-sm">
                      <span className="mini-muted">Módulo</span>
                      <select
                        className="text-input"
                        value={selectedLibraryModule}
                        onChange={(event) => setSelectedLibraryModule(event.target.value)}
                        aria-label="Filtrar por módulo relacionado"
                      >
                        {libraryModuleOptions.map((mod) => (
                          <option key={mod} value={mod}>
                            {mod}
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
                      <article key={documentItem.url} className={`resource-card ${documentItem.official ? 'library-official-card' : ''}`}>
                        <div className="resource-card-head">
                          <div className="library-title-row resource-title-row">
                            <h3>{documentItem.title}</h3>
                            {documentItem.official && (
                              <span className="official-badge" title="Material de fonte institucional verificada">
                                <Shield size={12} aria-hidden="true" focusable="false" className="success-icon" /> Fonte Oficial
                              </span>
                            )}
                          </div>
                          <span className="tag" aria-label={`Tipo: ${documentItem.type}`}>{documentItem.type}</span>
                        </div>

                        <div className="resource-card-body">
                          <p className="muted-body">{documentItem.description}</p>
                          {Array.isArray(documentItem.tags) && documentItem.tags.length > 0 && (
                            <div className="library-tag-list resource-tag-list">
                              {documentItem.tags.map((tag) => (
                                <span key={tag} className="library-tag-chip resource-tag-chip">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="resource-card-meta">
                          <span className="resource-meta-chip">Fonte: {documentItem.source}</span>
                          <span className="resource-meta-chip">Categoria: {documentItem.category}</span>
                          <span className="resource-meta-chip">
                            {Array.isArray(documentItem.modules) ? documentItem.modules.join(', ') : documentItem.relatedModule}
                          </span>
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
                          {Array.isArray(videoItem.tags) && videoItem.tags.length > 0 && (
                            <div className="library-tag-list resource-tag-list">
                              {videoItem.tags.map((tag) => (
                                <span key={tag} className="library-tag-chip resource-tag-chip">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="resource-card-meta">
                          <span className="resource-meta-chip">Fonte: {videoItem.source}</span>
                          <span className="resource-meta-chip">Tema: {videoItem.theme}</span>
                          {videoItem.type && <span className="resource-meta-chip">{videoItem.type}</span>}
                          {videoItem.duration && <span className="resource-meta-chip">Duração: {videoItem.duration}</span>}
                          <span className="resource-meta-chip">
                            {Array.isArray(videoItem.modules) ? videoItem.modules.join(', ') : videoItem.relatedModule}
                          </span>
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

                <div className="video-library-section">
                  <header className="video-library-header">
                    <div className="link-card-title">Curadoria especial de vídeos externos</div>
                    <p className="muted-body">
                      Vídeos de instituições parceiras e campanhas oficiais recomendados pela equipe do curso para aprofundamento.
                    </p>
                    <div className="muted-small video-library-count" aria-live="polite">
                      {filteredVideoLibrary.length} de {videoLibrary.length} vídeos da curadoria exibidos.
                    </div>
                  </header>
                </div>

                {filteredVideoLibrary.length > 0 ? (
                  <div className="resource-grid">
                    {filteredVideoLibrary.map((video) => (
                      <article key={video.id} className="resource-card">
                        <div className="resource-card-head">
                          <h3>{video.title}</h3>
                          <span className="tag video-library-priority-tag" aria-label={`Prioridade: ${getVideoPriorityLabel(video.priority)}`}>
                            {getVideoPriorityLabel(video.priority)}
                          </span>
                        </div>

                        <div className="resource-card-body">
                           <p className="muted-body video-notes">
                             {video.notes}
                           </p>
                        </div>

                        <div className="resource-card-meta">
                          <span className="resource-meta-chip">Fonte: {video.provider}</span>
                          <span className="resource-meta-chip">Status: {getVideoStatusLabel(video.status)}</span>
                          <span className="resource-meta-chip">Idioma: {video.language}</span>
                          <span className="resource-meta-chip">Relacionado: {video.modules.join(', ')}</span>
                          
                          <div className="video-library-topic-list resource-tag-list">
                            {video.topics.map(topic => (
                              <span key={topic} className="video-library-topic-chip resource-tag-chip">{topic}</span>
                            ))}
                          </div>
                        </div>

                        <a
                          href={video.url}
                          target="_blank"
                          rel="noreferrer"
                          className="button button-outline full"
                          aria-label={`Assistir vídeo ${video.title} em nova aba (material externo)`}
                        >
                          Assistir vídeo <ExternalLink size={16} aria-hidden="true" focusable="false" />
                        </a>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="info-box muted-body" role="alert">
                    Nenhum vídeo da curadoria encontrado para os filtros selecionados.
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

                          <div className="info-box info-box-compact">
                            <div className="mini-muted">Situação:</div>
                            <div className="muted-body simulation-situation">{sim.situation}</div>
                            {Array.isArray(sim.tags) && sim.tags.length > 0 && (
                              <div className="simulation-tag-list resource-tag-list">
                                {sim.tags.map((tag) => (
                                  <span key={tag} className="simulation-tag-chip resource-tag-chip">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="ludic-box scam simulation-scenario">
                            <div className="ludic-header">
                              <AlertTriangle size={14} className="error-icon" aria-hidden="true" focusable="false" />
                              <span className="ludic-title text-title-small">Cenário simulado</span>
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
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </nav>
                            ) : (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stack-md" role="region" aria-live="polite">
                                <div className={`info-box simulation-feedback-box ${isCorrect ? 'success' : 'error'}`}>
                                  <div className="ludic-header ludic-header-compact">
                                    {isCorrect ? <CheckCircle2 size={18} className="success-icon" aria-hidden="true" focusable="false" /> : <XCircle size={18} className="error-icon" aria-hidden="true" focusable="false" />}
                                    <span className="ludic-title text-title-medium">
                                      {isCorrect ? 'Conduta Segura!' : 'Risco Identificado'}
                                    </span>
                                  </div>
                                  <div className="muted-body text-body-medium">
                                    {sim.options[selectedOptionIndex].feedback}
                                  </div>
                                </div>

                                {sim.recommendedAction && (
                                  <div className="info-box success simulation-recommended-box info-box-compact">
                                    <div className="ludic-header ludic-header-compact">
                                      <Shield size={16} className="success-icon" aria-hidden="true" focusable="false" />
                                      <span className="ludic-title text-title-medium">Orientação Prática Recomendada</span>
                                    </div>
                                    <div className="muted-body text-body-medium">
                                      {sim.recommendedAction}
                                    </div>
                                  </div>
                                )}

                                <div className="info-box info-box-compact">
                                  <div className="ludic-header ludic-header-compact">
                                    <AlertOctagon size={16} className="error-icon" aria-hidden="true" focusable="false" />
                                    <span className="ludic-title text-title-small">Sinais de alerta</span>
                                  </div>
                                  <ul className="warning-signs-list">
                                    {sim.warningSigns.map(tag => (
                                      <li key={tag} className="tag muted warning-tag-chip">{tag}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="ludic-box expert ludic-box-compact">
                                  <div className="ludic-header">
                                    <Shield size={14} className="success-icon" aria-hidden="true" focusable="false" />
                                    <span className="ludic-title text-title-small">Dica do Especialista</span>
                                  </div>
                                  <div className="ludic-body text-body-small">{sim.finalGuidance}</div>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <div className="actions-between actions-footer-compact">
                            <div className="mini-muted actions-footer-text">
                              Relacionado ao {Array.isArray(sim.modules) ? sim.modules.join(', ') : sim.relatedModule}
                            </div>
                            {hasAnswered && (
                              <button
                                className="button button-outline actions-footer-btn-compact"
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

          {currentView === 'multiplicadores' && !multAccessGranted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Acesso restrito ao módulo de formação de multiplicadores" icon={Lock}>
                <p className="muted-body">
                  Este módulo é destinado a agentes públicos autorizados a atuar como multiplicadores do
                  curso Cidadão Digital Seguro. O acesso exige o código verificador de um certificado de
                  conclusão válido, o mesmo código impresso no certificado emitido ao final do curso.
                </p>

                <form className="stack-md" onSubmit={handleMultAccessSubmit}>
                  <label className="muted-body" htmlFor="mult-access-code">
                    Código verificador do certificado
                  </label>
                  <input
                    id="mult-access-code"
                    className="text-input"
                    type="text"
                    placeholder="Ex.: CDS-310-XXXXXXX"
                    value={multAccessCode}
                    onChange={(event) => setMultAccessCode(event.target.value)}
                    autoComplete="off"
                  />

                  {multAccessError ? (
                    <div className="info-box muted-body" role="alert">
                      {multAccessError}
                    </div>
                  ) : null}

                  <button className="button" type="submit" disabled={multAccessChecking || !multAccessCode.trim()}>
                    {multAccessChecking ? 'Validando...' : 'Validar acesso'}
                  </button>
                </form>
              </ScreenCard>
            </motion.div>
          )}

          {currentView === 'multiplicadores' && multAccessGranted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title={moduloMultiplicador.title} icon={GraduationCap}>
                <p className="muted-body">{moduloMultiplicador.subtitle}</p>

                <div className="info-box">
                  <div className="link-card-title">Pré-requisito</div>
                  <p className="muted-body">{moduloMultiplicador.prerequisite}</p>
                </div>

                <p className="muted-body">{moduloMultiplicador.summary}</p>

                <ProgressBar value={multProgressValue} label="Progresso do módulo de multiplicadores" />

                <div className="tags-row">
                  <span className="tag">{moduloMultiplicador.level}</span>
                  <span className="tag">{moduloMultiplicador.duration}</span>
                  <span className="tag">{moduloMultiplicador.lessons.length} lições</span>
                  {progressState.multState.completed ? <SectionTag>Concluído</SectionTag> : null}
                </div>

                <div className="info-box">
                  <div className="link-card-title">Objetivos de aprendizagem</div>
                  <ul className="muted-body">
                    {moduloMultiplicador.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              </ScreenCard>

              {multScreenIndex < multiplicadorContent.length && multCurrentItem && (
                <ScreenCard
                  title={multCurrentItem.title}
                  icon={
                    multCurrentItem.type === 'video'
                      ? PlayCircle
                      : multCurrentItem.type === 'links'
                        ? BookOpen
                        : multCurrentItem.type === 'checklist'
                          ? ListChecks
                          : multCurrentItem.type === 'activity'
                            ? FileCheck
                            : multCurrentItem.type === 'habilitacao'
                              ? Award
                              : GraduationCap
                  }
                >
                  <div
                    className="module-step-indicator"
                    aria-label={`Tela ${multCurrentStepNumber} de ${multTotalSteps} do módulo de multiplicadores`}
                  >
                    Tela {multCurrentStepNumber} de {multTotalSteps}
                  </div>

                  {multCurrentItem.content && renderLessonContent(multCurrentItem.content)}

                  {multCurrentItem.type === 'video' && (
                    <div className="stack-md">
                      <div className="video-box">
                        <PlayCircle size={42} aria-hidden="true" focusable="false" />
                        <div className="video-title">{multCurrentItem.title}</div>
                        <div className="muted-small">Duração sugerida: {multCurrentItem.duration}</div>
                      </div>

                      {multCurrentItem.status ? (
                        <div className="tags-row">
                          <SectionTag>Status: {multCurrentItem.status}</SectionTag>
                        </div>
                      ) : null}

                      <div className="info-box video-detail-box video-script-box">
                        <div className="link-card-title">Roteiro preliminar</div>
                        <p className="muted-body">{multCurrentItem.description}</p>
                      </div>

                      {Array.isArray(multCurrentItem.objectives) && multCurrentItem.objectives.length > 0 ? (
                        <div className="info-box video-detail-box">
                          <div className="link-card-title">Objetivos da videoaula</div>
                          <ul className="muted-body">
                            {multCurrentItem.objectives.map((objective) => (
                              <li key={objective}>{objective}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {Array.isArray(multCurrentItem.topics) && multCurrentItem.topics.length > 0 ? (
                        <div className="info-box video-detail-box">
                          <div className="link-card-title">Tópicos abordados</div>
                          <ul className="muted-body">
                            {multCurrentItem.topics.map((topic) => (
                              <li key={topic}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      <button
                        className="button video-complete-button"
                        onClick={() => {
                          setMultVideoDone()
                          markMultSeen(multScreenIndex)
                        }}
                      >
                        Registrar videoaula como assistida
                      </button>
                    </div>
                  )}

                  {multCurrentItem.type === 'checklist' && (
                    <div className="stack-md">
                      {multCurrentItem.items.map((item) => (
                        <label key={item} className="check-row">
                          <input
                            type="checkbox"
                            checked={!!progressState.multState.checklist[item]}
                            onChange={() => toggleMultChecklist(item)}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {multCurrentItem.type === 'links' && (
                    <div className="grid-2">
                      {multCurrentItem.items.map((link, index) =>
                        link.url ? (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="link-card"
                          >
                            <div className="link-card-title">{link.label}</div>
                            <div className="link-card-url">{link.url}</div>
                            <ExternalLink size={16} aria-hidden="true" focusable="false" />
                          </a>
                        ) : (
                          <div key={index} className="info-box">
                            <div className="link-card-title">{link.label}</div>
                            {link.note ? <p className="muted-body">{link.note}</p> : null}
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {multCurrentItem.type === 'activity' && (
                    <div className="stack-md">
                      <div className="info-box">{multCurrentItem.prompt}</div>
                      <details className="details-box">
                        <summary>Ver orientação de resposta</summary>
                        <p>{multCurrentItem.reflection}</p>
                      </details>

                      <button
                        className="button"
                        onClick={() => {
                          setMultActivityDone()
                          markMultSeen(multScreenIndex)
                        }}
                      >
                        Registrar atividade como concluída
                      </button>
                    </div>
                  )}

                  {multCurrentItem.type === 'habilitacao' && (
                    <div className="stack-md">
                      <div className="info-box muted-body">{multCurrentItem.observacao}</div>
                      <ul className="muted-body">
                        {multCurrentItem.requisitos.map((requisito, index) => (
                          <li key={index}>{requisito}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="actions-between">
                    <button
                      className="button button-outline"
                      disabled={multScreenIndex === 0}
                      onClick={() => setMultScreenIndex((s) => Math.max(0, s - 1))}
                    >
                      Voltar
                    </button>

                    <button className="button" onClick={completeMultCurrentStepAndAdvance}>
                      Registrar tela e avançar
                    </button>
                  </div>
                </ScreenCard>
              )}

              {multScreenIndex === multiplicadorContent.length && (
                <ScreenCard title="Quiz do módulo de multiplicadores" icon={CheckCircle2}>
                  {carregandoMultQuiz ? (
                    <div className="info-box muted-body" role="status">
                      Sorteando as questões do módulo...
                    </div>
                  ) : null}
                  {erroMultQuiz ? (
                    <div className="warning-text" role="alert">
                      {erroMultQuiz}
                    </div>
                  ) : null}
                  <div className="stack-lg">
                    {activeMultQuiz.map((q, idx) => (
                      <div key={`mult-${idx}-${q.id}`} className="quiz-box">
                        <div className="quiz-question">
                          {idx + 1}. {q.question}
                        </div>

                        <div className="stack-sm">
                          {q.options.map((opt, optionIndex) => (
                            <label key={`mult-${idx}-${optionIndex}-${opt}`} className="radio-row">
                              <input
                                type="radio"
                                name={`mult-${idx}`}
                                checked={progressState.multState.quizAnswers[idx]?.alternativa === optionIndex}
                                disabled={respondendoMultQuiz || progressState.multState.quizAnswers[idx] !== undefined}
                                onChange={() => answerMultQuiz(idx, optionIndex)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="quiz-status-panel">
                    <div className="quiz-status-grid">
                      <div className="quiz-status-item">
                        <span className="mini-muted">Respondidas</span>
                        <div className="quiz-status-value">
                          {multAnsweredCount}/{multTotalQuestions}
                        </div>
                      </div>
                      <div className="quiz-status-item">
                        <span className="mini-muted">Acertos</span>
                        <div className="quiz-status-value">
                          {multQuizResult.correct}/{multQuizResult.total}
                        </div>
                      </div>
                      <div className="quiz-status-item">
                        <span className="mini-muted">Mínimo</span>
                        <div className="quiz-status-value">70%</div>
                      </div>
                    </div>
                    <div className={`quiz-status-label ${multQuizStatusTone}`}>
                      <div className="icon-box small" style={{ background: 'transparent', color: 'inherit' }}>
                        {multQuizStatusTone === 'success' ? (
                          <CheckCircle2 size={16} />
                        ) : multQuizStatusTone === 'warning' ? (
                          <AlertTriangle size={16} />
                        ) : (
                          <Shield size={16} />
                        )}
                      </div>
                      {multQuizStatusLabel}
                    </div>
                  </div>

                  <div className="info-box muted-body">
                    Resultado atual: {multQuizResult.correct}/{multQuizResult.total} acertos. Aproveitamento
                    mínimo: 70%.
                  </div>

                  <div className="actions-row">
                    <button
                      className="button button-outline"
                      onClick={() => setMultScreenIndex(multiplicadorContent.length - 1)}
                    >
                      Voltar ao conteúdo
                    </button>

                    <button
                      className="button button-outline"
                      onClick={retryMultQuiz}
                      disabled={
                        progressState.multState.completed ||
                        Object.keys(progressState.multState.quizAnswers || {}).length === 0
                      }
                    >
                      Refazer quiz do módulo
                    </button>

                    <button
                      className="button"
                      disabled={
                        !(progressState.multState.activityDone && progressState.multState.videoDone && multQuizResult.passed)
                      }
                      onClick={completeMultiplicadores}
                    >
                      Concluir módulo de multiplicadores
                    </button>
                  </div>

                  {!progressState.multState.activityDone || !progressState.multState.videoDone ? (
                    <div className="warning-text">
                      Para concluir o módulo, registre a videoaula e conclua a atividade prática.
                    </div>
                  ) : null}
                </ScreenCard>
              )}
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

          {currentView === 'module' && selectedModule && sessaoAtiva && (
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
                  <div
                    className="module-step-indicator"
                    aria-label={`Tela ${currentContentStepNumber} de ${totalContentSteps} do conteúdo do módulo`}
                  >
                    Tela {currentContentStepNumber} de {totalContentSteps}
                  </div>

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

                  {currentItem.type === 'transition' && (
                    <LudicTransition title={currentItem.title} description={currentItem.description} />
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
                          <ExternalLink size={16} aria-hidden="true" focusable="false" />
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
                  {carregandoQuiz ? (
                    <div className="info-box muted-body" role="status">
                      Sorteando as questões do módulo...
                    </div>
                  ) : null}
                  {erroQuiz ? (
                    <div className="warning-text" role="alert">
                      {erroQuiz}
                    </div>
                  ) : null}
                  <div className="stack-lg">
                    {activeModuleQuiz.map((q, idx) => (
                      <div key={`${selectedModule.id}-${idx}-${q.id}`} className="quiz-box">
                        <div className="quiz-question">
                          {idx + 1}. {q.question}
                        </div>

                        <div className="stack-sm">
                          {q.options.map((opt, optionIndex) => (
                            <label key={`${selectedModule.id}-${idx}-${optionIndex}-${opt}`} className="radio-row">
                              <input
                                type="radio"
                                name={`${selectedModule.id}-${idx}`}
                                checked={selectedModuleState.quizAnswers[idx]?.alternativa === optionIndex}
                                disabled={respondendoQuiz || selectedModuleState.quizAnswers[idx] !== undefined}
                                onChange={() => answerModuleQuiz(idx, optionIndex)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="quiz-status-panel">
                    <div className="quiz-status-grid">
                      <div className="quiz-status-item">
                        <span className="mini-muted">Respondidas</span>
                        <div className="quiz-status-value">
                          {answeredQuestionsCount}/{totalQuizQuestions}
                        </div>
                      </div>
                      <div className="quiz-status-item">
                        <span className="mini-muted">Acertos</span>
                        <div className="quiz-status-value">
                          {moduleQuizResult.correct}/{moduleQuizResult.total}
                        </div>
                      </div>
                      <div className="quiz-status-item">
                        <span className="mini-muted">Mínimo</span>
                        <div className="quiz-status-value">70%</div>
                      </div>
                    </div>
                    <div className={`quiz-status-label ${quizStatusTone}`}>
                      <div className="icon-box small" style={{ background: 'transparent', color: 'inherit' }}>
                        {quizStatusTone === 'success' ? (
                          <CheckCircle2 size={16} />
                        ) : quizStatusTone === 'warning' ? (
                          <AlertTriangle size={16} />
                        ) : (
                          <Shield size={16} />
                        )}
                      </div>
                      {quizStatusLabel}
                    </div>
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
                      disabled={
                        concluindoModulo ||
                        !(selectedModuleState.activityDone && selectedModuleState.videoDone && moduleQuizResult.passed)
                      }
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

                  {erroModulo ? (
                    <div className="warning-text" role="alert">
                      {erroModulo}
                    </div>
                  ) : null}
                </ScreenCard>
              )}
            </motion.div>
          )}

          {currentView === 'final-review' && sessaoAtiva && (
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

                <button className="button" onClick={iniciarAvaliacaoFinal} disabled={carregandoFinal}>
                  {carregandoFinal ? 'Preparando a avaliação...' : 'Iniciar avaliação final integradora'}
                </button>
                {erroFinal ? (
                  <div className="warning-text" role="alert">
                    {erroFinal}
                  </div>
                ) : null}
              </ScreenCard>
            </motion.div>
          )}

          {currentView === 'final-assessment' && sessaoAtiva && (
            <ScreenCard title="Avaliação final integradora" icon={Award}>
              <p className="muted-body">
                Estudo de caso transversal para verificar identificação do golpe, falhas preventivas, ordem correta da reação, preservação de provas e escolha do canal institucional adequado.
              </p>

              {quizFinal ? (
                <div className="stack-lg">
                  {quizFinal.perguntas.map((q, idx) => (
                    <div key={q.id} className="quiz-box">
                      <div className="quiz-question">
                        {idx + 1}. {q.question}
                      </div>

                      <div className="stack-sm">
                        {q.options.map((opt, optionIndex) => (
                          <label key={`${q.id}-${optionIndex}`} className="radio-row">
                            <input
                              type="radio"
                              name={`final-${idx}`}
                              checked={respostasFinal[idx] === optionIndex}
                              disabled={enviandoFinal || !!resultadoFinal}
                              onChange={() => answerFinalAssessment(idx, optionIndex)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="info-box muted-body">Inicie a avaliação para ver as questões.</div>
              )}

              <div className="final-assessment-status-panel">
                <div className="final-assessment-status-grid">
                  <div className="quiz-status-item">
                    <span className="mini-muted">Respondidas</span>
                    <div className="quiz-status-value">
                      {finalAnsweredCount}/{finalTotalQuestions}
                    </div>
                  </div>
                  <div className="quiz-status-item">
                    <span className="mini-muted">Acertos</span>
                    <div className="quiz-status-value">
                      {resultadoFinal ? `${resultadoFinal.acertos}/${resultadoFinal.total}` : '—'}
                    </div>
                  </div>
                  <div className="quiz-status-item">
                    <span className="mini-muted">Mínimo</span>
                    <div className="quiz-status-value">
                      {quizFinal?.notaMinima ?? 13} de {quizFinal?.total ?? 18}
                    </div>
                  </div>
                </div>
                <div className={`quiz-status-label ${finalAssessmentStatusTone}`}>
                  <div className="icon-box small" style={{ background: 'transparent', color: 'inherit' }}>
                    {finalAssessmentStatusTone === 'success' ? (
                      <CheckCircle2 size={16} />
                    ) : finalAssessmentStatusTone === 'warning' ? (
                      <AlertTriangle size={16} />
                    ) : (
                      <Shield size={16} />
                    )}
                  </div>
                  {finalAssessmentStatusLabel}
                </div>
              </div>

              {resultadoFinal ? (
                <div className="info-box muted-body">
                  Resultado: {resultadoFinal.acertos} de {resultadoFinal.total} acertos. Nota mínima:{' '}
                  {resultadoFinal.notaMinima}. Tentativa {resultadoFinal.numero} de {TENTATIVAS_FINAL_MAX}.
                </div>
              ) : null}

              {finalAprovadaAgora && (
                <div className="final-assessment-success-box">
                  <div className="ludic-header" style={{ marginBottom: '8px' }}>
                    <CheckCircle2 size={18} className="success-icon" aria-hidden="true" focusable="false" />
                    <span className="ludic-title" style={{ fontSize: '0.9rem', color: '#065f46' }}>Avaliação aprovada!</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#065f46' }}>
                    Avaliação concluída com sucesso. O certificado já pode ser emitido.
                  </p>
                </div>
              )}

              {erroFinal && quizFinal ? (
                <div className="warning-text" role="alert">
                  {erroFinal}
                </div>
              ) : null}

              <div className="actions-row">
                {!resultadoFinal ? (
                  <button
                    className="button"
                    onClick={enviarAvaliacaoFinal}
                    disabled={!quizFinal || !hasAnsweredAllFinalQuestions || enviandoFinal}
                  >
                    {enviandoFinal ? 'Enviando...' : 'Enviar avaliação'}
                  </button>
                ) : null}

                {resultadoFinal && !resultadoFinal.aprovada && resultadoFinal.numero < TENTATIVAS_FINAL_MAX ? (
                  <button className="button button-outline" onClick={iniciarAvaliacaoFinal} disabled={carregandoFinal}>
                    Iniciar nova tentativa
                  </button>
                ) : null}

                <button
                  className="button"
                  onClick={() => setCurrentView('certificate')}
                  disabled={!finalAprovadaAgora}
                >
                  Ir para certificação
                </button>
              </div>

              {!finalAprovadaAgora ? (
                <div className="warning-text">
                  Conclua a avaliação com aproveitamento mínimo para liberar o certificado.
                </div>
              ) : null}
            </ScreenCard>
          )}

          {currentView === 'certificate' && sessaoAtiva && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stack-lg">
              <ScreenCard title="Certificação" icon={Award}>
                <div className="certificate-box">
                  <Award size={48} />
                  <h3>Parabéns pela conclusão</h3>
                  <p>
                    Você concluiu a trilha formativa e foi aprovado na avaliação final integradora. O curso reforça a tríade: identificar o risco, prevenir com método e reagir com segurança.
                  </p>
                  <div className="muted-small">
                    O nome e o código verificador vêm do seu cadastro e são gerados pelo servidor.
                  </div>
                </div>

                <div className="tabs-grid">
                  <div className="info-box">
                    <div className="link-card-title">Emitir certificado</div>
                    <div className="line-list">
                      <div>Curso: {courseIntro.title} — {courseIntro.subtitle}</div>
                      <div>Carga horária sugerida: {CERTIFICATE_WORKLOAD}</div>
                      <div>Status: concluído com aproveitamento</div>
                      <div>Versão do curso: {COURSE_VERSION}</div>
                    </div>

                    <p className="muted-body">
                      O nome do certificado é o informado no cadastro. O PDF traz data de conclusão, versão do curso e o código verificador emitido pelo servidor.
                    </p>

                    <div className="stack-sm" style={{ marginTop: '12px' }}>
                      {certificado ? (
                        <div className="line-list">
                          <div>Nome no certificado: {certificado.nome}</div>
                          <div>Código verificador: {certificado.codigo}</div>
                        </div>
                      ) : null}

                      {emitindoCertificado ? (
                        <div className="muted-body" role="status">Emitindo certificado...</div>
                      ) : null}

                      {erroCertificado ? (
                        <div className="warning-text" role="alert">
                          {erroCertificado}
                        </div>
                      ) : null}

                      {!certificado && !emitindoCertificado ? (
                        <button className="button button-outline" onClick={emitirCertificado}>
                          Emitir certificado
                        </button>
                      ) : null}

                      <button className="button" onClick={generateCertificatePdf} disabled={!certificado}>
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
