import React, {Suspense, useRef} from 'react';
import {OrbitControls, useGLTF, Stage} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PointLight } from 'three';

function Model(){
    let big = "https://d1a370nemizbjq.cloudfront.net/af202b10-e00a-4383-8ed7-8386a95fdf16.glb"
    let small = "https://d1a370nemizbjq.cloudfront.net/b96a3f18-d766-4d76-9b17-50203415509f.glb"

    const {scene} = useGLTF(small);
    return <primitive object={scene}/>
}

export default function Flex3d(){
  const ref = useRef()
    return (
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, zoom: 3.5 }} style={{height: "350px"}}>
        <Suspense fallback={null}>
            <Stage controls={ref} preset="rembrandt" intensity={1} environment="city">
                <Model />
            </Stage>
        </Suspense>
        <OrbitControls ref={ref} minPolarAngle={(Math.PI)/2 - 0.27} maxPolarAngle={(Math.PI) / 2 + 0.27} minAzimuthAngle={-Math.PI/4 - 0.22} maxAzimuthAngle={Math.PI/4 + 0.22} />
        </Canvas>
      )
}