import "./index.css";
import { Composition } from "remotion";
import { TDDShorts } from "./Composition";

// Scene durations: 180+345+270+270+420+405+270 = 2160
// 6 transitions × 15 frames = 90
// Total: 2070 frames = 69 seconds @ 30fps
const TOTAL_FRAMES = 2070;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TDDShorts"
        component={TDDShorts}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
