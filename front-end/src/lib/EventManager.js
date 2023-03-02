export default class EventManager {
    constructor() {
        this.listeners = {

        };
    }

    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(listener);
    }

    emit(event, payload) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach((listener) => {
            listener(payload);
        });
    }

    removeListener(event, listenerToRemove) {
        const listeners = this.listeners[event];
        
        if (!listeners) {
            return;
        }

        // Mantem noo listeners apenas os listeners que foorem diferente de listenerToRemove
        const filteredListeners = listeners.filter((listener) => 
            listener != listenerToRemove
        );

        this.listeners[event] = filteredListeners;
    }
}

const toastEventManager = new EventManager();

function addToast1(payload) {
    console.log('Listener executou!', payload);
}

function addToast2(payload) {
    console.log('Listener22 executou22!', payload);
}


toastEventManager.on('addtoast', addToast1);
toastEventManager.on('addtoast', addToast2);

toastEventManager.emit('addtoast', {type: 'danger', text: 'Texto!'})

toastEventManager.removeListener('addtoast', addToast1);

toastEventManager.emit('addtoast', 'depois de remover!...')


console.log(toastEventManager);