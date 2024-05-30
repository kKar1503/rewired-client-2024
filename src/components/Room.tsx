import React from "react";

export interface RoomProps {
  roomName: string;
  population: number;
}

export default function Room(props: RoomProps) {
  return (
    <div className="flex max-w-xs flex-col gap-8 rounded-xl bg-white/10 p-8 text-white">
      <h3 className="text-center text-2xl font-bold">{props.roomName}</h3>
      <h3 className="text-center text-6xl font-semibold">{props.population}</h3>
    </div>
  );
}
