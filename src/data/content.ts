export type FeatureStat = {
  label: string
  value: number
}

export type MusicLink = {
  label: string
  href: string
}

export type MusicRelease = {
  title: string
  meta: string
  gradient: [string, string]
  links: MusicLink[]
}

export type EventItem = {
  day: string
  month: string
  title: string
  meta: string
  ticketUrl: string
}

export type PlaylistTrack = {
  title: string
  artist: string
  album: string
  dateAdded: string
  duration: string
  color: string
  src: string
}

export type IconName =
  | 'spotify'
  | 'youtube'
  | 'instagram'
  | 'twitter'
  | 'mail'
  | 'phone'
  | 'location'

export type GalleryItem = {
  title: string
  description: string
  gradient: [string, string]
  aspect?: 'tall' | 'wide' | 'square'
}

export type Testimonial = {
  quote: string
  author: string
}

export type ContactItem = {
  icon: IconName
  label: string
  value: string
}

export type SocialLink = {
  label: string
  href: string
  icon: IconName
}

export const featureStats: FeatureStat[] = [
  { label: 'Followers', value: 120000 },
  { label: 'Tracks', value: 58 },
  { label: 'Awards', value: 32 },
]

export const aboutStats: FeatureStat[] = [
  { label: 'Performances', value: 500 },
  { label: 'Singles Released', value: 15 },
  { label: 'Awards', value: 50 },
]

export const musicReleases: MusicRelease[] = [
  {
    title: 'Midnight Dreams',
    meta: 'Single • 2024',
    gradient: ['#667eea', '#764ba2'],
    links: [
      { label: 'Spotify', href: '#' },
      { label: 'Apple Music', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
  {
    title: 'Echoes of You',
    meta: 'Single • 2024',
    gradient: ['#f093fb', '#f5576c'],
    links: [
      { label: 'Spotify', href: '#' },
      { label: 'Apple Music', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
  {
    title: 'Golden Hour',
    meta: 'Single • 2023',
    gradient: ['#4facfe', '#00f2fe'],
    links: [
      { label: 'Spotify', href: '#' },
      { label: 'Apple Music', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
]

export const events: EventItem[] = [
  {
    day: '12',
    month: 'DEC',
    title: 'Winter Lights Festival',
    meta: 'Berlin, Germany • Tempodrom',
    ticketUrl: '#',
  },
  {
    day: '23',
    month: 'JAN',
    title: 'Acoustic Night',
    meta: 'Paris, France • Olympia',
    ticketUrl: '#',
  },
  {
    day: '04',
    month: 'FEB',
    title: 'Golden Hour Live',
    meta: 'London, UK • Royal Albert Hall',
    ticketUrl: '#',
  },
]

export const playlistTracks: PlaylistTrack[] = [
  {
    title: 'Midnight Dreams',
    artist: 'Aria Rose',
    album: 'Neon Skies',
    dateAdded: 'Oct 5, 2024',
    duration: '3:22',
    color: '#5A8DEE',
    src: 'https://soundcloud.com/raj-88/govyachya-kinaryav-original?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  },
  {
    title: 'Echoes of You',
    artist: 'Aria Rose',
    album: 'Echoes',
    dateAdded: 'Sep 18, 2024',
    duration: '3:48',
    color: '#FF6B9D',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Golden Hour',
    artist: 'Aria Rose',
    album: 'Horizons',
    dateAdded: 'Aug 10, 2023',
    duration: '4:05',
    color: '#1DB954',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
]

export const galleryItems: GalleryItem[] = [
  {
    title: 'Performance 1',
    description: 'Live at Madison Square',
    gradient: ['#fa709a', '#fee140'],
    aspect: 'tall',
  },
  {
    title: 'Studio Session',
    description: 'Recording Studio',
    gradient: ['#a8edea', '#fed6e3'],
    aspect: 'wide',
  },
  {
    title: 'Backstage',
    description: 'Behind the Scenes',
    gradient: ['#d299c2', '#fef9d7'],
    aspect: 'wide',
  },
  {
    title: 'Concert Tour',
    description: 'World Tour 2024',
    gradient: ['#ff9a9e', '#fecfef'],
    aspect: 'tall',
  },
  {
    title: 'Music Video',
    description: 'Music Video Shoot',
    gradient: ['#ffecd2', '#fcb69f'],
    aspect: 'square',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote: '“A voice that lingers long after the last note. Captivating and soulful.”',
    author: '— SoundWave Magazine',
  },
  {
    quote: '“Her live shows are pure magic. An unforgettable experience.”',
    author: '— City Arts Weekly',
  },
  {
    quote: '“A rising star redefining modern pop with elegance.”',
    author: '— The Music Journal',
  },
]

export const contactItems: ContactItem[] = [
  {
    icon: 'mail',
    label: 'Email',
    value: 'aria.rose@music.com',
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '+1 (555) 123-4567',
  },
  {
    icon: 'location',
    label: 'Location',
    value: 'Los Angeles, CA',
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'Spotify', href: '#', icon: 'spotify' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'Twitter', href: '#', icon: 'twitter' },
]
