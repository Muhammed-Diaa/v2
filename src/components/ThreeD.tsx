"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Sky from "../models/Sky";

import FloatingIsland from "@/models/FloatingIsland";
import Plane from "@/models/Plane";
import Bird from "@/models/Bird";
import StageInfo from "./StageInfo";

function ThreeD() {
  const islandScales = () => {
    let screeniScale = null;
    let ScreeniPosition = [0, -6.5, -43];
    let iRotation = [0.1, 4.7, 0];
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        screeniScale = [0.9, 0.9, 0.9];
      } else {
        screeniScale = [1, 1, 1];
      }
    }
    return [screeniScale, ScreeniPosition, iRotation];
  };
  const planeScale = () => {
    let PlaneScale, PlanePosition;
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        PlaneScale = [1.5, 1.5, 1.5];
        PlanePosition = [0, -6.5, 0];
      } else {
        PlaneScale = [3, 3, 3];
        PlanePosition = [0, -6.5, 0];
      }
    }
    return [PlaneScale, PlanePosition];
  };

  const [screeniScale, ScreeniPosition, iRotation] = islandScales();
  const [PlaneScale, PlanePosition] = planeScale();
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <StageInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <directionalLight position={[1, 0, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <hemisphereLight color="#b1e1ff" groundColor="#000000" intensity={1} />
        <Suspense />
        <Sky isRotating={isRotating} />
        <Bird />
        <Plane
          rotation={[0, 20, 0]}
          isRotating={isRotating}
          planeScale={PlaneScale}
          planePosition={PlanePosition}
        />

        <FloatingIsland
          position={ScreeniPosition}
          scale={screeniScale}
          iRotation={iRotation}
          setIsRotating={setIsRotating}
          isRotating={isRotating}
          setCurrentStage={setCurrentStage}
        />
      </Canvas>
    </section>
  );
}

export default ThreeD;
