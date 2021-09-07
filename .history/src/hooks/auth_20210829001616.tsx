import React, {createContext, ReactNode, useContext} from 'react'
import { useState } from 'react'

import * as AuthSession from 'expo-auth-session'

import {
  REDIRECT_URI,
  SCOPE,
  RESPONSE_TYPE,
  CLIENT_ID,
  CDN_IMAGE
} from '../configs/discordAuth'
import { api } from '../services/api'

type User = {
  id: string
  username: string
  firstName: string
  avatar:string
  email: string
  token: string
}

type UserContextProvider = {
  user: User;
  loading: boolean
  signIn: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string
  }
}

export const AuthContext = createContext({} as UserContextProvider)

function AuthProvider({children}: AuthProviderProps){
  const [user,setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(false)

  async function signIn(){
    try{
      setLoading(true)
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      // starting authentication service and it needs a auhentication url
      //console.log(authUrl)
      const { type, params} = await AuthSession.startAsync({ authUrl}) as AuthorizationResponse
      if(type == "success") {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`
        const userInfo = api.get('/users/@me')
        console.log(userInfo)

        setLoading(false)
      }

    }catch (error){
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{user, signIn, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth (){
  const context = useContext(AuthContext)
  return context
}

export{
  AuthProvider,
  useAuth
}