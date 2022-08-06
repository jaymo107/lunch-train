import { Passenger, Train } from "@prisma/client";
import React from "react";
import { TrainWithPassengers } from "../server/db/client";
import TrainComponent from "./Train";

interface TimetableProps {
    trains: TrainWithPassengers[];
    removeTrain: (id: number) => void;
    addPassenger: (passenger: Passenger, train: Train) => void;
    passengerName: string;
}

export default function TimetableComponent(props: TimetableProps): JSX.Element {
    if (props.trains.length <= 0) {
        return (
            <p className="p-5 text-gray-300 uppercase italic">
                No trains to board
            </p>
        );
    }

    return (
      <React.Fragment>
        <h3 className="border-b border-gray-200 pb-5 text-xl">Timetable</h3>
        {props.trains.map(
            (train: Train) => <TrainComponent
                key={train.destination}
                train={train as TrainWithPassengers}
                {...props}
            />
          )}
      </React.Fragment>
    );
}