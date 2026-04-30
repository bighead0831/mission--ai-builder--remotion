import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import {
  TransitionSeries,
  springTiming,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { loadFont } from "@remotion/google-fonts/NotoSansKR";

const { fontFamily } = loadFont();

const CYAN = "#61dafb";
const RED = "#ff4757";
const GREEN = "#2ed573";
const BLUE = "#7c8cf8";
const GOLD = "#ffd32a";
const WHITE = "#ffffff";
const GRAY = "rgba(255,255,255,0.45)";

const DotsBg: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity,
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)",
      backgroundSize: "50px 50px",
      pointerEvents: "none",
    }}
  />
);

// ──────────────────────────────────────────
// SCENE 1: INTRO
// ──────────────────────────────────────────
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 80, mass: 0.5 },
    durationInFrames: 40,
  });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [45, 75], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const badgeOpacity = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scrollOpacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #020209 0%, #0d0d2b 50%, #030310 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DotsBg opacity={0.07} />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${CYAN}30 0%, transparent 70%)`,
          transform: `scale(${titleScale})`,
        }}
      />
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 220,
          fontWeight: 900,
          color: CYAN,
          letterSpacing: -8,
          lineHeight: 1,
          textShadow: `0 0 80px ${CYAN}80, 0 0 160px ${CYAN}40`,
        }}
      >
        TDD
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 56,
          fontWeight: 700,
          color: WHITE,
          marginTop: 16,
          letterSpacing: 2,
        }}
      >
        테스트 주도 개발
      </div>
      <div
        style={{
          opacity: badgeOpacity,
          fontSize: 34,
          color: "rgba(255,255,255,0.5)",
          marginTop: 16,
          letterSpacing: 4,
          fontWeight: 400,
        }}
      >
        Test-Driven Development
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          opacity: scrollOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.4)" }}>
          지금 배워보자
        </div>
        <div style={{ fontSize: 50 }}>👇</div>
      </div>
      <Audio
        src={staticFile("voiceover/tdd/01-intro.mp3")}
        volume={(f) =>
          interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" })
        }
      />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────
