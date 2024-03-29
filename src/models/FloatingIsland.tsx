/*

Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: nimzu (https://sketchfab.com/nimzuk)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907
Title: Fox's islands
*/

import React, { useRef, useEffect, FC, Dispatch, SetStateAction } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";
const island = "/island.glb";
/*eslint-display react/no-unknown-property*/

interface propss {
  isRotating: boolean;

  iRotation: any;
  setIsRotating: Dispatch<SetStateAction<boolean>>;
  setCurrentStage: any;
  position: any;
  scale: any;
}

const FloatingIsland: FC<propss> = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}) => {
  const islandRef = useRef();
  const { nodes, materials } = useGLTF(island);
  const { gl, viewport } = useThree();

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const islandRotation = islandRef.current as any;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handelPointDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handelPointUp = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRotating(false);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handelPointMoving = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      lastX.current = clientX;
      islandRotation.rotation.y += delta * 0.01 * Math.PI;
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = (e: any) => {
    if (e.code == "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRotation.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.01;
    }
    if (e.code == "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRotation.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.01;
    } else {
      setIsRotating(false);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyUp = (e: any) => {
    if (e.code == "ArrowLeft" || e.code == "ArrowRight") {
      setIsRotating(false);
    }
  };
  // const handelKeyD = () => {};

  useFrame(() => {
    const yRotation = islandRef.current as any;
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      yRotation.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRotation.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handelPointDown);
    canvas.addEventListener("pointerup", handelPointUp);
    canvas.addEventListener("pointermove", handelPointMoving);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("Keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handelPointDown);
      canvas.removeEventListener("pointerup", handelPointUp);
      canvas.removeEventListener("pointermove", handelPointMoving);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("Keyup", handleKeyUp);
    };
  }, [gl, handelPointDown, handelPointUp, handelPointMoving]);

  return (
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
};

export default FloatingIsland;
