import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchArtistData, fetchArtistTopTracks } from '../services/spotifyService'

export interface SpotifyContextType {
  artist: any | null
  topTracks: any[]
  loading: boolean
  error: string | null
}

const Ctx = createContext<SpotifyContextType>({ artist: null, topTracks: [], loading: true, error: null })

export const useSpotify = () => useContext(Ctx)

export const SpotifyProvider: React.FC<{ artistId: string; children: React.ReactNode }> = ({ artistId, children }) => {
  const [artist, setArtist] = useState<any | null>(null)
  const [topTracks, setTopTracks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const [a, t] = await Promise.all([
          fetchArtistData(artistId),
          fetchArtistTopTracks(artistId),
        ])
        if (cancelled) return
        setArtist(a)
        setTopTracks(t ?? [])
      } catch (e: any) {
        if (cancelled) return
        setError(e?.message || 'Failed to load Spotify data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [artistId])

  const value = useMemo(() => ({ artist, topTracks, loading, error }), [artist, topTracks, loading, error])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