// SCENE 2: DEFINITION
// ──────────────────────────────────────────
const DefinitionScene: React.FC = () => {
  const frame = useCurrentFrame();

  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const line1Op = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Y = interpolate(frame, [0, 25], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const line2Op = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [35, 60], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const line3Op = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3Y = interpolate(frame, [70, 95], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const boxOp = interpolate(frame, [115, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const boxScale = interpolate(frame, [115, 145], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a14 0%, #0d0d2b 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <DotsBg />
      <div
        style={{
          opacity: line1Op,
          transform: `translateY(${line1Y}px)`,
          fontSize: 40,
          fontWeight: 700,
          color: CYAN,
          marginBottom: 60,
          letterSpacing: 3,
        }}
      >
        🤔 TDD란 무엇인가?
      </div>
      <div
        style={{
          opacity: line2Op,
          transform: `translateY(${line2Y}px)`,
          fontSize: 64,
          fontWeight: 900,
          color: WHITE,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        코드 작성 <span style={{ color: RED }}>전</span>에
      </div>
      <div
        style={{
          opacity: line3Op,
          transform: `translateY(${line3Y}px)`,
          fontSize: 64,
          fontWeight: 900,
          color: WHITE,
          textAlign: "center",
          lineHeight: 1.3,
          marginTop: 10,
        }}
      >
        <span style={{ color: GREEN }}>테스트</span>를 먼저 작성
      </div>
      <div
        style={{
          opacity: boxOp,
          transform: `scale(${boxScale})`,
          marginTop: 80,
          padding: "44px 60px",
          background: "rgba(255,255,255,0.05)",
          border: "2px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          fontSize: 34,
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          lineHeight: 1.7,
        }}
      >
        <div>소프트웨어 개발 방법론 중 하나로</div>
        <div>
          <span style={{ color: CYAN }}>품질</span>과{" "}
          <span style={{ color: CYAN }}>유지보수성</span>을 높여줍니다
        </div>
      </div>
      <Audio
        src={staticFile("voiceover/tdd/02-definition.mp3")}
        volume={(f) =>
          interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" })
        }
      />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────
// REUSABLE: CODE BLOCK
// ──────────────────────────────────────────
const CodeBlock: React.FC<{
  lines: string[];
  borderColor: string;
  opacity: number;
  translateY: number;
}> = ({ lines, borderColor, opacity, translateY }) => (
  <div
    style={{
      opacity,
      transform: `translateY(${translateY}px)`,
      width: "100%",
      background: "rgba(0,0,0,0.8)",
      border: `2px solid ${borderColor}40`,
      borderRadius: 20,
      padding: "36px 44px",
      marginTop: 40,
    }}
  >
    {lines.map((line, i) => (
      <div
        key={i}
        style={{
          fontFamily: "'SF Mono', Consolas, 'Courier New', monospace",
          fontSize: 28,
          lineHeight: 1.75,
          color: line.startsWith("//")
            ? GRAY
            : line.startsWith("❌") || line.startsWith("   ")
            ? RED
            : line.startsWith("✅")
            ? GREEN
            : WHITE,
        }}
      >
        {line}
      </div>
    ))}
  </div>
);

// ──────────────────────────────────────────
// SCENE 3: RED
// ──────────────────────────────────────────
const RedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const headerScale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 35,
  });
  const badgeOp = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descOp = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [45, 75], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const codeOp = interpolate(frame, [95, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const codeY = interpolate(frame, [95, 135], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a14 0%, #1a0808 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <DotsBg opacity={0.04} />
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${RED}20 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          opacity: badgeOp,
          padding: "10px 28px",
          background: `${RED}20`,
          border: `2px solid ${RED}50`,
          borderRadius: 100,
          fontSize: 28,
          color: RED,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        STEP 1
      </div>
      <div
        style={{ transform: `scale(${headerScale})`, fontSize: 100, marginBottom: 10 }}
      >
        🔴
      </div>
      <div
        style={{
          transform: `scale(${headerScale})`,
          fontSize: 90,
          fontWeight: 900,
          color: RED,
          letterSpacing: -2,
          textShadow: `0 0 40px ${RED}60`,
        }}
      >
        Red
      </div>
      <div
        style={{
          opacity: descOp,
          transform: `translateY(${descY}px)`,
          fontSize: 48,
          fontWeight: 700,
          color: WHITE,
          textAlign: "center",
          marginTop: 30,
          lineHeight: 1.4,
        }}
      >
        실패하는 테스트를<br />먼저 작성
      </div>
      <CodeBlock
        lines={[
          "// 아직 없는 함수를 먼저 테스트",
          "test('add(1,2) === 3', () => {",
          "  expect(add(1, 2)).toBe(3);",
          "});",
          "",
          "❌ ReferenceError: add is not",
          "   defined",
        ]}
        borderColor={RED}
        opacity={codeOp}
        translateY={codeY}
      />
      <Audio
        src={staticFile("voiceover/tdd/03-red.mp3")}
        volume={(f) =>
          interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" })
        }
      />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────
// SCENE 4: GREEN
// ──────────────────────────────────────────
const GreenScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const headerScale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 35,
  });
  const badgeOp = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descOp = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [45, 75], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const codeOp = interpolate(frame, [95, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const codeY = interpolate(frame, [95, 135], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a14 0%, #071a0f 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <DotsBg opacity={0.04} />
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GREEN}15 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          opacity: badgeOp,
          padding: "10px 28px",
          background: `${GREEN}15`,
          border: `2px solid ${GREEN}40`,
          borderRadius: 100,
          fontSize: 28,
          color: GREEN,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        STEP 2
      </div>
      <div
        style={{ transform: `scale(${headerScale})`, fontSize: 100, marginBottom: 10 }}
      >
        🟢
      </div>
      <div
        style={{
          transform: `scale(${headerScale})`,
          fontSize: 90,
          fontWeight: 900,
          color: GREEN,
          letterSpacing: -2,
          textShadow: `0 0 40px ${GREEN}60`,
        }}
      >
        Green
      </div>
      <div
        style={{
          opacity: descOp,
          transform: `translateY(${descY}px)`,
          fontSize: 48,
          fontWeight: 700,
          color: WHITE,
          textAlign: "center",
          marginTop: 30,
          lineHeight: 1.4,
        }}
      >
        테스트를 통과하는<br />코드 작성
      </div>
      <CodeBlock
        lines={[
          "// 테스트를 통과하는 최소한의 코드",
          "function add(a, b) {",
          "  return a + b;",
          "}",
          "",
          "✅ Tests: 1 passed, 1 total",
        ]}
        borderColor={GREEN}
        opacity={codeOp}
        translateY={codeY}
      />
      <Audio
        src={staticFile("voiceover/tdd/04-green.mp3")}
        volume={(f) =>
          interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" })
        }
      />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────
// SCENE 5: REFACTOR
// ──────────────────────────────────────────
const RefactorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const headerScale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 35,
  });
  const badgeOp = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descOp = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [45, 75], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const codeOp = interpolate(frame, [95, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const codeY = interpolate(frame, [95, 135], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const cycleOp = interpolate(frame, [165, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cycleScale = interpolate(frame, [165, 205], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a14 0%, #09091e 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <DotsBg opacity={0.04} />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          right: -100,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BLUE}15 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          opacity: badgeOp,
          padding: "10px 28px",
          background: `${BLUE}15`,
          border: `2px solid ${BLUE}40`,
          borderRadius: 100,
          fontSize: 28,
          color: BLUE,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        STEP 3
      </div>
      <div
        style={{ transform: `scale(${headerScale})`, fontSize: 100, marginBottom: 10 }}
      >
        🔵
      </div>
      <div
        style={{
          transform: `scale(${headerScale})`,
          fontSize: 90,
          fontWeight: 900,
          color: BLUE,
          letterSpacing: -2,
          textShadow: `0 0 40px ${BLUE}60`,
        }}
      >
        Refactor
      </div>
      <div
        style={{
          opacity: descOp,
          transform: `translateY(${descY}px)`,
          fontSize: 48,
          fontWeight: 700,
          color: WHITE,
          textAlign: "center",
          marginTop: 30,
          lineHeight: 1.4,
        }}
      >
        중복 제거 &amp;<br />코드 품질 개선
      </div>
      <CodeBlock
        lines={[
          "// 화살표 함수로 간결하게 개선",
          "const add = (a, b) => a + b;",
          "",
          "✅ Tests: 1 passed, 1 total",
          "// 테스트는 여전히 통과!",
        ]}
        borderColor={BLUE}
        opacity={codeOp}
        translateY={codeY}
      />
      <div
        style={{
          opacity: cycleOp,
          transform: `scale(${cycleScale})`,
          marginTop: 44,
          padding: "22px 44px",
          background: "rgba(255,255,255,0.04)",
          border: "2px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          fontSize: 36,
          color: "rgba(255,255,255,0.8)",
          textAlign: "center",
        }}
      >
        <span style={{ color: RED }}>Red</span>
        {" → "}
        <span style={{ color: GREEN }}>Green</span>
        {" → "}
        <span style={{ color: BLUE }}>Refactor</span>
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.4)",
            marginTop: 10,
          }}
        >
          이 사이클을 반복!
        </div>
      </div>
      <Audio
        src={staticFile("voiceover/tdd/05-refactor.mp3")}
        volume={(f) =>
          interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" })
        }
      />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────
// SCENE 6: BENEFITS
// ──────────────────────────────────────────
const BenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const titleOp = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 30], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  const benefits = [
    {
      icon: "🐛",
      text: "버그 조기 발견",
      sub: "자동화 테스트로 결함을 빠르게 감지",
      delay: 55,
    },
    {
      icon: "🔒",
      text: "안전한 리팩토링",
      sub: "기존 코드 변경 시 영향 즉시 파악",
      delay: 100,
    },
    {
      icon: "📐",
      text: "명확한 설계 목표",
      sub: "테스트 작성으로 요구사항 명확화",
      delay: 145,
    },
    {
      icon: "⬆️",
      text: "코드 품질 향상",
      sub: "간결하고 유지보수하기 쉬운 코드",
      delay: 190,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a14 0%, #14120a 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <DotsBg opacity={0.04} />
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}10 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          fontSize: 56,
          fontWeight: 900,
          color: GOLD,
          marginBottom: 60,
          letterSpacing: 1,
          textShadow: `0 0 30px ${GOLD}40`,
        }}
      >
        🏆 TDD의 장점
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
      <Audio
        src={staticFile("voiceover/tdd/06-benefits.mp3")}
        volume={(f) =>
          interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" })
        }
      />
        {benefits.map(({ icon, text, sub, delay }) => {
          const op = interpolate(frame, [delay, delay + 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [delay, delay + 35], [-60, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          });
          return (
            <div
              key={text}
              style={{
                opacity: op,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: "rgba(255,255,255,0.04)",
                border: "2px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "28px 36px",
              }}
            >
              <div style={{ fontSize: 50, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 38, fontWeight: 700, color: WHITE }}>
                  {text}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 4,
                  }}
                >
                  {sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────
// SCENE 7: OUTRO
// ──────────────────────────────────────────
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const titleScale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 80 },
    durationInFrames: 40,
  });
  const titleOp = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOp = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [45, 75], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const ctaOp = interpolate(frame, [95, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = interpolate(frame, [95, 130], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #0a0a14 0%, #0d1a2b 60%, #020209 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <DotsBg opacity={0.07} />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${CYAN}20 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          opacity: titleOp,
          transform: `scale(${titleScale})`,
          fontSize: 90,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        🚀
      </div>
      <div
        style={{
          opacity: titleOp,
          transform: `scale(${titleScale})`,
          fontSize: 56,
          fontWeight: 900,
          color: WHITE,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        품질이 중요하다면
      </div>
      <div
        style={{
          opacity: subOp,
          transform: `translateY(${subY}px)`,
          fontSize: 64,
          fontWeight: 900,
          color: CYAN,
          textAlign: "center",
          marginTop: 10,
          textShadow: `0 0 40px ${CYAN}60`,
        }}
      >
        TDD를 시작하세요!
      </div>
      <div
        style={{
          opacity: ctaOp,
          width: "60%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${CYAN}60, transparent)`,
          margin: "50px 0",
        }}
      />
      <div
        style={{
          opacity: ctaOp,
          transform: `scale(${ctaScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
          }}
        >
          도움이 됐다면 👍 좋아요
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
          }}
        >
          더 많은 IT 지식 👉 구독
        </div>
      </div>
      <Audio
        src={staticFile("voiceover/tdd/07-outro.mp3")}
        volume={(f) =>
          interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" })
        }
      />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────
// MAIN COMPOSITION
// ──────────────────────────────────────────
const TRANSITION_FRAMES = 15;

export const TDDShorts: React.FC = () => {
  return (
    <TransitionSeries>
      {/* intro: audio 5.1s → 6s scene */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <IntroScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />
      {/* definition: audio 11.3s → 11.5s scene */}
      <TransitionSeries.Sequence durationInFrames={345}>
        <DefinitionScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />
      {/* red: audio 7.6s → 9s scene */}
      <TransitionSeries.Sequence durationInFrames={270}>
        <RedScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />
      {/* green: audio 8.6s → 9s scene */}
      <TransitionSeries.Sequence durationInFrames={270}>
        <GreenScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />
      {/* refactor: audio 13.0s → 14s scene */}
      <TransitionSeries.Sequence durationInFrames={420}>
        <RefactorScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />
      {/* benefits: audio 12.5s → 13.5s scene */}
      <TransitionSeries.Sequence durationInFrames={405}>
        <BenefitsScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: TRANSITION_FRAMES,
        })}
      />
      {/* outro: audio 8.3s → 9s scene */}
      <TransitionSeries.Sequence durationInFrames={270}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
