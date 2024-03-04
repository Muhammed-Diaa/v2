import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";

interface skyRotation {
  isRotating: boolean;
}

const Sky: FC<skyRotation> = ({ isRotating }) => {
  const sky = useGLTF("/sky.glb");
  const skyRef = useRef();
  const current = skyRef.current as any;

  useFrame((_, delta) => {
    if (isRotating) {
      current.rotation.y += 0.15 * delta;
    }
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
