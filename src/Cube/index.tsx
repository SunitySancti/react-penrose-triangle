import { useRef } from 'react'

import CubeView from './view'

import { useCubeGeometry,
         useCubeRotation } from '../util/hooks'
import { cubeRotationY } from '../util/magicNumbers'

import type { Group } from 'three'
import type { CubeModelProps } from '../types'


const Cube = ({
    isLast,
    size = 1,
    isRotating,
    isInverted,
    checkDepth = isRotating,
    ...props
}: CubeModelProps
) => {
    const groupRef = useRef<Group>(null);
    const cubeSlicedGeometry = useCubeGeometry(size, !isRotating && isLast, isInverted);
    useCubeRotation(groupRef, isRotating);

    return (
        <CubeView {...{
            ...props,
            geometry: cubeSlicedGeometry,
            isLast,
            rotationY: isInverted ? -cubeRotationY : cubeRotationY,
            rotationZ: 45,
            checkDepth,
            ref: groupRef,
        }}/>
    );
};

export default Cube
