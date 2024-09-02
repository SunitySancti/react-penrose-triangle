import { memo,
         useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { observer } from 'mobx-react-lite'

import PenroseTriangleView from './view'
import { useCubesData,
         useElementSizes,
         useTriangleRotation } from '../util/hooks'
import { zoomCoefficient } from '../util/magicNumbers'
import { defaultValues } from '../store'

import { PenroseTriangleProps,
         SceneProps,
         PenroseTriangleModelProps,
         GeometryConfig,
         MaterialConfig,
         LightConfig } from '../types'


const PenroseTriangle = memo(({
    useAutoRotation,
	cubesInSide,
	gapRatio,
    diameter,
    rotation,
    isInverted,
    color,
}: PenroseTriangleModelProps
) => {
    const { cubeCenters, cubeSize } = useCubesData({ cubesInSide, gapRatio, diameter, isInverted });

    useAutoRotation();
    
    return <>
        <PenroseTriangleView {...{
            cubeCenters,
            cubeSize,
            diameter,
            rotation,
            isInverted,
            color
        }}/>
    </>
});

const Scene = observer(({
    geometry,
    material,
    light,
    setRotation,
}: SceneProps
) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const { width, height } = useElementSizes(parentRef);
    const zoom = Math.min(width, height) * zoomCoefficient;


    const { rotation,
            rotationSpeed,
            isRotating } = geometry;
    const { elevation,
            rotation: lightRotation,
            binding,
            brightness,
            intensity } = light

    const [ useAutoRotation,
            geometryRotation,
            lightPosition ] = useTriangleRotation({ setRotation, rotation, rotationSpeed, isRotating, lightRotation, binding });

    return (
        <div style={{ height: '100%', width: '100%' }} ref={ parentRef }>
        <Canvas style={{ height: '100%', width: '100%' }} >

            <OrthographicCamera
                makeDefault
                zoom={ zoom }
                position={[0, 0, 100]}
            />
            <ambientLight intensity={ brightness } />
            <directionalLight
                position={[ ...lightPosition, elevation ]}
                intensity={ intensity }
            />

            <PenroseTriangle {...{
                ...geometry,
                ...material,
                rotation: geometryRotation,
                useAutoRotation
            }}/>
            
        </Canvas>
        </div>
    )
});

const RenderController = ({
    geometry = {},
    material = {},
    light = {},
    setRotation
}: PenroseTriangleProps
) => {
    const { geometry: defaultGeometry,
            material: defaultMaterial,
            light: defaultLight } = defaultValues;

    function isCompleted(x: object, y: object) {
        const keysY = Object.keys(y);
        return keysY.every(key => key in x);
    }

    const isControlled = typeof setRotation === 'function'
        && isCompleted(geometry, defaultGeometry)
        && isCompleted(material, defaultMaterial)
        && isCompleted(light, defaultLight)

    // The presence of setRotation is considered as a sign of controlled component
    // It's assumed that this function can be obtained only from usePenroseTriangle hook
    return isControlled
        ?   <Scene {...{
                geometry: geometry as GeometryConfig,
                material: material as MaterialConfig,
                light: light as LightConfig,
                setRotation
            }}/>
        :   <Scene {...{
                geometry: {
                    ...defaultGeometry,
                    ...geometry,
                },
                material: {
                    ...defaultMaterial,
                    ...material,
                },
                light: {
                    ...defaultLight,
                    ...light,
                }
            }}/>
}

export default RenderController
