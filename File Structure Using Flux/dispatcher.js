const listeners = [];

function register(listener) {
    listeners.push(listener);
}

function dispatch(action) {
    listeners.forEach(listener => listener(action));
}
export {register,dispatch};