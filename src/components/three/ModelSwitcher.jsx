import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../modals/Macbook-16";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../modals/Macbook-14";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

function fadeMeshes(group, opacity) {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
}

function moveGroup(group, x) {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
}

function ModelSwitcher({ scale, isMobile }) {
  const smallMabookRef = useRef();
  const largeMabookRef = useRef();

  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  useGSAP(
    function () {
      if (showLargeMacbook) {
        moveGroup(smallMabookRef.current, -OFFSET_DISTANCE);
        moveGroup(largeMabookRef.current, 0);

        fadeMeshes(smallMabookRef.current, 0);
        fadeMeshes(largeMabookRef.current, 1);
      } else {
        moveGroup(smallMabookRef.current, 0);
        moveGroup(largeMabookRef.current, OFFSET_DISTANCE);

        fadeMeshes(smallMabookRef.current, 1);
        fadeMeshes(largeMabookRef.current, 0);
      }
    },
    [scale],
  );

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMabookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMabookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
}

export default ModelSwitcher;
