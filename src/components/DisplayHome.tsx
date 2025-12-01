import React from "react";
import Navbar from "./Navbar";
import TRACKS from "../data/tracks";
import CoverArt from "./CoverArt";
import TrackList from "./TrackList";
import SoundVisualizer from "./SoundVisualizer";
import { PlayerContext } from "../context/PlayerContextCreate";
import { useContext } from "react";

const DisplayHome: React.FC = () => {
  const context = useContext(PlayerContext);
  
    if (!context) {
      throw new Error("Player must be used within PlayerContextProvider");
    }
  
    const { track } = context;
  return (
    <>
      <div className="flex flex-col h-screen bg-background">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* fixed left sidebar with cover art and visualizer */}
          <div className="hidden md:block w-100 bg-muted/50 border-r border-border p-8 flex-col items-center justify-start gap-6 overflow-hidden">
            <div className="shrink-0 w-full">
              <CoverArt cover={track.cover ?? ""} title={track.title ?? ""} />
            </div>
            <div className="shrink-0 w-full">
              <SoundVisualizer />
            </div>
          </div>

          {/* right side with tracklist */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground sticky">
                Playlist (Main)
              </h2>
              <div className="space-y-3">
                {TRACKS.map((track, index) => (
                  <TrackList
                    key={index}
                    cover={track.cover ?? ""}
                    title={track.title ?? ""}
                    artist={track.artist ?? ""}
                    id={track.id ?? 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
