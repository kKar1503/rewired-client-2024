import React from "react";
import Device from "@/components/Device";
import Room from "@/components/Room";
import useWebsocket from "@/hooks/useWebsocket";
import Head from "next/head";
import { env } from "@/env";

export default function Home() {
  const wsData = useWebsocket(env.NEXT_PUBLIC_WS_URL ?? "");

  React.useEffect(() => {
    console.log(wsData);
  }, [wsData]);

  return (
    <>
      <Head>
        <title>reRemote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[3rem]">Your Devices</h1>
          {wsData.isError ? (
            <div className="text-3xl font-bold tracking-wide text-red-500">Error</div>
          ) : wsData.isLoading ? (
            <div className="text-3xl font-bold tracking-wide text-white">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              {wsData.deviceStatus.map((d, i) => (
                <Device key={d.id} gateID={d.id} status={d.status} />
              ))}
            </div>
          )}
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[3rem]">Your Rooms</h1>
          {wsData.isError ? (
            <div className="text-3xl font-bold tracking-wide text-red-500">Error</div>
          ) : wsData.isLoading ? (
            <div className="text-3xl font-bold tracking-wide text-white">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              {wsData.roomStatus.map((r) => (
                <Room key={r.name} roomName={r.name} population={r.population} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
