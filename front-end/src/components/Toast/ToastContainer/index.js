import { useState } from "react";
import ToastMessage from "../ToastMessage";
import { Container } from "./styles";

export default function ToastContainer() {
    const [messages] = useState([
        { id: Math.random(), type: 'default', text: 'Default text' },
        { id: Math.random(), type: 'danger', text: 'Danger text' },
        { id: Math.random(), type: 'success', text: 'Success text' },
    ]);

    function addToast({ type, text }) {
         
    }

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