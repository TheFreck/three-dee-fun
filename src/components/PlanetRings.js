import React, {useRef} from "react";
import { useEffect } from "react/cjs/react.development";
import * as THREE from 'three';

export const PlanetRings = props => {
    const {size, roughness, clearcoat, transmission, reflectivity, emissive, emissiveIntensity, color, texture, tilt} = props;
    const ref = useRef();

    useEffect(() => {
        ref.current.rotation.set(0,0,0);
        let quaternion = new THREE.Quaternion();
        if(tilt){
            quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), (tilt+85)/360*Math.PI*2);
            ref.current.applyQuaternion(quaternion);
        }

    },[]);

    return (
        <mesh
            ref={ref}
            {...props}
            castShadow
            receiveShadow
        >
            <ringBufferGeometry 
                args={size} 
            />
            <meshPhysicalMaterial
                color={color ? color : 'white'}
                opacity={.7}
                // transparent
                side={THREE.DoubleSide}
                // wireframe
                // metalness={.85}
                roughness={roughness >= 0 ? roughness : 1}
                clearcoat={clearcoat >= 0 ? clearcoat : 1}
                transmission={transmission ? transmission : 0}
                reflectivity={reflectivity >= 0 ? reflectivity : 1}
                emissive={emissive ? emissive : ''}
                emissiveIntensity={emissiveIntensity ? emissiveIntensity : 0}
                texture={texture ?? texture}
            />
        </mesh>
    );
}

export default PlanetRings;