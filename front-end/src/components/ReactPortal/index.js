import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default function ReactPortal({ containerId, children }) {
    let container = document.getElementById(containerId);

    if (!container) { 
        container = document.createElement('div');
        container.setAttribute('id', containerId);
        document.body.appendChild(container);

    }

    return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
    containerId: PropTypes.string,
};

ReactPortal.defaultProps = {
    containerId: 'portal-root',
}