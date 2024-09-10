import Cube from '../Cube/index.js'

import { degToRad } from '../util/index.js'
import { triangleShiftY } from '../util/magicNumbers.js'

import type { PenroseTriangleViewProps } from '../types.js'


const PenroseTriangleView = ({
    cubeCenters,
    cubeSize,
    diameter = 1,
    rotation = 0,
    isInverted = false,
    color
} : PenroseTriangleViewProps
) => (
    <group rotation={[ 0, 0, -degToRad(rotation) ]}>
        <group position={[ 0, triangleShiftY * diameter, 0 ]}>

            { cubeCenters.map((line, lineIdx) => line.map(({ x, y }, idx) => {
                const totalLength = line.length * cubeCenters.length;
                const idxInTotal = (lineIdx * line.length) + idx;
                return (
                    <Cube
                        key={ 'cube_' + idxInTotal }
                        order={ idxInTotal + 1 }
                        size={ cubeSize }
                        positionX={ x }
                        positionY={ y }
                        isLast={ idxInTotal === totalLength - 1 }
                        isInverted={ isInverted }
                        color={ color }
                    />
                )
            }))}

        </group>
    </group>
);

export default PenroseTriangleView
