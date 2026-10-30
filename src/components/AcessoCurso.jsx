import { useState } from 'react'
import { KeyRound, LogIn, UserPlus } from 'lucide-react'

const MIN_SENHA = 8

const ABAS = [
  { id: 'entrar', label: 'Entrar', icon: LogIn },
  { id: 'cadastrar', label: 'Criar conta', icon: UserPlus },
  { id: 'recuperar', label: 'Esqueci minha senha', icon: KeyRound },
]

const REQUISITOS = [
  'Conta com e-mail pessoal válido, usada para acompanhar seu progresso.',
  'Navegador atualizado e conexão com a internet.',
  'Tempo estimado de estudo: {carga}.',
  'Concluir os seis módulos, com conteúdo, videoaula, atividade prática e quiz de cada módulo.',
  'Ser aprovado na avaliação final integradora: 13 acertos em 18 questões.',
]

const MENSAGENS_ERRO = [
  ['Invalid login credentials', 'E-mail ou senha incorretos.'],
  ['Email not confirmed', 'Confirme seu e-mail antes de entrar. Verifique também a caixa de spam.'],
  ['User already registered', 'Já existe uma conta com este e-mail. Entre ou recupere a senha.'],
  ['For security purposes', 'Aguarde alguns instantes antes de tentar de novo.'],
  ['rate limit', 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.'],
  ['Password should be', `A senha precisa ter pelo menos ${MIN_SENHA} caracteres.`],
]

function urlDeRetorno() {
  return `${window.location.origin}${import.meta.env.BASE_URL}`
}

// Com a confirmação de e-mail ligada, o Supabase não devolve erro para um e-mail já
// cadastrado: responde com um usuário sem identidades, para não revelar quem tem conta.
function contaJaExistia(user) {
  return Array.isArray(user?.identities) && user.identities.length === 0
}

function mensagemDeErro(error) {
  const texto = String(error?.message || '')
  const encontrada = MENSAGENS_ERRO.find(([trecho]) => texto.includes(trecho))

  return encontrada ? encontrada[1] : 'Não foi possível concluir agora. Verifique a conexão e tente novamente.'
}

export function AcessoCurso({
  supabase,
  courseIntro,
  cargaHoraria,
  apresentacao = true,
  recoveryMode = false,
  onRecoveryDone,
}) {
  const [aba, setAba] = useState('entrar')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')

  function limparMensagens() {
    setErro('')
    setAviso('')
  }

  function trocarAba(novaAba) {
    limparMensagens()
    setAba(novaAba)
  }

  async function entrar(event) {
    event.preventDefault()
    limparMensagens()
    setOcupado(true)

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha })

    setOcupado(false)
    if (error) {
      setErro(mensagemDeErro(error))
      return
    }
    setSenha('')
  }

  async function cadastrar(event) {
    event.preventDefault()
    limparMensagens()

    if (senha.length < MIN_SENHA) {
      setErro(`A senha precisa ter pelo menos ${MIN_SENHA} caracteres.`)
      return
    }

    setOcupado(true)

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
      options: { data: { nome: nome.trim() }, emailRedirectTo: urlDeRetorno() },
    })

    setOcupado(false)
    if (error) {
      setErro(mensagemDeErro(error))
      return
    }

    setSenha('')
    if (contaJaExistia(data?.user)) {
      setAviso(
        'Este e-mail já tem uma conta. Se você já confirmou o cadastro, use a aba Entrar com seu e-mail e senha. Se esqueceu a senha, use a aba Esqueci minha senha.',
      )
      return
    }
    if (!data?.session) {
      setAviso(
        'Conta criada. Confirme seu e-mail pelo link que enviamos antes de entrar. Se, depois de clicar, a página do curso não abrir, volte a este site e use a aba Entrar com seu e-mail e senha: a confirmação já terá sido registrada.',
      )
    }
  }

  async function recuperarSenha(event) {
    event.preventDefault()
    limparMensagens()
    setOcupado(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: urlDeRetorno(),
    })

    setOcupado(false)
    if (error) {
      setErro(mensagemDeErro(error))
      return
    }

    setAviso('Se o e-mail estiver cadastrado, você receberá um link para definir uma nova senha.')
  }

  async function definirNovaSenha(event) {
    event.preventDefault()
    limparMensagens()

    if (novaSenha.length < MIN_SENHA) {
      setErro(`A nova senha precisa ter pelo menos ${MIN_SENHA} caracteres.`)
      return
    }

    setOcupado(true)

    const { error } = await supabase.auth.updateUser({ password: novaSenha })

    setOcupado(false)
    if (error) {
      setErro(mensagemDeErro(error))
      return
    }

    setNovaSenha('')
    onRecoveryDone?.()
  }

  const requisitos = REQUISITOS.map((texto) => texto.replace('{carga}', cargaHoraria))

  return (
    <div className="stack-lg">
      {apresentacao ? (
        <section className="card" aria-labelledby="acesso-titulo">
          <div className="card-header">
            <h2 id="acesso-titulo">Bem-vindo ao curso</h2>
          </div>
          <div className="card-body stack-md">
            <p className="muted-body">{courseIntro.description}</p>

            <div className="grid-2">
              {courseIntro.outcomes.map((item) => (
                <div key={item} className="info-box">
                  {item}
                </div>
              ))}
            </div>

            <div className="info-box">
              <div className="link-card-title">Requisitos para participar</div>
              <ul className="muted-body">
                {requisitos.map((texto) => (
                  <li key={texto}>{texto}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {!supabase ? (
        <section className="card" aria-labelledby="acesso-indisponivel">
          <div className="card-header">
            <h2 id="acesso-indisponivel">Acesso indisponível neste ambiente</h2>
          </div>
          <div className="card-body muted-body">
            O serviço de conta não está configurado nesta versão do site, então os módulos e a avaliação ficam
            bloqueados. As áreas públicas (glossário, biblioteca, vídeos, checklists e simulações) seguem disponíveis.
          </div>
        </section>
      ) : (
        <section className="card" aria-labelledby="acesso-form-titulo">
          <div className="card-header">
            <h2 id="acesso-form-titulo">{recoveryMode ? 'Definir nova senha' : 'Acesse sua conta'}</h2>
          </div>
          <div className="card-body stack-md">
            {recoveryMode ? (
              <form className="stack-md" onSubmit={definirNovaSenha}>
                <label className="muted-body" htmlFor="nova-senha">
                  Nova senha (mínimo de {MIN_SENHA} caracteres)
                </label>
                <input
                  id="nova-senha"
                  className="text-input"
                  type="password"
                  autoComplete="new-password"
                  value={novaSenha}
                  onChange={(event) => setNovaSenha(event.target.value)}
                  required
                />
                <button className="button" type="submit" disabled={ocupado}>
                  {ocupado ? 'Salvando...' : 'Salvar nova senha'}
                </button>
              </form>
            ) : (
              <>
                <div className="filter-row" role="group" aria-label="Escolha a forma de acesso">
                  {ABAS.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`filter-chip ${aba === item.id ? 'active' : ''}`}
                        aria-pressed={aba === item.id}
                        onClick={() => trocarAba(item.id)}
                      >
                        <Icon size={14} aria-hidden="true" focusable="false" /> {item.label}
                      </button>
                    )
                  })}
                </div>

                {aba === 'entrar' ? (
                  <form className="stack-md" onSubmit={entrar}>
                    <label className="muted-body" htmlFor="acesso-email-entrar">E-mail</label>
                    <input
                      id="acesso-email-entrar"
                      className="text-input"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                    <label className="muted-body" htmlFor="acesso-senha-entrar">Senha</label>
                    <input
                      id="acesso-senha-entrar"
                      className="text-input"
                      type="password"
                      autoComplete="current-password"
                      value={senha}
                      onChange={(event) => setSenha(event.target.value)}
                      required
                    />
                    <button className="button" type="submit" disabled={ocupado}>
                      {ocupado ? 'Entrando...' : 'Entrar'}
                    </button>
                  </form>
                ) : null}

                {aba === 'cadastrar' ? (
                  <form className="stack-md" onSubmit={cadastrar}>
                    <label className="muted-body" htmlFor="acesso-nome-cadastro">
                      Nome completo, como deve aparecer no certificado
                    </label>
                    <input
                      id="acesso-nome-cadastro"
                      className="text-input"
                      type="text"
                      autoComplete="name"
                      maxLength={90}
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      required
                    />
                    <label className="muted-body" htmlFor="acesso-email-cadastro">E-mail</label>
                    <input
                      id="acesso-email-cadastro"
                      className="text-input"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                    <label className="muted-body" htmlFor="acesso-senha-cadastro">
                      Senha (mínimo de {MIN_SENHA} caracteres)
                    </label>
                    <input
                      id="acesso-senha-cadastro"
                      className="text-input"
                      type="password"
                      autoComplete="new-password"
                      value={senha}
                      onChange={(event) => setSenha(event.target.value)}
                      required
                    />
                    <button className="button" type="submit" disabled={ocupado}>
                      {ocupado ? 'Criando conta...' : 'Criar conta'}
                    </button>
                  </form>
                ) : null}

                {aba === 'recuperar' ? (
                  <form className="stack-md" onSubmit={recuperarSenha}>
                    <label className="muted-body" htmlFor="acesso-email-recuperar">E-mail da conta</label>
                    <input
                      id="acesso-email-recuperar"
                      className="text-input"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                    <button className="button" type="submit" disabled={ocupado}>
                      {ocupado ? 'Enviando...' : 'Enviar link de recuperação'}
                    </button>
                  </form>
                ) : null}
              </>
            )}

            {erro ? (
              <div className="info-box muted-body" role="alert">
                {erro}
              </div>
            ) : null}
            {aviso ? (
              <div className="info-box muted-body" role="status">
                {aviso}
              </div>
            ) : null}
          </div>
        </section>
      )}
    </div>
  )
}
