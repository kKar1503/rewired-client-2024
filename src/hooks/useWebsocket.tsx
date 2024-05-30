import React from "react";

export interface ServerStatus {
  devices: DeviceStatus[];
  rooms: RoomStatus[];
}

export interface DeviceStatus {
  id: number;
  status: number;
}

export interface RoomStatus {
  name: string;
  population: number;
}

export default function useWebsocket(url: string) {
  const [deviceStatus, setDeviceStatus] = React.useState<DeviceStatus[]>([]);
  const [roomStatus, setRoomStatus] = React.useState<RoomStatus[]>([]);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState<Event | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const ws = React.useRef<WebSocket | null>(null);
  const reconnectionInterval = React.useRef<number>(1000);

  const connectWebSocket = () => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsError(false);
      setError(null);
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      if (isLoading) setIsLoading(false);
      // I only send string data so it must be
      const response = JSON.parse(event.data as string) as unknown as ServerStatus;
      // TODO: Check if there is state change before setting state
      setDeviceStatus(response.devices);
      setRoomStatus(response.rooms);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting...");
      setTimeout(() => {
        connectWebSocket(); // Reconnect
      }, reconnectionInterval.current);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsError(true);
      setError(error);
      ws.current?.close(); // Close WebSocket on error
    };
  };

  React.useEffect(() => {
    connectWebSocket(); // when the component is mounted (since begginning) it connects

    return () => {
      if (ws.current) {
        ws.current.close(); //close ws when we close the page basically
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { isLoading, isError, roomStatus, deviceStatus, error };
}
