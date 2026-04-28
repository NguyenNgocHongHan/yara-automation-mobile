export function parseBooleanEnv(value: string | undefined, defaultValue: boolean): boolean {
    if (value === undefined) {
        return defaultValue;
    }

    const normalizedValue = value.trim().toLowerCase();

    if (['true', '1', 'yes', 'y', 'on'].includes(normalizedValue)) {
        return true;
    }

    if (['false', '0', 'no', 'n', 'off'].includes(normalizedValue)) {
        return false;
    }

    return defaultValue;
}
