import { useAnimations, useGLTF } from "@react-three/drei";
import { FC, useEffect, useRef } from "react";

interface props {
  isRotating: boolean;
  rotation: any;
  planeScale: any;
  planePosition: any;
}

const plane: FC<props> = ({ isRotating, ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useRef();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { scene, animations } = useGLTF("/plane.glb");
  const { actions } = useAnimations(animations, scene);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isRotating) {
      actions["Take 001"]?.play();
    } else {
      actions["Take 001"]?.stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh ref={ref} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default plane;
