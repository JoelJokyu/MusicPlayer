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

  const play = () => {
    audioRef.current?.play()
    setPlayerStatus(true)
  }

  const pause = () => {
    audioRef.current?.pause()
    setPlayerStatus(false)
  }

  const playWithId = async(id:number) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    await setTrack(TRACKS[id]);
    await audio.play();
    setPlayerStatus(true);
  }

  const previous =async() =>{
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if(track.id !== undefined && track.id > 0){
        await setTrack(TRACKS[track.id-1]);
        await audio.play();
        setPlayerStatus(true);
    } else if(track.id !== undefined && track.id === 0){
        await setTrack(TRACKS[TRACKS.length-1]);
        await audio.play();
        setPlayerStatus(true);
    }
  }

  const next =async() =>{
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if(track.id !== undefined && track.id < TRACKS.length-1){
        await setTrack(TRACKS[track.id+1]);
        await audio.play();
        setPlayerStatus(true);
    } else if(track.id !== undefined && track.id === TRACKS.length-1){
        await setTrack(TRACKS[0]);
        await audio.play();
        setPlayerStatus(true);
    }
  }

  const seekSong = async(e: React.MouseEvent<HTMLHRElement>) =>{
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.currentTime =((e.nativeEvent.offsetX /seekBg.current!.offsetWidth)*audio.duration)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!audioRef.current) return;
      const audio = audioRef.current;
      audio.ontimeupdate = () => {
        if (!seekBar.current) return;
        const seek = seekBar.current;
        seek.style.width = (Math.floor(audio.currentTime/audio.duration*100))+"%";
        setTime({
          currentTime: {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor((audio.duration || 0) % 60),
            minute: Math.floor((audio.duration || 0) / 60),
          },
        });
      };
    }, 1000);
  
    return () => {
      clearTimeout(timeout);
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, [audioRef])

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
    playWithId,
    previous,
    next,
    seekSong,
  }

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>
}

export default PlayerContextProvider