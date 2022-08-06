import { useEffect, useState } from "react";
import Button from "./Button";

interface MyNameProps {
    setName: (name: string) => void;
    name: string;
}

export default function MyNameComponent(props: MyNameProps): JSX.Element {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(props.name);
    }, [props.name])

    const SetButton = (): JSX.Element | null => {
        if (props.name) {
            return null;
        }
        
        return (
            <Button
                onClick={() => props.setName(name)}
                disabled={!name.trim()}
            >
                View Timetable
            </Button>
        );
    };

    return (
        <div className="flex flex-col">
            <input
                type="text"
                name="destination"
                placeholder="What's your name..."
                className="px-4 py-2 bg-gray-50 rounded mb-3 disabled:bg-white disabled:text-center mr-2"
                onChange={(e) => setName(e.target.value.trim())}
                disabled={props.name !== ''}
                value={name}
                required
            />
            <SetButton />
        </div>
    );
};