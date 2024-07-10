import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Social } from '../../components/Social'
import { useEffect, useState } from 'react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

interface LinkProps {
  id: string
  name: string
  url: string
  bg: string
  color: string
}

interface SocialLinkProps {
  facebook: string
  instagram: string
  youtube: string
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>()

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, 'links')
      const queryRef = query(linksRef, orderBy('created', 'asc'))

      getDocs(queryRef).then((snapshot) => {
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
    }

    loadLinks()
  }, [])

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, 'social', 'link')
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          })
        }
      })
    }

    loadSocialLinks()
  }, [])

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Gabriel Ribeiro
      </h1>
      <span className="md:text-2xl text-xl text-gray-50 mb-2 mt-1">
        Software Developer
      </span>
      <span className="text-gray-50 mb-5">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            style={{
              backgroundColor: link.bg,
            }}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="_blank" rel="noreferrer">
              <p
                className="text-base md:text-lg"
                style={{
                  color: link.color,
                }}
              >
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            {socialLinks?.facebook && (
              <Social url={socialLinks?.facebook}>
                <FaFacebook size={35} color="#fff" />
              </Social>
            )}
            {socialLinks?.youtube && (
              <Social url={socialLinks?.youtube}>
                <FaYoutube size={35} color="#fff" />
              </Social>
            )}
            {socialLinks?.instagram && (
              <Social url={socialLinks?.instagram}>
                <FaInstagram size={35} color="#fff" />
              </Social>
            )}
          </footer>
        )}
      </main>
    </div>
  )
}
