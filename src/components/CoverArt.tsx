import React from "react";

interface CoverArtProps {
  cover: string;
  title: string;
}
const CoverArt: React.FC<CoverArtProps> = React.memo(
  ({ cover = "/default-cover.jpg", title = "Untitled Track" }) => {
    return (
      <>
        <div className="w-full aspect-square overflow-hidden shadow-lg">
          <div className="relative w-full h-full">
            <img
              src={cover || "/placeholder.svg"}
              alt={title}
              className="object-cover hover:scale-105 shadow-black shadow-lg"
            />
          </div>
        </div>
      </>
    );
  }
);

export default CoverArt;
