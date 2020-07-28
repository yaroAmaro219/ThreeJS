import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber'
import { useTransition, useSpring, a } from 'react-spring/three'
import { svgs, colors, deg, doubleSide } from './resources/helper'
import { BrowserRouter as Router } from 'react-router-dom'

function Shape({ shape, rotation, position, color, opacity, index }) {
  return (
    <a.mesh 
      rotation={rotation} 
      position={position.interpolate((x, y, z) => [x, y, z + -index * 50])}>
      <a.meshPhongMaterial
        attach="material"
        color={color}
        opacity={opacity}
        side={doubleSide}
        depthWrite={false}
        transparent />
      <shapeBufferGeometry 
        attach="geometry"
        args={[shape]} 
        />
      </a.mesh>
  )
}

function Scene() {
  const [page, setPage] = useState(0)
  const [shapes, setShapes] = useState([])
  useEffect(() => void setInterval(() => setPage(i => (i + 1) % svgs.length), 4000), [])
  useEffect(() => void svgs[page].then(setShapes), [page])
  const { color } = useSpring({ color: colors[page] })
  const transitions = useTransition(shapes, item => item.shape.uuid, {
    from: { rotation: [-0.2, 0.9, 0], position: [0, 50, -200], opacity: 0 },
    enter: { rotation: [0, 0, 0], position: [0, 0, 0], opacity: 1 },
    leave: { rotation: [0.2, -0.9, 0], position: [0, -400, 200], opacity: 0 },
    config: { mass: 30, tension: 800, friction: 190, precision: 0.0001 },
    ...{ order: ['leave', 'enter', 'update'], trail: 15, lazy: true, unique: true, reset: true }
  })
  return (
    <>
      <mesh
        scale={[20000, 20000, 1]}
        rotation={[0, deg(-20), 0]}>
        <planeGeometry 
          attach="geometry" 
          args={[1, 1]} />
        <a.meshPhongMaterial 
          attach="material" 
          color={color}
          depthTest={false}/>
      </mesh>
      <group
        position={[-1200, 300, page]} rotation={[0, deg(-180), deg(180)]}>
        {transitions.map(({ item, key, props }) => (
          <Shape 
            key={key}
            {...item}
            {...props}
          />
        ))}
        </group>
      </>
  )
}

function App() {
  return (
    <div class="main">
      <Canvas 
        invalidateFrameloop
        camera={{
          fov: 100,
          position: [10, 10, 2700],
          rotation: [0, deg(-20), deg(270)],
          near: .01, far: 20000
        }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[300, 300, 3000]} />
        <Scene />
      </Canvas>
      {/* <a href="https://github.com/yaroAmaro219?tab=repositories" target="_blank" rel="noopener noreferrer" class="top-left" children="Github" /> */}
      <a href="https://soundcloud.com/artemie-amari/tracks" target="_blank" rel="noopener noreferrer" class="top-left" children="Soundcloud" />
      <a href="https://www.linkedin.com/in/artemie-amari-337b78117/" target="_blank" rel="noopener noreferrer" class="top-right" children="LinkedIn" />
      <a href="http://www.artemieamari.com/#portfolio" target="_blank" rel="noopener noreferrer" class="bottom-left" children="Portfolio" />
      <a href="https://www.instagram.com/tina.henschel/" target="_blank" rel="noopener noreferrer" class="bottom-right" children="Illustrations @ Tina Henschel" />
      <span class="header">
        Artemie Amari
         
      </span>
      
        <Link to='/' class="menu1">About</Link>
        <Link to='/' class="menu2">Portfolio</Link>
        <Link to='/' class="menu3">Contact</Link>
        
      
    </div>
  )
}

ReactDOM.render(<Router><App /></Router>,document.getElementById('root'));


