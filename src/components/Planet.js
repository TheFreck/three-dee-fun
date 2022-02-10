import React, { useRef, useEffect, useReducer, useContext } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { useState } from 'react/cjs/react.development';
import Bulb from './lights/Bulb';
import { Camera } from 'three';
// import { PlanetContext } from '../context/planet';

export const Planet = props => {
    const { rotation, texture, size, emissive, emissiveIntensity, color, revolution, reflectivity, clearcoat, transmission, roughness, tilt, name, moon, position, star, livePosition, setLivePosition, viewName, speed } = props;
    const parentLayer = useRef();
    const tiltOffsetLayer = useRef();
    const satelliteLayer = useRef();
    const ref = useRef();
    const newRef = useRef();
    const lightRef = useRef();
    const [defaultRotation, setDefaultRotation] = useState({ x: 0, y: 0, z: 0 });
    const [defaultRevolution, setDefaultRevolution] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
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
      if(targetRef && targetRef.current){
        targetRef.current.rotation.x = x;
        targetRef.current.rotation.y = y;
        targetRef.current.rotation.z = z;
      }
    }
    const setRotation = (targetRef, { x, y, z }) => {
      if(targetRef && targetRef.current){
        targetRef.current.rotation.x += x * speed;
        targetRef.current.rotation.y += y * speed;
        targetRef.current.rotation.z += z * speed;
      }
    }
    const setRotationOffset = (targetRef, { x, y, z }) => {
      if(targetRef && targetRef.current){
        targetRef.current.rotation.x -= 0;
        targetRef.current.rotation.y -= defaultRevolution.y * speed;
        targetRef.current.rotation.z -= 0;
      }
    }

    useFrame(() => {
        if (props && rotation) {
            if(parentLayer?.current?.rotation.y >= (Math.PI*2)){
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
            <mesh
                position={[0, 0, 0]}
                ref={parentLayer}
                name={`parentLayer-${name}`}
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
                            name={`ref-${name}`}
                            position={[0, 0, 0]}
                        >
                            {star ?
                                (<mesh
                                  ref={newRef}
                                  >
                                    <pointLight castShadow intensity={.5} args={['white', 100000000000, 1000000000]} />
                                    <sphereBufferGeometry args={size} />
                                    <meshPhongMaterial
                                        emissive={emissive}
                                        texture={texture}
                                        // opacity={1}
                                        />
                                </mesh>) :
                                (<mesh
                                    receiveShadow
                                    castShadow
                                >
                                    <sphereBufferGeometry args={size} />
                                    <meshPhysicalMaterial
                                        color={color ? color : 'white'}
                                        opacity={1}
                                        // transparent
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
                                </mesh>)}
                        </mesh>
                    </mesh>
                </mesh>
            </mesh>
    </>
    );
}

export default Planet;