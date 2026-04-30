# TDD Shorts — AI 기반 유튜브 쇼츠 자동 생성

> TDD(테스트 주도 개발)를 주제로 한 유튜브 쇼츠 영상을 **코드로 제작**한 프로젝트입니다.
> React 컴포넌트로 영상을 구성하고, AI 음성을 자동 생성하여 삽입합니다.

---

## 기술 스택

| 분류 | 기술 | 역할 |
|------|------|------|
| 영상 제작 | [Remotion](https://www.remotion.dev/) v4 | React 코드로 MP4 영상 렌더링 |
| 언어 | TypeScript + React 19 | 타입 안전한 컴포넌트 작성 |
| 애니메이션 | Remotion `spring`, `interpolate` | 프레임 기반 물리 애니메이션 |
| 씬 전환 | `@remotion/transitions` | 슬라이드 트랜지션 |
| 한국어 폰트 | `@remotion/google-fonts/NotoSansKR` | 렌더링 전 폰트 로딩 보장 |
| AI 음성 | [ElevenLabs](https://elevenlabs.io/) TTS | 중저음 남성 아나운서 나레이션 생성 |
| TTS 모델 | `eleven_multilingual_v2` | 한국어 자연스러운 발음 지원 |

---

## 프로젝트 구조

```
video-build-ai/
├── src/
│   ├── Root.tsx              # 컴포지션 등록 (해상도, 프레임 수 설정)
│   ├── Composition.tsx       # 전체 영상 구성 (씬 + 오디오)
│   └── index.ts              # Remotion 진입점
├── public/
│   └── voiceover/tdd/        # ElevenLabs로 생성한 MP3 파일
│       ├── 01-intro.mp3
│       ├── 02-definition.mp3
│       ├── 03-red.mp3
│       ├── 04-green.mp3
│       ├── 05-refactor.mp3
│       ├── 06-benefits.mp3
│       └── 07-outro.mp3
├── generate-voiceover.mjs    # ElevenLabs API 호출 스크립트
└── remotion.config.ts
```

---

## 영상 스펙

| 항목 | 값 |
|------|----|
| 해상도 | 1080 × 1920 (유튜브 쇼츠 세로 포맷) |
| 프레임 레이트 | 30fps |
| 총 길이 | 약 69초 (2070 프레임) |
| 씬 수 | 7개 |
| 전환 효과 | 아래에서 위로 슬라이드 (×6) |

---

## 씬 구성

```
[Intro 6s] → [Definition 11.5s] → [Red 9s] → [Green 9s]
          → [Refactor 14s] → [Benefits 13.5s] → [Outro 9s]
```

| 씬 | 내용 | 테마 색상 |
|----|------|----------|
| 01 · Intro | TDD 제목 등장 (spring 스케일 애니메이션) | `#61dafb` Cyan |
| 02 · Definition | TDD 정의 (단계별 텍스트 페이드인) | White |
| 03 · Red | 실패 테스트 작성 + 코드 블록 | `#ff4757` Red |
| 04 · Green | 통과 코드 작성 + 코드 블록 | `#2ed573` Green |
| 05 · Refactor | 코드 개선 + Red→Green→Refactor 사이클 | `#7c8cf8` Blue |
| 06 · Benefits | TDD 장점 4개 (좌측 슬라이드 순차 등장) | `#ffd32a` Gold |
| 07 · Outro | 마무리 + 좋아요/구독 CTA | `#61dafb` Cyan |

---

## 핵심 구현 방법

### 1. 프레임 기반 애니메이션

CSS transition/animation을 **절대 사용하지 않습니다.** Remotion은 프레임 단위로 렌더링하므로 모든 움직임은 `useCurrentFrame()`으로 구동합니다.

```tsx
// spring: 물리 기반 자연스러운 스케일
const scale = spring({ fps, frame, config: { damping: 12, stiffness: 80 } });

// interpolate: 선형/베지어 곡선 애니메이션
const opacity = interpolate(frame, [0, 20], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
});
```

### 2. TransitionSeries로 씬 전환

`@remotion/transitions`의 `TransitionSeries`로 씬 간 슬라이드 전환을 구현합니다. 전환 구간(15프레임)만큼 두 씬이 동시에 렌더링되어 자연스러운 전환이 됩니다.

```tsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={180}>
    <IntroScene />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={slide({ direction: "from-bottom" })}
    timing={springTiming({ config: { damping: 200 }, durationInFrames: 15 })}
  />
  <TransitionSeries.Sequence durationInFrames={345}>
    <DefinitionScene />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

> 총 프레임 = 씬 합산 − (전환 수 × 전환 프레임)

### 3. ElevenLabs AI 나레이션 생성

`generate-voiceover.mjs` 스크립트가 ElevenLabs API를 호출해 각 씬의 한국어 나레이션 MP3를 생성합니다.

```
ELEVENLABS_API_KEY=your_key node generate-voiceover.mjs
```

- **Voice:** Adam (`pNInz6obpgDQGcFmaJgB`) — 중저음 남성 아나운서
- **Model:** `eleven_multilingual_v2` — 한국어 자연 발음 지원
- **설정:** stability 0.45 / similarity_boost 0.8 / style 0.15

### 4. 씬 내 오디오 동기화

생성된 MP3는 `public/` 폴더에 저장되고, 각 씬 컴포넌트 안에서 `<Audio>`로 재생됩니다. 전환 구간의 오디오 중첩을 방지하기 위해 씬 시작 시 10프레임 페이드인을 적용합니다.

```tsx
<Audio
  src={staticFile("voiceover/tdd/01-intro.mp3")}
  volume={(f) =>
    interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" })
  }
/>
```

### 5. 한국어 폰트 (NotoSansKR)

`@remotion/google-fonts`를 사용하면 렌더링 전에 폰트 로딩이 **자동으로 보장**됩니다. 일반 CSS `@import`는 렌더링 타이밍 문제가 생길 수 있어 사용하지 않습니다.

```tsx
import { loadFont } from "@remotion/google-fonts/NotoSansKR";

const { fontFamily } = loadFont(); // 렌더링 전 폰트 로딩 완료 보장
```

---

## 로컬 실행

### 의존성 설치

```bash
npm install
```

### 나레이션 생성 (최초 1회)

```bash
ELEVENLABS_API_KEY=your_key node generate-voiceover.mjs
```

### Remotion Studio 미리보기

```bash
npm run dev
# http://localhost:3000 에서 확인
```

### MP4 렌더링

```bash
npx remotion render TDDShorts output/tdd-shorts.mp4
```

---

## 라이선스

Remotion은 일부 법인에서 유료 라이선스가 필요합니다. [라이선스 확인](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)
