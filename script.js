const canvas = document.getElementById("petal-canvas");
const ctx = canvas.getContext("2d");
const cursor = document.querySelector(".cursor-orb");
const soundToggle = document.querySelector(".sound-toggle");
const brandLabel = document.getElementById("brand-label");
const bloomToast = document.getElementById("bloom-toast");
const livingGarden = document.getElementById("living-garden");
const gardenWord = document.getElementById("garden-word");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = document.getElementById("theme-toggle-label");
const themeFlowerVisual = themeToggle?.querySelector(".theme-flower-visual");
const bloomLab = document.querySelector(".bloom-lab");
const startBloomButton = document.getElementById("start-bloom");
const bloomMessage = document.getElementById("bloom-message");
const bloomPlant = document.getElementById("bloom-plant");
const bloomCard = document.getElementById("bloom-card");
const bloomAudioToggle = document.getElementById("bloom-audio-toggle");
const miniPlayer = document.getElementById("mini-player");
const miniPlayerTitle = document.getElementById("mini-player-title");
const musicTouchHint = document.getElementById("music-touch-hint");
const soundPrevButton = document.getElementById("sound-prev");
const soundNextButton = document.getElementById("sound-next");
const miniTrackTitle = document.getElementById("mini-track-title");
const miniFullTitle = document.getElementById("mini-full-title");
const miniPlayButton = document.getElementById("mini-play");
const miniProgress = document.getElementById("mini-progress");
const miniCurrentTime = document.getElementById("mini-current-time");
const miniDuration = document.getElementById("mini-duration");
const miniToAlbumButton = document.getElementById("mini-to-album");
const spotifySoonTrigger = document.getElementById("spotify-soon-trigger");
const spotifySoonModal = document.getElementById("spotify-soon-modal");
const versionArchive = document.getElementById("version-archive");
const versionToggle = document.getElementById("version-toggle");
const versionListToggle = document.getElementById("version-list-toggle");
const versionAllToggle = document.getElementById("version-all-toggle");
const versionPanel = document.getElementById("version-panel");
const versionPanelInner = versionPanel?.querySelector(".version-panel-inner");
const versionToggleTitle = document.getElementById("version-toggle-title");
const versionToggleSubtitle = document.getElementById("version-toggle-subtitle");
const dailyPhrase = document.getElementById("daily-phrase");
const dailyPhraseRandom = document.getElementById("daily-phrase-random");
const CURRENT_SITE_VERSION = "v0.4b1";
const albumNowTitle = document.getElementById("album-now-title");
const albumNowMeta = document.getElementById("album-now-meta");
const albumCurrentTime = document.getElementById("album-current-time");
const albumDuration = document.getElementById("album-duration");
const albumProgress = document.getElementById("album-progress");
const albumPlayButton = document.getElementById("album-play");
const albumPrevButton = document.getElementById("album-prev");
const albumNextButton = document.getElementById("album-next");

const backgroundAudio = new Audio();
const backgroundAnalysisAudio = new Audio();
const bloomSfxAudio = new Audio();
const flowerAudio = new Audio();
const AUDIO_FADE_DURATION = 300;
const AUDIO_START_EPSILON = 0.08;
backgroundAudio.preload = "metadata";
backgroundAnalysisAudio.preload = "none";
bloomSfxAudio.preload = "none";
flowerAudio.preload = "none";
backgroundAudio.loop = false;
backgroundAnalysisAudio.loop = false;
flowerAudio.loop = true;

// 今日花語資料庫：日後要新增、刪除、編輯祝福語，集中修改這個陣列即可。
// 可直接在反引號內按 Enter 換行；網頁會保留換行，但視覺顯示固定為兩行。
// 祝福花語至多16個字，單行至多8個字。
const dailyPhrases = [
  `你已經很努力了。`,
  `今天的你，
  也值得被愛。`,
  `慢一點也沒關係。`,
  `有人正在想念你。`,
  `你的溫柔
  沒有白費。`,
  `請別急著
  否定自己。`,
  `傷口會
  慢慢長成花。`,
  `你的存在
  不需要被定義。`,
  `累了，
  就休息一下吧。`,
  `願你
  今晚安心入睡。`,
  `你不需要
  獨自撐著。`,
  `總會有人理解你。`,
  `迷路時，
  也別討厭自己。`,
  `願你
  被世界溫柔接住。`,
  `你的眼淚
  有它的重量。`,
  `蝴蝶看不見
  自己的美麗。`,
  `今天的你
  也辛苦了。`,
  `願你的心
  慢慢放晴。`,
  `你的感受永遠是
  真實存在的。`,
  `記得回頭看看
  自己已經走了多遠`,
  `請好好照顧
  自己的心。`,
  `即便拒絕了別人，
    你也不是壞人。`,
  `願你
  記得自己的光。`,
  `花會記得
  你的故事。`,
  `每一段靜默，
  都可能正在發芽。`
];

const bloomChoices = {
  red: {
    color: "#e94545",
    tone: 261.63,
    message: "願你的勇敢，被世界溫柔擁抱",
    card: "assets/cards/web/red.jpg",
    alt: "紅色山茶花小花卡",
    bloom: "assets/audio/red_bloom.mp3",
    music: "assets/audio/red.mp3"
  },
  orange: {
    color: "#ff7b59",
    tone: 293.66,
    message: "願今天有道暖陽落進你心裡",
    card: "assets/cards/web/orange.jpg",
    alt: "橙色金盞花小花卡",
    bloom: "assets/audio/orange_bloom.mp3",
    music: "assets/audio/orange.mp3"
  },
  yellow: {
    color: "#ffd166",
    tone: 329.63,
    message: "願閃閃發亮的星，與你起舞",
    card: "assets/cards/web/yellow.jpg",
    alt: "黃色向日葵小花卡",
    bloom: "assets/audio/yellow_bloom.mp3",
    music: "assets/audio/yellow.mp3"
  },
  green: {
    color: "#60d394",
    tone: 349.23,
    message: "或許有些事，慢慢來也沒關係",
    card: "assets/cards/web/green.jpg",
    alt: "綠色鈴蘭小花卡",
    bloom: "assets/audio/green_bloom.mp3",
    music: "assets/audio/green.mp3"
  },
  blue: {
    color: "#4d96ff",
    tone: 392,
    message: "願你今晚能睡得安穩，有個好夢",
    card: "assets/cards/web/blue.jpg",
    alt: "藍色藍繡球小花卡",
    bloom: "assets/audio/blue_bloom.mp3",
    music: "assets/audio/blue.mp3"
  },
  indigo: {
    color: "#5048F4",
    tone: 440,
    message: "那些深夜裡的情緒，將化為雨滴落下",
    card: "assets/cards/web/indigo.jpg",
    alt: "靛色鳶尾小花卡",
    bloom: "assets/audio/indigo_bloom.mp3",
    music: "assets/audio/indigo.mp3"
  },
  purple: {
    color: "#9b5de5",
    tone: 493.88,
    message: "也許有些孤獨，會化為星光",
    card: "assets/cards/web/purple.jpg",
    alt: "紫色薰衣草小花卡",
    bloom: "assets/audio/violet_bloom.mp3",
    music: "assets/audio/violet.mp3"
  },
  gray: {
    color: "#acbe9a",
    tone: 523.25,
    message: "傾聽四周，或許它們也在聆聽著你",
    card: "assets/cards/web/gray.jpg",
    alt: "灰色銀葉菊小花卡",
    bloom: "assets/audio/gray_bloom.mp3",
    music: "assets/audio/gray.mp3"
  }
};

const albumTracks = [
  {
    title: "Welcome to the Secret Garden",
    subtitle: "歡迎光臨秘密花園",
    composer: "李岳鴒 ZEROYUEH",
    duration: "2:49",
    color: "#8fa780",
    src: "assets/audio/welcome-secret-garden.mp3"
  },
  {
    title: "Red",
    subtitle: "紅",
    composer: "林書磊 Aries Lin",
    duration: "3:28",
    color: "#e94545",
    src: "assets/audio/red.mp3",
    flower: "assets/cards/flowers/red-flower.png"
  },
  {
    title: "Orange",
    subtitle: "橙",
    composer: "林書磊 Aries Lin",
    duration: "3:28",
    color: "#ff7b59",
    src: "assets/audio/orange.mp3",
    flower: "assets/cards/flowers/orange-flower.png"
  },
  {
    title: "Yellow",
    subtitle: "黃",
    composer: "林書磊 Aries Lin",
    duration: "3:28",
    color: "#ffd166",
    src: "assets/audio/yellow.mp3",
    flower: "assets/cards/flowers/yellow-flower.png"
  },
  {
    title: "Green",
    subtitle: "綠",
    composer: "林書磊 Aries Lin",
    duration: "3:28",
    color: "#60d394",
    src: "assets/audio/green.mp3",
    flower: "assets/cards/flowers/green-flower.png"
  },
  {
    title: "Blue",
    subtitle: "藍",
    composer: "陳映里 Osmond Chen",
    duration: "4:10",
    color: "#4d96ff",
    src: "assets/audio/blue.mp3",
    flower: "assets/cards/flowers/blue-flower.png"
  },
  {
    title: "Indigo",
    subtitle: "靛",
    composer: "陳映里 Osmond Chen",
    duration: "5:02",
    color: "#5542a1",
    src: "assets/audio/indigo.mp3",
    flower: "assets/cards/flowers/indigo-flower.png"
  },
  {
    title: "Violet",
    subtitle: "紫",
    composer: "陳映里 Osmond Chen",
    duration: "3:28",
    color: "#8b62c7",
    src: "assets/audio/violet.mp3",
    flower: "assets/cards/flowers/purple-flower.png"
  },
  {
    title: "Gray",
    subtitle: "灰",
    composer: "陳映里 Osmond Chen",
    duration: "5:11",
    color: "#7f877d",
    src: "assets/audio/gray.mp3",
    flower: "assets/cards/flowers/gray-flower.png"
  },
  {
    title: "Secret Flower",
    subtitle: "勿忘我",
    composer: "李岳鴒 ZEROYUEH",
    duration: "4:24",
    color: "#ffafcc",
    src: "assets/audio/secret-flower-demo.mp3"
  }
];

