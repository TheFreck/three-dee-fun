import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from 'react-three-fiber';
import {useBox} from 'use-cannon';

export const Box = props => {
    const [ref,api] = useBox(() => ({mass:1,...props}));
    const texture = useLoader(THREE.TextureLoader, '/texture.jpg');
    // useFrame(state => {
    //     // make dynamic modifications here
    // })

    const handlePointerDown = e => {
        e.object.active = true;
        if(window.activeMesh) {
            scaleDown(window.activeMesh); 
            window.activeMesh.active = false;
        }
        if(window.activeMesh !== e.object) 
        window.activeMesh = e.object;
        else
        window.activeMesh = '';
    }

    const handlePointerEnter = e => {
        scaleUp(e.object);
    }

    const handlePointerLeave = e => {
        if(!e.object.active) scaleDown(e.object);
    }

    const scaleDown = o => {
        o.scale.x = 1;
        o.scale.y = 1;
        o.scale.z = 1;
    }

    const scaleUp = o => {
        o.scale.x = 1.5;
        o.scale.y = 1.5;
        o.scale.z = 1.5;
    }

    return <mesh
        ref={ref}
        api={api}
        {...props}
        castShadow
        receiveShadow
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
    >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
            color='white'
            opacity={1}
            transparent
            side={THREE.DoubleSide}
            // wireframe
            // metalness={.85}
            // roughness={0}
            clearcoat={1}
            transmission={0}
            reflectivity={1}
            map={texture}
        />
    </mesh>
}

export default Box;