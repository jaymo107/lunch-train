import type { NextPage } from "next";
import Head from "next/head";
import CreateTrain from '../components/CreateTrain';
import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { Passenger, Train } from "@prisma/client";
import { TrainWithPassengers } from "../server/db/client";
import MyNameComponent from "../components/MyName";
import TimetableComponent from "../components/Timetable";

const Home: NextPage = () => {
  const { data: allTrains } = trpc.useQuery(['train.getAll']);

  const [trains, setTrains] = useState<Train[]>(allTrains ?? []);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const storedName = localStorage.getItem('lunch-train-name');

    if (storedName !== null) {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    if (name !== '') {
      localStorage.setItem('lunch-train-name', name);
    }
  }, [name]);
  
  const addTrain = (train: Train): void => {
    setTrains([...trains, train]);
  };

  const removeTrain = (id: number): void => {
    setTrains(trains.filter(train => train.id !== id));
  };

  const addPassenger = (passenger: Passenger, train: Train): void => {
    const newTrains = trains.map((t: any) => {
      if (t.id === train.id) {
        return { ...t, passengers: [...t.passengers, passenger] };
      }
      return t;
    });
    setTrains(newTrains);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Lunch Train</title>
        <meta name="description" content="Let's go for lunch." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-4/6 m-auto mt-6 space-y-4 text-gray-800">
        <div className="grid grid-cols-6 bg-gray-50 border-b-2 border-b-gray-200 rounded-xl p-6">
          <div className="col-span-6 items-center justify-center flex">
            <span className="font-bold text-3xl">
              Lunch train
            </span>
          </div>
        </div>

        <div className="grid grid-cols-6 border-b-2 bg-gray-50 border-b-gray-200 rounded-xl p-6">
          <div className="col-span-6 items-center">
            {name
              ? <CreateTrain addTrain={addTrain} />
              : <MyNameComponent name={name} setName={setName} />
            }
          </div>
        </div>

        {name && <TimetableComponent
          trains={trains as TrainWithPassengers[]}
          passengerName={name}
          removeTrain={removeTrain}
          addPassenger={addPassenger}
        />}
      </main>
    </React.Fragment>
  );
}

export default Home;
