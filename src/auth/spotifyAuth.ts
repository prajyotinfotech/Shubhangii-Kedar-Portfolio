// Lightweight PKCE auth utilities for Spotify Authorization Code with PKCE
// Requires env: VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_REDIRECT_URI

const AUTH_URL = 'https://accounts.spotify.com/authorize'
const TOKEN_URL = 'https://accounts.spotify.com/api/token'

const scope = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming',
  'user-read-email',
  'user-read-private',
].join(' ')

const base64UrlEncode = (arrayBuffer: ArrayBuffer) => {
  const bytes = new Uint8Array(arrayBuffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const sha256 = async (verifier: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return base64UrlEncode(digest)
}

export const createCodeVerifier = () => {
  const array = new Uint8Array(64)
  crypto.getRandomValues(array)
  return Array.from(array, (d) => ('0' + d.toString(16)).slice(-2)).join('')
}

export const beginLogin = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string
  if (!clientId || !redirectUri) throw new Error('Missing Spotify client or redirect URI')

  const verifier = createCodeVerifier()
  localStorage.setItem('spotify_code_verifier', verifier)
  const challenge = await sha256(verifier)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    redirect_uri: redirectUri,
  })

  window.location.href = `${AUTH_URL}?${params.toString()}`
}

export const handleAuthCallback = async (): Promise<{ access_token: string; refresh_token?: string; expires_in: number } | null> => {
  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  if (!code) return null

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string
  const verifier = localStorage.getItem('spotify_code_verifier') || ''

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  })

  const res = await fetch(TOKEN_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
  if (!res.ok) throw new Error(`Spotify token exchange failed: ${res.status}`)
  const data = await res.json()
  // remove code from URL
  url.searchParams.delete('code')
  url.searchParams.delete('state')
  window.history.replaceState({}, '', url.toString())
  return data
}

export const refreshToken = async (refresh_token: string) => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
    client_id: clientId,
  })
  const res = await fetch(TOKEN_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
  if (!res.ok) throw new Error(`Spotify token refresh failed: ${res.status}`)
  return res.json()
}
