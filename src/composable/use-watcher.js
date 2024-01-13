export function useWatcher(interval, object) {
    if (interval)  clearInterval(interval);

    interval = setInterval(() => {
        object.timer--;
        if (object.timer <= 0) {

            if (interval) clearInterval(interval)
        }
    }, 1000);

    return true;
}