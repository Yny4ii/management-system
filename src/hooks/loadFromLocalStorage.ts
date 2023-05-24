export const loadFromLocalStorage = () => {
    try {
        const serialisedState = localStorage.getItem("state");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}