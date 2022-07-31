import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import { TrainType } from "./Train";

interface CreateTrainProps {
    addTrain: (train: TrainType) => void;
}

const CreateTrain = (props: CreateTrainProps) => {
    const add = trpc.useMutation(['train.add'], {
        onSuccess: (data: TrainType): void => props.addTrain(data)
    });

    const [destination, setDestination] = useState("");

    const addTrain = (e: Event): void => {
        e.preventDefault();

        add.mutate({
            destination,
            departsAt: new Date(),
        });

        setDestination("");
    };

    return (
        <form className="flex space-x-3" onSubmit={addTrain}>
            <input
                type="text"
                name="destination"
                placeholder="Destination"
                className="px-4 py-2 bg-gray-50 rounded"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
            />
          <Button>Create train</Button>
        </form>
    );
};

export default CreateTrain;