const backgroundTracks = albumTracks;
const bloomTrackByKey = {
  red: 1,
  orange: 2,
  yellow: 3,
  green: 4,
  blue: 5,
  indigo: 6,
  purple: 7,
  gray: 8
};
const bloomKeyByTrackIndex = Object.fromEntries(
  Object.entries(bloomTrackByKey).map(([key, index]) => [index, key])
);

let width = 0;
let height = 0;
let petals = [];
let pointer = { x: 0, y: 0, active: false };
let audioContext;
let ambientGain;
let backgroundAnalysisSource;
let backgroundAnalysisGain;
let backgroundAnalyser;
let frequencyData;
let timeDomainData;
let eqBarLevels = [];
let lastAnalysisSyncAt = 0;
let lastAnalysisMediaTime = 0;
let analysisStalledSince = 0;
let analysisInvalidSince = 0;
let waveFrame;
let userActivatedAudio = false;
let themeFlowerAngle = 0;
let themeFlowerSpeed = 0.02;
let themeFlowerTargetSpeed = 0.02;
let themeFlowerLastTime = 0;
let themeFlowerBoostTimer;
let themeFlowerFrameLastTime = 0;
let petalFrameLastTime = 0;
let scrollOptimizeTimer;
let activeColor = "#e94545";
let activeWord = "勇氣";
let themeTransitionTimer;
let themeTransitionApplyTimer;
let backgroundTrackIndex = Math.floor(Math.random() * backgroundTracks.length);
let backgroundWanted = true;
let backgroundResumeTimer;
let bloomPauseResumeTimer;
let bloomLeaveTimer;
let flowerMusicActive = false;
let lastBloomKey = "";
let bloomInView = false;
let miniPlayerCloseTimer;
let musicHintDismissed = false;
let brandLabelTimer;
let brandLabelTarget = "Welcome";
let brandLabelChanging = false;
const usesHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const browserUA = navigator.userAgent || "";
const isChromeBrowser = /Chrome\//.test(browserUA) && !/Edg\/|OPR\/|Opera\//.test(browserUA);
const visualPerformanceLite = usesHover && !isChromeBrowser;
const platformName = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "";
const isWindowsPlatform = /win/i.test(platformName);
const nativeCursorEnabled = usesHover && (isWindowsPlatform || visualPerformanceLite);
const customCursorEnabled = usesHover && !nativeCursorEnabled;
const cursorPalette = ["#ffd166", "#ff7a90", "#4ecdc4", "#9b5de5", "#60d394", "#4d96ff", "#ff9f68", "#d7b9ff"];
const interactiveCursorSelector = [
  "a",
  "button",
  "input",
  "[role='button']",
  ".track[data-track]",
  ".flower-card",
  ".seed",
  ".bloom-seed",
  ".gate-flower",
  ".sound-cluster",
  ".theme-toggle-button",
  ".garden-stage",
  ".living-garden"
].join(",");

function encodeCursorSvg(svg, hotspotX = 16, hotspotY = 18) {
  const data = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return `url("${data}") ${hotspotX} ${hotspotY}, auto`;
}

function mixHexColor(hex, mix = "#07110f", amount = 0.36) {
  const parse = (value) => {
    const normalized = value.replace("#", "");
    return [
      Number.parseInt(normalized.slice(0, 2), 16),
      Number.parseInt(normalized.slice(2, 4), 16),
      Number.parseInt(normalized.slice(4, 6), 16)
    ];
  };
  const [r1, g1, b1] = parse(hex);
  const [r2, g2, b2] = parse(mix);
  const blended = [r1, g1, b1].map((channel, index) => {
    const target = [r2, g2, b2][index];
    return Math.round(channel * (1 - amount) + target * amount).toString(16).padStart(2, "0");
  });
  return `#${blended.join("")}`;
}

