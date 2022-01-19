import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import React from 'react';
import * as THREE from 'three';

export const Wall = props => {
    return (
        <mesh {...props} receiveShadow>
            <boxBufferGeometry args={[1, 5, 5]} />
            <meshPhysicalMaterial
                color='lightgray'
                side={THREE.DoubleSide}
                metalness={.8}
                roughness={0}
                transmission={1}
            />
        </mesh>

    )
}

export default Wall;