import React from 'react';

import * as THREE from 'three';
import {useBox} from 'use-cannon';

export const Floor = props => {
    const [ref,api] = useBox(() => ({args: [200,1,100],...props}));
    return (
        <mesh ref={ref} {...props} receiveShadow>
            <boxBufferGeometry args={[20, 1, 10]} />
            <meshPhysicalMaterial />
        </mesh>
    )
}

export default Floor;