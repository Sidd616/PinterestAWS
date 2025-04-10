import React, { useState } from "react";
import Pin from "../Pin/Pin";

const samplePins = [
  { id: 1, image: "https://source.unsplash.com/random/300x400" },
  { id: 2, image: "https://source.unsplash.com/random/400x500" },
  { id: 3, image: "https://source.unsplash.com/random/350x450" },
  { id: 4, image: "https://source.unsplash.com/random/250x350" },
];

const MasonryGrid = () => {
  const [pins, setPins] = useState(samplePins);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pins.map((pin) => (
        <Pin key={pin.id} image={pin.image} />
      ))}
    </div>
  );
};

export default MasonryGrid;
