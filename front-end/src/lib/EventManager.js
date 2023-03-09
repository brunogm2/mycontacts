export default class EventManager {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(listener);
    }

    emit(event, payload) {
        if (!this.listeners.has(event)) {
            return;
        }

        this.listeners.get(event).forEach((listener) => {
            listener(payload);
        });
    }

    removeListener(event, listenerToRemove) {
        const listeners = this.listeners.get(event);
        
        if (!listeners) {
            return;
        }

        // Mantem noo listeners apenas os listeners que foorem diferente de listenerToRemove
        const filteredListeners = listeners.filter((listener) => 
            listener != listenerToRemove
        );

        this.listeners.set(event, filteredListeners);
    }
}

const toastEventManager = new EventManager();

toastEventManager.emit('addtoast', {type: 'danger', text: 'Texto!'})

toastEventManager.emit('addtoast', 'depois de remover!...')
