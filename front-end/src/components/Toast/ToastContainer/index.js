import { useState, useEffect } from "react";
import { Container } from "./styles";

import ToastMessage from "../ToastMessage";

export default function ToastContainer() {
    const [messages, setMessages] = useState([
        // { id: Math.random(), type: 'default', text: 'Default text' },
        // { id: Math.random(), type: 'danger', text: 'Danger text' },
        // { id: Math.random(), type: 'success', text: 'Success text' },
    ]);

    useEffect(() => {
        function handleAddToast(event) {
            const { type, text } = event.detail;

            setMessages((prevState) => [
                ...prevState,
                { 
                    id: Math.random(), 
                    type,
                    text
                }
            ]);
        }

        document.addEventListener('addtoast', handleAddToast);

        return () => {
            document.removeEventListener('addtoast', handleAddToast);
        };

    }, []);

    return(
        <Container>
            {/* <ToastMessage text="Default Toast" />
            <ToastMessage text="Error Toast" type="danger" />
            <ToastMessage text="Success Toast" type="success" /> */}

            {messages.map((message) => (
                <ToastMessage 
                    key={message.id}
                    type={message.type}
                    text={message.text}
                />
            ))}
        </Container>
    );
}