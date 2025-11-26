import type React from "react"
import { useContext } from "react"
import "./App.css"
import Sidebar from "./components/MainSidebar"
import Player from "./components/Player"
import Display from "./components/Display"
import { PlayerContext } from "./context/PlayerContextCreate"

const App: React.FC = () => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error("App must be used within PlayerContextProvider")
  }

  const { audioRef, track } = context

  return (
    <>
      <div className="background-image h-screen ">
        <div className="h-[90%] flex">
          <Sidebar />
          <Display />
        </div>
        <Player />
        <audio ref={audioRef} src={track.src} preload="auto" />
      </div>
    </>
  )
}

export default App
