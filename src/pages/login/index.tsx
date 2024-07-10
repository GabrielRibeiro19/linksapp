import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { FormEvent, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa6'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    setIsLoading(true)
    e.preventDefault()

    if (email === '' || password === '') {
      toast.error('Preencha todos os campos!')
      setIsLoading(false)
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false)
        navigate('/admin', { replace: true })
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error)
        setIsLoading(false)
        toast.error('Email ou senha incorretos!')
      })
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-tr from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-4 xl:px-0"
      >
        <Input
          placeholder="Digite o seu email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading ? (
          <button
            type="button"
            className="h-9 bg-blue-600/50 rounded-md border-0 text-lg font-medium text-white flex justify-center items-center cursor-not-allowed hover:bg-opacity-50 duration-300"
            disabled
          >
            <FaSpinner className="animate-spin" />
          </button>
        ) : (
          <button
            type="submit"
            className="h-9 bg-blue-600 rounded-md border-0 text-lg font-medium text-white"
          >
            Acessar
          </button>
        )}
      </form>
    </div>
  )
}
