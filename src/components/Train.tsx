import Button from "./Button";
import { trpc } from "../utils/trpc";
import { formatDistanceToNow } from 'date-fns';
import { Passenger, Train } from "@prisma/client";
import PassengerComponent from "./Passenger";
import { TrainWithPassengers } from "../server/db/client";
import Notifier, { Permission } from '../common/notifications/notifier';
import { useEffect, useState } from "react";
import Loading from "../common/Loading";

interface TrainProps {
    train: TrainWithPassengers;
    removeTrain: (id: number) => void;
    addPassenger: (passenger: Passenger, train: Train) => void;
    passengerName: string;
}

const Train = (props: TrainProps) => {
    const { mutate: remove, isLoading: isRemoving } = trpc.useMutation(['train.delete'], {
        onSuccess: (): void => props.removeTrain(props.train.id)
    });

    const { mutate: board, isLoading: isBoarding } = trpc.useMutation(['passenger.board'], {
        onSuccess: (passenger: Passenger): void => {
            props.addPassenger(passenger, props.train);
         }
    })

    const deleteTrain = (): void => {
        remove({ id: props.train.id });
    };

    const boardTrain = async (): Promise<void> => {
        const notifier = new Notifier();
        const permission = await notifier.hasPermission();

        if (props.passengerName.trim() === '') { 
            alert('Please set your name so we know who you are!');
            return;
        }

        if (permission === Permission.Denied) { 
            alert('You need to allow notifications to board a train');
            return;
        }

        if (permission === Permission.Granted) {
            await notifier.getNotificationToken();
            board({ train: props.train.id, name: props.passengerName });
        }
    };

    const hasAlreadyBoarded = (passengerName: string, train: TrainWithPassengers): Boolean => {
        let found = false;

        train.passengers.forEach((passenger: Passenger) => {
            if (passenger.name === passengerName) {
                found = true;
            }
        });

        return found;
    };

    const hasDeparted = (): Boolean => {
        return props.train.departsAt < new Date();
    };

    const canBoard = (): Boolean => {
        return !hasDeparted()
            && !hasAlreadyBoarded(props.passengerName, props.train);
    };

    return (
        <div
            className={`w-full flex flex-col p-4 rounded ${hasDeparted() ? 'bg-white' : 'bg-gray-50'}`}
        >
            <div className="flex justify-between items-center">
                <h3 className={`text-md font-semibold ${hasDeparted() ? 'text-gray-300' : 'text-gray-700'}`}>
                    {props.train.destination}
                </h3>
                <div className="flex space-x-4 items-center">
                    <span className="text-xs font-extralight text-gray-500">{
                        hasDeparted() ? 'Departed' : `Departs in ${formatDistanceToNow(props.train.departsAt)}`}
                    </span>
                    <Button disabled={false} onClick={deleteTrain}>
                        {isRemoving ? <Loading /> : 'X'}
                    </Button>
                    {canBoard() && <Button
                        disabled={false}
                        onClick={boardTrain}>
                        {isBoarding ? <Loading /> : 'Board'}
                    </Button>}
                </div>
            </div>
            <div className="text-xs flex space-x-3">
                {!hasDeparted() && props.train.passengers.map((passenger: Passenger): JSX.Element => { 
                    return (
                        <PassengerComponent
                            key={`${passenger.name}_${passenger.id}`}
                            passenger={passenger}
                            myName={props.passengerName}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Train;