import { Vector2 } from 'three'

import { cubeSizeCoefficient } from './magicNumbers.js'


export const getPointsBetween = (
    startPoint: Vector2,
    endPoint: Vector2,
    numPoints: number
) => {
    const points = [];

    for (let i = 1; i < numPoints; i++) {
        const weight = i / numPoints;
        const point = new Vector2().lerpVectors(startPoint, endPoint, weight);
        points.push(point);
    }

    return points;
}

export const getSideLength = (start: Vector2, end: Vector2) => {
    return Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2)
}

export const getCubeSize = (
    triangleSideLength: number, // calculated length of triangle side
    gapRatio = 0.5,             // gap size expressed in cube lengths
    cubesInSide = 4,
) => {
    const n = Math.max(3, Math.floor(cubesInSide));
    const g = gapRatio;
    const l = triangleSideLength;
    const k = cubeSizeCoefficient;

    return k * l / ((n - 1) * (g + 1))
}

export const degToRad = (degrees: number) => Math.PI * degrees / 180;

export const degreesPerDelta = (degrees: number, delta: number) => (
    degrees * delta * Math.PI / 180
);

export const arraify = (value: any) => {
    if(Array.isArray(value)) {
        return value
    } else {
        return [ value ]
    }
}

export const numberify = <T extends number | undefined>(value: any, fallback: T) => {
    if(typeof value === 'string') {
        value = Number(value)
    }
    if(typeof value === 'number' && !Number.isNaN(value)) {
        return value
    } else {
        return fallback
    }
}

export const boolify = (value: any, fallback: boolean) => (
    value === undefined ? fallback : !!value
);

export const roundAndNarrow = (num: number) => {
    num = Math.round(num * 100) / 100;
    // num = Number(num.toFixed(2))
    while(num > 360) num -= 360;
    while(num < 0) num += 360;
    return num
}
