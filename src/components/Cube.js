import React, { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree, useLoader } from 'react-three-fiber';
import Orbit from './controls/Orbit';
import Bulb from './lights/Bulb';
import Floor from './Floor';
import Wall from './Wall';
import Box from './Box';
import Background from './Background';
import ColorPicker from './controls/ColorPicker';
import Dragable from './controls/Dragable';
import SolarSystem from './SolarSystem';
import {Physics} from 'use-cannon';

export const FiberCube = () => {
    return <div
        style={{
            width: '100vw', height: '100vh'
        }}>
        <ColorPicker />
        <Canvas
            style={{
                background: 'tan'
            }}
            camera={{
                position: [-5, 4, 3]
            }}
            shadowMap
        >
            <ambientLight intensity={.4} />
            <Orbit />
            <axesHelper args={[5]} />
            <Physics>
                <Dragable>
                    <Bulb position={[0, 5, 0]} size={[.2, 100, 100]} />
                    <Suspense fallback={null}>
                        <Box position={[-4, 1, 0]} />
                    </Suspense>
                    <Suspense fallback={null}>
                        <Box position={[4, 1, 0]} />
                    </Suspense>
                </Dragable>
                <Suspense fallback={null}>
                    <Background filename='/autoshop.jpg' />
                </Suspense>
                <Floor position={[0, -.5, 0]} />
                <Wall position={[5, 2.5, 0]} />
            </Physics>
        </Canvas>
    </div>
}

export default FiberCube;