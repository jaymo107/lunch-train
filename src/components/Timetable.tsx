import { Passenger, Train } from "@prisma/client";
import React, { useEffect } from "react";
import { TrainWithPassengers } from "../server/db/client";
import TrainComponent from "./Train";
import collect from 'collect.js';

interface TimetableProps {
    trains: TrainWithPassengers[];
    removeTrain: (id: number) => void;
    addPassenger: (passenger: Passenger, train: Train) => void;
    passengerName: string;
}

export default function TimetableComponent(props: TimetableProps): JSX.Element {
    const [trains, setTrains] = React.useState<TrainWithPassengers[]>([]);

    useEffect(() => {
        const [upcoming, past]: Array<any> = collect(props.trains)
            .partition(train => train.departsAt > new Date());

        setTrains([
            ...upcoming.sortBy('departsAt'),
            ...past.sortByDesc('departsAt'),
        ]);
    }, [props.trains]);

    if (trains.length <= 0) {
        return (
            <p className="p-5 text-gray-300 uppercase italic">
                No trains yet.
            </p>
        );
    }

    return (
      <React.Fragment>
        <h3 className="border-b border-gray-200 pb-5 text-xl">Timetable</h3>
        {trains.map(
            (train: Train) => <TrainComponent
                key={train.destination}
                train={train as TrainWithPassengers}
                {...props}
            />
          )}
      </React.Fragment>
    );
}