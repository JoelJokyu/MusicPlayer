"use client"

import type React from "react"

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react"
import TRACKS from "../data/tracks"
import { PlayerContext, type PlayerContextType } from "./PlayerContextCreate"

interface PlayerContextProviderProps {
  children: ReactNode
}

const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const seekBg = useRef<HTMLDivElement>(null)
  const seekBar = useRef<HTMLHRElement>(null)
  const [track, setTrack] = useState(TRACKS[0])
  const [playerStatus, setPlayerStatus] = useState(false)
  const [loop, setLoop] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(1)
  const [queueTrackId, setQueueTrackId] = useState<number | null>(null)
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  })

  useEffect(() => {
    if (!audioRef.current || !track.src) return
    audioRef.current.src = track.src
    if (playerStatus) {
      audioRef.current.play().catch((err) => {
        console.log("[v0] Error playing audio:", err)
      })
    }
  }, [track, playerStatus])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const nextTrack = async () => {
    if (queueTrackId !== null) {
      setTrack(TRACKS[queueTrackId])
      setQueueTrackId(null)
      setPlayerStatus(true)
      return
    }

    const currentTrackId = track.id !== undefined ? track.id : 0
    let nextId: number

    if (shuffle) {
      nextId = Math.floor(Math.random() * TRACKS.length)
    } else {
      nextId = (currentTrackId + 1) % TRACKS.length
    }

    setTrack(TRACKS[nextId])
    setPlayerStatus(true)
  }

  const play = () => {
    audioRef.current?.play()
    setPlayerStatus(true)
  }

  const pause = () => {
    audioRef.current?.pause()
    setPlayerStatus(false)
  }

  const previous = async () => {
    const currentTrackId = track.id !== undefined ? track.id : 0
    const previousId = (currentTrackId - 1 + TRACKS.length) % TRACKS.length
    setTrack(TRACKS[previousId])
    setPlayerStatus(true)
  }

  const seekSong = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !seekBg.current) return
    const audio = audioRef.current
    const clickPosition = e.nativeEvent.offsetX
    const barWidth = seekBg.current.offsetWidth
    audio.currentTime = (clickPosition / barWidth) * audio.duration
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      if (!autoplay) {
        setPlayerStatus(false)
        return
      }

      if (loop) {
        audio.currentTime = 0
        audio.play()
      } else {
        nextTrack()
      }
    }

    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [track, loop, shuffle, autoplay])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateUI = () => {
      if (audio.duration) {
        if (seekBar.current) {
          seekBar.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`
        }
        setTime({
          currentTime: {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audio.duration % 60),
            minute: Math.floor(audio.duration / 60),
          },
        })
      }
    }

    audio.addEventListener("timeupdate", updateUI)
    return () => {
      audio.removeEventListener("timeupdate", updateUI)
    }
  }, [])

  const toggleLoop = () => {
    setLoop(!loop)
  }

  const toggleShuffle = () => {
    setShuffle(!shuffle)
  }

  const toggleAutoplay = () => {
    setAutoplay(!autoplay)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const setVolume = (vol: number) => {
    const clampedVol = Math.max(0, Math.min(1, vol))
    setVolumeState(clampedVol)
  }

  const setQueueNext = (trackId: number) => {
    setQueueTrackId(trackId)
  }

  const contextValue: PlayerContextType = {
    audioRef: audioRef as unknown as RefObject<HTMLAudioElement>,
    seekBg: seekBg as unknown as RefObject<HTMLDivElement>,
    seekBar: seekBar as unknown as RefObject<HTMLHRElement>,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    previous,
    next: nextTrack,
    seekSong,
    toggleLoop,
    toggleShuffle,
    loop,
    shuffle,
    autoplay,
    toggleAutoplay,
    isMuted,
    toggleMute,
    volume,
    setVolume,
    setQueueNext,
    queueTrackId,
    playWithId: async (id: number) => {
      setTrack(TRACKS[id])
      setPlayerStatus(true)
    },
  }

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>
}

export default PlayerContextProvider
