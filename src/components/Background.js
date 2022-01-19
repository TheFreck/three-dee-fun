import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useThree, useLoader } from 'react-three-fiber';

export const Background = props => {
    const texture = useLoader(
        THREE.TextureLoader,
        props.filename
    );

    const { gl } = useThree();

    const formatted = useMemo(() => 
        new THREE.WebGLCubeRenderTarget(texture.image.height).fromEquirectangularTexture(gl, texture)
    ,[]);

    return (
        <primitive 
            attach='background' 
            object={formatted} 
        />
    );
}

export default Background;