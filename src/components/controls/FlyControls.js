import React, { useRef } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';

import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
extend({ FlyControls });

export const Fly = () => {
    const { camera, gl } = useThree()
    const ref = useRef()
    useFrame((state, delta) => {
        ref.current.update(delta)
    })
    return <flyControls 
        ref={ref} 
        args={[camera, gl.domElement]} 
        movementSpeed={5}
        rollSpeed={.05}
        dragToLook={true}
    />
}

export default Fly;