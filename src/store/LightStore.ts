import { makeAutoObservable } from 'mobx'

import { numberify,
         roundAndNarrow } from '../util/index.js'
import GeometryStore from './GeometryStore.js';

import type { NumberLike,
              LightInititalValues } from '../types.js'


export const defaultLight = Object.freeze({
    rotation: 0,
    binding: 50,
    elevation: 2.5,
    intensity: 12.5,
    brightness: 1.25,
});

class LightStore {
    geometryStore: GeometryStore
    angle: number       // angle in degrees, clockwise

    binding: false | number
    elevation: number
    intensity: number
    brightness: number

    
    constructor(geometryStore: GeometryStore, initialValues: LightInititalValues = {}) {
        makeAutoObservable(this);
        this.geometryStore = geometryStore;

        const { rotation, binding, elevation, intensity, brightness } = initialValues || {};
        
        this.angle = numberify(rotation, defaultLight.rotation);
        this.binding = binding === undefined ? defaultLight.binding
                             : binding === false     ? false
                                                             : numberify(binding, 0);
        this.elevation = numberify(elevation, defaultLight.elevation);
        this.intensity = numberify(intensity, defaultLight.intensity);
        this.brightness = numberify(brightness, defaultLight.brightness);
    }

    // UNDO MARK

    get rotation() {
        return typeof(this.binding) === 'number'
            ? roundAndNarrow(this.geometryStore.rotation + this.binding)
            : roundAndNarrow(this.angle)
    }

    setIntensity = (value: NumberLike) => {
        this.intensity = numberify(value, this.intensity)
    }

    setBrightness = (value: NumberLike) => {
        this.brightness = numberify(value, this.brightness)
    }

    setRotation = (value: NumberLike) => {
        let newValue = roundAndNarrow(numberify(value, this.angle));

        if(typeof this.binding === 'number') {
            this.binding = roundAndNarrow(newValue - this.geometryStore.rotation)
        }

        this.angle = newValue
    }

    setElevation = (value: NumberLike) => {
        this.elevation = numberify(value, this.elevation)
    }

    toggleBinding = () => {
        if(this.binding === false) {
            this.binding = roundAndNarrow(this.rotation - this.geometryStore.rotation);
        } else {
            this.angle = this.rotation;
            this.binding = false
        }
    }
}

export default LightStore
