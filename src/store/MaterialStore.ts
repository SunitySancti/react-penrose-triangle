import { makeAutoObservable } from 'mobx'

import type { MaterialInititalValues } from '../types'


export const defaultMaterial = Object.freeze({
    color: '#bc2a9c'
});

class MaterialStore {
    color: string
    
    constructor(initialValues: MaterialInititalValues = {}) {
        makeAutoObservable(this);
        const { color } = initialValues;

        this.color = color || defaultMaterial.color
    }

    setColor = (value: string) => {
        this.color = value
    }
}

export default MaterialStore
