interface AlertProps {
    message: string;
    type: string;
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
    return(
        <div className={`alert ${type}`}>
            {message}
        </div>
    )
}

export default Alert;