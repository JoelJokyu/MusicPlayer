import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContextCreate";

interface TrackListProps {
  cover: string;
  title: string;
  artist: string;
  id: number;
}
const TrackList: React.FC<TrackListProps> = React.memo(
  ({
    cover = "/default-cover.jpg",
    title = "Untitled Track",
    artist = "unknown",
    id
  }) => {

    const context = useContext(PlayerContext)
    if (!context) {
      throw new Error("TrackList must be used within PlayerContextProvider")
    }
    const {playWithId} = context
    return (
      <>
        <div onClick={()=>playWithId(id)} className="p-2 px-3 rounded cursor-pointer hover:bg-[rgba(216,101,231,0.3)] min-h-full flex items-center space-x-3">
          <img
            src={cover}
            className="rounded w-12 h-12 object-cover"
            alt={`Cover art for ${title}`}
          />
          <div className="overflow-hidden whitespace-nowrap">
            <p className="inline-block text-white text-lg px-4 animate-scroll-left">
              {title}
            </p><br />
            <p className="font-bold text-slate-200 text-sm">{artist}</p>
            <hr className="relative w-80 " />
          </div>
        </div>
      </>
    );
  }
);

export default TrackList;