function buildWindowsSeedCursor(color, { sprout = false, pressed = false } = {}) {
  const seedColor = pressed ? mixHexColor(color) : color;
  const seedSize = pressed ? 16 : 20;
  const seedOffset = (20 - seedSize) / 2;
  const sproutMarkup = sprout
    ? `
      <path d="M16 15 C16 9 16 5 16 2" fill="none" stroke="#4f8d4c" stroke-width="3" stroke-linecap="round"/>
      <path d="M17 7 C23 4 27 6 28 11 C23 12 19 11 17 7Z" fill="#8ed77e" stroke="#4f8d4c" stroke-width="1"/>
    `
    : "";
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="42" viewBox="0 0 36 42">
      ${sproutMarkup}
      <circle cx="18" cy="${22 + seedOffset / 2}" r="${seedSize / 2}" fill="${seedColor}" stroke="#ffffff" stroke-opacity="0.82" stroke-width="2"/>
      <circle cx="14" cy="${18 + seedOffset / 2}" r="${Math.max(2, seedSize * 0.16)}" fill="#ffffff" fill-opacity="0.62"/>
    </svg>
  `;
}

if (cursor && customCursorEnabled) {
  document.documentElement.appendChild(cursor);
  const cursorColor = cursorPalette[Math.floor(Math.random() * cursorPalette.length)];
  document.documentElement.style.setProperty("--cursor-color", cursorColor);
  document.documentElement.classList.add("custom-cursor-enabled");
} else if (nativeCursorEnabled) {
  const cursorColor = cursorPalette[Math.floor(Math.random() * cursorPalette.length)];
  document.documentElement.style.setProperty("--windows-cursor", encodeCursorSvg(buildWindowsSeedCursor(cursorColor)));
  document.documentElement.style.setProperty("--windows-cursor-press", encodeCursorSvg(buildWindowsSeedCursor(cursorColor, { pressed: true })));
  document.documentElement.style.setProperty("--windows-cursor-sprout", encodeCursorSvg(buildWindowsSeedCursor(cursorColor, { sprout: true }), 16, 22));
  document.documentElement.classList.add("windows-custom-cursor");
  cursor?.remove();
} else {
  cursor?.remove();
}

if (visualPerformanceLite) {
  document.documentElement.classList.add("performance-lite");
}

function setCursorClass(className, active) {
  document.body.classList.toggle(className, active);
  document.documentElement.classList.toggle(className, active);
}

function addCursorClass(className) {
  document.body.classList.add(className);
  document.documentElement.classList.add(className);
}

function removeCursorClasses(...classNames) {
  document.body.classList.remove(...classNames);
  document.documentElement.classList.remove(...classNames);
}

function setBrandLabel(text) {
  if (!brandLabel || brandLabelTarget === text) return;
  brandLabelTarget = text;
  if (brandLabelChanging) return;
  brandLabelChanging = true;
  brandLabel.classList.add("is-changing");
  brandLabelTimer = window.setTimeout(() => {
    brandLabel.textContent = brandLabelTarget;
    window.setTimeout(() => {
      brandLabel.classList.remove("is-changing");
      brandLabelChanging = false;
      if (brandLabel.textContent !== brandLabelTarget) setBrandLabel(brandLabelTarget);
    }, 40);
  }, 220);
}

function getSavedTheme() {
  try {
    return localStorage.getItem("secret-garden-theme");
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("secret-garden-theme", theme);
  } catch {
    // Theme still changes even if localStorage is unavailable.
  }
}

function applyTheme(theme, persist = true) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = nextTheme;
  const targetTheme = nextTheme === "dark" ? "淺色" : "深色";
  if (themeToggleLabel) themeToggleLabel.textContent = targetTheme;
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", `切換到${targetTheme}主題`);
    themeToggle.title = `切換到${targetTheme}主題`;
  }
  if (persist) saveTheme(nextTheme);
  if (width && height) petals = createPetalSet();
}

function transitionTheme(theme) {
  document.body.classList.remove("theme-shifting");
  window.clearTimeout(themeTransitionTimer);
  window.clearTimeout(themeTransitionApplyTimer);

  requestAnimationFrame(() => {
    document.body.classList.add("theme-shifting");
    themeTransitionApplyTimer = window.setTimeout(() => applyTheme(theme), 120);
    themeTransitionTimer = window.setTimeout(() => {
      document.body.classList.remove("theme-shifting");
    }, visualPerformanceLite ? 420 : 760);
  });
}

function animateThemeFlower(timestamp = 0) {
  if (!themeFlowerVisual || visualPerformanceLite) return;
  requestAnimationFrame(animateThemeFlower);
  if (document.hidden) return;
  themeFlowerFrameLastTime = timestamp;
  const delta = themeFlowerLastTime ? Math.min(40, timestamp - themeFlowerLastTime) : 16;
  themeFlowerLastTime = timestamp;
  themeFlowerSpeed += (themeFlowerTargetSpeed - themeFlowerSpeed) * 0.045;
  themeFlowerAngle = (themeFlowerAngle + themeFlowerSpeed * delta) % 360;
  themeFlowerVisual.style.transform = `translate3d(0, 0, 0) rotate(${themeFlowerAngle}deg)`;
}

function boostThemeFlower() {
  if (visualPerformanceLite) {
    if (!themeToggle) return;
    themeToggle.classList.remove("is-boosting");
    void themeToggle.offsetWidth;
    themeToggle.classList.add("is-boosting");
    window.clearTimeout(themeFlowerBoostTimer);
    themeFlowerBoostTimer = window.setTimeout(() => {
      themeToggle.classList.remove("is-boosting");
    }, 560);
    return;
  }
  themeFlowerTargetSpeed = 1.08;
  window.clearTimeout(themeFlowerBoostTimer);
  themeFlowerBoostTimer = window.setTimeout(() => {
    themeFlowerTargetSpeed = 0.02;
  }, 590);
}

function beginScrollOptimization() {
  if (!visualPerformanceLite) return;
  document.body.classList.add("scroll-optimizing");
  window.clearTimeout(scrollOptimizeTimer);
  scrollOptimizeTimer = window.setTimeout(() => {
    document.body.classList.remove("scroll-optimizing");
  }, 900);
}

function smoothScrollToElement(target, options = {}) {
  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (!element) return;
  beginScrollOptimization();
  element.scrollIntoView({
    behavior: "smooth",
    block: options.block || "start",
    inline: options.inline || "nearest"
  });
}

function smoothScrollToTop(top) {
  beginScrollOptimization();
  window.scrollTo({ top, behavior: "smooth" });
}

function getPetalCount() {
  const petalDensity = visualPerformanceLite ? 32 : 18;
  const petalLimit = visualPerformanceLite ? 42 : 80;
  return Math.min(petalLimit, Math.floor(width / petalDensity));
}

function createPetalSet() {
  return Array.from({ length: getPetalCount() }, createPetal);
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, visualPerformanceLite ? 1.25 : 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  petals = createPetalSet();
}

function createPetal() {
  const lightTheme = document.body.dataset.theme === "light";
  const colors = lightTheme
    ? ["#d7797f", "#e8b95f", "#9db78d", "#b7a1d9", "#eeb0ae", "#8ea68f"]
    : ["#ffafcc", "#ffd166", "#4ecdc4", "#e94545", "#9b5de5", "#fff8ec"];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 3 + Math.random() * 8,
    speed: 0.25 + Math.random() * 0.85,
    drift: -0.45 + Math.random() * 0.9,
    spin: Math.random() * Math.PI,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: 0.2 + Math.random() * 0.48
  };
}

function drawPetals(timestamp = 0) {
  requestAnimationFrame(drawPetals);
  if (document.hidden) return;
  if (visualPerformanceLite && timestamp - petalFrameLastTime < 33) return;
  petalFrameLastTime = timestamp;
  ctx.clearRect(0, 0, width, height);
  for (const petal of petals) {
    petal.y += petal.speed;
    petal.x += petal.drift + Math.sin((petal.y + petal.spin) * 0.012) * 0.36;
    petal.spin += 0.012;

    if (pointer.active) {
      const dx = petal.x - pointer.x;
      const dy = petal.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 120) {
        petal.x += dx / 52;
        petal.y += dy / 78;
      }
    }

    if (petal.y > height + 24) {
      Object.assign(petal, createPetal(), { y: -20 });
    }
    if (petal.x < -30) petal.x = width + 30;
    if (petal.x > width + 30) petal.x = -30;

    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate(petal.spin);
    ctx.globalAlpha = petal.opacity;
    ctx.fillStyle = petal.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, petal.size * 0.52, petal.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function ensureAudio() {
  if (audioContext) return audioContext;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext = new AudioContextClass();
  ambientGain = audioContext.createGain();
  ambientGain.gain.value = 0.0;
  ambientGain.connect(audioContext.destination);

  const low = audioContext.createOscillator();
  const shimmer = audioContext.createOscillator();
  const lowGain = audioContext.createGain();
  const shimmerGain = audioContext.createGain();
  low.type = "sine";
  shimmer.type = "triangle";
  low.frequency.value = 98;
  shimmer.frequency.value = 392;
  lowGain.gain.value = 0.018;
  shimmerGain.gain.value = 0.006;
  low.connect(lowGain).connect(ambientGain);
  shimmer.connect(shimmerGain).connect(ambientGain);
  low.start();
  shimmer.start();
  return audioContext;
}

function toggleSound() {
  const enabled = soundToggle.getAttribute("aria-pressed") !== "true";
  soundToggle.setAttribute("aria-pressed", String(enabled));
  document.body.classList.toggle("sound-on", enabled);
  backgroundWanted = enabled;
  if (enabled) {
    if (backgroundAudio.src && backgroundAudio.paused) {
      fadeResume(backgroundAudio).then(updateAlbumUI);
    } else {
      playBackground({ restart: !backgroundAudio.src });
    }
    showToast("背景音樂已開啟。");
  } else {
    fadePause(backgroundAudio).then(updateAlbumUI);
    showToast("背景音樂已暫停。");
  }
}

function setAudioVolume(audio, volume) {
  audio.volume = Math.max(0, Math.min(1, volume));
}

function clearAudioFade(audio) {
  if (!audio) return;
  window.clearInterval(audio.fadeTimer);
  window.cancelAnimationFrame(audio.fadeFrame);
  audio.fadeTimer = undefined;
  audio.fadeFrame = undefined;
}

function fadePause(audio, duration = AUDIO_FADE_DURATION) {
  if (!audio || audio.paused) return Promise.resolve();
  clearAudioFade(audio);
  return new Promise((resolve) => {
    const startVolume = audio.volume || 1;
    const startedAt = performance.now();
    const step = () => {
      const progress = Math.min(1, (performance.now() - startedAt) / duration);
      setAudioVolume(audio, startVolume * (1 - progress));
      if (progress >= 1) {
        clearAudioFade(audio);
        audio.pause();
        setAudioVolume(audio, startVolume);
        resolve();
        return;
      }
      audio.fadeFrame = requestAnimationFrame(step);
    };
    step();
  });
}

function fadeResume(audio, duration = AUDIO_FADE_DURATION) {
  if (!audio || !audio.src) return Promise.resolve();
  clearAudioFade(audio);
  if ((audio.currentTime || 0) <= AUDIO_START_EPSILON) {
    setAudioVolume(audio, 1);
    return audio.play().catch(() => {});
  }
  setAudioVolume(audio, 0);
  return audio.play().then(() => {
    return new Promise((resolve) => {
      const startedAt = performance.now();
      const step = () => {
        const progress = Math.min(1, (performance.now() - startedAt) / duration);
        setAudioVolume(audio, progress);
        if (progress >= 1) {
          clearAudioFade(audio);
          resolve();
          return;
        }
        audio.fadeFrame = requestAnimationFrame(step);
      };
      step();
    });
  }).catch(() => {});
}

function ensureTrackWaveBars() {
  document.querySelectorAll(".petal-wave").forEach((wave) => {
    if (wave.children.length) return;
    for (let index = 0; index < 16; index += 1) {
      wave.appendChild(document.createElement("b"));
    }
  });
}

function ensureBackgroundAnalyser() {
  if (!userActivatedAudio) return null;
  const context = ensureAudio();
  if (!context) return null;
  if (context.state === "suspended") {
    context.resume().catch(() => {});
  }
  if (!backgroundAnalyser) {
    backgroundAnalyser = context.createAnalyser();
    backgroundAnalyser.fftSize = 2048;
    backgroundAnalyser.minDecibels = -92;
    backgroundAnalyser.maxDecibels = -18;
    backgroundAnalyser.smoothingTimeConstant = 0.38;
    frequencyData = new Float32Array(backgroundAnalyser.frequencyBinCount);
    timeDomainData = new Uint8Array(backgroundAnalyser.fftSize);
  }
  if (!backgroundAnalysisSource) {
    backgroundAnalysisGain = context.createGain();
    backgroundAnalysisGain.gain.value = 0.00001;
    backgroundAnalysisSource = context.createMediaElementSource(backgroundAnalysisAudio);
    backgroundAnalysisSource.connect(backgroundAnalyser);
    backgroundAnalyser.connect(backgroundAnalysisGain);
    backgroundAnalysisGain.connect(context.destination);
  }
  return backgroundAnalyser;
}

function syncBackgroundAnalysis({ restart = false, anticipatePlay = false } = {}) {
  if (!userActivatedAudio) return;
  const analyser = ensureBackgroundAnalyser();
  if (!analyser) return;
  const track = backgroundTracks[backgroundTrackIndex];
  if (!track) return;
  const trackUrl = new URL(track.src, window.location.href).href;
  if (backgroundAnalysisAudio.src !== trackUrl) {
    backgroundAnalysisAudio.src = track.src;
    restart = true;
  }
  const current = backgroundAudio.currentTime || 0;
  if (restart || Math.abs((backgroundAnalysisAudio.currentTime || 0) - current) > 0.28) {
    try {
      backgroundAnalysisAudio.currentTime = current;
    } catch {
      // Metadata may not be ready yet; the next sync will catch up.
    }
  }
  backgroundAnalysisAudio.playbackRate = backgroundAudio.playbackRate || 1;
  if ((backgroundAudio.paused && !anticipatePlay) || !backgroundWanted) {
    backgroundAnalysisAudio.pause();
    return;
  }
  const context = ensureAudio();
  if (context?.state === "suspended" && (anticipatePlay || !backgroundAudio.paused)) {
    context.resume().catch(() => {});
  }
  backgroundAnalysisAudio.play().catch(() => {});
}

function primeBackgroundAnalysisFromGesture({ restart = false, anticipatePlay = false } = {}) {
  userActivatedAudio = true;
  const context = ensureAudio();
  if (context?.state === "suspended") context.resume().catch(() => {});
  ensureBackgroundAnalyser();
  syncBackgroundAnalysis({ restart, anticipatePlay });
}

function fallbackEqLevels(bars) {
  const time = backgroundAudio.currentTime || performance.now() / 1000;
  const trackSeed = backgroundTrackIndex * 0.73;
  return bars.map((_, index) => {
    const position = index / Math.max(1, bars.length - 1);
    const lowBias = 1 - position * 0.42;
    const pulseA = 0.5 + Math.sin(time * (3.2 + position * 2.4) + trackSeed + index * 0.34) * 0.5;
    const pulseB = 0.5 + Math.sin(time * (6.8 + position * 3.1) + index * 0.73) * 0.5;
    return Math.min(1, Math.max(0, (0.12 + pulseA * 0.46 + pulseB * 0.26) * lowBias));
  });
}

function paintEqBars(playingWave, bars, levels) {
  const maxBarHeight = Math.max(24, playingWave.clientHeight - 10);
  bars.forEach((bar, index) => {
    const level = levels[index] || 0;
    const height = 4 + Math.pow(level, 0.76) * (maxBarHeight - 4);
    bar.style.setProperty("--bar-height", `${height.toFixed(1)}px`);
    bar.style.setProperty("--bar-opacity", String(0.52 + level * 0.48));
  });
}

function isAnalysisStreamUnavailable() {
  if (!userActivatedAudio || !backgroundAnalyser) return true;
  if (backgroundAudio.paused || !backgroundWanted) {
    analysisStalledSince = 0;
    lastAnalysisMediaTime = backgroundAnalysisAudio.currentTime || 0;
    return false;
  }

  const now = performance.now();
  const analysisTime = backgroundAnalysisAudio.currentTime || 0;
  const backgroundTime = backgroundAudio.currentTime || 0;
  const isSynchronized = Math.abs(analysisTime - backgroundTime) < 1.4;
  const isAdvancing = Math.abs(analysisTime - lastAnalysisMediaTime) > 0.012;
  const stalled = backgroundAnalysisAudio.paused || !isSynchronized || !isAdvancing;

  if (stalled) {
    analysisStalledSince ||= now;
  } else {
    analysisStalledSince = 0;
  }

  lastAnalysisMediaTime = analysisTime;
  return Boolean(analysisStalledSince && now - analysisStalledSince > 1200);
}

function updateTrackWaves() {
  waveFrame = requestAnimationFrame(updateTrackWaves);
  const playingWaves = [...document.querySelectorAll(".album-eq.petal-wave")];
  if (!playingWaves.length || backgroundAudio.paused) return;
  const playingWave = playingWaves.find((wave) => getComputedStyle(wave).display !== "none") || playingWaves[0];
  const bars = [...playingWave.querySelectorAll("b")];
  if (!bars.length) return;
  const paintAlbumEqBars = (levels) => {
    playingWaves.forEach((wave) => {
      const waveBars = [...wave.querySelectorAll("b")];
      if (waveBars.length) paintEqBars(wave, waveBars, levels);
    });
  };
  if (
    userActivatedAudio &&
    (!backgroundAnalyser ||
      backgroundAnalysisAudio.paused ||
      Math.abs((backgroundAnalysisAudio.currentTime || 0) - (backgroundAudio.currentTime || 0)) > 0.6 ||
      !frequencyData ||
      !timeDomainData)
  ) {
    const now = performance.now();
    if (now - lastAnalysisSyncAt > 700) {
      lastAnalysisSyncAt = now;
      syncBackgroundAnalysis({ anticipatePlay: true });
    }
  }
  if (!backgroundAnalyser || !frequencyData || !timeDomainData) {
    paintAlbumEqBars(fallbackEqLevels(bars));
    return;
  }

  backgroundAnalyser.getFloatFrequencyData(frequencyData);
  backgroundAnalyser.getByteTimeDomainData(timeDomainData);
  const analysisUnavailable = isAnalysisStreamUnavailable();
  const hasFrequencyData = frequencyData.some((value) => Number.isFinite(value));
  const hasTimeDomainSignal = timeDomainData.some((sample) => sample !== 128);
  const analysisInvalid = !hasFrequencyData && !hasTimeDomainSignal;
  if (analysisInvalid) {
    analysisInvalidSince ||= performance.now();
  } else {
    analysisInvalidSince = 0;
  }
  if (analysisUnavailable || analysisInvalid) {
    if (analysisUnavailable || (analysisInvalidSince && performance.now() - analysisInvalidSince > 1200)) {
      paintAlbumEqBars(fallbackEqLevels(bars));
      return;
    }
    paintAlbumEqBars(bars.map(() => 0));
    return;
  }

  let signalEnergy = 0;
  for (let index = 0; index < timeDomainData.length; index += 1) {
    const centered = (timeDomainData[index] - 128) / 128;
    signalEnergy += centered * centered;
  }
  const volumeLevel = Math.min(1, Math.max(0, (Math.sqrt(signalEnergy / timeDomainData.length) - 0.004) * 5.6));

  const minHz = 32;
  const nyquist = (audioContext?.sampleRate || 44100) / 2;
  const maxHz = Math.min(18000, nyquist * 0.92);
  const binHz = (audioContext?.sampleRate || 44100) / backgroundAnalyser.fftSize;
  const minDb = backgroundAnalyser.minDecibels;
  const maxDb = backgroundAnalyser.maxDecibels;
  const rangeDb = maxDb - minDb;
  const levels = bars.map((_, index) => {
    const bandStart = index / bars.length;
    const bandEnd = (index + 1) / bars.length;
    const lowHz = minHz * ((maxHz / minHz) ** bandStart);
    const highHz = minHz * ((maxHz / minHz) ** bandEnd);
    const startBin = Math.max(1, Math.floor(lowHz / binHz));
    const endBin = Math.min(frequencyData.length - 1, Math.max(startBin + 1, Math.ceil(highHz / binHz)));
    let energy = 0;
    let peak = 0;
    let count = 0;

    for (let bin = startBin; bin <= endBin; bin += 1) {
      const normalized = Math.min(1, Math.max(0, (frequencyData[bin] - minDb) / rangeDb));
      energy += normalized * normalized;
      peak = Math.max(peak, normalized);
      count += 1;
    }

    const rms = count ? Math.sqrt(energy / count) : 0;
    const bandPosition = index / Math.max(1, bars.length - 1);
    const frequencyCompensation = 0.86 + bandPosition * 0.96;
    const rawLevel = (rms * 0.76 + peak * 0.24) * frequencyCompensation;
    const volumeGatedLevel = Math.max(0, rawLevel - 0.018) * (0.88 + volumeLevel * 0.48);
    const targetLevel = Math.min(1, volumeGatedLevel);
    const previousLevel = eqBarLevels[index] || 0;
    const smoothing = targetLevel > previousLevel ? 0.46 : 0.2;
    const smoothedLevel = previousLevel + (targetLevel - previousLevel) * smoothing;
    eqBarLevels[index] = smoothedLevel;
    return smoothedLevel;
  });

  paintAlbumEqBars(levels);
}

function syncSoundButton() {
  soundToggle?.setAttribute("aria-expanded", String(miniPlayer?.classList.contains("is-open")));
  document.body.classList.toggle("sound-on", backgroundWanted);
  document.body.classList.toggle("album-paused", backgroundAudio.paused);
  albumPlayButton?.classList.toggle("paused", backgroundAudio.paused);
  albumPlayButton?.setAttribute("aria-label", backgroundAudio.paused ? "播放" : "暫停");
  miniPlayButton?.classList.toggle("paused", backgroundAudio.paused);
  miniPlayButton?.setAttribute("aria-label", backgroundAudio.paused ? "播放" : "暫停");
  bloomAudioToggle?.classList.toggle("paused", backgroundAudio.paused);
  bloomAudioToggle?.setAttribute("aria-pressed", String(backgroundAudio.paused));
  bloomAudioToggle?.setAttribute("aria-label", backgroundAudio.paused ? "繼續音樂" : "暫停音樂");
}

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function updateAlbumUI() {
  const track = backgroundTracks[backgroundTrackIndex];
  if (!track) return;
  const fullTitle = `${track.title} ${track.subtitle}`.trim();
  const isLongTitle = fullTitle.length > 24;
  const albumNow = albumNowTitle?.closest(".album-now");
  document.documentElement.style.setProperty("--current-track-color", track.color);
  if (track.flower) {
    document.documentElement.style.setProperty("--current-track-flower", `url("${track.flower}")`);
    albumNow?.classList.add("has-flower");
  } else {
    document.documentElement.style.removeProperty("--current-track-flower");
    albumNow?.classList.remove("has-flower");
  }
  albumNow?.classList.toggle("is-long-title", isLongTitle);
  miniPlayer?.classList.toggle("is-long-title", isLongTitle);
  if (albumNowTitle) albumNowTitle.textContent = track.title;
  if (albumNowMeta) albumNowMeta.textContent = `${track.composer}｜${track.duration}`;
  if (albumDuration) albumDuration.textContent = track.duration;
  if (miniTrackTitle) miniTrackTitle.textContent = track.title;
  if (miniFullTitle) miniFullTitle.textContent = fullTitle;
  miniPlayerTitle?.classList.toggle("is-long", isLongTitle);
  document.querySelectorAll(".track[data-track]").forEach((button) => {
    const active = Number(button.dataset.track) === backgroundTrackIndex;
    button.classList.toggle("active", active);
    button.classList.toggle("is-playing", active && !backgroundAudio.paused && backgroundWanted);
  });
  syncSoundButton();
}

function updateProgressUI() {
  const duration = backgroundAudio.duration || 0;
  const current = backgroundAudio.currentTime || 0;
  const progress = duration ? String(Math.round((current / duration) * 1000)) : "0";
  const progressRatio = duration ? `${Math.min(100, Math.max(0, (current / duration) * 100)).toFixed(2)}%` : "0%";
  if (albumProgress) {
    albumProgress.value = progress;
    albumProgress.style.setProperty("--progress-ratio", progressRatio);
  }
  if (miniProgress) {
    miniProgress.value = progress;
    miniProgress.style.setProperty("--progress-ratio", progressRatio);
  }
  if (albumCurrentTime) albumCurrentTime.textContent = formatTime(current);
  if (albumDuration) albumDuration.textContent = duration ? formatTime(duration) : backgroundTracks[backgroundTrackIndex]?.duration || "0:00";
  if (miniCurrentTime) miniCurrentTime.textContent = formatTime(current);
  if (miniDuration) miniDuration.textContent = duration ? formatTime(duration) : backgroundTracks[backgroundTrackIndex]?.duration || "0:00";
}

async function playBackground({ direction = 0, restart = false } = {}) {
  if (!backgroundTracks.length || !backgroundWanted) {
    syncSoundButton();
    return;
  }
  if (direction !== 0) {
    backgroundTrackIndex = (backgroundTrackIndex + direction + backgroundTracks.length) % backgroundTracks.length;
    restart = true;
  }
  const track = backgroundTracks[backgroundTrackIndex];
  if (restart || !backgroundAudio.src) {
    backgroundAudio.src = track.src;
    backgroundAudio.currentTime = 0;
    setAudioVolume(backgroundAudio, 1);
    eqBarLevels = [];
    lastAnalysisSyncAt = 0;
    lastAnalysisMediaTime = 0;
    analysisStalledSince = 0;
    analysisInvalidSince = 0;
  }
  updateAlbumUI();
  if (userActivatedAudio) {
    ensureBackgroundAnalyser();
    syncBackgroundAnalysis({ restart, anticipatePlay: true });
  }
  backgroundAudio.play().then(() => {
    syncBackgroundAnalysis({ restart });
    backgroundWanted = true;
    updateAlbumUI();
  }).catch(updateAlbumUI);
}

function syncBloomVisualToTrack(index) {
  const bloomKey = bloomKeyByTrackIndex[index];
  if (bloomInView && bloomKey) {
    setBloomChoice(bloomKey, { playSfx: false, startTrack: false });
  }
}

async function skipBackgroundTrack(direction) {
  if (!backgroundTracks.length) return;
  backgroundWanted = true;
  if (backgroundAudio.src && !backgroundAudio.paused) {
    await fadePause(backgroundAudio);
  }
  playBackground({ direction, restart: true });
  syncBloomVisualToTrack(backgroundTrackIndex);
}

async function selectBackgroundTrack(index) {
  if (!backgroundTracks[index]) return;
  backgroundWanted = true;
  if (backgroundAudio.src && !backgroundAudio.paused) {
    await fadePause(backgroundAudio);
  }
  backgroundTrackIndex = index;
  playBackground({ restart: true });
  syncBloomVisualToTrack(backgroundTrackIndex);
}

function resumeBackgroundSoon(delay = 5000) {
  window.clearTimeout(backgroundResumeTimer);
  if (!backgroundWanted || flowerMusicActive) return;
  backgroundResumeTimer = window.setTimeout(() => {
    fadeResume(backgroundAudio).then(syncSoundButton);
  }, delay);
}

function pauseBackgroundForBloom() {
  window.clearTimeout(backgroundResumeTimer);
  backgroundAnalysisAudio.pause();
  if (!backgroundAudio.paused) fadePause(backgroundAudio).then(syncSoundButton);
}

function openMiniPlayer() {
  window.clearTimeout(miniPlayerCloseTimer);
  dismissMusicHint();
  miniPlayer?.classList.remove("is-click-collapsed");
  miniPlayer?.classList.add("is-open");
  soundToggle?.setAttribute("aria-expanded", "true");
}

function closeMiniPlayer() {
  window.clearTimeout(miniPlayerCloseTimer);
  miniPlayer?.classList.remove("is-open");
  soundToggle?.setAttribute("aria-expanded", "false");
}

function scheduleMiniPlayerClose() {
  if (!usesHover) return;
  window.clearTimeout(miniPlayerCloseTimer);
  miniPlayer?.classList.remove("is-click-collapsed");
  closeMiniPlayer();
}

function isPlaybackControlTarget(target) {
  return Boolean(target?.closest?.(".album-controls, .mini-player-controls, .track[data-track], .sound-toggle, .mini-progress-wrap, .album-progress-wrap"));
}

function dismissMusicHint() {
  if (musicHintDismissed) return;
  musicHintDismissed = true;
  musicTouchHint?.classList.add("dismissed");
}

function toggleBackgroundPlayback() {
  dismissMusicHint();
  primeBackgroundAnalysisFromGesture({ anticipatePlay: backgroundAudio.paused });
  backgroundWanted = true;
  if (backgroundAudio.paused) {
    if (backgroundAudio.src) {
      updateAlbumUI();
      fadeResume(backgroundAudio).then(() => {
        syncBackgroundAnalysis();
        updateAlbumUI();
      });
    } else {
      playBackground({ restart: true });
    }
  } else {
    fadePause(backgroundAudio).then(updateAlbumUI);
  }
}

backgroundAudio.addEventListener("ended", () => {
  if (!backgroundWanted) return;
  const nextIndex = (backgroundTrackIndex + 1) % backgroundTracks.length;
  const nextBloomKey = bloomKeyByTrackIndex[nextIndex];
  playBackground({ direction: 1, restart: true });
  if (bloomInView && nextBloomKey) {
    setBloomChoice(nextBloomKey, { playSfx: false, startTrack: false });
  }
});

backgroundAudio.addEventListener("timeupdate", updateProgressUI);
backgroundAudio.addEventListener("loadedmetadata", updateProgressUI);
backgroundAudio.addEventListener("play", () => {
  if (userActivatedAudio) syncBackgroundAnalysis({ anticipatePlay: true });
  updateAlbumUI();
});
backgroundAudio.addEventListener("pause", () => {
  backgroundAnalysisAudio.pause();
  updateAlbumUI();
});
backgroundAudio.addEventListener("seeking", () => syncBackgroundAnalysis({ restart: true }));

soundPrevButton?.addEventListener("click", () => {
  userActivatedAudio = true;
  backgroundWanted = true;
  primeBackgroundAnalysisFromGesture({ restart: true, anticipatePlay: true });
  skipBackgroundTrack(-1);
});

soundNextButton?.addEventListener("click", () => {
  userActivatedAudio = true;
  backgroundWanted = true;
  primeBackgroundAnalysisFromGesture({ restart: true, anticipatePlay: true });
  skipBackgroundTrack(1);
});

albumPrevButton?.addEventListener("click", () => {
  userActivatedAudio = true;
  backgroundWanted = true;
  primeBackgroundAnalysisFromGesture({ restart: true, anticipatePlay: true });
  skipBackgroundTrack(-1);
});

albumNextButton?.addEventListener("click", () => {
  userActivatedAudio = true;
  backgroundWanted = true;
  primeBackgroundAnalysisFromGesture({ restart: true, anticipatePlay: true });
  skipBackgroundTrack(1);
});

albumPlayButton?.addEventListener("click", toggleBackgroundPlayback);
miniPlayButton?.addEventListener("click", toggleBackgroundPlayback);

albumProgress?.addEventListener("input", () => {
  const duration = backgroundAudio.duration || 0;
  if (!duration) return;
  backgroundAudio.currentTime = (Number(albumProgress.value) / 1000) * duration;
  syncBackgroundAnalysis({ restart: true });
  updateProgressUI();
});

miniProgress?.addEventListener("input", () => {
  const duration = backgroundAudio.duration || 0;
  if (!duration) return;
  backgroundAudio.currentTime = (Number(miniProgress.value) / 1000) * duration;
  syncBackgroundAnalysis({ restart: true });
  updateProgressUI();
});

miniToAlbumButton?.addEventListener("click", () => {
  smoothScrollToElement("#music");
  if (!usesHover) closeMiniPlayer();
});

if (miniPlayer) {
  miniPlayer.addEventListener("pointerenter", () => {
    if (usesHover && !miniPlayer.classList.contains("is-click-collapsed")) openMiniPlayer();
  });
  soundToggle?.addEventListener("pointerenter", () => {
    if (usesHover && !miniPlayer.classList.contains("is-click-collapsed")) openMiniPlayer();
  });
  miniPlayer.addEventListener("pointerleave", scheduleMiniPlayerClose);
}

soundToggle?.addEventListener("click", () => {
  if (usesHover) {
    if (miniPlayer?.classList.contains("is-open")) {
      miniPlayer.classList.add("is-click-collapsed");
      closeMiniPlayer();
    } else {
      miniPlayer?.classList.remove("is-click-collapsed");
      openMiniPlayer();
    }
    return;
  }
  if (miniPlayer?.classList.contains("is-open")) closeMiniPlayer();
  else openMiniPlayer();
});

miniPlayerTitle?.addEventListener("click", () => {
  smoothScrollToElement("#music");
  if (!usesHover) closeMiniPlayer();
});
musicTouchHint?.addEventListener("animationend", dismissMusicHint);

function openSpotifySoonModal() {
  spotifySoonModal?.classList.add("is-open");
  spotifySoonModal?.setAttribute("aria-hidden", "false");
}

function closeSpotifySoonModal() {
  spotifySoonModal?.classList.remove("is-open");
  spotifySoonModal?.setAttribute("aria-hidden", "true");
}

spotifySoonTrigger?.addEventListener("click", openSpotifySoonModal);
document.querySelectorAll("[data-close-spotify-modal]").forEach((button) => {
  button.addEventListener("click", closeSpotifySoonModal);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && spotifySoonModal?.classList.contains("is-open")) {
    closeSpotifySoonModal();
  }
});

const timelineEntries = [...document.querySelectorAll(".timeline > article:not(.version-item)")];
const timeline = document.querySelector(".timeline");
const TIMELINE_ITEMS_PER_PAGE = 3;
let timelinePage = 0;
let timelineSort = "desc";
let timelineActiveSectionReady = false;
let timelineEmptyNote;

function requestTimelineActiveSectionSync() {
  if (timelineActiveSectionReady) scheduleActiveSectionUpdate();
}

function getTimelineClosedHeight() {
  if (!timeline) return 108;
  return Number.parseFloat(getComputedStyle(timeline).getPropertyValue("--diary-record-height")) || 108;
}

function closeTimelineEntry(item) {
  if (!item) return;
  const closedHeight = getTimelineClosedHeight();
  if (item.classList.contains("is-open")) {
    item.style.height = `${item.getBoundingClientRect().height}px`;
    item.offsetHeight;
    item.classList.remove("is-open");
    item.querySelector(".timeline-entry-toggle")?.setAttribute("aria-expanded", "false");
    requestAnimationFrame(() => {
      item.style.height = `${closedHeight}px`;
    });
    return;
  }
  item.style.height = `${closedHeight}px`;
  item.querySelector(".timeline-entry-toggle")?.setAttribute("aria-expanded", "false");
}

function openTimelineEntry(item) {
  if (!item) return;
  const closedHeight = getTimelineClosedHeight();
  item.style.height = `${closedHeight}px`;
  item.classList.add("is-open");
  item.querySelector(".timeline-entry-toggle")?.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => {
    item.style.height = `${item.scrollHeight}px`;
  });
}

function refreshOpenTimelineEntryHeight() {
  document.querySelectorAll(".timeline-entry.is-open").forEach((item) => {
    item.style.height = `${item.scrollHeight}px`;
  });
}

function prepareTimelineEntries() {
  timelineEntries.forEach((item, index) => {
    if (item.querySelector(".timeline-entry-toggle")) return;
    const title = item.querySelector("time");
    const body = item.querySelector("p");
    if (!title || !body) return;

    item.classList.add("timeline-entry");

    const heading = document.createElement("div");
    heading.className = "timeline-entry-heading";

    const entryTitle = document.createElement("span");
    entryTitle.className = "timeline-entry-title";
    entryTitle.textContent = title.textContent.trim();

    const toggle = document.createElement("button");
    toggle.className = "timeline-entry-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", `展開 ${title.textContent.trim()} 完整內容`);

    const arrow = document.createElement("i");
    arrow.className = "timeline-entry-arrow";
    arrow.setAttribute("aria-hidden", "true");

    const bodyWrap = document.createElement("div");
    bodyWrap.className = "timeline-entry-body";

    const summary = document.createElement("p");
    summary.className = "timeline-entry-summary";
    summary.textContent = item.dataset.summary || body.textContent.trim().replace(/\s+/g, " ");

    const content = document.createElement("div");
    content.className = "timeline-entry-content";
    content.id = `timeline-entry-content-${index + 1}`;
    toggle.setAttribute("aria-controls", content.id);

    const contentInner = document.createElement("div");
    contentInner.className = "timeline-entry-content-inner";

    title.remove();
    heading.appendChild(entryTitle);
    toggle.appendChild(arrow);
    contentInner.appendChild(body);
    content.appendChild(contentInner);
    bodyWrap.append(summary, content);
    item.append(heading, toggle, bodyWrap);

    toggle.addEventListener("click", () => {
      const open = !item.classList.contains("is-open");
      if (open) {
        timelineEntries.forEach((entry) => {
          if (entry === item) return;
          closeTimelineEntry(entry);
        });
      }
      if (open) {
        openTimelineEntry(item);
      } else {
        closeTimelineEntry(item);
      }
      requestTimelineActiveSectionSync();
    });
  });
}

prepareTimelineEntries();

const timelinePager = document.createElement("div");
timelinePager.className = "timeline-pager";
timelinePager.innerHTML = `
  <button class="timeline-page-button timeline-page-prev" type="button" aria-label="上一頁"><span aria-hidden="true"></span></button>
  <span class="timeline-page-current" aria-live="polite">1 / 1</span>
  <button class="timeline-page-button timeline-page-next" type="button" aria-label="下一頁"><span aria-hidden="true"></span></button>
`;

const timelineMeta = document.createElement("div");
timelineMeta.className = "timeline-meta";
timelineMeta.innerHTML = `
  <span class="timeline-range" aria-live="polite">正在顯示 0 則中的第 0 ~ 0 則</span>
  <button class="timeline-sort-toggle" type="button" aria-label="切換活動紀錄排序">新→舊</button>
`;

timelineEmptyNote = document.createElement("div");
timelineEmptyNote.className = "timeline-empty-note";
timelineEmptyNote.hidden = true;

const timelinePrevButton = timelinePager.querySelector(".timeline-page-prev");
const timelineNextButton = timelinePager.querySelector(".timeline-page-next");
const timelinePageCurrent = timelinePager.querySelector(".timeline-page-current");
const timelineRange = timelineMeta.querySelector(".timeline-range");
const timelineSortToggle = timelineMeta.querySelector(".timeline-sort-toggle");

if (timeline && timelineEntries.length) {
  timeline.insertBefore(timelineMeta, timeline.firstElementChild);
  timeline.insertBefore(timelineEmptyNote, versionArchive || null);
  timeline.insertBefore(timelinePager, versionArchive || null);
}

function getOrderedTimelineEntries() {
  return timelineSort === "desc" ? [...timelineEntries] : [...timelineEntries].reverse();
}

function setTimelinePage(nextPage, direction = "next") {
  if (!timelineEntries.length) return;
  const pageCount = Math.max(1, Math.ceil(timelineEntries.length / TIMELINE_ITEMS_PER_PAGE));
  timelinePage = Math.min(Math.max(nextPage, 0), pageCount - 1);
  const start = timelinePage * TIMELINE_ITEMS_PER_PAGE;
  const end = Math.min(start + TIMELINE_ITEMS_PER_PAGE, timelineEntries.length);
  const orderedEntries = getOrderedTimelineEntries();
  const visibleEntries = orderedEntries.slice(start, end);
  const visible = new Set(visibleEntries);
  const insertBeforeNode = timelineEmptyNote || timelinePager || versionArchive || null;

  orderedEntries.forEach((item) => timeline?.insertBefore(item, insertBeforeNode));

  timeline?.classList.remove("is-sliding-next", "is-sliding-prev");
  if (direction) {
    timeline?.classList.add(direction === "prev" ? "is-sliding-prev" : "is-sliding-next");
    window.setTimeout(() => timeline?.classList.remove("is-sliding-next", "is-sliding-prev"), 860);
  }

  timelineEntries.forEach((item) => {
    const show = visible.has(item);
    item.classList.toggle("is-page-visible", show);
    item.hidden = !show;
    if (!show) {
      closeTimelineEntry(item);
    }
  });

  if (timelinePageCurrent) timelinePageCurrent.textContent = `${timelinePage + 1} / ${pageCount}`;
  if (timelineRange) {
    const rangeLabel = end - start === 1 ? `第 ${start + 1} 則` : `第 ${start + 1} ~ ${end} 則`;
    timelineRange.textContent = `正在顯示 ${timelineEntries.length} 則中的${rangeLabel}`;
  }
  if (timelineEmptyNote) {
    const missing = Math.max(0, TIMELINE_ITEMS_PER_PAGE - visibleEntries.length);
    timelineEmptyNote.hidden = missing === 0;
    timelineEmptyNote.textContent =
      timelineSort === "desc"
        ? "你已看完全部紀錄，願你在花朵中能療癒身心。"
        : "沒有最新消息，敬請期待我們未來的消息。";
    timelineEmptyNote.style.setProperty("--empty-records", String(missing || 1));
    timelineEmptyNote.style.setProperty("--empty-note-height", `${missing * 108 + Math.max(0, missing - 1) * 12}px`);
  }
  timelinePrevButton?.toggleAttribute("disabled", timelinePage === 0);
  timelineNextButton?.toggleAttribute("disabled", timelinePage >= pageCount - 1);
  requestTimelineActiveSectionSync();
}

timelinePrevButton?.addEventListener("click", () => setTimelinePage(timelinePage - 1, "prev"));
timelineNextButton?.addEventListener("click", () => setTimelinePage(timelinePage + 1, "next"));
timelineSortToggle?.addEventListener("click", () => {
  const anchoredEntry = getOrderedTimelineEntries()[timelinePage * TIMELINE_ITEMS_PER_PAGE] || timelineEntries[0];
  timelineSort = timelineSort === "desc" ? "asc" : "desc";
  if (timelineSortToggle) timelineSortToggle.textContent = timelineSort === "desc" ? "新→舊" : "舊→新";
  const anchoredIndex = Math.max(0, getOrderedTimelineEntries().indexOf(anchoredEntry));
  const anchoredPage = Math.floor(anchoredIndex / TIMELINE_ITEMS_PER_PAGE);
  const direction = anchoredPage < timelinePage ? "prev" : "next";
  setTimelinePage(anchoredPage, direction);
});

setTimelinePage(0, "");
window.addEventListener("resize", refreshOpenTimelineEntryHeight);

const versionItems = [...document.querySelectorAll(".version-item")];

function prepareVersionItems() {
  versionItems.forEach((item, index) => {
    if (item.querySelector(".version-item-toggle")) return;
    const heading = item.querySelector(".version-item-heading");
    const body = item.querySelector("p");
    if (!heading || !body) return;

    const toggle = document.createElement("button");
    toggle.className = "version-item-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", `展開 ${heading.textContent.trim()} 更新內容`);

    const arrow = document.createElement("i");
    arrow.className = "version-item-arrow";
    arrow.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    content.className = "version-item-content";
    content.id = `version-item-content-${index + 1}`;
    toggle.setAttribute("aria-controls", content.id);

    const contentInner = document.createElement("div");
    contentInner.className = "version-item-content-inner";

    toggle.append(heading, arrow);
    contentInner.appendChild(body);
    content.appendChild(contentInner);
    item.append(toggle, content);

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setVersionItemOpen(item, !item.classList.contains("is-open"));
      if (versionArchive?.classList.contains("is-all-open")) {
        versionArchive.classList.remove("is-all-open");
        versionToggle?.setAttribute("aria-expanded", "true");
        versionListToggle?.setAttribute("aria-expanded", "true");
        versionAllToggle?.setAttribute("aria-expanded", "false");
      }
      scheduleActiveSectionUpdate();
    });
  });
}

function setVersionItemOpen(item, open) {
  item.classList.toggle("is-open", open);
  item.querySelector(".version-item-toggle")?.setAttribute("aria-expanded", String(open));
}

function setAllVersionItems(open) {
  versionItems.forEach((item) => setVersionItemOpen(item, open));
}

function scrollDiaryIntoView() {
  const diary = document.getElementById("diary");
  if (!diary) return;
  const top = Math.max(0, window.scrollY + diary.getBoundingClientRect().top - 12);
  smoothScrollToTop(top);
  scheduleActiveSectionUpdate();
}

function setVersionArchiveMode(mode, options = {}) {
  const open = mode !== "closed";
  const allOpen = mode === "all";
  if (!open && options.scroll !== false) {
    scrollDiaryIntoView();
  }
  versionArchive?.classList.toggle("is-open", open);
  versionArchive?.classList.toggle("is-all-open", allOpen);
  versionToggle?.setAttribute("aria-expanded", String(open && !allOpen));
  versionListToggle?.setAttribute("aria-expanded", String(open && !allOpen));
  versionAllToggle?.setAttribute("aria-expanded", String(allOpen));
  if (versionToggleTitle) versionToggleTitle.textContent = open ? "網站版本紀錄" : "網站版本";
  if (versionToggleSubtitle) versionToggleSubtitle.textContent = open ? "在此處查看網站更新紀錄" : CURRENT_SITE_VERSION;

  if (mode === "all") {
    setAllVersionItems(true);
  } else if (mode === "list" || mode === "closed") {
    setAllVersionItems(false);
  }

  if (open) updateActiveSection();
}

prepareVersionItems();
if (versionToggleSubtitle) versionToggleSubtitle.textContent = CURRENT_SITE_VERSION;

versionToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = versionArchive?.classList.contains("is-open");
  const isAllOpen = versionArchive?.classList.contains("is-all-open");
  setVersionArchiveMode(isOpen && !isAllOpen ? "closed" : "list");
});

versionListToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = versionArchive?.classList.contains("is-open");
  const isAllOpen = versionArchive?.classList.contains("is-all-open");
  setVersionArchiveMode(isOpen && !isAllOpen ? "closed" : "list");
});

versionAllToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  setVersionArchiveMode(versionArchive?.classList.contains("is-all-open") ? "closed" : "all");
});

versionArchive?.addEventListener("click", (event) => {
  if (!versionArchive.classList.contains("is-open")) return;
  if (event.target === versionArchive || event.target === versionPanel || event.target === versionPanelInner) {
    setVersionArchiveMode("closed");
  }
});

function playTone(frequency = 392, color = activeColor) {
  const context = ensureAudio();
  if (!context) return;
  if (context.state === "suspended") context.resume();

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(Number(frequency), context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(Number(frequency) * 1.5, context.currentTime + 0.34);
  filter.type = "lowpass";
  filter.frequency.value = 1500;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.8);
  oscillator.connect(filter).connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.86);
}

function showToast(message) {
  bloomToast.textContent = message;
  bloomToast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => bloomToast.classList.remove("show"), 1800);
}

function plantFlower(color = activeColor, word = activeWord, x, y) {
  const rect = livingGarden.getBoundingClientRect();
  const flower = document.createElement("span");
  flower.className = "grown-flower";
  flower.style.setProperty("--flower-color", color);
  flower.style.setProperty("--x", `${x ?? 18 + Math.random() * 64}%`);
  flower.style.setProperty("--y", `${y ?? 8 + Math.random() * 44}%`);
  flower.style.setProperty("--size", `${34 + Math.random() * 56}px`);
  flower.style.rotate = `${-10 + Math.random() * 20}deg`;
  livingGarden.appendChild(flower);
  gardenWord.textContent = word;

  const flowers = livingGarden.querySelectorAll(".grown-flower");
  if (flowers.length > 42) flowers[0].remove();
  const localX = x ? `${x}%` : `${((pointer.x - rect.left) / rect.width) * 100}%`;
  showToast(`${word} 正在開花`);
  return localX;
}

document.querySelectorAll(".gate-flower").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("blooming");
    window.setTimeout(() => button.classList.remove("blooming"), 620);
    const color = button.style.getPropertyValue("--tone");
    playTone(button.dataset.tone, color);
    showToast(`${button.dataset.name} entrance opened`);
    smoothScrollToElement("#garden");
    window.setTimeout(() => plantFlower(color, button.dataset.name), 680);
  });
});

document.querySelectorAll(".seed").forEach((button) => {
  button.style.setProperty("--seed-color", button.dataset.color);
  button.addEventListener("click", () => {
    document.querySelectorAll(".seed").forEach((seed) => seed.classList.remove("active"));
    button.classList.add("active");
    activeColor = button.dataset.color;
    activeWord = button.dataset.word;
    playTone(330 + Math.random() * 220, activeColor);
    plantFlower(activeColor, activeWord);
  });
});

livingGarden.addEventListener("pointerdown", (event) => {
  const rect = livingGarden.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = 100 - ((event.clientY - rect.top) / rect.height) * 100;
  playTone(260 + Math.random() * 360, activeColor);
  plantFlower(activeColor, activeWord, Math.max(5, Math.min(95, x)), Math.max(5, Math.min(72, y)));
});

document.querySelectorAll(".track[data-track]").forEach((track) => {
  track.addEventListener("click", () => {
    const nextIndex = Number(track.dataset.track);
    dismissMusicHint();
    userActivatedAudio = true;
    backgroundWanted = true;
    primeBackgroundAnalysisFromGesture({ restart: true, anticipatePlay: true });
    selectBackgroundTrack(nextIndex);
    playTone(330 + nextIndex * 22, backgroundTracks[nextIndex]?.color || activeColor);
  });
});

document.querySelectorAll(".flower-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    playTone(360 + Math.random() * 180, getComputedStyle(card).getPropertyValue("--card-color"));
    updateFlipAllButton();
  });
});

const flipAllButton = document.getElementById("flip-all-cards");

function updateFlipAllButton() {
  if (!flipAllButton) return;
  const cards = [...document.querySelectorAll(".flower-card")];
  const allFlipped = cards.length > 0 && cards.every((card) => card.classList.contains("flipped"));
  flipAllButton.textContent = allFlipped ? "關閉全部" : "翻開全部";
  flipAllButton.setAttribute("aria-pressed", String(allFlipped));
}

function openFlowerCardFromBloom(key) {
  const targetCard = document.querySelector(`.flower-card[data-flower-card="${key}"]`);
  if (!targetCard) return;
  smoothScrollToElement("#flowers", { block: "start" });
  document.querySelectorAll(".flower-card").forEach((card) => {
    card.classList.remove("flipped");
  });
  updateFlipAllButton();
  window.setTimeout(() => {
    targetCard.classList.add("flipped");
    updateFlipAllButton();
  }, 720);
  playTone(392, getComputedStyle(targetCard).getPropertyValue("--card-color"));
}

bloomCard?.addEventListener("click", () => {
  openFlowerCardFromBloom(bloomCard.dataset.bloomCard);
});

bloomCard?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  openFlowerCardFromBloom(bloomCard.dataset.bloomCard);
});

if (flipAllButton) {
  flipAllButton.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".flower-card")];
    const shouldOpen = !cards.every((card) => card.classList.contains("flipped"));
    cards.forEach((card, index) => {
      window.setTimeout(() => {
        card.classList.toggle("flipped", shouldOpen);
        if (index === cards.length - 1) updateFlipAllButton();
      }, index * 45);
    });
    playTone(shouldOpen ? 523.25 : 261.63, shouldOpen ? "#ffd166" : "#7f877d");
    showToast(shouldOpen ? "全部花卡已翻開" : "全部花卡已關閉");
  });
  updateFlipAllButton();
}

function setBloomChoice(key = "green", { playSfx = true, startTrack = true } = {}) {
  if (!bloomLab || !bloomMessage || !bloomPlant || !bloomCard) return;
  const choice = bloomChoices[key] || bloomChoices.green;
  const bloomPetals = bloomPlant.querySelectorAll(".bloom-flower span");
  const bloomImage = bloomCard.querySelector("img");
  const trackIndex = bloomTrackByKey[key];

  lastBloomKey = key;
  flowerMusicActive = false;
  window.clearTimeout(bloomPauseResumeTimer);
  window.clearTimeout(bloomLeaveTimer);
  bloomLab.classList.add("entered");
  bloomLab.classList.add("has-bloom");
  bloomLab.style.setProperty("--bloom-color", choice.color);
  bloomMessage.textContent = choice.message;
  bloomMessage.style.animation = "none";
  bloomPlant.classList.remove("is-blooming");
  bloomCard.classList.remove("show");
  bloomCard.setAttribute("aria-hidden", "true");
  bloomCard.setAttribute("tabindex", "-1");

  document.querySelectorAll(".bloom-seed").forEach((seed) => {
    seed.classList.toggle("active", seed.dataset.bloom === key);
  });

  bloomPetals.forEach((petal) => {
    petal.style.setProperty("--petal-color", choice.color);
  });

  if (bloomImage) {
    bloomImage.src = choice.card;
    bloomImage.alt = choice.alt;
  }
  bloomCard.dataset.bloomCard = key;

  flowerAudio.pause();
  clearAudioFade(flowerAudio);
  flowerAudio.currentTime = 0;
  bloomSfxAudio.pause();
  clearAudioFade(bloomSfxAudio);
  bloomSfxAudio.currentTime = 0;
  bloomSfxAudio.onended = null;
  setAudioVolume(bloomSfxAudio, 1);

  const startSelectedTrack = () => {
    if (!startTrack || lastBloomKey !== key || trackIndex === undefined) return;
    backgroundWanted = true;
    backgroundTrackIndex = trackIndex;
    playBackground({ restart: true });
  };

  if (startTrack && trackIndex !== undefined) {
    userActivatedAudio = true;
    backgroundWanted = true;
    backgroundTrackIndex = trackIndex;
    updateAlbumUI();
    if (userActivatedAudio) {
      ensureBackgroundAnalyser();
      syncBackgroundAnalysis({ restart: true, anticipatePlay: true });
    }
    if (!backgroundAudio.paused) fadePause(backgroundAudio).then(syncSoundButton);
  }

  if (playSfx && choice.bloom) {
    bloomSfxAudio.src = choice.bloom;
    bloomSfxAudio.onended = startSelectedTrack;
    bloomSfxAudio.play().catch(startSelectedTrack);
  } else {
    startSelectedTrack();
  }

  if (playSfx) playTone(choice.tone, choice.color);

  window.setTimeout(() => {
    bloomMessage.style.animation = "";
    bloomPlant.classList.add("is-blooming");
  }, 30);

  window.setTimeout(() => {
    bloomCard.classList.add("show");
    bloomCard.setAttribute("aria-hidden", "false");
    bloomCard.setAttribute("tabindex", "0");
  }, 1500);
}

if (bloomLab) {
  bloomLab.style.setProperty("--bloom-color", bloomChoices.green.color);
  startBloomButton?.addEventListener("click", () => {
    bloomLab.classList.add("entered");
    document.querySelectorAll(".bloom-seed").forEach((seed) => seed.classList.remove("active"));
    showToast("秘密花園已開啟");
  });

  document.querySelectorAll(".bloom-seed").forEach((seed) => {
    seed.addEventListener("click", () => {
      setBloomChoice(seed.dataset.bloom);
    });
  });
}

bloomAudioToggle?.addEventListener("click", () => {
  toggleBackgroundPlayback();
});

const bloomVisibilityObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    bloomInView = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.18);
  },
  { threshold: 0.18 }
);

if (bloomLab) bloomVisibilityObserver.observe(document.getElementById("bloom"));

if (themeToggle) {
  applyTheme(getSavedTheme() || "light", false);
	  themeToggle.addEventListener("click", () => {
	    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
	    boostThemeFlower();
	    transitionTheme(nextTheme);
    playTone(nextTheme === "dark" ? 261.63 : 523.25, nextTheme === "dark" ? "#102019" : "#c88619");
    showToast(nextTheme === "dark" ? "已切換為深色主題" : "已切換為淺色主題");
  });
}

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    if (visualPerformanceLite) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * 0.08}px, ${y * 0.14}px)`;
  });
  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
  });
});

