import { FormEvent, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { FiTrash } from 'react-icons/fi'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

interface LinkProps {
  id: string
  name: string
  url: string
  bg: string
  color: string
}

export function Admin() {
  const [nameInput, setNameInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [textColorInput, setTextColorInput] = useState('#f1f1f1')
  const [backgroundColorInput, setBackgroundColorInput] = useState('#121212')

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, 'links')
    const queryRef = query(linksRef, orderBy('created', 'asc'))

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkProps[]

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        })
      })

      setLinks(lista)
    })

    return () => {
      unsub()
    }
  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault()

    if (nameInput === '' || urlInput === '') {
      toast.error('Preencha todos os campos!')
      return
    }

    addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        toast.success('Cadastrado com sucesso!')
        setNameInput('')
        setUrlInput('')
        setBackgroundColorInput('#121212')
        setTextColorInput('#f1f1f1')
      })
      .catch((err) => {
        console.log('Erro ao cadastrar no banco: ', err)
      })
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, 'links', id)
    await deleteDoc(docRef)

    toast.success('Link deletado com sucesso!')
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form
        className="flex flex-col mb-3 mt-8 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium my-2 ">Nome do Link</label>
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Digite o nome do link..."
        />

        <label className="text-white font-medium my-2 ">URL do link</label>
        <Input
          type="url"
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium my-2 ">Cor do link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium my-2 ">
              Fundo do link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 my-2"
              style={{ background: backgroundColorInput }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center hover:bg-opacity-50 duration-300"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>
      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ color: link.color, backgroundColor: link.bg }}
        >
          <p>{link.name}</p>
          <div>
            <button
              className="border border-dashed p-1 rounded bg-black"
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
