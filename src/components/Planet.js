import React, { useRef, useEffect, useReducer, useContext } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from 'react-three-fiber';
import { useState } from 'react/cjs/react.development';
import Bulb from './lights/Bulb';
// import { PlanetContext } from '../context/planet';

export const Planet = props => {
    const { rotation, texture, size, emissive, emissiveIntensity, color, revolution, reflectivity, clearcoat, transmission, roughness, tilt, name, moon, position, star, livePosition, setLivePosition } = props;
    const parentLayer = useRef();
    const tiltOffsetLayer = useRef();
    const satelliteLayer = useRef();
    const ref = useRef();
    const lightRef = useRef();
    const [defaultRotation, setDefaultRotation] = useState({ x: 0, y: 0, z: 0 });
    const [defaultRevolution, setDefaultRevolution] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        if(name==='earth') console.log("position: ", position);
        if (tilt) {
            const quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 4);
            ref.current.applyQuaternion(quaternion);
        }
    }, []);

    useEffect(() => {
        if (rotation) setDefaultRotation(rotation);
        if (revolution) setDefaultRevolution(revolution);
        if (!ref || !parentLayer.current || !tiltOffsetLayer.current || !satelliteLayer.current || !lightRef.current) return;
        if (ref) initializeRotation(ref, { x: 0, y: 0, z: 0 });
        if (parentLayer) initializeRotation(parentLayer, { x: 0, y: 0, z: 0 });
    }, [parentLayer, tiltOffsetLayer, satelliteLayer, ref, rotation, revolution, lightRef]);

    const initializeRotation = (targetRef, { x, y, z }) => {
        targetRef.current.rotation.x = x;
        targetRef.current.rotation.y = y;
        targetRef.current.rotation.z = z;
    }
    const setRotation = (targetRef, { x, y, z }) => {
        targetRef.current.rotation.x += x;
        targetRef.current.rotation.y += y;
        targetRef.current.rotation.z += z;
    }
    const setRotationOffset = (targetRef, { x, y, z }) => {
        targetRef.current.rotation.x -= 0;
        targetRef.current.rotation.y -= defaultRevolution.y;
        targetRef.current.rotation.z -= 0;

    }

    useFrame(() => {
        if (props && rotation) {
            if(parentLayer.current.rotation.y >= (Math.PI*2)){
                parentLayer.current.rotation.y -= Math.PI*2;
            }
            if (moon) {
                setRotation(parentLayer, defaultRevolution);
                setRotation(ref, defaultRotation);
            }
            else {
                setRotation(parentLayer, defaultRevolution);
                setRotation(ref, defaultRotation);
                setRotationOffset(tiltOffsetLayer, defaultRotation);
            }

        }
    })

    const polarPoints = [
        new THREE.Vector3(0, size[0] * 1.5, 0),
        new THREE.Vector3(0, -size[0] * 1.5, 0)
    ]

    const hemispherePoints1 = [
        new THREE.Vector3(size[0] * 1.5, 0, 0),
        new THREE.Vector3(-size[0] * 1.5, 0, 0)
    ]

    const hemispherePoints2 = [
        new THREE.Vector3(0, 0, size[0] * 1.5),
        new THREE.Vector3(0, 0, -size[0] * 1.5)
    ]

    const yLineGeometry = new THREE.BufferGeometry().setFromPoints(polarPoints);
    const xLineGeometry = new THREE.BufferGeometry().setFromPoints(hemispherePoints1);
    const zLineGeometry = new THREE.BufferGeometry().setFromPoints(hemispherePoints2);
    const planetCam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1,1000000000);

    return (<>
        {

            <mesh
                position={[0, 0, 0]}
                ref={parentLayer}
                name={`parentLayer-${name}`}
                camera={{pov: name==='earth' ? planetCam : false, position: [5,0,0]}}
            >
                <mesh
                    ref={satelliteLayer}
                    position={position}
                    name={`satelliteLayer-${name}`}
                >
                    {props.children}
                    <mesh
                        ref={tiltOffsetLayer}
                        name={`tiltOffsetLayer-${name}`}
                        position={[0, 0, 0]}
                    >
                        {/* <line geometry={xLineGeometry} >
                            <lineBasicMaterial
                                color={'white'}
                                linewidth={5}
                                linecap='round'
                                attach='material'
                            />
                        </line>
                        <line geometry={yLineGeometry} >
                            <lineBasicMaterial
                                color={'white'}
                                linewidth={5}
                                linecap='round'
                                attach='material'
                            />
                        </line> 
                        <line geometry={zLineGeometry} >
                            <lineBasicMaterial
                                color={'white'}
                                linewidth={5}
                                linecap='round'
                                attach='material'
                            />
                        </line> */}
                        <mesh
                            ref={ref}
                            position={[0, 0, 0]}
                            name={`ref-${name}`}
                            castShadow
                            receiveShadow
                        >
                            {star ?
                                (<mesh
                                >
                                    <pointLight castShadow args={['white', 1, 9999999999]} />
                                    <sphereBufferGeometry args={size} />
                                    <meshPhongMaterial
                                        emissive={emissive}
                                        texture={texture}
                                        // opacity={1}
                                    />
                                </mesh>) :
                                (<mesh
                                    receiveShadow
                                >
                                    <sphereBufferGeometry args={size} />
                                    <meshPhysicalMaterial
                                        color={color ? color : 'white'}
                                        opacity={1}
                                        // transparent
                                        side={THREE.DoubleSide}
                                        // wireframe
                                        // metalness={.85}
                                        roughness={roughness >= 0 ? roughness : 1}
                                        clearcoat={clearcoat >= 0 ? clearcoat : 1}
                                        transmission={transmission ? transmission : 0}
                                        reflectivity={reflectivity >= 0 ? reflectivity : 1}
                                        // map={texture}
                                        emissive={emissive ? emissive : ''}
                                        emissiveIntensity={emissiveIntensity ? emissiveIntensity : 0}
                                    />
                                </mesh>)}
                        </mesh>
                    </mesh>
                </mesh>
            </mesh>

        }
    </>
    );
}

export default Planet;