import React, { Suspense } from "react";
import Planet from "./Planet";

export const AstroidBelt = props => {
    let astroids = [];
    const distance = props.position[0];
    let sizes = [];
    for (let i = 0; i < props.qty; i++) {
        let randy = Math.random();
        let rando = Math.random();
        let pos = ((randy * .22 - .44) + 1) * distance;
        let position = [pos * Math.cos(rando * 360), Math.random() * 1 - .5, pos * Math.sin(rando * 360)];
        let revolution = { x: 0, y: Math.random() * .0001 + .0001, z: 0 };
        let rotation = { x: Math.random() * .0001 - .0002, y: Math.random() * .0001 - .0002, z: Math.random() * .0001 - .0002 }
        let size = [randy * props.size + props.size*10, 5, 5]
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
            if (Math.random() <= .2) child = <Planet color='gray' name='astroid' position={[Math.random() - .5, Math.random() - .5, Math.random() - .5]} rotation={{ x: Math.random() * .001 - .002, y: Math.random() * .001 - .002, z: Math.random() * .001 - .002 }} revolution={{ x: 0, y: Math.random() * .01 + .01, z: 0 }} size={[(Math.random() + .5) * astroid.size[0], 5, 5]} />
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
                        clearcoat={1}
                    >{child ?? child}</Planet>
                </Suspense>
            );
        }

        )
    }</>
}

export default AstroidBelt;