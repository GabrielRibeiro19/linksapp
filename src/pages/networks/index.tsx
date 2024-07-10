import { FormEvent, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'

export function Networks() {
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, 'social', 'link')
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setFacebook(snapshot.data()?.facebook)
            setInstagram(snapshot.data()?.instagram)
            setYoutube(snapshot.data()?.youtube)
          }
        })
        .catch((err) => {
          toast.error('Erro ao carregar os links!')
          console.error(err)
        })
    }

    loadLinks()
  }, [])

  function handleRegister(e: FormEvent) {
    setIsLoading(true)
    e.preventDefault()

    setDoc(doc(db, 'social', 'link'), {
      facebook,
      instagram,
      youtube,
    })
      .then(() => {
        toast.success('Links salvos com sucesso!')
        setIsLoading(false)
      })
      .catch((err) => {
        toast.error('Erro ao salvar os links!')
        setIsLoading(false)
        console.error(err)
      })
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas redes sociais
      </h1>
      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium my-2">Link do facebook</label>
        <Input
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          type="url"
          placeholder="Digite a url do facebook..."
        />

        <label className="text-white font-medium my-2">Link do instagram</label>
        <Input
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          type="url"
          placeholder="Digite a url do instagram..."
        />

        <label className="text-white font-medium my-2">Link do youtube</label>
        <Input
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          type="url"
          placeholder="Digite a url do youtube..."
        />

        {isLoading ? (
          <button
            type="button"
            className="text-white bg-blue-600/50 h-9 rounded-md flex items-center justify-center mb-7 font-medium cursor-not-allowed"
          >
            <FaSpinner className="animate-spin" />
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-blue-600 h-9 rounded-md flex items-center justify-center mb-7 font-medium"
          >
            Salvar links
          </button>
        )}
      </form>
    </div>
  )
}
