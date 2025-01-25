import { useState, useEffect, createContext } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'

export const UserContext = createContext({})



export function UserContextProvider({children}) {
  const [loading, setLoading] = useState(true)
  const [userSession, setUserSession] = useState({})

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:5001/api/isAuth', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent with the request
        })
        if (!res.ok) return setLoading(false)
        console.log('session ', await res.json())
        setUserSession(await res.json())
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('There was an error fetch auth', error)
        return
      }
    }
    fetchUserAuth()
  }, [])

  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
      {/* <ThemeProvider theme={theme}> */}
        {loading ? <>loading...</> : children}
      {/* </ThemeProvider> */}
    </UserContext.Provider>
  )
}

