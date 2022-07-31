import type { NextPage } from "next";
import Head from "next/head";
import CreateTrain from '../components/CreateTrain';
import TrainComponent from "../components/Train";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { Passenger, Train } from "@prisma/client";

const Home: NextPage = () => {
  const { data: allTrains } = trpc.useQuery(['train.getAll']);
  
  const [trains, setTrains] = useState<Train[]>(allTrains ?? []);
  
  const addTrain = (train: Train): void => {
    setTrains([...trains, train]);
  };

  const removeTrain = (id: number): void => {
    setTrains(trains.filter(train => train.id !== id));
  };

  const addPassenger = (passenger: Passenger, train: Train): void => {
    const newTrains = trains.map((t: Train) => {
      if (t.id === train.id) {
        return { ...t, passengers: [...t.passengers, passenger] };
      }
      return t;
    });
    setTrains(newTrains);
  };

  return (
    <>
      <Head>
        <title>Lunch Train</title>
        <meta name="description" content="Let's go for lunch." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4 space-y-4">
        <img src="/logo.jpg" className="w-40 aspect-auto" alt="Train" />
        <CreateTrain addTrain={addTrain} />
        <h3 className="border-b border-gray-200 pb-5 text-xl">Timetable</h3>
        {trains.length <= 0 && <p className="p-5 text-gray-300 uppercase italic">No trains to board</p>}
        {trains.map(
          (train: Train) => <TrainComponent
            key={train.destination}
            train={train}
            removeTrain={removeTrain}
            addPassenger={addPassenger}
          />
        )}
      </main>
    </>
  );
};

export default Home;
