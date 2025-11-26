import type React from "react";
import { useContext } from "react";
import Play from "../assets/play-icon.svg";
import Pause from "../assets/pause-icon.svg";
import Previous from "../assets/previous-icon.svg";
import Next from "../assets/next-icon.svg";
import Shuffle from "../assets/shuffle-icon.svg";
import Loop from "../assets/loop-icon.svg";
import Plays from "../assets/play1-icon.svg";
import Mic from "../assets/microphone-icon.svg";
import Queue from "../assets/queue-icon.svg";
import Speaker from "../assets/speaker-icon.svg";
import Volume from "../assets/volume-icon.svg";
import Mini_Player from "../assets/mini_player-icon.svg";
import Zoom from "../assets/zoom-icon.svg";
import { PlayerContext } from "../context/PlayerContextCreate";

const Player: React.FC = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("Player must be used within PlayerContextProvider");
  }

  const { seekBar, seekBg, play, pause, playerStatus, track, time, previous, next, seekSong } = context;

  return (
    <>
      <div className="h-[10%] bg-[rgba(0,0,0,0.75)] flex justify-between items-center text-white px-4 backdrop-blur-sm">
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
              className="w-4 cursor-pointer bg-amber-50"
              src={Shuffle}
              alt="shuffle"
            />
            <img
            onClick={previous}
              className="w-4 cursor-pointer bg-amber-50"
              src={Previous}
              alt="previous"
            />
            {playerStatus ? (
              <img
                onClick={pause}
                className="w-4 cursor-pointer bg-amber-50"
                src={Pause}
                alt="pause"
              />
            ) : (
              <img
                onClick={play}
                className="w-4 cursor-pointer bg-amber-50"
                src={Play}
                alt="play"
              />
            )}
            <img
              onClick={next}
              className="w-4 cursor-pointer bg-amber-50"
              src={Next}
              alt="next"
            />
            <img
              className="w-4 cursor-pointer bg-amber-50"
              src={Loop}
              alt="loop"
            />
          </div>
          <div className="flex items-center gap-5">
            <p>{time.currentTime.minute}:{time.currentTime.second}</p>
            <div
              onClick = {seekSong}
              ref={seekBg}
              className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
            >
              <hr
                ref={seekBar}
                className="h-1 border-none w-0 bg-linear-to-r from-fuchsia-800 to-amber-800 rounded-full"
              />
            </div>
            <p>{time.totalTime.minute}:{time.totalTime.second}</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 opacity-75">
          <img
            className="w-4 bg-amber-50 hover:bg-amber-500"
            src={Plays}
            alt="plays"
          />
          <img
            className="w-4 bg-amber-50 hover:bg-amber-500"
            src={Mic}
            alt="microphone"
          />
          <img
            className="w-4 bg-amber-50 hover:bg-amber-500"
            src={Queue}
            alt="queue"
          />
          <img
            className="w-4 bg-amber-50 hover:bg-amber-500"
            src={Speaker}
            alt="speaker"
          />
          <img
            className="w-4 bg-amber-50 hover:bg-amber-500"
            src={Volume}
            alt="volume"
          />
          <div className="w-20 bg-linear-to-r from-slate-50 to-green-800 h-1 rounded"></div>
          <img
            className="w-4 bg-amber-50 hover:bg-amber-500"
            src={Mini_Player}
            alt="mini-player"
          />
          <img
            className="w-4 bg-amber-50 hover:bg-amber-500"
            src={Zoom}
            alt="zoom"
          />
        </div>
      </div>
    </>
  );
};

export default Player;
