import { useMemo,
         useState } from 'react'

import GeometryStore from './GeometryStore.js'
import MaterialStore from './MaterialStore.js'
import LightStore from './LightStore.js'

import { defaultGeometry } from './GeometryStore.js'
import { defaultMaterial } from './MaterialStore.js'
import { defaultLight } from './LightStore.js'

import type { PenroseTriangleProps,
              InititialConfig } from '../types.js'

export const defaultValues = {
    geometry: defaultGeometry,
    material: defaultMaterial,
    light: defaultLight
}

export const usePenroseTriangle = (initialValues: InititialConfig = {}) => {
    const { geometry: initialGeometry,
            material: initialMaterial,
            light: initialLight } = initialValues;
    const [ geometryStore ] = useState(() => new GeometryStore(initialGeometry));
    const [ materialStore ] = useState(() => new MaterialStore(initialMaterial));
    const [ lightStore ] = useState(() => new LightStore(geometryStore, initialLight));

    const { cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted, setCubesInSide, setGapRatio, setDiameter, setRotation, rotate, setRotationSpeed, toggleAutoRotation, toggleRotationDirection, toggleGeometryInvertion } = geometryStore;
    const { color, setColor } = materialStore;
    const { intensity, brightness, elevation, binding, rotation: lightRotation, setIntensity, setBrightness, setRotation: setLightRotation, setElevation, toggleBinding  } = lightStore;


    const geometryConfig = useMemo(() => ({
        cubesInSide,
        gapRatio,
        diameter,
        rotation,
        rotationSpeed,
        isRotating,
        isInverted,
    }),[ cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted ]);

    const materialConfig = useMemo(() => ({
        color,
    }),[ color ]);

    const lightConfig = useMemo(() => ({
        elevation,
        rotation: lightRotation,
        binding,
        intensity,
        brightness,
    }),[ intensity, brightness, elevation, binding, rotation ]);

    const geometryControllers = useMemo(() => ({
        setCubesInSide,
        setGapRatio,
        setDiameter,
        setRotation,
        rotate,
        setRotationSpeed,
        toggleAutoRotation,
        toggleRotationDirection,
        toggleGeometryInvertion,
    }),[ setCubesInSide, setGapRatio, setDiameter, setRotation, rotate, setRotationSpeed, toggleAutoRotation, toggleRotationDirection, toggleGeometryInvertion ]);

    const materialControllers = useMemo(() => ({
        setColor
    }),[ setColor ]);

    const lightControllers = useMemo(() => ({
        setIntensity,
        setBrightness,
        setRotation: setLightRotation,
        setElevation,
        toggleBinding,
    }),[ setIntensity, setBrightness, setRotation, setElevation, toggleBinding ]);

    const props: PenroseTriangleProps = useMemo(() => ({
        geometry: geometryConfig,
        material: materialConfig,
        light: lightConfig,
        setRotation,
    }),[ geometryConfig, materialConfig, lightConfig, setRotation ]);

    const config = useMemo(() => ({
        geometry: geometryConfig,
        material: materialConfig,
        light: lightConfig,
    }),[ geometryConfig, materialConfig, lightConfig ]);

    const controllers = useMemo(() => ({
        geometry: geometryControllers,
        material: materialControllers,
        light: lightControllers,
    }),[ geometryControllers, materialControllers, lightControllers ]);

    const geometry = useMemo(() => ({
        config: geometryConfig,
        controllers: geometryControllers,
    }),[ geometryConfig, geometryControllers ]);

    const material = useMemo(() => ({
        config: materialConfig,
        controllers: materialControllers,
    }),[ materialConfig, materialControllers ]);

    const light = useMemo(() => ({
        config: lightConfig,
        controllers: lightControllers,
    }),[ lightConfig, lightControllers ]);

    return ({
        props,
        config,
        controllers,
        geometry,
        material,
        light
    });
}
