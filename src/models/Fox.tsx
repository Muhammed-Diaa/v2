import { useGLTF } from "@react-three/drei";

function fox() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fox = useGLTF("/fox.glb");
  return (
    <mesh>
      <primitive object={fox.scene} />
    </mesh>
  );
}

export default fox;
