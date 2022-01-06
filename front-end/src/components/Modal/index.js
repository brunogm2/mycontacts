import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Container, Overlay, Footer } from "./styles";

import Button from '../Button';

export default function Modal({ danger }) {
    return ReactDOM.createPortal(
        <Overlay>
            <Container danger={danger}>
                <h1>Titulo do modal! =D</h1>
                <p>Corpo do modal!</p>

                <Footer>
                    <button type="button" className="cancel-button">Cancelar</button>

                    <Button type="button" danger={danger}>
                        Deletar
                    </Button>
                </Footer>
            </Container>
        </Overlay>,
        document.getElementById('modal-root'),
    );
}

Modal.propTypes = {
    danger: PropTypes.bool,
};

Modal.defaultProps = {
    danger: false,
};