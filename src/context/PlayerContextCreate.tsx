import { type RefObject, type Dispatch, type SetStateAction, createContext } from "react"

export interface TrackType {
  id?: number
  title?: string
  artist?: string
  src?: string
  cover?: string
  dur?: string
}

export interface PlayerContextType {
  audioRef: RefObject<HTMLAudioElement>
  seekBg: RefObject<HTMLDivElement>
  seekBar: RefObject<HTMLHRElement>
  track: TrackType
  setTrack: Dispatch<SetStateAction<TrackType>>
  playerStatus: boolean
  setPlayerStatus: Dispatch<SetStateAction<boolean>>
  time: {
    currentTime: {
      second: number
      minute: number
    }
    totalTime: {
      second: number
      minute: number
    }
  }
  setTime: Dispatch<
    SetStateAction<{
      currentTime: {
        second: number
        minute: number
      }
      totalTime: {
        second: number
        minute: number
      }
    }>
  >
  play: () => void
  pause: () => void
  playWithId: (id: number) => Promise<void>
  previous: () => Promise<void>
  next: () => Promise<void>
  seekSong: (e: React.MouseEvent<HTMLHRElement>) => Promise<void>
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined)
