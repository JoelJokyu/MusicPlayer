import type React from "react"
import { useContext, useState } from "react"
import Play from "../assets/play-icon.svg"
import Pause from "../assets/pause-icon.svg"
import Previous from "../assets/previous-icon.svg"
import Next from "../assets/next-icon.svg"
import Shuffle from "../assets/shuffle-icon.svg"
import Loop from "../assets/loop-icon.svg"
import Plays from "../assets/play1-icon.svg"
import Mic from "../assets/microphone-icon.svg"
import Queue from "../assets/queue-icon.svg"
import Speaker from "../assets/speaker-icon.svg"
import Mini_Player from "../assets/mini_player-icon.svg"
import Zoom from "../assets/zoom-icon.svg"
import { PlayerContext } from "../context/PlayerContextCreate"
import TRACKS from "../data/tracks"

const Player: React.FC = () => {
  const context = useContext(PlayerContext)
  const [showQueueModal, setShowQueueModal] = useState(false)

  if (!context) {
    throw new Error("Player must be used within PlayerContextProvider")
  }

  const {
    seekBar,
    seekBg,
    play,
    pause,
    playerStatus,
    track,
    time,
    previous,
    next,
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
  } = context

  return (
    <>
      <div className="sticky h-[10%] bg-[rgba(0,0,0,0.75)] flex justify-between items-center text-white px-4 backdrop-blur-sm">
        <div className="hidden lg:flex items-center gap-4">
          <img
            className="w-12 hover:scale-105"
            src={track.cover || "/placeholder.svg"}
            alt={track.title}
            loading="lazy"
          />
          <div className="min-w-xl max-w-xl">
            <p className="hover:font-semibold cursor-none">{track.title}</p>
            <p className="text-xs hover:font-bold cursor-none">{track.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 m-auto">
          <div className="flex gap-4">
            <img
              onClick={toggleShuffle}
              className={`w-4 cursor-pointer transition-colors ${shuffle ? "bg-blue-500" : "bg-amber-50"}`}
              src={Shuffle || "/placeholder.svg"}
              alt="shuffle"
              title={shuffle ? "Shuffle on" : "Shuffle off"}
            />
            <img
              onClick={previous}
              className="w-4 cursor-pointer bg-amber-50 hover:bg-amber-300"
              src={Previous || "/placeholder.svg"}
              alt="previous"
              title="Play previous"
            />
            {playerStatus ? (
              <img
                onClick={pause}
                className="w-4 cursor-pointer bg-amber-50 hover:bg-amber-300"
                src={Pause || "/placeholder.svg"}
                alt="pause"
                title="Playing"
              />
            ) : (
              <img
                onClick={play}
                className="w-4 cursor-pointer bg-amber-50 hover:bg-amber-300"
                src={Play || "/placeholder.svg"}
                alt="play"
                title="Paused"
              />
            )}
            <img
              onClick={next}
              className="w-4 cursor-pointer bg-amber-50 hover:bg-amber-300"
              src={Next || "/placeholder.svg"}
              alt="next"
              title="Play next"
            />
            <img
              onClick={toggleLoop}
              className={`w-4 cursor-pointer transition-colors ${loop ? "bg-blue-500" : "bg-amber-50"}`}
              src={Loop || "/placeholder.svg"}
              alt="loop"
              title={loop ? "Loop on" : "Loop off"}
            />
          </div>

          <div className="flex items-center gap-5">
            <p>{`${String(time.currentTime.minute).padStart(2, "0")}:${String(time.currentTime.second).padStart(2, "0")}`}</p>
            <div
              onClick={seekSong}
              ref={seekBg}
              className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
            >
              <hr
                ref={seekBar}
                className="h-1 border-none w-0 bg-linear-to-r from-fuchsia-800 to-amber-800 rounded-full"
              />
            </div>
            <p>{`${String(time.totalTime.minute).padStart(2, "0")}:${String(time.totalTime.second).padStart(2, "0")}`}</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 opacity-75">
          <img
            onClick={toggleAutoplay}
            className={`w-4 cursor-pointer transition-colors ${autoplay ? "bg-blue-500" : "bg-amber-50"}`}
            src={Plays || "/placeholder.svg"}
            alt="autoplay"
            title={autoplay ? "Autoplay on" : "Autoplay off"}
          />
          <img className="w-4 bg-amber-50 hover:bg-amber-500" src={Mic || "/placeholder.svg"} alt="microphone" />
          <img
            onClick={() => setShowQueueModal(!showQueueModal)}
            className="w-4 bg-amber-50 hover:bg-amber-500 cursor-pointer transition-colors"
            src={Queue || "/placeholder.svg"}
            alt="queue"
            title="Queue a song"
          />
          <img
            onClick={toggleMute}
            className={`w-4 cursor-pointer transition-colors ${isMuted ? "bg-red-500" : "bg-amber-50"}`}
            src={Speaker || "/placeholder.svg"}
            alt="speaker"
            title={isMuted ? "Unmute" : "Mute"}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="w-12 cursor-pointer accent-blue-500"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
          <img
            className="w-4 bg-amber-50 hover:bg-amber-500"
            src={Mini_Player || "/placeholder.svg"}
            alt="mini-player"
          />
          <img className="w-4 bg-amber-50 hover:bg-amber-500" src={Zoom || "/placeholder.svg"} alt="zoom" />
        </div>
      </div>

      {showQueueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-96 max-h-96 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Queue Next Track</h2>
            {queueTrackId !== null && (
              <p className="mb-4 text-sm text-gray-400">
                Queued: {TRACKS[queueTrackId]?.title} - {TRACKS[queueTrackId]?.artist}
              </p>
            )}
            <div className="space-y-2">
              {TRACKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setQueueNext(t.id || 0)
                    setShowQueueModal(false)
                  }}
                  className={`w-full text-left p-2 rounded transition-colors ${
                    queueTrackId === t.id ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <p className="font-semibold text-sm">{t.title}</p>
                  <p className="text-xs text-gray-300">{t.artist}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowQueueModal(false)}
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Player
