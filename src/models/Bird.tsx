/* eslint-disable react-hooks/rules-of-hooks */
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
const fly = "/bird.glb";

function bird() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const birdRef = useRef();
  const { scene, animations } = useGLTF(fly);
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    actions["Take 001"]?.play();
  }, [actions]);

  useFrame(({ clock, camera }) => {
    const fBird = birdRef.current as any;
    // Update the Y position to simulate bird-like motion using a sine wave
    fBird.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    if (fBird.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      fBird.rotation.y = Math.PI;
    } else if (fBird.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      fBird.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (fBird.rotation.y === 0) {
      // Moving forward
      fBird.position.x += 0.01;
      fBird.position.z -= 0.01;
    } else {
      // Moving backward
      fBird.position.x -= 0.01;
      fBird.position.z += 0.01;
    }
  });
  return (
    <mesh ref={birdRef}>
      <primitive
        object={scene}
        scale={[0.003, 0.003, 0.003]}
        position={[1, -1, 1]}
      />
    </mesh>
  );
}

export default bird;
