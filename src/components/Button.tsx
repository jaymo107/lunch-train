type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    disabled: boolean;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            className="bg-gray-200 self-start text-gray-700 px-4 py-2 rounded hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-300"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;