import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'

interface WebPlaybackContextType {
  deviceId: string | null
  playerReady: boolean
}

const WPCTX = createContext<WebPlaybackContextType>({ deviceId: null, playerReady: false })

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void
    Spotify?: any
  }
}

const loadSdk = () =>
  new Promise<void>((resolve) => {
    if (window.Spotify) return resolve()
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)
    window.onSpotifyWebPlaybackSDKReady = () => resolve()
  })

export const useWebPlayback = () => useContext(WPCTX)

export const SpotifyWebPlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accessToken } = useAuth()
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    let player: any
    let cancelled = false
    if (!accessToken) return

    ;(async () => {
      await loadSdk()
      if (cancelled) return
      player = new window.Spotify.Player({
        name: 'Portfolio Player',
        getOAuthToken: (cb: (t: string) => void) => cb(accessToken),
        volume: 0.8,
      })

      player.addListener('ready', ({ device_id }: any) => {
        setDeviceId(device_id)
        setPlayerReady(true)
        console.log('Spotify Web Playback ready on device', device_id)
      })
      player.addListener('not_ready', ({ device_id }: any) => {
        console.log('Device ID has gone offline', device_id)
        setPlayerReady(false)
      })
      player.addListener('initialization_error', ({ message }: any) => console.error(message))
      player.addListener('authentication_error', ({ message }: any) => console.error(message))
      player.addListener('account_error', ({ message }: any) => console.error(message))

      await player.connect()
    })()

    return () => {
      cancelled = true
      try {
        player?.disconnect()
      } catch {}
    }
  }, [accessToken])

  const value = useMemo(() => ({ deviceId, playerReady }), [deviceId, playerReady])
  return <WPCTX.Provider value={value}>{children}</WPCTX.Provider>
}
