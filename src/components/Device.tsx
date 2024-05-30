import React from "react";

export interface DeviceProps {
  deviceName?: string;
  gateID: number;
  status: number;
}

export default function Device(props: DeviceProps) {
  const connected = React.useMemo(() => {
    return props.status == 1;
  }, [props.status]);
  return (
    <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
      <h3 className="text-2xl font-bold">
        {props.deviceName ?? "reRemote Gate"}
      </h3>
      <div className="text-lg">
        ID: <span className="font-bold">{props.gateID}</span> <br />
        Status:{" "}
        <span className={connected ? "text-green-500" : "text-red-500"}>
          {connected ? "Connected 🟢" : "Disconnected 🔴"}
        </span>
      </div>
    </div>
  );
}
