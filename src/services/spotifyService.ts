const SPOTIFY_ACCOUNTS_BASE = 'https://accounts.spotify.com/api'
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'

let accessToken = ''
let tokenExpiration = 0

const getClientCredentials = async (): Promise<string> => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string | undefined
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string | undefined

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify API credentials. Set VITE_SPOTIFY_CLIENT_ID and VITE_SPOTIFY_CLIENT_SECRET in .env')
  }

  const authString = btoa(`${clientId}:${clientSecret}`)
  const res = await fetch(`${SPOTIFY_ACCOUNTS_BASE}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authString}`,
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to get Spotify token: ${res.status} ${text}`)
  }

  const data = (await res.json()) as { access_token: string; token_type: string; expires_in: number }
  accessToken = data.access_token
  // expire 60s early to avoid race
  tokenExpiration = Date.now() + (data.expires_in - 60) * 1000
  return accessToken
}

export const getAccessToken = async (): Promise<string> => {
  if (!accessToken || Date.now() >= tokenExpiration) {
    await getClientCredentials()
  }
  return accessToken
}

export const fetchArtistTopTracks = async (artistId: string) => {
  const token = await getAccessToken()
  const res = await fetch(`${SPOTIFY_API_BASE}/artists/${artistId}/top-tracks?market=US`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to fetch top tracks: ${res.status}`)
  const data = await res.json()
  return data.tracks as any[]
}

export const fetchArtistData = async (artistId: string) => {
  const token = await getAccessToken()
  const res = await fetch(`${SPOTIFY_API_BASE}/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to fetch artist: ${res.status}`)
  return (await res.json()) as any
}

export const fetchPlaylistTracks = async (playlistId: string) => {
  const token = await getAccessToken()
  const res = await fetch(`${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks?market=US`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to fetch playlist tracks: ${res.status}`)
  const data = await res.json()
  return data.items as any[]
}
