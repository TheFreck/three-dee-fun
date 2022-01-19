import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from 'react-three-fiber';
import { useState } from 'react/cjs/react.development';
import { clear } from '@testing-library/user-event/dist/clear';
import { KeyframeTrack } from 'three';

export const Planet = props => {
    const { rotation, texture, size, emissive, emissiveIntensity, color, revolution, reflectivity, clearcoat, transmission, roughness, tilt, name, moon, position } = props;
    const innerRef = useRef();
    const outerRef = useRef();
    const middleRef = useRef();
    const [defaultRotation, setDefaultRotation] = useState({ x: 0, y: 0, z: 0 });
    const [defaultRevolution, setDefaultRevolution] = useState({ x: 0, y: 0, z: 0 });
    useEffect(() => {
        if (rotation) setDefaultRotation(rotation);
        if (revolution) setDefaultRevolution(revolution);

        if (!rotation) {
            innerRef.current.rotation.set(0, 0, 0);
            outerRef.current.rotation.set(0, 0, 0);
        }
        else {
            innerRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
            outerRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
        if (tilt) {
            if (moon) {
                outerRef.current.rotateOnAxis({ x: 0, y: 1, z: 0 }, tilt);
                middleRef.current.rotateOnAxis({ x: 0, y: -1, z: 0 }, tilt);
                innerRef.current.rotateOnAxis({ x: 0, y: 1, z: 0 }, tilt);
            }
            else {
                outerRef.current.rotateOnAxis({ x: 0, y: 0, z: 0 }, tilt);
                middleRef.current.rotateOnAxis({ x: 0, y: 0, z: 0 }, tilt);
                innerRef.current.rotateOnAxis({ x: 1, y: 0, z: 0 }, tilt);
            }
        }
        // middleRef.current.position.x+=1;
        // middleRef.current.position.y+=1;
        // middleRef.current.position.z+=1;
    }, []);

    // useEffect(() => {
    //     console.log("defaultRotation: ", defaultRotation);
    //     console.log("defaultRevolution: ", defaultRevolution);
    // }, [defaultRotation, defaultRevolution]);

    useFrame(() => {
        if (props && rotation) {
            if (moon) {
                innerRef.current.rotation.x += defaultRotation.x;
                innerRef.current.rotation.y += defaultRotation.y;
                innerRef.current.rotation.z += defaultRotation.z;
                middleRef.current.rotation.x += defaultRotation.x;
                middleRef.current.rotation.y += defaultRotation.y;
                middleRef.current.rotation.z += defaultRotation.z;
                outerRef.current.rotation.x += defaultRevolution.x;
                outerRef.current.rotation.y += defaultRevolution.y;
                outerRef.current.rotation.z += defaultRevolution.z;
                if (outerRef.current.rotation.x > Math.PI * 2) outerRef.current.rotation.x -= Math.PI * 2;
                if (outerRef.current.rotation.y > Math.PI * 2) outerRef.current.rotation.y -= Math.PI * 2;
                if (outerRef.current.rotation.z > Math.PI * 2) outerRef.current.rotation.z -= Math.PI * 2;
                if (middleRef.current.rotation.x > Math.PI * 2) middleRef.current.rotation.x -= Math.PI * 2;
                if (middleRef.current.rotation.y > Math.PI * 2) middleRef.current.rotation.y -= Math.PI * 2;
                if (middleRef.current.rotation.z > Math.PI * 2) middleRef.current.rotation.z -= Math.PI * 2;
                if (innerRef.current.rotation.x > Math.PI * 2) innerRef.current.rotation.x -= Math.PI * 2;
                if (innerRef.current.rotation.y > Math.PI * 2) innerRef.current.rotation.y -= Math.PI * 2;
                if (innerRef.current.rotation.z > Math.PI * 2) innerRef.current.rotation.z -= Math.PI * 2;
                console.log(`inner.y: ${innerRef.current.rotation.y}; middle.y: ${middleRef.current.rotation.y}; outer.y: ${outerRef.current.rotation.y}`)
            }
            else {
                innerRef.current.rotation.x += defaultRotation.x;
                innerRef.current.rotation.y += defaultRotation.y;
                innerRef.current.rotation.z += defaultRotation.z;
                outerRef.current.rotation.x += defaultRevolution.x;
                outerRef.current.rotation.y += defaultRevolution.y;
                outerRef.current.rotation.z += defaultRevolution.z;
            }

        }
    })

    const points = [
        new THREE.Vector3(0, size[0] * 1.5, 0),
        new THREE.Vector3(0, -size[0] * 1.5, 0)
    ]

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

    return (<>
        {
            <mesh
                position={[0, 0, 0]}
                ref={outerRef}
                revolution={defaultRevolution}
                name={`outer-${name}`}
            >

                <mesh
                    ref={middleRef}
                    name={`middle-${name}`}
                    position={[0,0,0]}
                >
                    <mesh
                        ref={innerRef}
                        {...props}
                        name={`inner-${name}`}
                    >
                        {props.children}
                        <sphereBufferGeometry args={size} />
                        <meshPhysicalMaterial
                            color={color ? color : 'white'}
                            opacity={1}
                            transparent
                            side={THREE.FrontSide}
                            // wireframe
                            // metalness={.85}
                            roughness={roughness >= 0 ? roughness : 1}
                            clearcoat={clearcoat >= 0 ? clearcoat : 1}
                            transmission={transmission ? transmission : 0}
                            reflectivity={reflectivity >= 0 ? reflectivity : 1}
                            map={texture}
                            emissive={emissive ? emissive : ''}
                            emissiveIntensity={emissiveIntensity ? emissiveIntensity : 0}
                        />
                        <line geometry={lineGeometry} >
                            <lineBasicMaterial
                                color={'white'}
                                linewidth={5}
                                linecap='round'
                                attach='material'
                            />
                        </line>
                        {emissive ? <pointLight /> : ''}
                    </mesh>
                </mesh>
            </mesh>

        }
    </>
    );
}

export default Planet;