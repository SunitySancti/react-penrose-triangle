import { forwardRef } from 'react'

import { degToRad,
         arraify } from '../util'

import type { Group } from 'three'
import type { CubeViewProps,
              MaterialProps } from '../types'


const Material = ({
    type = 'standard',
    color = 'gold',
    checkDepth = false
} : MaterialProps
) => {
    switch(type) {
        case 'standard':
            return (
                <meshStandardMaterial
                    color={ color }
                    roughness={ 2 }
                    metalness={ 2 }
                    depthWrite={ checkDepth }
                />
            )
        case 'normal':
        default:
            return (
                <meshNormalMaterial
                    depthWrite={ checkDepth }
                />
            )
    }
}

const CubeView = forwardRef<Group, CubeViewProps>(({
    geometry,
    order = 1,
    positionX = 0,
    positionY = 0,
    positionZ = 0,
    rotationY = 0,
    rotationZ = 0,
    isLast = false,
    checkDepth,
    material,
    color,
},  ref
) => (
    <group
        ref={ ref }
        position={[ positionX, positionY, positionZ ]}
        rotation={ [0, degToRad(rotationY), degToRad(rotationZ) ] }
    >
        { arraify(geometry).map((geometry, idx) => (

            <mesh
                key={ 'face-group_' + idx }
                geometry={ geometry }
                renderOrder={ (idx && isLast) ? 0 : order }
            >
                <Material {...{
                    type: material,
                    color,
                    checkDepth
                }}/>
            </mesh>

        ))}
    </group>
));

export default CubeView
