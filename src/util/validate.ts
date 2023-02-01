export function checkTrue(flag: boolean, message: string) {
    if (!flag) {
        throw new Error(message);
    }
}

export function notNegative(value: number, name: any) {
    checkTrue(value >= 0, `argument must not be negative (given: ${name})`);
    return value;
}