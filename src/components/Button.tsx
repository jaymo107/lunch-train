interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 active:bg-gray-400"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;