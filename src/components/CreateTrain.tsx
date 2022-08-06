import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import { parse, isValid } from "date-fns";
import { Train } from "@prisma/client";
import Loading from "../common/Loading";

interface CreateTrainProps {
    addTrain: (train: Train) => void;
}

const CreateTrain = (props: CreateTrainProps) => {
    const { mutate: add, isLoading } = trpc.useMutation(['train.add'], {
        onSuccess: (data: Train): void => props.addTrain(data)
    });

    const [destination, setDestination] = useState('');
    const [departsAt, setDepartsAt] = useState('');
    const [error, setError] = useState('');

    const getDate = (date: string): Date|null => {
        const parsedDate = parse(date, "HH:mm", new Date());
        return isValid(parsedDate) ? parsedDate : null;
    };

    const addTrain = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const departingDate = getDate(departsAt);

        if (!departingDate) {
            setError('Please enter a valid departure time in 24hr format, e.g. 13:30');
            return;
        }

        if (departingDate.getTime() < new Date().getTime()) {
            setError('Departure time must be in the future');
            return;
        }

        add({
            destination: destination.trim(),
            departsAt: departingDate,
        });
        
        setError('');
        setDestination('');
        setDepartsAt('');
    };

    return (
        <form
            className="flex flex-col"
            onSubmit={addTrain}
        >
            {error && <p
                className="text-red-500 text-sm bg-red-50 px-5 py-3 border-b border-red-500 mb-4"
            >
                {error}
            </p>}
                <input
                    type="text"
                    name="destination"
                    placeholder="Train destination..."
                    className="px-4 py-2 bg-gray-50 rounded w-full mb-3"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="px-4 py-2 bg-gray-50 rounded mb-2"
                    name="departsAt"
                    placeholder="Departs at... e.g. 13:49"
                    value={departsAt}
                    onChange={(e) => setDepartsAt(e.target.value.trim() )}
                    required
                />
            <Button disabled={!departsAt || !destination}>
                {isLoading ? <Loading /> : 'Create Train'}
            </Button>
        </form>
    );
};

export default CreateTrain;