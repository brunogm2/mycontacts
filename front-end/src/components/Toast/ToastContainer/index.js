import { useState, useEffect } from "react";
import { Container } from "./styles";

import ToastMessage from "../ToastMessage";
import { toastEventManager } from "../../../utils/toast";

export default function ToastContainer() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function handleAddToast({ type, text }) {
            setMessages((prevState) => [
                ...prevState,
                { 
                    id: Math.random(), 
                    type,
                    text
                }
            ]);
        }

        toastEventManager.on('addtoast', handleAddToast);

        return () => {
            toastEventManager.removeListener('addtoast', handleAddToast);
        };

    }, []);

    function handleRemoveMessage(id) {
        setMessages((prevState) => prevState.filter((message) => 
            message.id !== id
        ))
    }

    return(
        <Container>
            {/* <ToastMessage text="Default Toast" />
            <ToastMessage text="Error Toast" type="danger" />
            <ToastMessage text="Success Toast" type="success" /> */}

            {messages.map((message) => (
                <ToastMessage 
                    key={message.id}
                    message={message}
                    onRemoveMessage={handleRemoveMessage}
                />
            ))}
        </Container>
    );
}