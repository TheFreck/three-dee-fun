import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree, useLoader } from 'react-three-fiber';
import { Color } from 'three';

export const ColorPicker = () => {
    const handleColorClick = e => {
        if(!window.activeMesh) return;
        console.log("active mesh: ", window.activeMesh.material);
        console.log("e.target.style.background: ", e.target.style.background);
        window.activeMesh.material.color = new THREE.Color(e.target.style.background);
    }

    return (
    <Canvas>
        <div style={{position: 'absolute', zIndex: 1}}>
            <div style={{width: '50px', height: '50px',background: 'red'}}
                onClick={handleColorClick}
            />
            <div style={{width: '50px', height: '50px',background: 'yellow'}}
                onClick={handleColorClick}
            />
            <div style={{width: '50px', height: '50px',background: 'blue'}}
                onClick={handleColorClick}
            />
            <div style={{width: '50px', height: '50px',background: 'white'}}
                onClick={handleColorClick}
            />
        </div>
    </Canvas>);
}

export default ColorPicker;