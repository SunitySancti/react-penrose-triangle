import { makeAutoObservable } from 'mobx'

import { numberify,
         boolify,
         roundAndNarrow } from '../util/index.js'

import type { NumberLike,
              GeometryInititalValues } from '../types.js'


export const defaultGeometry = Object.freeze({
    cubesInSide: 6,
    gapRatio: 0.25,
    diameter: 1,
    rotation: 0,
    rotationSpeed: 10,
    isRotating: true,
    isInverted: false,
});

class GeometryStore {
    cubesInSide: number
    gapRatio: number
    diameter: number
    rotation: number
    rotationSpeed: number
    isRotating: boolean
    isInverted: boolean
    
    constructor(initialValues: GeometryInititalValues = {}) {
        makeAutoObservable(this);
        const { cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted } = initialValues;

        this.cubesInSide = numberify(cubesInSide, defaultGeometry.cubesInSide)!;
        this.gapRatio = numberify(gapRatio, defaultGeometry.gapRatio)!;
        this.diameter = numberify(diameter, defaultGeometry.diameter)!;
        this.rotation = numberify(rotation, defaultGeometry.rotation)!;
        this.rotationSpeed = numberify(rotationSpeed, defaultGeometry.rotationSpeed)!;
        this.isRotating = boolify(isRotating, defaultGeometry.isRotating);
        this.isInverted = boolify(isInverted, defaultGeometry.isInverted);
    }

    setCubesInSide = (value: NumberLike) => {
        this.cubesInSide = Math.floor(numberify(value, this.cubesInSide))
    }

    setGapRatio = (value: NumberLike) => {
        this.gapRatio = numberify(value, this.gapRatio)
    }

    setDiameter = (value: NumberLike) => {
        this.diameter = numberify(value, this.diameter)
    }

    setRotation = (value: NumberLike) => {
        this.rotation = roundAndNarrow(numberify(value, this.rotation))
    }

    rotate = (value: NumberLike) => {
        this.rotation = roundAndNarrow(this.rotation + numberify(value, 0))
    }

    setRotationSpeed = (value: NumberLike) => {
        this.rotationSpeed = Math.round(numberify(value, this.rotationSpeed))
    }

    toggleAutoRotation = () => {
        this.isRotating = !this.isRotating
    }

    toggleRotationDirection = () => {
        this.rotationSpeed = -this.rotationSpeed
    }

    toggleGeometryInvertion = () => {
        this.isInverted = !this.isInverted
    }
}

export default GeometryStore