if (customCursorEnabled || nativeCursorEnabled) {
  window.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY, active: true };
    setCursorClass("cursor-interactive", Boolean(event.target?.closest?.(interactiveCursorSelector)));
    if (!customCursorEnabled || !cursor) return;
    addCursorClass("custom-cursor-active");
    cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
  });

  document.addEventListener("pointerover", (event) => {
    setCursorClass("cursor-interactive", Boolean(event.target?.closest?.(interactiveCursorSelector)));
  });

  document.addEventListener("pointerout", (event) => {
    if (event.relatedTarget?.closest?.(interactiveCursorSelector)) return;
    removeCursorClasses("cursor-interactive");
  });

  window.addEventListener("pointerleave", () => {
    pointer.active = false;
    removeCursorClasses("custom-cursor-active", "cursor-interactive", "cursor-pressing");
  });

  window.addEventListener("pointerdown", () => {
    addCursorClass("cursor-pressing");
  });

  window.addEventListener("pointerup", () => {
    removeCursorClasses("cursor-pressing");
  });

  window.addEventListener("pointercancel", () => {
    removeCursorClasses("cursor-pressing");
  });
}

syncSoundButton();

function scheduleInitialBackgroundPlayback() {
  const start = () => {
    if (backgroundAudio.src || userActivatedAudio) return;
    playBackground({ restart: true });
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 1800 });
    return;
  }
  window.setTimeout(start, 900);
}

