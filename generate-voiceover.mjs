import { writeFileSync, mkdirSync } from "fs";

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("ELEVENLABS_API_KEY 환경변수가 설정되지 않았습니다.");
  process.exit(1);
}

// Adam - 깊고 안정적인 남성 아나운서 목소리 (multilingual v2 지원)
const VOICE_ID = "pNInz6obpgDQGcFmaJgB";
const MODEL_ID = "eleven_multilingual_v2";

const scenes = [
  {
    id: "01-intro",
    text: "T D D. 테스트 주도 개발. 지금부터 알아보겠습니다.",
  },
  {
    id: "02-definition",
    text: "T D D란, 코드를 작성하기 전에 먼저 테스트를 작성하는 개발 방법론입니다. 품질과 유지보수성을 높이는 강력한 방법입니다.",
  },
  {
    id: "03-red",
    text: "첫 번째 단계, 레드. 아직 구현하지 않은 기능의 테스트 코드를 먼저 작성합니다. 당연히 실패합니다.",
  },
  {
    id: "04-green",
    text: "두 번째 단계, 그린. 테스트를 통과하는 최소한의 코드만 작성합니다. 과하게 구현하지 않습니다.",
  },
  {
    id: "05-refactor",
    text: "세 번째 단계, 리팩토링. 중복을 제거하고 코드 품질을 개선합니다. 테스트는 여전히 통과해야 합니다. 이 레드, 그린, 리팩토링 사이클을 계속 반복합니다.",
  },
  {
    id: "06-benefits",
    text: "T D D의 장점은 다양합니다. 버그를 조기에 발견하고, 안전하게 리팩토링할 수 있으며, 설계 목표가 명확해지고, 전반적인 코드 품질이 향상됩니다.",
  },
  {
    id: "07-outro",
    text: "품질 있는 코드를 원한다면, T D D를 시작해보세요. 도움이 되셨다면 좋아요와 구독 부탁드립니다!",
  },
];

const OUTPUT_DIR = "public/voiceover/tdd";
mkdirSync(OUTPUT_DIR, { recursive: true });

async function generateScene(scene) {
  console.log(`🎙️  생성 중: ${scene.id} - "${scene.text.slice(0, 30)}..."`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.8,
          style: 0.15,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`씬 ${scene.id} 실패 (${response.status}): ${err}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const path = `${OUTPUT_DIR}/${scene.id}.mp3`;
  writeFileSync(path, buffer);
  console.log(`   ✅ 저장: ${path} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  console.log("🚀 TDD 쇼츠 나레이션 생성 시작\n");

  for (const scene of scenes) {
    await generateScene(scene);
    // API 레이트 리밋 방지
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\n✅ 모든 나레이션 생성 완료!");
}

main().catch((e) => {
  console.error("❌ 오류:", e.message);
  process.exit(1);
});
