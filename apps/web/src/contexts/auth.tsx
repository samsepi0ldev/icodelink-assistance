import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { sleep } from '@/utils/sleep'
import { api } from '@/lib/api'

export interface AuthContextProps {
  signIn: (input: AuthContextProps.Input) => Promise<unknown>
  signOut: () => Promise<void>
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  checkAuth: () => Promise<void>
}

export namespace AuthContextProps {
  export type Input = {
    email: string
    password: string
  }
}

interface User {
  id: number
  email: string
  iat: number
  exp: number
}

const Context = createContext<AuthContextProps>({} as AuthContextProps)

const SLEEP_AUTH = 1000

export function AuthContext(props: AuthContext.Props) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function checkAuth () {
    try {
      const response = await api.get<User>('/profile')
      if (response.data.id) {
        setIsAuthenticated(true)
        setUser(response.data)
      }
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  async function signIn(data: AuthContextProps.Input) {
    setIsLoading(true)
    await sleep(SLEEP_AUTH)
    try {
      const response = await api.post('/sign-in', data)
      await checkAuth()
      return response
    } catch (error) {
      throw error
    }
    
  }
  async function signOut() {
    await new Promise((resolve) => resolve)
    setUser(null)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        isLoading,
        checkAuth,
        user
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export namespace AuthContext {
  export type Props = {
    children?: ReactNode
  }
}

export function useAuth() {
  return useContext(Context)
}
