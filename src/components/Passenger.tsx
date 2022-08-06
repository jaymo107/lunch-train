import { Passenger } from "@prisma/client"

interface PassengerProps {
    passenger: Passenger;
    myName: string;
}

const Passenger = (props: PassengerProps) => {
    const isMe = () => {
        return props.myName === props.passenger.name;
    };
    
    return (
        <span className={
            isMe() ? 'text-green-500' : ''
        }>
            {props.passenger.name}
        </span>
    )
};

export default Passenger;