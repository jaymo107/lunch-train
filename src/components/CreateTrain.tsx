import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import { parse, isValid } from "date-fns";
import { Train } from "@prisma/client";

interface CreateTrainProps {
    addTrain: (train: Train) => void;
}

const CreateTrain = (props: CreateTrainProps) => {
    const add = trpc.useMutation(['train.add'], {
        onSuccess: (data: Train): void => props.addTrain(data)
    });

    const [destination, setDestination] = useState('');
    const [departsAt, setDepartsAt] = useState('');

    const getDate = (date: string): Date|null => {
        const parsedDate = parse(date, "HH:mm", new Date());
        return isValid(parsedDate) ? parsedDate : null;
    };

    const addTrain = (e: Event): void => {
        e.preventDefault();

        if (!destination || !departsAt) { 
            console.log('NO destination set');
            return;
        }

        const departingDate = getDate(departsAt);

        if (!departingDate) {
            console.log('NO DATE SET');
            return;
        }

        add.mutate({
            destination,
            departsAt: departingDate,
        });

        setDestination('');
        setDepartsAt('');
    };

    return (
        <form className="flex flex-col" onSubmit={addTrain}>
            <div>
                <input
                    type="text"
                    className="px-4 py-2 bg-gray-50 rounded mb-2 w-full"
                    name="departsAt"
                    placeholder="Departs at... e.g. 13:49"
                    value={departsAt}
                    onChange={(e) => setDepartsAt(e.target.value)}
                />
            </div>
            <div className="flex space-x-3">
            <input
                type="text"
                name="destination"
                placeholder="Train destination..."
                className="px-4 py-2 bg-gray-50 rounded"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
            />
                <Button>Create train</Button>
                </div>
        </form>
    );
};

export default CreateTrain;