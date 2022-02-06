import React, { useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useLoader, Canvas } from 'react-three-fiber';
import Bulb, { Star, Spot } from './lights/Bulb';
import { Planet } from './Planet';
import Orbit from './controls/Orbit';
import Background from './Background';
import PlanetRings from './PlanetRings';
// import Floor from './Floor';
import AstroidBelt from './AstroidBelt';
// import CameraView from './controls/CameraView';

export const SolarSystem = props => {
  const earthTexture = useLoader(THREE.TextureLoader, '/world.jpg');
  const moonTexture = useLoader(THREE.TextureLoader, '/luna.jpg');
  const solTexture = useLoader(THREE.TextureLoader, '/sun.jpg');
  const jupiterTexture = useLoader(THREE.TextureLoader, '/jupiter.jpg');
  const saturnTexture = useLoader(THREE.TextureLoader, '/saturn.jpg');
  const ringsTexture = useLoader(THREE.TextureLoader, '/rings.jpg');
  const spaceTexture = useLoader(THREE.TextureLoader, '/space.jpg');
  
  const earthDistance = 11;
  const earthSize = .1;
  const solSize = earthSize * 10.9 * 1;

  const Sol = props => <Planet {...props} >{props.children}</Planet>;
  const Earth = props => <Planet {...props} >{props.children}</Planet>;
  const Luna = props => <Planet {...props} >{props.children}</Planet>;
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
  const [mercuryPosition, setMercuryPosition] = useState([solSize / 2 + earthDistance * .39, 0, 0]);
  const [venusPosition, setVenusPosition] = useState([solSize / 2 + earthDistance * .72 * 1.2, 0, 0]);
  const [lunaPosition, setLunaPosition] = useState([earthSize / 2 + .1, 0, 0]);
  const [earthPosition, setEarthPosition] = useState([solSize / 2 + earthDistance, 0, 0]);
  const [marsPosition, setMarsPosition] = useState([solSize / 2 + earthDistance * 1.52, 0, 0]);
  const [phoebosPosition, setPhoebosPosition] = useState([.2, 0, 0]);
  const [deimosPosition, setDeimosPosition] = useState([.7, 0, 0]);
  const [jupiterPosition, setJupiterPosition] = useState([solSize / 2 + earthDistance * 5.2, 0, 0]);
  const [saturnPosition, setSaturnPosition] = useState([solSize / 2 + earthDistance * 9.5, 0, 0]);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 60]);
  const [viewName, setViewName] = useState("earth");
  // const [camera, setCamera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000000));


  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000000);
  // const earthCam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000000);
  const Fog = () => new THREE.Fog('name', '#000000', 10, 1000);
  
  const setTheCamera = event => {
    console.log("set camera to look at; ", event.target.id);
    switch (event.target.id) {
      case 'sol':
        console.log("look at Sol");
        camera.lookAt([0, 0, 0]);
        break;
      case 'earth':
        console.log("look at earth: ", earthPosition);
        camera.lookAt(earthPosition);
        break;
    }
  }

  const CameraView = () => {
    return <div
      style={{ position: 'absolute', display: 'flex', zIndex: 1 }}>
        <div
          style={{ width: '100px', height: '50px', border: 'solid', background: 'tan', textAlign: 'center' }}
          id='sol'
          onClick={setTheCamera}
        >Sun</div>
        <div
          style={{ width: '100px', height: '50px', border: 'solid', background: 'tan', textAlign: 'center' }}
          id='earth'
          onClick={setTheCamera}
        >Earth</div>
    </div>
  }

  return <div
    style={{
      width: '100vw', height: '100vh'
    }}>
    <CameraView />
      <Canvas
        style={{
          background: 'black'
        }}
        camera={{ pov: camera, position: cameraPosition }}
        shadowMap
      >
        {/* <fog attach='fog' args={['black',.1,4000]} /> */}
        <Suspense fallback={null}>
          {/* <axesHelper args={[3000]} /> */}
          <Orbit />
          {/* <ambientLight color='green' intensity={.5} /> */}

          <Suspense fallback={null}>
            <Sol
              name='sol'
              size={[solSize, 30, 30]}
              position={[0, 0, 0]}
              rotation={{ x: 0, y: .00, z: 0 }}
              emissive={'orange'}
              emissiveIntensity={1}
              star
              // reflectivity={0}
              // clearcoat={0}
              // transmission={0}
              // roughness={1}
              texture={solTexture}
              color={'white'}
              castShadow
              receiveShadow
            >
              <Suspense fallback={null}>
                <Mercury
                  name='mercury'
                  size={[earthSize * .38, 50, 50]}
                  position={[solSize / 2 + earthDistance * .39, 0, 0]}
                  rotation={{ x: 0, y: .007, z: 0 }}
                  revolution={{ x: 0, y: .007, z: 0 }}
                  castShadow
                  receiveShadow
                  texture={moonTexture}
                  color='darkgray'
                  reflectivity={1}
                  clearcoat={0}
                  // livePosition={mercuryPosition}
                  // setLivePosition={setMercuryPosition}
                  // viewName={viewName}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Venus
                  name='venus'
                  size={[earthSize * .95, 50, 50]}
                  position={[solSize / 2 + earthDistance * .72 * 1.2, 0, 0]}
                  rotation={{ x: 0, y: .006, z: 0 }}
                  revolution={{ x: 0, y: .006, z: 0 }}
                  receiveShadow
                  castShadow
                  // texture={moonTexture}
                  color='teal'
                  reflectivity={1}
                  clearcoat={0}
                  // livePosition={venusPosition}
                  // setLivePosition={setVenusPosition}
                  // viewName={viewName}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Earth
                  name='earth'
                  size={[earthSize * 1, 50, 50]}
                  position={[solSize / 2 + earthDistance, 0, 0]}
                  rotation={{ x: 0, y: .004, z: 0 }}
                  revolution={{ x: 0, y: .1 / 60, z: 0 }}
                  tilt={23.5}
                  texture={earthTexture}
                  reflectivity={0}
                  receiveShadow
                  castShadow
                  reflectivity={1}
                  clearcoat={0}
                  // livePosition={earthPosition}
                  // setLivePosition={setEarthPosition}
                  // viewName={viewName}
                >

                  <Suspense fallback={null}>
                    <Luna
                      name='luna'
                      size={[earthSize * .23, 50, 50]}
                      position={[earthSize / 2 + .1, 0, 0]}
                      rotation={{ x: 0, y: .1, z: 0 }}
                      revolution={{ x: 0, y: .1, z: 0 }}
                      // tilt={45/360 * Math.PI*2}
                      moon
                      texture={moonTexture}
                      receiveShadow
                      castShadow
                      reflectivity={1}
                      clearcoat={0}
                      color='grey'
                      // livePosition={lunaPosition}
                      // setLivePosition={setLunaPosition}
                      // viewName={viewName}
                    ></Luna>
                  </Suspense>
                </Earth>
              </Suspense>
              <Suspense fallback={null}>
                <Mars
                  name='mars'
                  size={[earthSize * .53, 50, 50]}
                  position={[solSize / 2 + earthDistance * 1.52, 0, 0]}
                  rotation={{ x: 0, y: .006, z: 0 }}
                  revolution={{ x: 0, y: .004, z: 0 }}
                  castShadow
                  receiveShadow
                  texture={moonTexture}
                  color='orange'
                  reflectivity={1}
                  clearcoat={0}
                  // livePosition={marsPosition}
                  // setLivePosition={setMarsPosition}
                  // viewName={viewName}
                >
                  <Suspense fallback={null}>
                    <Phoebos
                      name='phoebos'
                      size={[earthSize * .07, 3, 6]}
                      position={[.2, 0, 0]}
                      rotation={{ x: 0, y: .1, z: 0 }}
                      revolution={{ x: 0, y: .005, z: 0 }}
                      texture={moonTexture}
                      castShadow
                      receiveShadow
                      reflectivity={1}
                      clearcoat={0}
                      // livePosition={phoebosPosition}
                      // setLivePosition={setPhoebosPosition}
                      // viewName={viewName}
                    />
                  </Suspense>
                  <Suspense fallback={null}>
                    <Deimos
                      name='deimos'
                      size={[earthSize * .17, 5, 2]}
                      position={[.7, 0, 0]}
                      rotation={{ x: 0, y: .1, z: 0 }}
                      revolution={{ x: 0, y: .004, z: 0 }}
                      texture={moonTexture}
                      castShadow
                      receiveShadow
                      reflectivity={1}
                      clearcoat={0}
                      // livePosition={deimosPosition}
                      // setLivePosition={setDeimosPosition}
                      // viewName={viewName}
                    />
                  </Suspense>
                </Mars>
              </Suspense>
              {/* <Suspense fallback={null}>
                <AstroidBelt
                  name='astroid belt'
                  position={[solSize / 2 + earthDistance * 2.7]}
                  qty={2000}
                  size={earthSize * .01}
                />
              </Suspense> */}
              <Suspense fallback={null}>
                <Jupiter
                  name='jupiter'
                  size={[earthSize * 11.19, 100, 100]}
                  position={[solSize / 2 + earthDistance * 5.2, 0, 0]}
                  rotation={{ x: 0, y: .1, z: 0 }}
                  revolution={{ x: 0, y: .004, z: 0 }}
                  texture={jupiterTexture}
                  castShadow
                  receiveShadow
                  reflectivity={1}
                  clearcoat={0}
                  reflectivity={1}
                  clearcoat={0}
                  // livePosition={jupiterPosition}
                  // setLivePosition={setJupiterPosition}
                  // viewName={viewName}
                ></Jupiter>
              </Suspense>
              <Suspense fallback={null}>
                <Saturn
                  name='saturn'
                  size={[earthSize * 9.41, 100, 100]}
                  position={[solSize / 2 + earthDistance * 9.5, 0, 0]}
                  rotation={{ x: 0, y: .0001, z: 0 }}
                  revolution={{ x: 0, y: .005, z: 0 }}
                  texture={saturnTexture}
                  tilt={26.73}
                  castShadow
                  receiveShadow
                  reflectivity={1}
                  clearcoat={0}
                  // livePosition={saturnPosition}
                  // setLivePosition={setSaturnPosition}
                  // viewName={viewName}
                >
                  <PlanetRings
                    size={[earthSize * 11, earthSize * 12, 100]}
                    color={'rgb(131, 0, 0)'}
                    tilt={26.73}
                    emissiveIntensity={.1}
                    emissive={'rgb(131, 0, 0)'}
                  />
                  <PlanetRings
                    size={[earthSize * 12.1, earthSize * 16, 100]}
                    color={'rgb(214, 247, 154)'}
                    tilt={26.73}
                    emissiveIntensity={.1}
                    emissive={'rgb(214, 247, 154)'}
                  />
                  <PlanetRings
                    size={[earthSize * 16.5, earthSize * 19, 100]}
                    color={'rgb(3, 0, 48)'}
                    tilt={26.73}
                    emissiveIntensity={.1}
                    emissive={'rgb(3, 0, 48)'}
                  />
                  <PlanetRings
                    size={[earthSize * 20, earthSize * 22, 100]}
                    color={'rgb(53, 43, 0)'}
                    tilt={26.73}
                    emissiveIntensity={.1}
                    emissive={'rgb(159, 165, 77)'}
                  />
                </Saturn>
              </Suspense>
            </Sol>
          </Suspense>
        </Suspense>
      </Canvas>
  </div>
}

export default SolarSystem;