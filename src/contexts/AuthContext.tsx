import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { beginLogin, handleAuthCallback, refreshToken as doRefresh } from '../auth/spotifyAuth'

interface AuthContextType {
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null
  login: () => void
  logout: () => void
  ready: boolean
}

const AuthCtx = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  login: () => {},
  logout: () => {},
  ready: false,
})

export const useAuth = () => useContext(AuthCtx)

const LS_KEY = 'spotify_auth_state_v1'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<number | null>(null)
  const [ready, setReady] = useState(false)

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setAccessToken(parsed.accessToken || null)
        setRefreshToken(parsed.refreshToken || null)
        setExpiresAt(parsed.expiresAt || null)
      }
    } finally {
      setReady(true)
    }
  }, [])

  // handle callback if code present
  useEffect(() => {
    ;(async () => {
      try {
        const tokens = await handleAuthCallback()
        if (tokens) {
          const now = Date.now()
          const expiresAtTs = now + (tokens.expires_in - 60) * 1000
          setAccessToken(tokens.access_token)
          setRefreshToken(tokens.refresh_token || null)
          setExpiresAt(expiresAtTs)
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token || null, expiresAt: expiresAtTs })
          )
        }
      } catch (e) {
        console.error('Spotify auth callback error', e)
      }
    })()
  }, [])

  // refresh timer
  useEffect(() => {
    if (!refreshToken || !expiresAt) return
    const ms = Math.max(10_000, expiresAt - Date.now() - 30_000)
    const id = setTimeout(async () => {
      try {
        const data = await doRefresh(refreshToken)
        const now = Date.now()
        const nextExp = now + (data.expires_in - 60) * 1000
        setAccessToken(data.access_token)
        setExpiresAt(nextExp)
        localStorage.setItem(LS_KEY, JSON.stringify({ accessToken: data.access_token, refreshToken, expiresAt: nextExp }))
      } catch (e) {
        console.error('Spotify refresh failed', e)
      }
    }, ms)
    return () => clearTimeout(id)
  }, [refreshToken, expiresAt])

  const login = () => beginLogin()
  const logout = () => {
    setAccessToken(null)
    setRefreshToken(null)
    setExpiresAt(null)
    localStorage.removeItem(LS_KEY)
  }

  const value = useMemo(
    () => ({ accessToken, refreshToken, expiresAt, login, logout, ready }),
    [accessToken, refreshToken, expiresAt, ready]
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
