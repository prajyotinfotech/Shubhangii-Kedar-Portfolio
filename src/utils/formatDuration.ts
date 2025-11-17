export const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const s = String(seconds).padStart(2, '0')
  return `${minutes}:${s}`
}
