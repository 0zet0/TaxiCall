import { Preferences } from "@capacitor/preferences";

async function setData<T>(key: string, source: T) {
    await Preferences.set({
        key,
        value: JSON.stringify(source),
    });
}

async function getData<T>(key: string): Promise<T | null> {
    const result = await Preferences.get({ key });
    if (!result.value)
        return null;

    return JSON.parse(result.value) as T;
}

export { setData, getData }