scheduleInitialBackgroundPlayback();

window.addEventListener(
  "pointerdown",
  (event) => {
    primeBackgroundAnalysisFromGesture({ anticipatePlay: backgroundAudio.paused });
    if (backgroundWanted && backgroundAudio.paused && !isPlaybackControlTarget(event.target)) {
      playBackground();
    }
  },
  { once: true }
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const pageSections = [...document.querySelectorAll("main section[id]")];
let activeSectionFrame;

function updateActiveSection() {
  if (!pageSections.length) return;
  const sampleY = Math.min(window.innerHeight * 0.38, 360);
  const currentSection =
    pageSections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= sampleY && rect.bottom > sampleY;
    }) ||
    pageSections
      .map((section) => ({
        section,
        distance: Math.abs(section.getBoundingClientRect().top - sampleY),
      }))
      .sort((a, b) => a.distance - b.distance)[0]?.section ||
    pageSections[0];
  setBrandLabel(currentSection.id === "home" ? "Welcome" : "Secret Garden");
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection.id}`);
  });
}

function scheduleActiveSectionUpdate() {
  window.cancelAnimationFrame(activeSectionFrame);
  activeSectionFrame = window.requestAnimationFrame(updateActiveSection);
}

const sectionObserver = new IntersectionObserver(scheduleActiveSectionUpdate, { threshold: [0, 0.25, 0.5, 0.75] });

pageSections.forEach((section) => sectionObserver.observe(section));
window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveSectionUpdate);
updateActiveSection();
timelineActiveSectionReady = true;
requestTimelineActiveSectionSync();

const homeSection = document.getElementById("home");
if (homeSection && brandLabel) {
  let brandFrame;
  const updateBrandLabel = () => {
    brandFrame = undefined;
    const rect = homeSection.getBoundingClientRect();
    const isHome = rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.55;
    setBrandLabel(isHome ? "Welcome" : "Secret Garden");
  };
  const requestBrandLabelUpdate = () => {
    if (brandFrame) return;
    brandFrame = requestAnimationFrame(updateBrandLabel);
  };
  window.addEventListener("scroll", requestBrandLabelUpdate, { passive: true });
  document.addEventListener("scroll", requestBrandLabelUpdate, { passive: true });
  window.addEventListener("resize", requestBrandLabelUpdate);
  updateBrandLabel();
}

const musicSection = document.getElementById("music");
if (musicSection) {
  const musicObserver = new IntersectionObserver(
    ([entry]) => {
      const inMusic = entry.isIntersecting && entry.intersectionRatio > 0.28;
      document.body.classList.toggle("music-in-view", inMusic);
    },
    { threshold: [0, 0.28, 0.58] }
  );
  musicObserver.observe(musicSection);
}

let dailyPhraseIndex = dailyPhrases.length ? Math.floor(Math.random() * dailyPhrases.length) : 0;

function normalizeDailyPhrase(phrase) {
  return String(phrase)
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

function setDailyPhrase(index, animated = false) {
  if (!dailyPhrase || dailyPhrases.length === 0) return;
  dailyPhraseIndex = ((index % dailyPhrases.length) + dailyPhrases.length) % dailyPhrases.length;
  const phrase = normalizeDailyPhrase(dailyPhrases[dailyPhraseIndex]);
  const isSingleLine = phrase.split("\n").filter(Boolean).length <= 1;
  const applyPhrase = () => {
    dailyPhrase.textContent = phrase;
    dailyPhrase.classList.toggle("is-single-line", isSingleLine);
  };
  if (!animated) {
    applyPhrase();
    return;
  }
  dailyPhrase.classList.add("is-changing");
  window.setTimeout(() => {
    applyPhrase();
    dailyPhrase.classList.remove("is-changing");
  }, 150);
}

setDailyPhrase(dailyPhraseIndex);

dailyPhraseRandom?.addEventListener("click", () => {
  if (dailyPhrases.length < 2) {
    setDailyPhrase(dailyPhraseIndex, true);
    return;
  }
  let nextIndex = dailyPhraseIndex;
  while (nextIndex === dailyPhraseIndex) {
    nextIndex = Math.floor(Math.random() * dailyPhrases.length);
  }
  setDailyPhrase(nextIndex, true);
  playTone(659.25, "#ffafcc");
});

resizeCanvas();
drawPetals();
window.addEventListener("resize", resizeCanvas);

ensureTrackWaveBars();
updateTrackWaves();
animateThemeFlower();
updateAlbumUI();
updateProgressUI();

window.setTimeout(() => {
  for (const color of ["#e94545", "#ffd166", "#4ecdc4", "#9b5de5", "#ffafcc"]) {
    plantFlower(color, "Memory");
  }
}, 500);
