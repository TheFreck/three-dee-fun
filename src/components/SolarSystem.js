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
import Fly from './controls/FlyControls';

export const SolarSystem = props => {
  const earthTexture = useLoader(THREE.TextureLoader, '/world.jpg');
  const moonTexture = useLoader(THREE.TextureLoader, '/luna.jpg');
  const solTexture = useLoader(THREE.TextureLoader, '/sun.jpg');
  const jupiterTexture = useLoader(THREE.TextureLoader, '/jupiter.jpg');
  const saturnTexture = useLoader(THREE.TextureLoader, '/saturn.jpg');
  const ringsTexture = useLoader(THREE.TextureLoader, '/rings.jpg');
  const spaceTexture = useLoader(THREE.TextureLoader, '/space.jpg');

  const [scale, setScale] = useState(1);
  const earthSize = 1*scale;
  const solSize = earthSize * 10.9 * scale;
  const earthDistance = (solSize/2 + 111)*scale;

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
  const [cameraPosition, setCameraPosition] = useState([solSize / 2 + earthDistance + 3, 3, 3]);
  const [viewName, setViewName] = useState("earth");
  const [speed, setSpeed] = useState(1);
  const [controlType, setControlType] = useState('fly');


  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000000);

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

  const style = {
    button: {
      width: '100px',
      height: '50px',
      border: 'solid',
      background: 'tan',
      textAlign: 'center',
    },
    buttonGroup: {
      display: 'flex',
      zIndex: 1
    }
  }

  const CameraView = () => {
    return <div
      style={style.buttonGroup}>
        <div
          style={style.button}
          id='sol'
          onClick={setTheCamera}
        >Sun</div>
        <div
          style={style.button}
          id='earth'
          onClick={setTheCamera}
        >Earth</div>
    </div>
  }

  const updateSpeed = event => {
    let newSpeed = parseFloat(event.target.id);
    console.log("speed: ", newSpeed);
    setSpeed(newSpeed);
  }


  const SpeedSetter = () => {
    return <div style={style.buttonGroup}>
      <div onClick={updateSpeed} style={style.button} id='.25' >1/4x</div>
      <div onClick={updateSpeed} style={style.button} id='.5' >1/2x</div>
      <div onClick={updateSpeed} style={style.button} id='.75' >3/4x</div>
      <div onClick={updateSpeed} style={style.button} id='1' >1x</div>
      <div onClick={updateSpeed} style={style.button} id='1.25' >1 1/4x</div>
      <div onClick={updateSpeed} style={style.button} id='1.5' >1 1/2x</div>
    </div>
  }

  const changeControl = event => setControlType(event.target.id);

  const ControlType = () => {
    return <div style={style.buttonGroup}>
      <div onClick={changeControl} style={style.button} id='orbit' >Orbit</div>
      <div onClick={changeControl} style={style.button} id='fly' >Fly</div>
    </div>
  }

  const CameraControls = () => {
    if(controlType === 'orbit') return <Orbit />
    if(controlType === 'fly') return <Fly />
    return <Orbit />
  }

  return <div
    style={{
      width: '100vw', height: '100vh'
    }}>
      <ControlType />
      <SpeedSetter />
    <CameraView />
      <Canvas
        style={{
          background: 'black'
        }}
        camera={{ pov: camera, position: cameraPosition }}
        shadowMap
      >
        <Suspense fallback={null}>
          <CameraControls />
          {/* <axesHelper args={[3000]} /> */}
          {/* <ambientLight color='green' intensity={.2} /> */}

          <Suspense fallback={null}>
            <Sol
              name='sol'
              size={[solSize, 30, 30]}
              position={[0, 0, 0]}
              rotation={{ x: 0, y: .00, z: 0 }}
              emissive={'orange'}
              emissiveIntensity={1}
              star
              texture={solTexture}
              color={'white'}
              speed={speed}
            >
              <Suspense fallback={null}>
                <Mercury
                  name='mercury'
                  size={[earthSize * .38, 50, 50]}
                  position={[solSize / 2 + earthDistance * .39, 0, 0]}
                  rotation={{ x: 0, y: .007, z: 0 }}
                  revolution={{ x: 0, y: .007, z: 0 }}
                  texture={moonTexture}
                  color='darkgray'
                  reflectivity={1}
                  clearcoat={0}
                  speed={speed}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Venus
                  name='venus'
                  size={[earthSize * .95, 100, 100]}
                  position={[solSize / 2 + earthDistance * .72 * 1.2, 0, 0]}
                  rotation={{ x: 0, y: .006, z: 0 }}
                  revolution={{ x: 0, y: .006, z: 0 }}
                  // texture={moonTexture}
                  color='teal'
                  reflectivity={1}
                  clearcoat={0}
                  speed={speed}
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
                  reflectivity={1}
                  clearcoat={0}
                  speed={speed}
                >

                  <Suspense fallback={null}>
                    <Luna
                      name='luna'
                      size={[earthSize * .23, 50, 50]}
                      position={[earthSize / 2 + earthSize * 2, 0, 0]}
                      rotation={{ x: 0, y: 0, z: 0 }}
                      revolution={{ x: 0, y: .05, z: 0 }}
                      moon
                      texture={moonTexture}
                      reflectivity={1}
                      clearcoat={0}
                      color='grey'
                      speed={speed}
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
                  texture={moonTexture}
                  color='orange'
                  reflectivity={1}
                  clearcoat={0}
                  speed={speed}
                >
                  <Suspense fallback={null}>
                    <Phoebos
                      name='phoebos'
                      size={[earthSize * .07, 3, 6]}
                      position={[.2, 0, 0]}
                      rotation={{ x: 0, y: .1, z: 0 }}
                      revolution={{ x: 0, y: .005, z: 0 }}
                      texture={moonTexture}
                      reflectivity={1}
                      clearcoat={0}
                      speed={speed}
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
                      reflectivity={1}
                      clearcoat={0}
                      speed={speed}
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
                  reflectivity={1}
                  clearcoat={0}
                  reflectivity={1}
                  clearcoat={0}
                  speed={speed}
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
                  reflectivity={1}
                  clearcoat={0}
                  speed={speed}
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