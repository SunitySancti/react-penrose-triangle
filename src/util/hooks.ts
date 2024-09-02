import { useMemo,
         useState,
         useEffect, 
         useCallback} from 'react'
import { Vector2 } from 'three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import { getPointsBetween,
         getCubeSize,
         getSideLength } from './index'

import type { RefObject } from 'react'
import type { Group } from 'three'
import type { Vertices,
              CubesDataParams,
              TriangleRotationParams } from '../types'


export const useCubesData = ({
    cubesInSide,
    gapRatio,       // gap size expressed in cube lengths
    diameter,       // triangle circumcircle's diameter
    isInverted
} : CubesDataParams
) => {
    const halfSideLength = diameter * Math.sqrt(3) / 4;
    const halfHeight = diameter * 3 / 8;

    const vertices: Vertices = {
        A: new Vector2(0, halfHeight),
        B: new Vector2(-halfSideLength, -halfHeight),
        C: new Vector2(halfSideLength, -halfHeight),
    }
    const { A, B, C } = vertices;
    const n = cubesInSide - 1;

    const cubeCenters = useMemo(() => isInverted
        ? [
            [ A, ...getPointsBetween(A, C, n) ],
            [ C, ...getPointsBetween(C, B, n) ],
            [ B, ...getPointsBetween(B, A, n) ],
          ]
        : [
            [ A, ...getPointsBetween(A, B, n) ],
            [ B, ...getPointsBetween(B, C, n) ],
            [ C, ...getPointsBetween(C, A, n) ],
    ],[ cubesInSide,
        gapRatio,
        diameter,
        isInverted
    ]);

    const cubeSize = getCubeSize(getSideLength(A, B), gapRatio, cubesInSide);

    return { cubeCenters, cubeSize }
}

export const useCubeGeometry = (size: number, shouldSlice = false, isInverted = false) => {
    return useMemo(() => {
        const boxGeometry = new THREE.BoxGeometry(size, size, size);

        if(shouldSlice) {
            const indices = Array.from(boxGeometry.index?.array || []);
            const triangles: number[][] = [];
    
            while(indices?.length) {
                const triangle = indices.splice(0,3);
                triangles.push(triangle)
            }
            // here define indices of triangles of mesh should be removed into slice:
            const sliceMeshTrianglesIndices = isInverted
                ? [ 6, 8, 9 ]
                : [ 3, 8, 9 ];
            
            const mainMeshTriangles = triangles.filter((_triangle, idx) => !sliceMeshTrianglesIndices.includes(idx));
    
            const sliceMeshIndices: number[] = [];
            const mainMeshIndices: number[] = [];
    
            sliceMeshTrianglesIndices.forEach(idx => {
                sliceMeshIndices.push(...triangles[idx])
            });
            mainMeshTriangles.forEach(triangle => {
                mainMeshIndices.push(...triangle)
            });
    
            const slice = boxGeometry.clone().setIndex(sliceMeshIndices);
            const main = boxGeometry.clone().setIndex(mainMeshIndices);
    
            return [slice, main]
        } else {
            return boxGeometry
        }
    },[ size, shouldSlice, isInverted ]);
}

export const useTriangleRotation = ({
    rotation,
    rotationSpeed,
    isRotating,
    setRotation,
    lightRotation,
    binding,
}: TriangleRotationParams
) => {
    const [geometryRotation, setGeometryRotation] = useState(rotation);
    const isControlledComponent = !!setRotation;

    const updateRotation = useCallback((degrees: number) => {
        let newValue = Math.round(((isControlledComponent ? rotation : geometryRotation) + degrees) * 100) / 100;
        while(newValue > 360) newValue -= 360;
        while(newValue < 0) newValue += 360;

        if(isControlledComponent) {
            setRotation(newValue)
        } else {
            setGeometryRotation(newValue);
        }
    },[ setRotation, setGeometryRotation, rotation, geometryRotation ]);

    const useAutoRotation = useCallback(() => {
        useFrame((_state, delta) => {
            if(isRotating && rotationSpeed) {
                updateRotation(rotationSpeed * delta)
            }
        });
    },[ isRotating, rotationSpeed, updateRotation ]);

    const lightPosition = useMemo(() => {
        const bindedRotation = (!isControlledComponent && typeof binding === 'number')
            ? Math.round((geometryRotation + binding) * 100) / 100
            : lightRotation

        const radians = Math.PI * (90 - bindedRotation) / 180;

        return [ Math.cos(radians), Math.sin(radians) ] as const
    },[ isControlledComponent, binding, geometryRotation, lightRotation ]);

    return [
        useAutoRotation,
        isControlledComponent ? rotation : geometryRotation,
        lightPosition
    ] as const
}

export const useCubeRotation = (
    ref: RefObject<Group>,
    isRotating = false,
) => {
    useFrame((_state, delta) => {
        const { current } = ref || {};
        if(isRotating && current) {
            current.rotation.x += delta;
            current.rotation.y += delta;
        }
    });
}

export const useElementSizes = (ref?: RefObject<HTMLElement> | undefined) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        if(ref) {
            const { current } = ref;
            if(current) {
                const resizeObserver = new ResizeObserver(() => {
                    setWidth(current.offsetWidth);
                    setHeight(current.offsetHeight);
                    setScrollWidth(current.scrollWidth);
                    setScrollHeight(current.scrollHeight);
                });
                resizeObserver.observe(current);

                return () => {
                    resizeObserver.disconnect();
                }
            } 
        } else {
            const setWindowSizes = () => {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
                setScrollWidth(window.innerWidth);
                setScrollHeight(window.innerHeight);
            }
            setWindowSizes();
            window.addEventListener('resize', setWindowSizes);

            return () => {
                window.removeEventListener('resize', setWindowSizes)
            }
        }
        
    },[ ref, ref?.current ]);

    return { width, height, scrollWidth, scrollHeight }
}

export const useResponsiveBackground = () => {
    const { width, height } = useElementSizes();
    return width >= height
}
