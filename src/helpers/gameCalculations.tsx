export const calculateExpNeeded = (lvl: number) => {
    return 20 * (lvl * 1.5);
}

export const calculateMaxHP = (lvl: number) => {
    return Math.floor((30 * lvl) / 1.5);
}

export const calculateBaseAttack = (lvl: number) => {
    return Math.floor((5 * lvl) / 1.5);
}