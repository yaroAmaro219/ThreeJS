import React from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows, MeshWobbleMaterial, OrbitControls } from 'drei';
import Header from './components/Header'
import {useSpring, a} from 'react-spring/three'
//import './App.css';

softShadows();

const SpinningMesh = ({ position, color, speed, args }) => {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow>
      <boxBufferGeometry
        attach='geometry' 
        args={args} />
      <MeshWoblleMaterial
        color={color}
        speed={speed}
        attach='material'
        factor={0.6}
        />
    </a.mesh>
  )
}

const App = () => {
  return (
    <>
      <Header />
      <Canvas
        class="canvas"
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 10 }}>
        <ambientLight 
          intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight 
          position={[-10, 0, -20]} 
          intensity={0.5}
        />
        <pointLight
          position={[0, -10, 0]}
          intensity={1.5}
        />
        <group>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' color={"yellow"} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            color='lightblue'
            args={[3, 2, 1]}
            speed={2}
          />
          <SpinningMesh 
            position={[-2, 1, -5]} 
            color='pink'
            speed={6}
          />
          <SpinningMesh
            position={[5, 1, -2]}
            color='pink'
            speed={6}
            />
        </group>
        <OrbitContols />
        </Canvas>
      </>
  );
}

export default App;
