import { Passenger } from "@prisma/client"

const Passenger = (props: Passenger) => {
    return (
        <span>{props.name}</span>
    )
};

export default Passenger;