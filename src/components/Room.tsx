import React from "react";

export interface DeviceProps {
  roomName: string;
  population: number;
}

export default function Device(props: DeviceProps) {
  return (
    <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
      <h3 className="text-2xl font-bold">{props.roomName}</h3>
      <div className="text-lg">{props.population}</div>
    </div>
  );
}
