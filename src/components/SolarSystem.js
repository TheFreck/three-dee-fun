import React, { useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useLoader, Canvas } from 'react-three-fiber';
import Bulb, { Star, Spot } from './lights/Bulb';
import { Planet } from './Planet';
import Orbit from './controls/Orbit';
import Background from './Background';
import PlanetRings from './PlanetRings';

export const SolarSystem = props => {
    const earthTexture = useLoader(THREE.TextureLoader, '/world.jpg');
    const moonTexture = useLoader(THREE.TextureLoader, '/luna.jpg');
    const sunTexture = useLoader(THREE.TextureLoader, '/sun.jpg');
    const jupiterTexture = useLoader(THREE.TextureLoader, '/jupiter.jpg');
    const saturnTexture = useLoader(THREE.TextureLoader, '/saturn.jpg');
    const ringsTexture = useLoader(THREE.TextureLoader, '/rings.jpg');
    const spaceTexture = useLoader(THREE.TextureLoader, '/space.jpg');

    const Sun = props => <Planet {...props} >{props.children}</Planet>;
    const Earth = props => <Planet {...props} >{props.children}</Planet>;
    const Moon = props => <Planet {...props} >{props.children}</Planet>;
    const Mercury = props => <Planet {...props} >{props.children}</Planet>;
    const Venus = props => <Planet {...props} >{props.children}</Planet>;
    const Mars = props => <Planet {...props} >{props.children}</Planet>;
    const Phoebos = props => <Planet {...props} >{props.children}</Planet>;
    const Deimos = props => <Planet {...props} >{props.children}</Planet>;
    const Jupiter = props => <Planet {...props} >{props.children}</Planet>;
    const Saturn = props => <Planet {...props} >{props.children}</Planet>;
    const Uranus = props => <Planet {...props} >{props.children}</Planet>;
    const Neptune = props => <Planet {...props} >{props.children}</Planet>;
    const Astroid = props => <Planet position={props.position} rotation={props.rotation} revolution={props.revolution} size={props.size} />;
    const AstroidBelt = props => {
        let astroids = [];
        const distance = props.position[0];
        let sizes = [];
        for (let i = 0; i < props.qty; i++) {
            let randy = Math.random();
            let rando = Math.random();
            let pos = ((randy * .22 - .44) + 1) * distance;
            let position = [pos * Math.cos(rando * 360), Math.random() * 2 - 1, pos * Math.sin(rando * 360)];
            let revolution = { x: 0, y: Math.random() * .0001 + .0001, z: 0 };
            let rotation = {x: Math.random() * .0001 - .0002,y: Math.random() * .0001 - .0002, z:Math.random() * .0001 - .0002}
            let size = [randy * .05 + .05, 5, 5]
            sizes.push(size[0]);
            astroids.push({
                position,
                rotation,
                revolution,
                size
            });
        }
        sizes.sort();
        return <>{
            astroids.map((astroid, j) => {

                let child = null;
                if(Math.random() <= .2) child = <Planet color='gray' name='astroid' position={[Math.random()-.5,Math.random()-.5, Math.random()-.5]} rotation={{x: Math.random() * .001 - .002,y: Math.random() * .001 - .002, z:Math.random() * .001 - .002}} revolution={{ x: 0, y: Math.random() * .01 + .01, z: 0 }} size={[(Math.random() + .5) * astroid.size[0], 5, 5]} />
                return (
                    <Suspense fallback={null} key={j}>
                        <Planet 
                            key={j} 
                            color='gray' 
                            name='astroid' 
                            position={astroid.position} 
                            rotation={astroid.rotation} 
                            revolution={astroid.revolution} 
                            size={astroid.size} 
                            reflectivity={1}
                            clearcoat={0}
                        >{child ?? child}</Planet>
                    </Suspense>
                );
            }
            
            )
        }</>
    }


    const earthDistance = 50;
    const sunSize = 5;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 50000000000000000000);
    const Fog = () => new THREE.Fog('name', '#000000', 10, 1000);

    return <div
        style={{
            width: '100vw', height: '100vh'
        }}>
        <Canvas
            style={{
                background: 'black'
            }}
            camera={{pov: camera, position: [10,0,12]}}
            shadowMap
        >
            {/* <fog attach='fog' args={['black',.1,4000]} /> */}
            <Suspense fallback={null}>
                <axesHelper args={[3000]} />
                <Orbit />
                <ambientLight intensity={.5} />

                {/* <Suspense fallback={null}>
                        <Background color='black' filename='./space.jpg' />
                    </Suspense> */}
                    
                {/* <Suspense fallback={null}>
                    <Sun
                        name='sun'
                        size={[sunSize, 30, 30]}
                        position={[0, 0, 0]}
                        rotation={{ x: 0, y: .00, z: 0 }}
                        emissive={'yellow'}
                        emissiveIntensity={1}
                        reflectivity={0}
                        clearcoat={0}
                        transmission={0}
                        roughness={1}
                        texture={sunTexture}
                    color={'yellow'}
                    >
                        <Suspense fallback={null}>
                            <Mercury
                                name='mercury'
                                size={[.38, 100, 100]}
                                position={[earthDistance * .39, 0, 0]}
                                rotation={{ x: 0, y: .007, z: 0 }}
                                revolution={{ x: 0, y: .007, z: 0 }}
                                castShadow
                                receiveShadow
                                texture={moonTexture}
                                color='darkgray'
                                reflectivity={1}
                                clearcoat={0}
                            />
                        </Suspense>
                        <Suspense fallback={null}>
                            <Venus
                                name='venus'
                                size={[.95, 100, 100]}
                                position={[earthDistance * .72, 0, 0]}
                                rotation={{ x: 0, y: .006, z: 0 }}
                                revolution={{ x: 0, y: .006, z: 0 }}
                                castShadow
                                receiveShadow
                                texture={moonTexture}
                                color='teal'
                                reflectivity={1}
                                clearcoat={0}
                            />
                        </Suspense> */}
                        <Suspense fallback={null}>
                            <Earth
                                name='earth'
                                size={[1, 100, 100]}
                                position={[earthDistance/10, 0, 0]}
                                rotation={{ x: 0, y: .011, z: 0 }}
                                revolution={{ x: 0, y: .005, z: 0 }}
                                tilt={23.5/360 * Math.PI*2}
                                texture={earthTexture}
                                reflectivity={0}
                                castShadow
                                receiveShadow
                                reflectivity={1}
                                clearcoat={0}
                            >
                                <PlanetRings
                                    size={[2.9, 3, 100]}
                                    color={'red'}
                                    emissive={'white'}
                                    emissiventensity={1}
                                    tilt={Math.PI}
                                />
                                <Suspense fallback={null}>
                                    <Moon
                                        name='moon'
                                        size={[.23, 100, 100]}
                                        position={[-3, 0, 0]}
                                        rotation={{ x: 0, y: .00, z: 0 }}
                                        revolution={{ x: 0, y: .0081, z: 0 }}
                                        tilt={45/360 * Math.PI*2}
                                        moon
                                        texture={moonTexture}
                                        castShadow
                                        receiveShadow
                                        reflectivity={1}
                                        clearcoat={0}
                                    ></Moon>
                                </Suspense>
                            </Earth>
                        </Suspense>
                        {/* <Suspense fallback={null}>
                            <Mars
                                name='mars'
                                size={[.53, 100, 100]}
                                position={[earthDistance * 1.52, 0, 0]}
                                rotation={{ x: 0, y: .006, z: 0 }}
                                revolution={{ x: 0, y: .004, z: 0 }}
                                castShadow
                                receiveShadow
                                texture={moonTexture}
                                color='orange'
                                reflectivity={1}
                                clearcoat={0}
                            >
                                <Suspense fallback={null}>
                                    <Phoebos
                                        name='phoebos'
                                        size={[.07, 3, 6]}
                                        position={[.6, 0, 0]}
                                        rotation={{ x: 0, y: .1, z: 0 }}
                                        revolution={{ x: 0, y: .005, z: 0 }}
                                        texture={moonTexture}
                                        castShadow
                                        receiveShadow
                                        reflectivity={1}
                                        clearcoat={0}
                                    />
                                </Suspense>
                                <Suspense fallback={null}>
                                    <Deimos
                                        name='deimos'
                                        size={[.17, 5, 2]}
                                        position={[1.5, 0, 0]}
                                        rotation={{ x: 0, y: .1, z: 0 }}
                                        revolution={{ x: 0, y: .004, z: 0 }}
                                        texture={moonTexture}
                                        castShadow
                                        receiveShadow
                                        reflectivity={1}
                                        clearcoat={0}
                                    />
                                </Suspense>
                            </Mars>
                        </Suspense> */}
                        {/* <Suspense fallback={null}>
                            <AstroidBelt
                                name='astroid belt'
                                position={[earthDistance * 2.7]}
                                qty={2000}
                            />
                        </Suspense> */}
                        {/* <Suspense fallback={null}>
                            <Jupiter
                                name='jupiter'
                                size={[11.19, 100, 100]}
                                position={[earthDistance * 5.2, 0, 0]}
                                rotation={{ x: 0, y: .1, z: 0 }}
                                revolution={{ x: 0, y: .004, z: 0 }}
                                texture={jupiterTexture}
                                castShadow
                                receiveShadow
                                reflectivity={1}
                                clearcoat={0}
                                reflectivity={1}
                                clearcoat={0}

                            ></Jupiter>
                        </Suspense>
                        <Suspense fallback={null}>
                            <Saturn
                                name='saturn'
                                size={[9.41,100,100]}
                                position={[earthDistance * 9.5,0,0]}
                                rotation={{x:0,y:.0001,z:0}}
                                revolution={{x:0,y:.005,z:0}}
                                texture={saturnTexture}
                                tilt={360/26.73}
                                castShadow
                                receiveShadow
                                reflectivity={1}
                                clearcoat={0}
                            >
                                <PlanetRings
                                    size={[11, 12, 100]}
                                    color={'rgb(131, 0, 0)'}
                                    tilt={360/26.73}
                                />
                                <PlanetRings
                                    size={[12.1, 16, 100]}
                                    color={'rgb(214, 247, 154)'}
                                    tilt={360/26.73}
                                />
                                <PlanetRings
                                    size={[16.5, 19, 100]}
                                    color={'rgb(3, 0, 48)'}
                                    tilt={360/26.73}
                                />
                                <PlanetRings
                                    size={[20, 22, 100]}
                                    color={'rgb(53, 43, 0)'}
                                    tilt={360/26.73}
                                />
                            </Saturn>
                        </Suspense>
                    </Sun>
                </Suspense> */}
            </Suspense>

        </Canvas>
    </div>
}

export default SolarSystem;