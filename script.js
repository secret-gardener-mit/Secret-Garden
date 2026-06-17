const canvas = document.getElementById("petal-canvas");
const ctx = canvas.getContext("2d");
const cursor = document.querySelector(".cursor-orb");
const soundToggle = document.querySelector(".sound-toggle");
const brandLabel = document.getElementById("brand-label");
const bloomToast = document.getElementById("bloom-toast");
const gardenSection = document.getElementById("garden");
const livingGarden = document.getElementById("living-garden");
const gardenWord = document.getElementById("garden-word");
const gardenExpandToggle = document.getElementById("garden-expand-toggle");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = document.getElementById("theme-toggle-label");
const themeFlowerVisual = themeToggle?.querySelector(".theme-flower-visual");
const bloomLab = document.querySelector(".bloom-lab");
const startBloomButton = document.getElementById("start-bloom");
const bloomMessage = document.getElementById("bloom-message");
const bloomPalette = document.getElementById("bloom-palette");
const bloomPaletteCenter = bloomPalette?.querySelector("i");
const bloomPlant = document.getElementById("bloom-plant");
const bloomCard = document.getElementById("bloom-card");
const bloomResetToggle = document.getElementById("bloom-reset-toggle");
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
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messageCount = document.getElementById("message-count");
const messageStatus = document.getElementById("message-status");
const messageList = document.getElementById("message-list");
const messageRefresh = document.getElementById("message-refresh");
const gardenModeButtons = Array.from(document.querySelectorAll(".garden-mode-option"));
const gardenStage = document.getElementById("garden-stage");
const gardenPlantMode = document.getElementById("garden-plant-mode");
const gardenMeadowPanel = document.getElementById("garden-meadow-panel");
const meadowStart = document.getElementById("meadow-start");
const meadowCancel = document.getElementById("meadow-cancel");
const meadowViewport = document.getElementById("meadow-viewport");
const meadowWorld = document.getElementById("meadow-world");
const meadowCompose = document.getElementById("meadow-compose");
const meadowPreviewFlower = document.getElementById("meadow-preview-flower");
const meadowHue = document.getElementById("meadow-hue");
const meadowLightness = document.getElementById("meadow-lightness");
const meadowGray = document.getElementById("meadow-gray");
const meadowColorRandom = document.getElementById("meadow-color-random");
const meadowHex = document.getElementById("meadow-hex");
const meadowMood = document.getElementById("meadow-mood");
const meadowContent = document.getElementById("meadow-content");
const meadowCount = document.getElementById("meadow-count");
const meadowStatus = document.getElementById("meadow-status");
const meadowPlaceConfirm = document.getElementById("meadow-place-confirm");
const meadowViewer = document.getElementById("meadow-viewer");
const meadowViewerFlower = document.getElementById("meadow-viewer-flower");
const meadowViewerMood = document.getElementById("meadow-viewer-mood");
const meadowViewerContent = document.getElementById("meadow-viewer-content");
const meadowViewerTime = document.getElementById("meadow-viewer-time");
const meadowBloomFocus = document.getElementById("meadow-bloom-focus");
const meadowZoom = document.getElementById("meadow-zoom");
const meadowZoomOutput = document.getElementById("meadow-zoom-output");
const meadowContentExpand = document.getElementById("meadow-content-expand");
const meadowCancelModal = document.getElementById("meadow-cancel-modal");
const CURRENT_SITE_VERSION = "v0.5b4";
const SUPABASE_URL = "https://suatoixeqmjmaojfuiwg.supabase.co";
const SUPABASE_KEY = "sb_publishable_aWOjHvsUelALoPTgKgAsbw_VyXJq-YE";
const SUPABASE_MESSAGES_TABLE = "garden_messages";
const SUPABASE_SONG_PLAYS_TABLE = "song_plays";
const SONG_PLAY_COUNT_DELAY = 10000;
const HOPE_TRACK_INDEX = 9;
const HOPE_TRACK_CARD_FLOWER = "assets/cards/flowers/hope-flower.png";
const HOPE_TRACK_PLAYER_FLOWER = "assets/cards/flowers/hope-flower-player.png";
const MESSAGE_LIMIT = 500;
const MEADOW_WORLD_WIDTH = 7200;
const MEADOW_WORLD_HEIGHT = 3600;
const MEADOW_MAX_SCALE = 1.08;
const MEADOW_VIEW_ZOOM = 120;
const MEADOW_DOT_ZOOM_LIMIT = 10;
const MEADOW_DOT_MIN_SIZE = 7.2;
const MEADOW_DOT_MAX_SIZE = 14.4;
const MEADOW_MIN_MARKER_SCALE = 0.24;
const MEADOW_MARKER_MAX_SCALE = 2.05;
const albumNowTitle = document.getElementById("album-now-title");
const albumNowMeta = document.getElementById("album-now-meta");
const albumPlayCount = document.getElementById("album-play-count");
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
  },
  hope: {
    color: "#ffafcc",
    tone: 587.33,
    message: "只要還有呼吸，一切都還有希望",
    card: "assets/cards/web/hope.jpg",
    alt: "希望之花花卡",
    bloom: "assets/audio/secret_bloom.mp3",
    music: "assets/audio/secret-flower-demo.mp3",
    petals: ["#e94545", "#ff7b59", "#ffd166", "#60d394", "#4d96ff", "#5048f4", "#9b5de5", "#acbe9a"]
  }
};

const albumTracks = [
  {
    id: 1,
    songId: "Welcome to the Secret Garden",
    title: "Welcome to the Secret Garden",
    subtitle: "歡迎光臨秘密花園",
    composer: "李岳鴒 ZEROYUEH",
    duration: "2:47",
    color: "#8fa780",
    src: "assets/audio/welcome-secret-garden.mp3"
  },
  {
    id: 2,
    songId: "Red",
    title: "Red",
    subtitle: "紅",
    composer: "林書磊 Aries Lin",
    duration: "3:19",
    color: "#e94545",
    src: "assets/audio/red.mp3",
    flower: "assets/cards/flowers/red-flower.png"
  },
  {
    id: 3,
    songId: "Orange",
    title: "Orange",
    subtitle: "橙",
    composer: "林書磊 Aries Lin",
    duration: "3:27",
    color: "#ff7b59",
    src: "assets/audio/orange.mp3",
    flower: "assets/cards/flowers/orange-flower.png"
  },
  {
    id: 4,
    songId: "Yellow",
    title: "Yellow",
    subtitle: "黃",
    composer: "林書磊 Aries Lin",
    duration: "2:24",
    color: "#ffd166",
    src: "assets/audio/yellow.mp3",
    flower: "assets/cards/flowers/yellow-flower.png"
  },
  {
    id: 5,
    songId: "Green",
    title: "Green",
    subtitle: "綠",
    composer: "林書磊 Aries Lin",
    duration: "2:57",
    color: "#60d394",
    src: "assets/audio/green.mp3",
    flower: "assets/cards/flowers/green-flower.png"
  },
  {
    id: 6,
    songId: "Blue",
    title: "Blue",
    subtitle: "藍",
    composer: "陳映里 Osmond Chen",
    duration: "4:07",
    color: "#4d96ff",
    src: "assets/audio/blue.mp3",
    flower: "assets/cards/flowers/blue-flower.png"
  },
  {
    id: 7,
    songId: "Indigo",
    title: "Indigo",
    subtitle: "靛",
    composer: "陳映里 Osmond Chen",
    duration: "5:00",
    color: "#5542a1",
    src: "assets/audio/indigo.mp3",
    flower: "assets/cards/flowers/indigo-flower.png"
  },
  {
    id: 8,
    songId: "Violet",
    title: "Violet",
    subtitle: "紫",
    composer: "陳映里 Osmond Chen",
    duration: "3:46",
    color: "#8b62c7",
    src: "assets/audio/violet.mp3",
    flower: "assets/cards/flowers/violet-flower.png"
  },
  {
    id: 9,
    songId: "Gray",
    title: "Gray",
    subtitle: "灰",
    composer: "陳映里 Osmond Chen",
    duration: "5:10",
    color: "#7f877d",
    src: "assets/audio/gray.mp3",
    flower: "assets/cards/flowers/gray-flower.png"
  },
  {
    id: 10,
    songId: "Hope Flower",
    title: "Hope Flower",
    subtitle: "希望之花",
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
  gray: 8,
  hope: 9
};
const bloomKeyByTrackIndex = Object.fromEntries(
  Object.entries(bloomTrackByKey).map(([key, index]) => [index, key])
);
const BLOOM_DEEP_LINK_SUFFIX = "_bloom";
const bloomDeepLinkAliases = {
  violet: "purple"
};
const bloomPublicHashKeys = {
  purple: "violet"
};

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
let resizeFrame = 0;
let activeColor = "#e94545";
let activeWord = "勇氣";
let themeTransitionTimer;
let themeTransitionApplyTimer;
let backgroundTrackIndex = Math.floor(Math.random() * backgroundTracks.length);
let backgroundWanted = true;
let backgroundResumeTimer;
let bloomPauseResumeTimer;
let bloomLeaveTimer;
let pendingBloomEntryKey = "";
let hopePaletteStep = 0;
let hopeBloomUnlocked = false;
let bloomCardRevealTimer;
let flowerMusicActive = false;
let lastBloomKey = "";
let bloomInView = false;
let miniPlayerCloseTimer;
let miniPlayerMobileCloseTimer;
let mobileSoundToggleHandledAt = 0;
let musicHintDismissed = false;
let brandLabelTimer;
let brandLabelTarget = "Welcome";
let brandLabelChanging = false;
const usesHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const mobileMediaQuery = window.matchMedia("(max-width: 760px)");
const MOBILE_BLOOM_ENTRY_SCROLL_OFFSET = -90;
const MOBILE_NAV_SCROLL_OFFSET = 20;
const browserUA = navigator.userAgent || "";
const isChromeBrowser = /Chrome\//.test(browserUA) && !/Edg\/|OPR\/|Opera\//.test(browserUA);
const visualPerformanceLite = usesHover && !isChromeBrowser;
const platformName = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "";
const isWindowsPlatform = /win/i.test(platformName);
const nativeCursorEnabled = usesHover && (isWindowsPlatform || visualPerformanceLite);
const customCursorEnabled = usesHover && !nativeCursorEnabled;

function getTrackFlower(track, index = backgroundTracks.indexOf(track)) {
  if (!track) return "";
  if (index === HOPE_TRACK_INDEX) return hopeBloomUnlocked ? HOPE_TRACK_PLAYER_FLOWER : "";
  return track.flower || "";
}

function updateHopeAlbumArtworkVisibility() {
  const hopeTrackButton = document.querySelector(`.track[data-track="${HOPE_TRACK_INDEX}"]`);
  if (hopeTrackButton) {
    if (hopeBloomUnlocked) {
      hopeTrackButton.style.setProperty("--track-flower", `url("${HOPE_TRACK_CARD_FLOWER}")`);
    } else {
      hopeTrackButton.style.removeProperty("--track-flower");
    }
  }
  if (backgroundTrackIndex === HOPE_TRACK_INDEX) updateAlbumUI();
}

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
  ".bloom-palette",
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
  if (Number.isFinite(options.offset)) {
    const targetTop = element.getBoundingClientRect().top + window.scrollY + options.offset;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    return;
  }
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

document.querySelectorAll(".nav-links a, .brand").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href?.startsWith("#") || href.length <= 1) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    smoothScrollToElement(target, mobileMediaQuery.matches ? { offset: MOBILE_NAV_SCROLL_OFFSET } : {});
    if (window.location.hash !== href) {
      history.pushState(null, "", href);
    }
    window.setTimeout(scheduleActiveSectionUpdate, 420);
  });
});

function getPetalCount() {
  const petalDensity = visualPerformanceLite ? 32 : 18;
  const petalLimit = visualPerformanceLite ? 42 : 80;
  return Math.min(petalLimit, Math.floor(width / petalDensity));
}

function createPetalSet() {
  return Array.from({ length: getPetalCount() }, createPetal);
}

function resizeCanvas(options = {}) {
  const previousWidth = width;
  const previousHeight = height;
  const previousPetals = petals;
  const dpr = Math.min(window.devicePixelRatio || 1, visualPerformanceLite ? 1.25 : 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (options.preservePetals && previousWidth && previousHeight && previousPetals.length) {
    const xScale = width / previousWidth;
    const yScale = height / previousHeight;
    petals = previousPetals.map((petal) => ({
      ...petal,
      x: petal.x * xScale,
      y: petal.y * yScale
    }));
    const targetCount = getPetalCount();
    while (petals.length < targetCount) petals.push(createPetal());
    if (petals.length > targetCount) petals = petals.slice(0, targetCount);
    return;
  }
  petals = createPetalSet();
}

function scheduleCanvasResize() {
  if (resizeFrame) cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = 0;
    resizeCanvas({ preservePetals: true });
  });
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

function wait(ms = 0) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function playAudioWhenReady(audio) {
  if (!audio || !audio.src) return Promise.resolve(false);
  return audio.play().then(() => true).catch(() => false);
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

  const minHz = 100;
  const nyquist = (audioContext?.sampleRate || 44100) / 2;
  const maxHz = Math.min(8000, nyquist * 0.92);
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

const messageHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`
};

function createSongPlaySupabaseClient() {
  return window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_KEY) || {
    rpc: async (functionName, payload) => {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${functionName}`, {
        method: "POST",
        headers: {
          ...messageHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        return { data: null, error: new Error(`Supabase RPC failed: ${response.status} ${await response.text()}`) };
      }
      const text = await response.text();
      return { data: text ? JSON.parse(text) : null, error: null };
    }
  };
}

const meadowContentPlaceholders = ["你今天還好嗎？", "說說你的故事", "想分享些什麼呢？"];
const meadowMoodFallbacks = [
  "他還看不清自己的情緒",
  "他還不想聊聊他的情緒",
  "讓他再想一想他的情緒",
  "他沒留下自己情緒的線索"
];
let gardenMessagesCache = [];
let meadowState = "browse";
let meadowDraft = null;
let meadowPendingPosition = null;
let meadowSelectedMessage = null;
let meadowZoomValue = 0;
let meadowDrag = null;
let meadowSuppressClick = false;
let meadowZoomAnimation = null;
let meadowBrowseView = { zoom: 0, scrollLeft: 0, scrollTop: 0 };
let meadowActiveMarker = null;
let meadowViewerCloseTimer = null;
let meadowViewerRestoreTimer = null;
let meadowColorAnimation = null;
let meadowComposeCloseTimer = null;
let songPlayStats = new Map();
let songPlayTimer = null;
let songPlayPendingIndex = null;
let songPlayCountedKey = "";

function formatPlayCount(value) {
  const count = Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
  return `${Math.floor(count).toLocaleString("zh-TW")} 次`;
}

function formatPlayCountNumber(value) {
  const count = Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
  return Math.floor(count).toLocaleString("zh-TW");
}

function normalizeSongPlayRow(row) {
  if (!row) return null;
  return {
    id: Number(row.id),
    songId: row.song_id || "",
    playedAt: row.played_at || "",
    plays: Number(row.plays) || 0
  };
}

function ensureTrackPlayBadges() {
  document.querySelectorAll(".track-plays").forEach((badge) => badge.remove());
}

function updateSongPlayUI() {
  ensureTrackPlayBadges();
  const track = backgroundTracks[backgroundTrackIndex];
  const stats = track ? songPlayStats.get(track.id) : null;
  if (albumPlayCount) albumPlayCount.textContent = `播放次數：${formatPlayCountNumber(stats?.plays ?? track?.plays ?? 0)}`;
}

async function fetchSongPlayStats() {
  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/${SUPABASE_SONG_PLAYS_TABLE}`;
    const params = new URLSearchParams({
      select: "id,song_id,played_at,plays",
      order: "id.asc"
    });
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: messageHeaders
    });

    if (!response.ok) {
      throw new Error(`Supabase song play read failed: ${response.status}`);
    }

    const rows = await response.json();
    songPlayStats = new Map(
      (Array.isArray(rows) ? rows : [])
        .map(normalizeSongPlayRow)
        .filter(Boolean)
        .map((row) => [row.id, row])
    );
  } catch (error) {
    console.error(error);
  } finally {
    updateSongPlayUI();
  }
}

async function incrementSongPlay(index) {
  const track = backgroundTracks[index];
  if (!track?.songId) return;

  try {
    const supabase = createSongPlaySupabaseClient();
    const { error } = await supabase.rpc("increment_song_play", {
      p_song_id: track.songId
    });
    if (error) {
      throw error;
    }

    await fetchSongPlayStats();
  } catch (error) {
    console.error(error);
  }
}

function clearSongPlayTimer() {
  window.clearTimeout(songPlayTimer);
  songPlayTimer = null;
  songPlayPendingIndex = null;
}

function scheduleSongPlayCount() {
  clearSongPlayTimer();
  if (!backgroundWanted || backgroundAudio.paused || !backgroundAudio.src) return;
  const index = backgroundTrackIndex;
  const track = backgroundTracks[index];
  if (!track?.id) return;
  const countKey = `${track.id}:${backgroundAudio.src}`;
  if (songPlayCountedKey === countKey) return;
  songPlayPendingIndex = index;
  songPlayTimer = window.setTimeout(() => {
    if (
      songPlayPendingIndex !== index ||
      backgroundTrackIndex !== index ||
      backgroundAudio.paused ||
      !backgroundWanted ||
      songPlayCountedKey === countKey
    ) {
      return;
    }
    songPlayCountedKey = countKey;
    clearSongPlayTimer();
    incrementSongPlay(index);
  }, SONG_PLAY_COUNT_DELAY);
}

function setMessageStatus(text = "", type = "") {
  if (!messageStatus) return;
  messageStatus.textContent = text;
  messageStatus.classList.toggle("is-error", type === "error");
  messageStatus.classList.toggle("is-success", type === "success");
}

function updateMessageCount() {
  if (!messageInput || !messageCount) return;
  const count = messageInput.value.length;
  messageCount.textContent = `${count} / ${MESSAGE_LIMIT}`;
  messageCount.classList.toggle("is-over", count > MESSAGE_LIMIT);
}

function createMessageNotice(text) {
  const notice = document.createElement("p");
  notice.className = "message-empty";
  notice.textContent = text;
  return notice;
}

function createMessageCard(message) {
  const card = document.createElement("article");
  card.className = "message-card";

  const content = document.createElement("p");
  content.textContent = message.content || "";

  const time = document.createElement("time");
  const createdAt = message.created_at ? new Date(message.created_at) : null;
  time.dateTime = message.created_at || "";
  time.textContent = createdAt && !Number.isNaN(createdAt.getTime())
    ? createdAt.toLocaleString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "剛剛";

  card.append(content, time);
  return card;
}

function renderMessages(messages = []) {
  if (!messageList) return;
  if (!messages.length) {
    messageList.replaceChildren(createMessageNotice("留言正在發芽中。"));
    return;
  }
  messageList.replaceChildren(...messages.map(createMessageCard));
}

async function fetchGardenMessages(options = {}) {
  const { renderBoard = true } = options;
  if (renderBoard && messageList) {
    messageList.replaceChildren(createMessageNotice("正在讀取花園留言..."));
  }

  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/${SUPABASE_MESSAGES_TABLE}`;
    const params = new URLSearchParams({
      select: "id,content,mood,color,pos_x,pos_y,created_at",
      order: "created_at.desc",
      limit: "200"
    });
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: messageHeaders
    });

    if (!response.ok) {
      throw new Error(`Supabase read failed: ${response.status}`);
    }

    const messages = await response.json();
    gardenMessagesCache = Array.isArray(messages) ? messages : [];
    if (renderBoard) renderMessages(gardenMessagesCache);
    setMessageStatus("");
    return gardenMessagesCache;
  } catch (error) {
    console.error(error);
    if (renderBoard && messageList) {
      messageList.replaceChildren(createMessageNotice("暫時無法讀取留言，請稍後再試。"));
    }
    return [];
  }
}

async function insertGardenMessage(payload) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_MESSAGES_TABLE}`, {
    method: "POST",
    headers: {
      ...messageHeaders,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status}`);
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function submitGardenMessage(event) {
  event.preventDefault();
  if (!messageInput) return;

  const content = messageInput.value.trim();
  if (content.length < 1) {
    setMessageStatus("請先寫下一句留言。", "error");
    return;
  }
  if (content.length > MESSAGE_LIMIT) {
    setMessageStatus(`留言最多 ${MESSAGE_LIMIT} 字。`, "error");
    return;
  }

  const submitButton = messageForm?.querySelector("button[type='submit']");
  submitButton?.setAttribute("disabled", "true");
  setMessageStatus("正在把留言種進花園...", "");

  try {
    await insertGardenMessage({ content });

    messageInput.value = "";
    updateMessageCount();
    setMessageStatus("留言已經留在花園裡。", "success");
    await fetchGardenMessages();
  } catch (error) {
    console.error(error);
    setMessageStatus("留言送出失敗，請確認留言資料表與權限設定。", "error");
  } finally {
    submitButton?.removeAttribute("disabled");
  }
}

function initMessageBoard() {
  if (!messageForm || !messageInput || !messageList) return;
  updateMessageCount();
  messageInput.addEventListener("input", updateMessageCount);
  messageForm.addEventListener("submit", submitGardenMessage);
  messageRefresh?.addEventListener("click", () => {
    playTone(659.25, "#ffd166");
    fetchGardenMessages();
  });
  fetchGardenMessages();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomItem(items = []) {
  return items[Math.floor(Math.random() * items.length)] || "";
}

function hslToHex(h, s, l) {
  const hue = (((Number(h) % 360) + 360) % 360) / 360;
  const sat = clamp(Number(s), 0, 100) / 100;
  const light = clamp(Number(l), 0, 100) / 100;
  const channel = (n) => {
    const k = (n + hue * 12) % 12;
    const a = sat * Math.min(light, 1 - light);
    return light - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
  };
  return [channel(0), channel(8), channel(4)]
    .map((value) => Math.round(value * 255).toString(16).padStart(2, "0"))
    .join("")
    .replace(/^/, "#");
}

function normalizeHex(value) {
  const text = String(value || "").trim();
  const short = text.match(/^#?([0-9a-f]{3})$/i);
  if (short) {
    return `#${short[1].split("").map((part) => part + part).join("")}`.toLowerCase();
  }
  const full = text.match(/^#?([0-9a-f]{6})$/i);
  return full ? `#${full[1]}`.toLowerCase() : "";
}

function mixHexWithGray(hex, amount = 0) {
  const color = normalizeHex(hex) || "#ffffff";
  const gray = clamp(Number(amount), 0, 100) / 100;
  const parts = [1, 3, 5].map((start) => parseInt(color.slice(start, start + 2), 16));
  const average = Math.round((parts[0] + parts[1] + parts[2]) / 3);
  const mixed = parts.map((part) => Math.round(part * (1 - gray) + average * gray));
  return `#${mixed.map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

function getMeadowColorFromControls() {
  return mixHexWithGray(hslToHex(meadowHue?.value || 0, 82, meadowLightness?.value || 92), meadowGray?.value || 0);
}

function setMeadowFlowerColor(color) {
  const hex = normalizeHex(color) || "#ffffff";
  meadowPreviewFlower?.style.setProperty("--meadow-color", hex);
  meadowBloomFocus?.style.setProperty("--meadow-color", hex);
  meadowViewerFlower?.style.setProperty("--meadow-color", hex);
  if (meadowHex) meadowHex.value = hex;
  return hex;
}

function updateMeadowSliderGradients() {
  const hue = clamp(Number(meadowHue?.value || 0), 0, 360);
  const lightness = clamp(Number(meadowLightness?.value || 92), 0, 100);
  const gray = clamp(Number(meadowGray?.value || 0), 0, 100);
  const hueStops = [0, 60, 120, 180, 240, 300, 360]
    .map((stop) => `hsl(${stop} 82% ${lightness}%)`)
    .join(", ");
  const vividColor = hslToHex(hue, 82, lightness);
  const lowLight = mixHexWithGray(hslToHex(hue, 82, 24), gray);
  const midLight = mixHexWithGray(hslToHex(hue, 82, 60), gray);
  const highLight = mixHexWithGray(hslToHex(hue, 82, 96), gray);
  const grayColor = mixHexWithGray(vividColor, 100);
  const setRangeGradient = (control, gradient) => {
    if (!control) return;
    control.style.setProperty("--range-gradient", gradient);
    control.style.background = gradient;
  };
  setRangeGradient(meadowHue, `linear-gradient(90deg, ${hueStops})`);
  setRangeGradient(meadowLightness, `linear-gradient(90deg, ${lowLight}, ${midLight}, ${highLight})`);
  setRangeGradient(meadowGray, `linear-gradient(90deg, ${vividColor}, ${grayColor})`);
}

function updateMeadowColorFromSliders() {
  const color = setMeadowFlowerColor(getMeadowColorFromControls());
  updateMeadowSliderGradients();
  return color;
}

function cancelMeadowColorAnimation() {
  if (!meadowColorAnimation) return;
  window.cancelAnimationFrame(meadowColorAnimation);
  meadowColorAnimation = null;
}

function setMeadowColorControls(options = {}) {
  cancelMeadowColorAnimation();
  const randomizeAll = options.randomizeAll === true;
  if (meadowHue) meadowHue.value = String(Math.floor(Math.random() * 361));
  if (meadowLightness) {
    meadowLightness.value = randomizeAll
      ? String(Math.round(24 + Math.random() * 68))
      : "50";
  }
  if (meadowGray) {
    meadowGray.value = randomizeAll
      ? String(Math.round(Math.random() * 100))
      : "0";
  }
  return updateMeadowColorFromSliders();
}

function animateMeadowColorControls(targets, duration = 448) {
  const controls = [
    { element: meadowHue, target: targets.hue },
    { element: meadowLightness, target: targets.lightness },
    { element: meadowGray, target: targets.gray }
  ].filter((item) => item.element && Number.isFinite(Number(item.target)))
    .map((item) => ({
      ...item,
      start: Number(item.element.value),
      target: Number(item.target)
    }));
  if (!controls.length) return updateMeadowColorFromSliders();
  cancelMeadowColorAnimation();
  const startTime = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const step = (now) => {
    const progress = clamp((now - startTime) / duration, 0, 1);
    const eased = ease(progress);
    controls.forEach(({ element, start, target }) => {
      element.value = String(Math.round(start + (target - start) * eased));
    });
    updateMeadowColorFromSliders();
    if (progress < 1) {
      meadowColorAnimation = window.requestAnimationFrame(step);
    } else {
      controls.forEach(({ element, target }) => {
        element.value = String(Math.round(target));
      });
      meadowColorAnimation = null;
      updateMeadowColorFromSliders();
    }
  };
  meadowColorAnimation = window.requestAnimationFrame(step);
}

function randomizeMeadowColorControlsAnimated() {
  animateMeadowColorControls({
    hue: Math.floor(Math.random() * 361),
    lightness: Math.round(24 + Math.random() * 68),
    gray: Math.round(Math.random() * 100)
  });
}

function updateMeadowCount() {
  if (!meadowContent || !meadowCount) return;
  const count = meadowContent.value.trim().length;
  meadowCount.textContent = `${count} / ${MESSAGE_LIMIT}`;
  meadowCount.classList.toggle("is-over", count > MESSAGE_LIMIT);
}

function setMeadowStatus(text = "", type = "") {
  if (!meadowStatus) return;
  meadowStatus.textContent = text;
  meadowStatus.classList.toggle("is-error", type === "error");
  meadowStatus.classList.toggle("is-success", type === "success");
}

function getMeadowBaseScale() {
  if (!meadowViewport) return 1;
  return Math.min(meadowViewport.clientWidth / MEADOW_WORLD_WIDTH, meadowViewport.clientHeight / MEADOW_WORLD_HEIGHT);
}

function getMeadowDotSize(value = meadowZoomValue) {
  const progress = clamp(Number(value), 0, MEADOW_DOT_ZOOM_LIMIT) / MEADOW_DOT_ZOOM_LIMIT;
  return MEADOW_DOT_MIN_SIZE + progress * (MEADOW_DOT_MAX_SIZE - MEADOW_DOT_MIN_SIZE);
}

function getMeadowWorldProgress(value = meadowZoomValue) {
  const zoom = clamp(Number(value), 0, MEADOW_VIEW_ZOOM);
  if (zoom < MEADOW_DOT_ZOOM_LIMIT) {
    return (Math.pow(zoom / MEADOW_DOT_ZOOM_LIMIT, 1.65) * MEADOW_DOT_ZOOM_LIMIT) / 100;
  }
  return zoom / 100;
}

function getMeadowWorldSize(value = meadowZoomValue) {
  const progress = getMeadowWorldProgress(value);
  const baseWidth = meadowViewport?.clientWidth || MEADOW_WORLD_WIDTH * getMeadowBaseScale();
  const baseHeight = meadowViewport?.clientHeight || MEADOW_WORLD_HEIGHT * getMeadowBaseScale();
  const maxWidth = MEADOW_WORLD_WIDTH * MEADOW_MAX_SCALE;
  const maxHeight = MEADOW_WORLD_HEIGHT * MEADOW_MAX_SCALE;
  const width = baseWidth + (maxWidth - baseWidth) * progress;
  const height = baseHeight + (maxHeight - baseHeight) * progress;
  return {
    scale: Math.min(width / MEADOW_WORLD_WIDTH, height / MEADOW_WORLD_HEIGHT),
    width,
    height
  };
}

function getMeadowScale(value = meadowZoomValue) {
  return getMeadowWorldSize(value).scale;
}

function getMeadowMarkerScale(value = meadowZoomValue) {
  const progress = clamp(Number(value), 0, 100) / 100;
  return MEADOW_MIN_MARKER_SCALE + progress * (MEADOW_MARKER_MAX_SCALE - MEADOW_MIN_MARKER_SCALE);
}

function focusMeadowPoint(center, options = {}) {
  if (!center || !meadowViewport) return;
  const { width, height } = options.size || getMeadowWorldSize();
  const target = getMeadowTargetScroll(center, { width, height }, options);
  meadowViewport.scrollLeft = target.left;
  meadowViewport.scrollTop = target.top;
  syncMeadowViewportOverlays();
}

function getMeadowTargetScroll(center, size, options = {}) {
  if (!center || !meadowViewport) return { left: meadowViewport?.scrollLeft || 0, top: meadowViewport?.scrollTop || 0 };
  const { width, height } = size || getMeadowWorldSize();
  const alignX = options.alignX ?? 0.5;
  const alignY = options.alignY ?? 0.5;
  const maxLeft = Math.max(0, width - meadowViewport.clientWidth);
  const maxTop = Math.max(0, height - meadowViewport.clientHeight);
  return {
    left: clamp((center.x / 100) * width - meadowViewport.clientWidth * alignX, 0, maxLeft),
    top: clamp((center.y / 100) * height - meadowViewport.clientHeight * alignY, 0, maxTop)
  };
}

function syncMeadowViewportOverlays() {
  if (!meadowViewport) return;
  meadowViewport.style.setProperty("--meadow-scroll-left", `${meadowViewport.scrollLeft}px`);
  meadowViewport.style.setProperty("--meadow-scroll-top", `${meadowViewport.scrollTop}px`);
}

function handleMeadowWheel(event) {
  syncMeadowViewportOverlays();
}

function canStartMeadowDrag(event) {
  if (!meadowViewport || event.button !== 0 || meadowState === "compose" || meadowState === "viewing") return false;
  return !event.target.closest(".meadow-compose, .meadow-place-confirm, .meadow-cancel-modal, .meadow-viewer-card, .meadow-flower-marker, input, button, textarea, a");
}

function startMeadowDrag(event) {
  if (!canStartMeadowDrag(event)) return;
  meadowDrag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    scrollLeft: meadowViewport.scrollLeft,
    scrollTop: meadowViewport.scrollTop,
    moved: false
  };
  meadowViewport.classList.add("is-dragging");
  meadowViewport.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}

function moveMeadowDrag(event) {
  if (!meadowDrag || meadowDrag.pointerId !== event.pointerId || !meadowViewport) return;
  const deltaX = event.clientX - meadowDrag.startX;
  const deltaY = event.clientY - meadowDrag.startY;
  if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) meadowDrag.moved = true;
  meadowViewport.scrollLeft = meadowDrag.scrollLeft - deltaX;
  meadowViewport.scrollTop = meadowDrag.scrollTop - deltaY;
  syncMeadowViewportOverlays();
  event.preventDefault();
}

function endMeadowDrag(event) {
  if (!meadowDrag || meadowDrag.pointerId !== event.pointerId) return;
  meadowSuppressClick = meadowDrag.moved;
  meadowViewport?.classList.remove("is-dragging");
  meadowViewport?.releasePointerCapture?.(event.pointerId);
  meadowDrag = null;
  if (meadowSuppressClick) window.setTimeout(() => { meadowSuppressClick = false; }, 0);
}

function getMeadowViewAlignX() {
  return window.matchMedia("(max-width: 760px)").matches ? 0.5 : 0.28;
}

function getMeadowViewportCenterPoint() {
  if (!meadowViewport) return null;
  const width = meadowWorld?.offsetWidth || getMeadowWorldSize().width;
  const height = meadowWorld?.offsetHeight || getMeadowWorldSize().height;
  if (!width || !height) return { x: 50, y: 50 };
  return {
    x: clamp(((meadowViewport.scrollLeft + meadowViewport.clientWidth / 2) / width) * 100, 0, 100),
    y: clamp(((meadowViewport.scrollTop + meadowViewport.clientHeight / 2) / height) * 100, 0, 100)
  };
}

function cancelMeadowZoomAnimation() {
  if (!meadowZoomAnimation) return;
  window.cancelAnimationFrame(meadowZoomAnimation);
  meadowZoomAnimation = null;
}

function applyMeadowZoomMetrics(value) {
  meadowZoomValue = clamp(Number(value), 0, MEADOW_VIEW_ZOOM);
  const { scale, width, height } = getMeadowWorldSize(meadowZoomValue);
  meadowViewport?.style.setProperty("--meadow-scale", scale.toFixed(3));
  meadowViewport?.style.setProperty("--meadow-world-width", `${width}px`);
  meadowViewport?.style.setProperty("--meadow-world-height", `${height}px`);
  meadowViewport?.style.setProperty("--meadow-marker-scale", getMeadowMarkerScale(meadowZoomValue).toFixed(3));
  meadowViewport?.style.setProperty("--meadow-dot-size", `${getMeadowDotSize(meadowZoomValue).toFixed(1)}px`);
  meadowViewport?.classList.toggle("is-dot-view", meadowZoomValue < MEADOW_DOT_ZOOM_LIMIT);
  const controlValue = clamp(meadowZoomValue, 0, 100);
  if (meadowZoom) meadowZoom.value = String(Math.round(controlValue));
  if (meadowZoomOutput) meadowZoomOutput.textContent = `${Math.round(controlValue)}%`;
  return { scale, width, height };
}

function applyMeadowZoomFrame(value, center, options = {}) {
  const { width, height } = applyMeadowZoomMetrics(value);
  focusMeadowPoint(center, { ...options, size: { width, height } });
}

function animateMeadowZoom(value, center, options = {}) {
  const startZoom = meadowZoomValue;
  const endZoom = clamp(Number(value), 0, MEADOW_VIEW_ZOOM);
  const duration = options.duration ?? 620;
  const startTime = performance.now();
  const startScroll = {
    left: meadowViewport?.scrollLeft || 0,
    top: meadowViewport?.scrollTop || 0
  };
  const endSize = getMeadowWorldSize(endZoom);
  const endScroll = getMeadowTargetScroll(center, endSize, options);
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const step = (now) => {
    const progress = clamp((now - startTime) / duration, 0, 1);
    const eased = ease(progress);
    applyMeadowZoomMetrics(startZoom + (endZoom - startZoom) * eased);
    if (meadowViewport) {
      meadowViewport.scrollLeft = startScroll.left + (endScroll.left - startScroll.left) * eased;
      meadowViewport.scrollTop = startScroll.top + (endScroll.top - startScroll.top) * eased;
      syncMeadowViewportOverlays();
    }
    if (progress < 1) {
      meadowZoomAnimation = window.requestAnimationFrame(step);
    } else {
      meadowZoomAnimation = null;
      applyMeadowZoomMetrics(endZoom);
      if (meadowViewport) {
        meadowViewport.scrollLeft = endScroll.left;
        meadowViewport.scrollTop = endScroll.top;
        syncMeadowViewportOverlays();
      }
    }
  };
  cancelMeadowZoomAnimation();
  meadowZoomAnimation = window.requestAnimationFrame(step);
}

function setMeadowZoom(value, center, options = {}) {
  const zoomCenter = center || (options.preserveCenter === false ? null : getMeadowViewportCenterPoint());
  cancelMeadowZoomAnimation();
  if (options.animate && zoomCenter) {
    animateMeadowZoom(value, zoomCenter, options);
    return;
  }
  applyMeadowZoomFrame(value, zoomCenter, options);
}

function setMeadowPositionCue(point) {
  if (!meadowWorld) return;
  let cue = meadowWorld.querySelector(".meadow-position-cue");
  if (!point) {
    cue?.remove();
    return;
  }
  if (!cue) {
    cue = document.createElement("span");
    cue.className = "meadow-position-cue";
    cue.setAttribute("aria-hidden", "true");
    meadowWorld.appendChild(cue);
  }
  cue.style.left = `${point.x}%`;
  cue.style.top = `${point.y}%`;
}

function setMeadowFocusBackdrop(show) {
  if (!meadowViewport) return;
  let backdrop = meadowViewport.querySelector(".meadow-focus-backdrop");
  if (!show) {
    backdrop?.remove();
    return;
  }
  if (!backdrop) {
    backdrop = document.createElement("span");
    backdrop.className = "meadow-focus-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    meadowViewport.appendChild(backdrop);
  }
}

function rememberMeadowBrowseView() {
  if (!meadowViewport) return;
  meadowBrowseView = {
    zoom: clamp(meadowZoomValue, 0, 100),
    scrollLeft: meadowViewport.scrollLeft,
    scrollTop: meadowViewport.scrollTop
  };
}

function restoreMeadowBrowseView(options = {}) {
  if (!meadowViewport) return;
  const { width, height } = getMeadowWorldSize(meadowBrowseView.zoom);
  const center = {
    x: width > 0 ? clamp(((meadowBrowseView.scrollLeft + meadowViewport.clientWidth / 2) / width) * 100, 0, 100) : 50,
    y: height > 0 ? clamp(((meadowBrowseView.scrollTop + meadowViewport.clientHeight / 2) / height) * 100, 0, 100) : 50
  };
  setMeadowZoom(meadowBrowseView.zoom, center, { animate: true, duration: options.duration ?? 520 });
}

function getMeadowMarkerKey(message) {
  return String(message?.id ?? `${message?.pos_x}-${message?.pos_y}-${message?.created_at || ""}`);
}

function findMeadowMarker(message) {
  if (!meadowWorld || !message) return null;
  const key = getMeadowMarkerKey(message);
  return Array.from(meadowWorld.querySelectorAll(".meadow-flower-marker")).find((marker) => marker.dataset.messageId === key) || null;
}

function getMeadowViewingMarkerSize() {
  return {
    width: Math.min(340, window.innerWidth * 0.32),
    height: Math.min(460, window.innerWidth * 0.44)
  };
}

function animateMeadowMarkerToViewing(marker, options = {}) {
  if (!marker) return;
  const rect = marker.getBoundingClientRect();
  const target = getMeadowViewingMarkerSize();
  if (options.duration) marker.style.setProperty("--meadow-view-transition-duration", `${options.duration}ms`);
  marker.style.width = `${rect.width}px`;
  marker.style.height = `${rect.height}px`;
  marker.offsetWidth;
  marker.classList.add("is-viewing");
  window.requestAnimationFrame(() => {
    marker.style.width = `${target.width}px`;
    marker.style.height = `${target.height}px`;
  });
  const clearInlineSize = (event) => {
    if (event.target !== marker || (event.propertyName !== "width" && event.propertyName !== "height")) return;
    marker.removeEventListener("transitionend", clearInlineSize);
    if (marker.classList.contains("is-viewing")) {
      marker.style.width = "";
      marker.style.height = "";
      marker.style.removeProperty("--meadow-view-transition-duration");
    }
  };
  marker.addEventListener("transitionend", clearInlineSize);
}

function resetMeadowMarkerSize(marker) {
  if (!marker) return;
  marker.style.width = "";
  marker.style.height = "";
}

function getMeadowMarkerSizeAtZoom(value) {
  if (Number(value) < MEADOW_DOT_ZOOM_LIMIT) {
    const dotSize = getMeadowDotSize(value);
    return { width: dotSize, height: dotSize };
  }
  const scale = getMeadowMarkerScale(value);
  return {
    width: 110 * scale,
    height: 164 * scale
  };
}

function animateMeadowMarkerFromViewing(marker, value = 100, options = {}) {
  if (!marker) return;
  const rect = marker.getBoundingClientRect();
  const target = getMeadowMarkerSizeAtZoom(value);
  if (options.duration) marker.style.setProperty("--meadow-view-transition-duration", `${options.duration}ms`);
  marker.style.width = `${rect.width}px`;
  marker.style.height = `${rect.height}px`;
  marker.offsetWidth;
  window.requestAnimationFrame(() => {
    marker.style.width = `${target.width}px`;
    marker.style.height = `${target.height}px`;
  });
}

function setMeadowActiveMarker(marker, options = {}) {
  if (meadowActiveMarker && meadowActiveMarker !== marker) {
    meadowActiveMarker.classList.remove("is-viewing");
    resetMeadowMarkerSize(meadowActiveMarker);
  }
  meadowActiveMarker = marker || null;
  if (!meadowActiveMarker) return;
  resetMeadowMarkerSize(meadowActiveMarker);
  if (options.animate) {
    animateMeadowMarkerToViewing(meadowActiveMarker, { duration: options.duration });
  } else {
    meadowActiveMarker.classList.add("is-viewing");
  }
}

function hideMeadowViewerImmediately() {
  if (!meadowViewer) return;
  meadowViewer.classList.remove("is-closing");
  meadowViewer.hidden = true;
}

function closeMeadowViewer() {
  meadowSelectedMessage = null;
  window.clearTimeout(meadowViewerRestoreTimer);
  if (meadowViewer) {
    window.clearTimeout(meadowViewerCloseTimer);
    meadowViewer.classList.add("is-closing");
    meadowViewerCloseTimer = window.setTimeout(hideMeadowViewerImmediately, 260);
  }
  const activeMarker = meadowActiveMarker;
  const focusPoint = activeMarker ? {
    x: parseFloat(activeMarker.style.left) || 50,
    y: parseFloat(activeMarker.style.top) || 50
  } : null;
  if (activeMarker) {
    const duration = 620;
    gardenMeadowPanel?.classList.add("is-restoring");
    animateMeadowMarkerFromViewing(activeMarker, meadowBrowseView.zoom, { duration });
    restoreMeadowBrowseView({ duration });
    meadowViewerRestoreTimer = window.setTimeout(() => {
      setMeadowActiveMarker(null);
      gardenMeadowPanel?.classList.remove("is-restoring");
      setMeadowState("browse");
    }, duration + 40);
    return;
  }
  setMeadowActiveMarker(null);
  setMeadowState("browse");
  restoreMeadowBrowseView();
}

function setMeadowState(nextState) {
  meadowState = nextState;
  if (nextState === "compose") {
    window.clearTimeout(meadowComposeCloseTimer);
    gardenMeadowPanel?.classList.remove("is-compose-closing");
    meadowCompose?.classList.remove("is-closing");
  }
  gardenMeadowPanel?.setAttribute("data-state", nextState);
  if (meadowCompose) meadowCompose.hidden = nextState !== "compose";
  if (meadowCancel) meadowCancel.hidden = !(nextState === "compose" || nextState === "placing");
  if (nextState !== "placing" && meadowPlaceConfirm) meadowPlaceConfirm.hidden = true;
  if (nextState !== "viewing" && meadowViewer && !meadowViewer.classList.contains("is-closing")) meadowViewer.hidden = true;
  if (nextState !== "viewing") {
    setMeadowActiveMarker(null);
    setMeadowFocusBackdrop(false);
  }
  gardenMeadowPanel?.classList.toggle("is-composing", nextState === "compose");
  gardenMeadowPanel?.classList.toggle("is-placing", nextState === "placing");
  gardenMeadowPanel?.classList.toggle("is-viewing", nextState === "viewing");
  meadowViewport?.classList.toggle("is-scroll-locked", nextState === "compose" || nextState === "viewing");
  syncMeadowViewportOverlays();
}

function createMeadowFlowerElement(color = "#ffffff", className = "meadow-flower-shape") {
  const flower = document.createElement("span");
  flower.className = className;
  flower.style.setProperty("--meadow-color", normalizeHex(color) || "#ffffff");
  flower.innerHTML = `
    <span class="flower-stem"></span>
    <span class="flower-petal p1"></span><span class="flower-petal p2"></span><span class="flower-petal p3"></span><span class="flower-petal p4"></span>
    <span class="flower-petal p5"></span><span class="flower-petal p6"></span><span class="flower-petal p7"></span><span class="flower-petal p8"></span>
    <span class="flower-core"></span>
  `;
  return flower;
}

function validMeadowMessage(message) {
  const x = Number(message?.pos_x);
  const y = Number(message?.pos_y);
  return Number.isFinite(x) && Number.isFinite(y) && x >= 0 && x <= 100 && y >= 0 && y <= 100;
}

function renderMeadowMessages(messages = gardenMessagesCache) {
  if (!meadowWorld) return;
  meadowWorld.querySelectorAll(".meadow-flower-marker").forEach((node) => node.remove());
  const flowers = messages.filter(validMeadowMessage);
  flowers.forEach((message) => {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "meadow-flower-marker";
    marker.style.left = `${Number(message.pos_x)}%`;
    marker.style.top = `${Number(message.pos_y)}%`;
    marker.style.setProperty("--meadow-color", normalizeHex(message.color) || "#ffffff");
    marker.dataset.messageId = getMeadowMarkerKey(message);
    marker.setAttribute("aria-label", "查看一朵留言花");
    marker.append(createMeadowFlowerElement(message.color || "#ffffff"));
    marker.addEventListener("click", (event) => {
      event.stopPropagation();
      showMeadowMessage(message, marker);
    });
    meadowWorld.appendChild(marker);
  });
}

async function refreshMeadowMessages() {
  const messages = await fetchGardenMessages({ renderBoard: false });
  renderMeadowMessages(messages);
}

function resetMeadowForm() {
  meadowDraft = null;
  meadowPendingPosition = null;
  gardenMeadowPanel?.classList.remove("is-content-expanded");
  meadowContentExpand?.setAttribute("aria-pressed", "false");
  meadowContentExpand?.setAttribute("aria-label", "放大留言文字框");
  setMeadowPositionCue(null);
  if (meadowMood) meadowMood.value = "";
  if (meadowContent) {
    meadowContent.value = "";
    meadowContent.placeholder = randomItem(meadowContentPlaceholders);
  }
  setMeadowColorControls();
  updateMeadowCount();
  setMeadowStatus("");
}

function getMeadowPoint(event) {
  const rect = meadowWorld?.getBoundingClientRect();
  if (!rect) return null;
  return {
    x: clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
    y: clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100)
  };
}

function beginMeadowPlacement(event) {
  event.preventDefault();
  if (!meadowContent) return;
  const content = meadowContent.value.trim();
  if (!content) {
    setMeadowStatus("請先寫下一段留言。", "error");
    return;
  }
  if (content.length > MESSAGE_LIMIT) {
    setMeadowStatus(`留言最多 ${MESSAGE_LIMIT} 字。`, "error");
    return;
  }
  meadowDraft = {
    color: normalizeHex(meadowHex?.value) || updateMeadowColorFromSliders(),
    mood: (meadowMood?.value || "").trim().slice(0, 20),
    content
  };
  setMeadowState("placing");
  window.requestAnimationFrame(() => {
    setMeadowZoom(0, null, { behavior: "auto" });
  });
  showToast("請選擇想種下的位置");
}

function showMeadowPlaceConfirm(point) {
  if (!meadowPlaceConfirm || !meadowViewport) return;
  meadowPendingPosition = point;
  setMeadowPositionCue(point);
  const { width, height } = getMeadowWorldSize();
  const left = (point.x / 100) * width;
  const top = (point.y / 100) * height;
  const minLeft = meadowViewport.scrollLeft + 126;
  const maxLeft = meadowViewport.scrollLeft + meadowViewport.clientWidth - 126;
  const minTop = meadowViewport.scrollTop + 142;
  const maxTop = meadowViewport.scrollTop + meadowViewport.clientHeight - 36;
  meadowPlaceConfirm.hidden = false;
  meadowPlaceConfirm.style.left = `${clamp(left, minLeft, maxLeft)}px`;
  meadowPlaceConfirm.style.top = `${clamp(top, minTop, maxTop)}px`;
}

async function playRandomBloomSfx() {
  const randomBloom = randomItem(Object.values(bloomChoices).map((choice) => choice.bloom));
  if (!randomBloom) return false;
  bloomSfxAudio.pause();
  clearAudioFade(bloomSfxAudio);
  bloomSfxAudio.currentTime = 0;
  bloomSfxAudio.src = randomBloom;
  setAudioVolume(bloomSfxAudio, 1);
  return playAudioWhenReady(bloomSfxAudio);
}

async function waitForBloomSfxOrTimeout(started, timeout = 2600) {
  if (!started) {
    await wait(980);
    return;
  }
  if (bloomSfxAudio.ended) return;
  await new Promise((resolve) => {
    let timer = null;
    const done = () => {
      if (timer) window.clearTimeout(timer);
      bloomSfxAudio.removeEventListener("ended", done);
      bloomSfxAudio.removeEventListener("error", done);
      resolve();
    };
    bloomSfxAudio.addEventListener("ended", done, { once: true });
    bloomSfxAudio.addEventListener("error", done, { once: true });
    if (Number.isFinite(timeout) && timeout > 0) {
      timer = window.setTimeout(done, timeout);
    }
  });
}

async function playMeadowBloomSequence(color, options = {}) {
  if (!meadowBloomFocus) return;
  const manageBackground = options.manageBackground !== false;
  const wasPlaying = manageBackground && backgroundWanted && !backgroundAudio.paused;
  if (wasPlaying) await fadePause(backgroundAudio, 300);
  meadowBloomFocus.hidden = false;
  meadowBloomFocus.style.setProperty("--meadow-color", color);
  meadowBloomFocus.classList.remove("is-blooming");
  const started = await playRandomBloomSfx();
  if (started) await wait(160);
  window.requestAnimationFrame(() => meadowBloomFocus.classList.add("is-blooming"));
  await waitForBloomSfxOrTimeout(started);
  meadowBloomFocus.classList.remove("is-blooming");
  await wait(260);
  meadowBloomFocus.hidden = true;
  if (wasPlaying && backgroundWanted) await fadeResume(backgroundAudio, 300);
}

async function playMeadowMarkerBloom(marker, options = {}) {
  if (!marker) return;
  const manageBackground = options.manageBackground !== false;
  const wasPlaying = manageBackground && backgroundWanted && !backgroundAudio.paused;
  if (wasPlaying) await fadePause(backgroundAudio, 300);
  const started = await playRandomBloomSfx();
  if (started) await wait(160);
  marker.classList.remove("is-awaiting-bloom");
  marker.classList.remove("is-new-bloom");
  void marker.offsetWidth;
  marker.classList.add("is-new-bloom");
  await Promise.all([
    waitForBloomSfxOrTimeout(started, 0),
    wait(1900)
  ]);
  marker.classList.remove("is-new-bloom");
  if (wasPlaying && backgroundWanted) await fadeResume(backgroundAudio, 300);
}

function formatMeadowTime(value) {
  const createdAt = value ? new Date(value) : null;
  if (!createdAt || Number.isNaN(createdAt.getTime())) return "剛剛";
  return createdAt.toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function showMeadowMessage(message, marker = null, options = {}) {
  if (!validMeadowMessage(message)) return;
  if (options.remember !== false && meadowState !== "viewing") rememberMeadowBrowseView();
  meadowSelectedMessage = message;
  const x = Number(message.pos_x);
  const y = Number(message.pos_y);
  const targetMarker = marker || findMeadowMarker(message);
  const wasDotOverview = meadowZoomValue < MEADOW_DOT_ZOOM_LIMIT;
  const viewDuration = options.duration ?? (wasDotOverview ? Math.round(680 * 1.4) : 680);
  gardenMeadowPanel?.classList.remove("is-restoring");
  setMeadowState("viewing");
  setMeadowFocusBackdrop(true);
  if (meadowViewer) {
    window.clearTimeout(meadowViewerCloseTimer);
    window.clearTimeout(meadowViewerRestoreTimer);
    meadowViewer.classList.remove("is-closing");
  }
  setMeadowActiveMarker(targetMarker, { animate: options.animate !== false, duration: viewDuration });
  setMeadowZoom(MEADOW_VIEW_ZOOM, { x, y }, {
    alignX: getMeadowViewAlignX(),
    alignY: 0.5,
    animate: options.animate !== false,
    duration: viewDuration
  });
  if (meadowViewerFlower) meadowViewerFlower.replaceChildren();
  if (meadowViewerMood) {
    const mood = (message.mood || "").trim();
    meadowViewerMood.textContent = mood || randomItem(meadowMoodFallbacks);
    meadowViewerMood.classList.toggle("is-empty", !mood);
  }
  if (meadowViewerContent) meadowViewerContent.textContent = message.content || "";
  if (meadowViewerTime) meadowViewerTime.textContent = formatMeadowTime(message.created_at);
  if (meadowViewer) meadowViewer.hidden = false;
}

async function confirmMeadowPlanting() {
  if (!meadowDraft || !meadowPendingPosition) return;
  setMeadowStatus("正在把你的花種進草原...", "");
  const position = {
    pos_x: Number(meadowPendingPosition.x.toFixed(3)),
    pos_y: Number(meadowPendingPosition.y.toFixed(3))
  };
  let inserted = null;
  const wasPlaying = backgroundWanted && !backgroundAudio.paused;
  try {
    if (meadowPlaceConfirm) meadowPlaceConfirm.hidden = true;
    setMeadowPositionCue(null);
    if (wasPlaying) await fadePause(backgroundAudio, 300);
    inserted = await insertGardenMessage({ ...meadowDraft, ...position });
    gardenMessagesCache = [inserted, ...gardenMessagesCache];
    renderMeadowMessages(gardenMessagesCache);
    const insertedMarker = findMeadowMarker(inserted);
    insertedMarker?.classList.add("is-awaiting-bloom");
    showMeadowMessage(inserted, insertedMarker, { remember: false, behavior: "smooth" });
    await wait(520);
    await playMeadowMarkerBloom(insertedMarker, { manageBackground: false });
    resetMeadowForm();
    setMeadowStatus("");
    if (wasPlaying && backgroundWanted) await fadeResume(backgroundAudio, 300);
  } catch (error) {
    console.error(error);
    if (wasPlaying && backgroundWanted) await fadeResume(backgroundAudio, 300);
    setMeadowStatus("留言花送出失敗，請確認 Supabase 欄位與權限設定。", "error");
    setMeadowState("placing");
  }
}

function cancelMeadowDraft() {
  window.clearTimeout(meadowComposeCloseTimer);
  const shouldAnimateCompose = Boolean(meadowCompose && !meadowCompose.hidden);
  const finishCancel = () => {
    gardenMeadowPanel?.classList.remove("is-compose-closing");
    meadowCompose?.classList.remove("is-closing");
    resetMeadowForm();
    setMeadowActiveMarker(null);
    setMeadowZoom(0);
    setMeadowState("browse");
  };
  if (!shouldAnimateCompose) {
    finishCancel();
    return;
  }
  gardenMeadowPanel?.classList.add("is-compose-closing");
  meadowCompose.classList.add("is-closing");
  meadowComposeCloseTimer = window.setTimeout(finishCancel, 420);
}

function toggleMeadowContentExpand() {
  if (!gardenMeadowPanel || !meadowContentExpand) return;
  const expanded = !gardenMeadowPanel.classList.contains("is-content-expanded");
  gardenMeadowPanel.classList.toggle("is-content-expanded", expanded);
  meadowContentExpand.setAttribute("aria-pressed", String(expanded));
  meadowContentExpand.setAttribute("aria-label", expanded ? "縮小留言文字框" : "放大留言文字框");
  meadowContent?.focus({ preventScroll: true });
}

function setGardenMode(mode) {
  const showMessages = mode === "messages";
  gardenStage?.classList.toggle("is-message-mode", showMessages);
  if (gardenPlantMode) gardenPlantMode.hidden = showMessages;
  if (gardenMeadowPanel) gardenMeadowPanel.hidden = !showMessages;
  gardenModeButtons.forEach((button) => {
    const active = button.dataset.gardenMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (showMessages) {
    refreshMeadowMessages();
    setMeadowZoom(meadowZoomValue);
  }
}

function initGardenMeadow() {
  if (!gardenMeadowPanel || !meadowViewport || !meadowWorld) return;
  resetMeadowForm();
  setMeadowZoom(meadowZoomValue);
  const initialMode = gardenModeButtons.find((button) => button.classList.contains("active"))?.dataset.gardenMode || "messages";
  setGardenMode(initialMode);
  gardenModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      playTone(520, activeColor);
      setGardenMode(button.dataset.gardenMode || "plant");
    });
  });
  meadowStart?.addEventListener("click", () => {
    resetMeadowForm();
    setMeadowState("compose");
  });
  meadowCompose?.addEventListener("submit", beginMeadowPlacement);
  meadowContent?.addEventListener("input", updateMeadowCount);
  [meadowHue, meadowLightness, meadowGray].forEach((control) => control?.addEventListener("input", updateMeadowColorFromSliders));
  meadowColorRandom?.addEventListener("click", () => {
    randomizeMeadowColorControlsAnimated();
    playTone(420 + Math.random() * 220, getMeadowColorFromControls());
  });
  meadowHex?.addEventListener("dblclick", () => meadowHex.removeAttribute("readonly"));
  meadowHex?.addEventListener("change", () => {
    const hex = normalizeHex(meadowHex.value);
    if (hex) setMeadowFlowerColor(hex);
    else updateMeadowColorFromSliders();
  });
  meadowZoom?.addEventListener("input", () => setMeadowZoom(meadowZoom.value));
  meadowContentExpand?.addEventListener("click", toggleMeadowContentExpand);
  meadowViewport.addEventListener("wheel", handleMeadowWheel, { passive: true });
  meadowViewport.addEventListener("scroll", syncMeadowViewportOverlays, { passive: true });
  meadowViewport.addEventListener("pointerdown", startMeadowDrag);
  meadowViewport.addEventListener("pointermove", moveMeadowDrag);
  meadowViewport.addEventListener("pointerup", endMeadowDrag);
  meadowViewport.addEventListener("pointercancel", endMeadowDrag);
  meadowViewport.addEventListener("click", (event) => {
    if (meadowSuppressClick) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.target.closest(".meadow-compose, .meadow-place-confirm, .meadow-cancel-modal, .meadow-viewer-card, .meadow-flower-marker")) return;
    if (meadowState === "placing") {
      const point = getMeadowPoint(event);
      if (point) showMeadowPlaceConfirm(point);
      return;
    }
    if (meadowState === "viewing") {
      closeMeadowViewer();
    }
  });
  meadowPlaceConfirm?.addEventListener("click", (event) => {
    const answer = event.target.closest("[data-place-answer]")?.dataset.placeAnswer;
    if (!answer) return;
    if (answer === "yes") confirmMeadowPlanting();
    else {
      meadowPendingPosition = null;
      setMeadowPositionCue(null);
      meadowPlaceConfirm.hidden = true;
    }
  });
  meadowCancel?.addEventListener("click", () => {
    if (meadowCancelModal) meadowCancelModal.hidden = false;
  });
  meadowCancelModal?.addEventListener("click", (event) => {
    const answer = event.target.closest("[data-cancel-answer]")?.dataset.cancelAnswer;
    if (!answer && !event.target.classList.contains("meadow-cancel-modal")) return;
    meadowCancelModal.hidden = true;
    if (answer === "yes") cancelMeadowDraft();
  });
  refreshMeadowMessages();
  window.addEventListener("resize", () => {
    if (!gardenMeadowPanel.hidden) setMeadowZoom(meadowZoomValue);
  });
}

function updateAlbumUI() {
  const track = backgroundTracks[backgroundTrackIndex];
  if (!track) return;
  const fullTitle = `${track.title} ${track.subtitle}`.trim();
  const isLongTitle = fullTitle.length > 24;
  const albumNow = albumNowTitle?.closest(".album-now");
  const trackFlower = getTrackFlower(track, backgroundTrackIndex);
  document.documentElement.style.setProperty("--current-track-color", track.color);
  if (trackFlower) {
    document.documentElement.style.setProperty("--current-track-flower", `url("${trackFlower}")`);
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
  updateSongPlayUI();
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
    clearSongPlayTimer();
    songPlayCountedKey = "";
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
    scheduleSongPlayCount();
    updateAlbumUI();
  }).catch(updateAlbumUI);
}

function syncBloomVisualToTrack(index) {
  const bloomKey = bloomKeyByTrackIndex[index];
  if (bloomInView && bloomKey && (bloomKey !== "hope" || hopeBloomUnlocked)) {
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
  window.clearTimeout(miniPlayerMobileCloseTimer);
  dismissMusicHint();
  miniPlayer?.classList.remove("is-click-collapsed");
  miniPlayer?.classList.add("is-open");
  soundToggle?.setAttribute("aria-expanded", "true");
  scheduleMobileMiniPlayerClose();
}

function closeMiniPlayer() {
  window.clearTimeout(miniPlayerCloseTimer);
  window.clearTimeout(miniPlayerMobileCloseTimer);
  miniPlayer?.classList.remove("is-open");
  soundToggle?.setAttribute("aria-expanded", "false");
}

function scheduleMiniPlayerClose() {
  if (!usesHover) return;
  window.clearTimeout(miniPlayerCloseTimer);
  miniPlayer?.classList.remove("is-click-collapsed");
  closeMiniPlayer();
}

function isMobileMiniPlayerMode() {
  return !usesHover || mobileMediaQuery.matches;
}

function scheduleMobileMiniPlayerClose() {
  window.clearTimeout(miniPlayerMobileCloseTimer);
  if (!isMobileMiniPlayerMode() || !miniPlayer?.classList.contains("is-open")) return;
  miniPlayerMobileCloseTimer = window.setTimeout(closeMiniPlayer, 5000);
}

function toggleMiniPlayerFromSoundToggle() {
  if (usesHover && !mobileMediaQuery.matches) {
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
  clearSongPlayTimer();
  if (!backgroundWanted) return;
  const nextIndex = (backgroundTrackIndex + 1) % backgroundTracks.length;
  const nextBloomKey = bloomKeyByTrackIndex[nextIndex];
  playBackground({ direction: 1, restart: true });
  if (bloomInView && nextBloomKey && (nextBloomKey !== "hope" || hopeBloomUnlocked)) {
    setBloomChoice(nextBloomKey, { playSfx: false, startTrack: false });
  }
});

backgroundAudio.addEventListener("timeupdate", updateProgressUI);
backgroundAudio.addEventListener("loadedmetadata", updateProgressUI);
backgroundAudio.addEventListener("play", () => {
  if (userActivatedAudio) syncBackgroundAnalysis({ anticipatePlay: true });
  scheduleSongPlayCount();
  updateAlbumUI();
});
backgroundAudio.addEventListener("pause", () => {
  clearSongPlayTimer();
  backgroundAnalysisAudio.pause();
  updateAlbumUI();
});
backgroundAudio.addEventListener("seeking", () => {
  clearSongPlayTimer();
  syncBackgroundAnalysis({ restart: true });
});
backgroundAudio.addEventListener("seeked", scheduleSongPlayCount);

soundPrevButton?.addEventListener("click", () => {
  scheduleMobileMiniPlayerClose();
  userActivatedAudio = true;
  backgroundWanted = true;
  primeBackgroundAnalysisFromGesture({ restart: true, anticipatePlay: true });
  skipBackgroundTrack(-1);
});

soundNextButton?.addEventListener("click", () => {
  scheduleMobileMiniPlayerClose();
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
miniPlayButton?.addEventListener("click", () => {
  scheduleMobileMiniPlayerClose();
  toggleBackgroundPlayback();
});

albumProgress?.addEventListener("input", () => {
  const duration = backgroundAudio.duration || 0;
  if (!duration) return;
  backgroundAudio.currentTime = (Number(albumProgress.value) / 1000) * duration;
  syncBackgroundAnalysis({ restart: true });
  updateProgressUI();
});

miniProgress?.addEventListener("input", () => {
  scheduleMobileMiniPlayerClose();
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

soundToggle?.addEventListener("pointerup", (event) => {
  if (!isMobileMiniPlayerMode()) return;
  event.preventDefault();
  event.stopPropagation();
  mobileSoundToggleHandledAt = Date.now();
  toggleMiniPlayerFromSoundToggle();
});

soundToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  if (isMobileMiniPlayerMode() && Date.now() - mobileSoundToggleHandledAt < 450) {
    return;
  }
  toggleMiniPlayerFromSoundToggle();
});

miniPlayerTitle?.addEventListener("click", () => {
  scheduleMobileMiniPlayerClose();
  smoothScrollToElement("#music");
  if (!usesHover) closeMiniPlayer();
});
musicTouchHint?.addEventListener("animationend", dismissMusicHint);

miniPlayer?.addEventListener("pointerdown", (event) => {
  if (!isMobileMiniPlayerMode() || !miniPlayer.classList.contains("is-open")) return;
  event.stopPropagation();
  scheduleMobileMiniPlayerClose();
});

document.addEventListener("pointerdown", (event) => {
  if (!isMobileMiniPlayerMode() || !miniPlayer?.classList.contains("is-open")) return;
  if (event.target?.closest?.("#mini-player")) return;
  scheduleMobileMiniPlayerClose();
});

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
  timeline.append(timelineEmptyNote, timelinePager);
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
  const insertBeforeNode = timelineEmptyNote || timelinePager || null;

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

function scrollVersionArchiveIntoView() {
  const target = versionArchive || document.getElementById("diary");
  if (!target) return;
  const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - 72);
  smoothScrollToTop(top);
  scheduleActiveSectionUpdate();
}

function setVersionArchiveMode(mode, options = {}) {
  const open = mode !== "closed";
  const allOpen = mode === "all";
  if (!open && options.scroll !== false) {
    scrollVersionArchiveIntoView();
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
    const bloomKey = button.dataset.bloom;
    playTone(button.dataset.tone, color);
    showToast(`${button.dataset.name} 正在綻放`);
    smoothScrollToElement(mobileMediaQuery.matches ? document.getElementById("bloom-title") || "#bloom" : "#bloom", mobileMediaQuery.matches ? { offset: MOBILE_BLOOM_ENTRY_SCROLL_OFFSET } : {});
    updateBloomHash(bloomKey);
    window.setTimeout(() => {
      if (bloomKey) setBloomChoice(bloomKey, { playToneFeedback: false });
    }, 520);
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

gardenExpandToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const expanded = !gardenSection?.classList.contains("is-garden-expanded");
  gardenSection?.classList.toggle("is-garden-expanded", expanded);
  gardenExpandToggle.setAttribute("aria-pressed", String(expanded));
  gardenExpandToggle.setAttribute("aria-label", expanded ? "縮小種花區域" : "放大種花區域");
});

livingGarden.addEventListener("pointerdown", (event) => {
  if (event.target.closest?.("#garden-expand-toggle")) return;
  const rect = livingGarden.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = 100 - ((event.clientY - rect.top) / rect.height) * 100;
  playTone(260 + Math.random() * 360, activeColor);
  plantFlower(activeColor, activeWord, Math.max(5, Math.min(95, x)), Math.max(5, Math.min(95, y)));
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

ensureTrackPlayBadges();
fetchSongPlayStats();

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
  const cards = [...document.querySelectorAll(".flower-card:not([hidden])")];
  const allFlipped = cards.length > 0 && cards.every((card) => card.classList.contains("flipped"));
  flipAllButton.textContent = allFlipped ? "關閉全部" : "翻開全部";
  flipAllButton.setAttribute("aria-pressed", String(allFlipped));
}

function openFlowerCardFromBloom(key) {
  const targetCard = document.querySelector(`.flower-card[data-flower-card="${key}"]`);
  if (!targetCard) return;
  if (key === "hope") revealHopeFlowerCard();
  document.querySelectorAll(".flower-card:not([hidden])").forEach((card) => {
    card.classList.remove("flipped");
  });
  updateFlipAllButton();
  smoothScrollToElement(targetCard, { block: "center" });
  window.setTimeout(() => {
    targetCard.classList.add("flipped");
    updateFlipAllButton();
    smoothScrollToElement(targetCard, { block: "center" });
  }, 520);
  playTone(392, getComputedStyle(targetCard).getPropertyValue("--card-color"));
}

function resetHopePalette() {
  hopePaletteStep = 0;
  bloomPalette?.dataset && (bloomPalette.dataset.hopeStep = "0");
  bloomPalette?.classList.remove("is-complete");
}

function setHopePaletteStep(step) {
  hopePaletteStep = Math.max(0, Math.min(8, step));
  if (bloomPalette) {
    bloomPalette.dataset.hopeStep = String(hopePaletteStep);
    bloomPalette.classList.toggle("is-complete", hopePaletteStep >= 8);
  }
}

function advanceHopePalette() {
  if (!bloomLab?.classList.contains("entered") || bloomLab.classList.contains("has-bloom")) return;
  if (hopePaletteStep < 8) {
    setHopePaletteStep(hopePaletteStep + 1);
    playTone(392 + hopePaletteStep * 18, bloomChoices.hope.color);
    showToast(hopePaletteStep < 8 ? `希望花瓣 ${hopePaletteStep} / 8` : "希望已經準備綻放");
    return;
  }
  updateBloomHash("hope");
  setBloomChoice("hope", { playToneFeedback: true });
}

function revealHopeFlowerCard() {
  const hopeCard = document.querySelector('.flower-card[data-flower-card="hope"]');
  if (!hopeCard) return;
  hopeCard.hidden = false;
  hopeCard.classList.add("visible");
  updateFlipAllButton();
}

function unlockHopeBloom() {
  if (hopeBloomUnlocked) return;
  hopeBloomUnlocked = true;
  updateHopeAlbumArtworkVisibility();
  revealHopeFlowerCard();
}

function resetBloomLabToEntry() {
  if (!bloomLab || !bloomMessage || !bloomPlant || !bloomCard) return;
  pendingBloomEntryKey = "";
  lastBloomKey = "";
  flowerMusicActive = false;
  window.clearTimeout(bloomPauseResumeTimer);
  window.clearTimeout(bloomLeaveTimer);
  resetHopePalette();
  bloomLab.classList.remove("entered", "has-bloom", "has-hope-bloom");
  bloomLab.style.setProperty("--bloom-color", bloomChoices.green.color);
  bloomMessage.textContent = "";
  bloomMessage.style.animation = "none";
  bloomPlant.classList.remove("is-blooming", "is-changing");
  bloomCard.classList.remove("show");
  bloomCard.setAttribute("aria-hidden", "true");
  bloomCard.setAttribute("tabindex", "-1");
  delete bloomCard.dataset.bloomCard;
  document.querySelectorAll(".bloom-seed").forEach((seed) => seed.classList.remove("active"));
  flowerAudio.pause();
  clearAudioFade(flowerAudio);
  flowerAudio.currentTime = 0;
  bloomSfxAudio.pause();
  clearAudioFade(bloomSfxAudio);
  bloomSfxAudio.currentTime = 0;
  bloomSfxAudio.onended = null;
  setAudioVolume(bloomSfxAudio, 1);
  if (getBloomKeyFromHash()) history.replaceState(null, "", "#bloom");
  showToast("已回到花園入口");
}

function getBloomKeyFromHash(hash = window.location.hash) {
  let rawHash = String(hash || "").replace(/^#/, "");
  try {
    rawHash = decodeURIComponent(rawHash);
  } catch {
    return null;
  }
  rawHash = rawHash.trim().toLowerCase();
  if (!rawHash.endsWith(BLOOM_DEEP_LINK_SUFFIX)) return null;
  const rawKey = rawHash.slice(0, -BLOOM_DEEP_LINK_SUFFIX.length);
  const key = bloomDeepLinkAliases[rawKey] || rawKey;
  return bloomChoices[key] ? key : null;
}

function getBloomHashForKey(key) {
  const publicKey = bloomPublicHashKeys[key] || key;
  return `#${publicKey}${BLOOM_DEEP_LINK_SUFFIX}`;
}

function updateBloomHash(key, { replace = false } = {}) {
  if (!key || !bloomChoices[key]) return;
  const nextHash = getBloomHashForKey(key);
  if (window.location.hash === nextHash) return;
  history[replace ? "replaceState" : "pushState"](null, "", nextHash);
}

function prepareBloomDeepLinkEntry(key, { replaceHash = false } = {}) {
  if (!key || !bloomChoices[key] || !bloomLab) return false;
  pendingBloomEntryKey = key;
  const choice = bloomChoices[key];
  const bloomTarget = mobileMediaQuery.matches ? document.getElementById("bloom-title") || "#bloom" : "#bloom";
  const scrollOptions = mobileMediaQuery.matches ? { offset: MOBILE_BLOOM_ENTRY_SCROLL_OFFSET } : {};
  updateBloomHash(key, { replace: replaceHash });
  window.clearTimeout(bloomPauseResumeTimer);
  window.clearTimeout(bloomLeaveTimer);
  lastBloomKey = "";
  flowerMusicActive = false;
  resetHopePalette();
  bloomLab.classList.remove("entered", "has-bloom", "has-hope-bloom");
  bloomLab.style.setProperty("--bloom-color", choice.color);
  bloomMessage.textContent = "";
  bloomMessage.style.animation = "none";
  bloomPlant?.classList.remove("is-blooming", "is-changing");
  bloomCard?.classList.remove("show");
  bloomCard?.setAttribute("aria-hidden", "true");
  bloomCard?.setAttribute("tabindex", "-1");
  document.querySelectorAll(".bloom-seed").forEach((seed) => {
    seed.classList.toggle("active", seed.dataset.bloom === key);
  });
  showToast("點擊進入花園，讓花朵綻放");
  smoothScrollToElement(bloomTarget, scrollOptions);
  return true;
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
    const cards = [...document.querySelectorAll(".flower-card:not([hidden])")];
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

async function setBloomChoice(key = "green", { playSfx = true, startTrack = true, triggerDelay = 0, playToneFeedback = false } = {}) {
  if (!bloomLab || !bloomMessage || !bloomPlant || !bloomCard) return;
  const choice = bloomChoices[key] || bloomChoices.green;
  const bloomPetals = bloomPlant.querySelectorAll(".bloom-flower span");
  const bloomRedPetalCap = bloomPlant.querySelector(".bloom-red-petal-cap");
  const bloomImage = bloomCard.querySelector("img");
  const trackIndex = bloomTrackByKey[key];
  const petalColors = choice.petals || Array.from({ length: bloomPetals.length }, () => choice.color);

  lastBloomKey = key;
  flowerMusicActive = false;
  window.clearTimeout(bloomPauseResumeTimer);
  window.clearTimeout(bloomLeaveTimer);
  window.clearTimeout(bloomCardRevealTimer);
  resetHopePalette();
  const hadVisibleBloom = bloomLab.classList.contains("has-bloom") && bloomPlant.classList.contains("is-blooming");
  if (hadVisibleBloom) bloomPlant.classList.add("is-changing");
  else bloomPlant.classList.remove("is-blooming");
  bloomCard.classList.remove("show");
  bloomCard.setAttribute("aria-hidden", "true");
  bloomCard.setAttribute("tabindex", "-1");

  document.querySelectorAll(".bloom-seed").forEach((seed) => {
    seed.classList.toggle("active", seed.dataset.bloom === key);
  });

  if (hadVisibleBloom) {
    await wait(560);
    if (lastBloomKey !== key) return;
    bloomPlant.classList.remove("is-blooming");
  }

  bloomLab.classList.add("entered");
  bloomLab.classList.add("has-bloom");
  bloomLab.classList.toggle("has-hope-bloom", key === "hope");
  if (key === "hope") unlockHopeBloom();
  bloomLab.style.setProperty("--bloom-color", choice.color);
  bloomMessage.textContent = choice.message;
  bloomMessage.style.animation = "none";

  bloomPetals.forEach((petal, index) => {
    petal.style.setProperty("--petal-color", petalColors[index] || choice.color);
  });
  bloomRedPetalCap?.style.setProperty("--petal-color", petalColors[0] || choice.color);

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

  const revealBloom = () => {
    if (lastBloomKey !== key) return;
    if (playToneFeedback) playTone(choice.tone, choice.color);
    bloomPlant.classList.remove("is-changing");
    bloomMessage.style.animation = "";
    window.requestAnimationFrame(() => {
      if (lastBloomKey !== key) return;
      bloomPlant.classList.add("is-blooming");
    });
    bloomCardRevealTimer = window.setTimeout(() => {
      if (lastBloomKey !== key) return;
      bloomCard.classList.add("show");
      bloomCard.setAttribute("aria-hidden", "false");
      bloomCard.setAttribute("tabindex", "0");
    }, 1500);
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

  if (triggerDelay > 0) {
    await wait(triggerDelay);
    if (lastBloomKey !== key) return;
  }

  if (playSfx && choice.bloom) {
    bloomSfxAudio.src = choice.bloom;
    bloomSfxAudio.onended = startSelectedTrack;
    const started = await playAudioWhenReady(bloomSfxAudio);
    if (lastBloomKey !== key) return;
    revealBloom();
    if (!started) startSelectedTrack();
  } else {
    revealBloom();
    startSelectedTrack();
  }
}

if (bloomLab) {
  bloomLab.style.setProperty("--bloom-color", bloomChoices.green.color);
  resetHopePalette();
  startBloomButton?.addEventListener("click", () => {
    if (pendingBloomEntryKey) {
      const key = pendingBloomEntryKey;
      pendingBloomEntryKey = "";
      setBloomChoice(key, { playToneFeedback: true });
      return;
    }
    resetHopePalette();
    bloomLab.classList.add("entered");
    bloomLab.classList.remove("has-hope-bloom");
    document.querySelectorAll(".bloom-seed").forEach((seed) => seed.classList.remove("active"));
    showToast("秘密花園已開啟");
  });

  bloomResetToggle?.addEventListener("click", () => {
    resetBloomLabToEntry();
    playTone(392, "#ffd166");
  });

  bloomPaletteCenter?.addEventListener("click", (event) => {
    event.stopPropagation();
    advanceHopePalette();
  });

  bloomPaletteCenter?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    advanceHopePalette();
  });

  document.querySelectorAll(".bloom-seed").forEach((seed) => {
    seed.addEventListener("click", () => {
      pendingBloomEntryKey = "";
      resetHopePalette();
      updateBloomHash(seed.dataset.bloom);
      setBloomChoice(seed.dataset.bloom, { triggerDelay: 200 });
    });
  });

  const initialBloomDeepLink = getBloomKeyFromHash();
  if (initialBloomDeepLink) {
    window.setTimeout(() => {
      prepareBloomDeepLinkEntry(initialBloomDeepLink, { replaceHash: true });
    }, 120);
  }
}

window.addEventListener("hashchange", () => {
  const bloomKey = getBloomKeyFromHash();
  if (!bloomKey) return;
  prepareBloomDeepLinkEntry(bloomKey, { replaceHash: true });
});

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

window.addEventListener(
  "pointerdown",
  (event) => {
    if (!backgroundAudio.src && !isPlaybackControlTarget(event.target)) return;
    primeBackgroundAnalysisFromGesture({ anticipatePlay: backgroundAudio.paused });
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

function fitDailyPhraseFont() {
  if (!dailyPhrase) return;
  const feature = dailyPhrase.closest(".diary-feature");
  if (!feature) return;

  if (!mobileMediaQuery.matches) {
    feature.style.removeProperty("--diary-quote-font-size");
    return;
  }

  const featureStyle = getComputedStyle(feature);
  const inlinePadding = Number.parseFloat(featureStyle.paddingLeft) + Number.parseFloat(featureStyle.paddingRight);
  const availableWidth = Math.max(160, feature.clientWidth - inlinePadding);
  const availableHeight = Math.max(82, dailyPhrase.clientHeight || feature.clientHeight * 0.36);
  const measuringCanvas = fitDailyPhraseFont.canvas || (fitDailyPhraseFont.canvas = document.createElement("canvas"));
  const measureContext = measuringCanvas.getContext("2d");
  const minSize = 24;
  const maxSize = 42;

  const textFits = (size) => {
    measureContext.font = `700 ${size}px "Noto Serif TC", "Cormorant Garamond", serif`;
    if (size * 1.35 * 2 > availableHeight + 3) return false;
    return dailyPhrases.every((phrase) => {
      const lines = normalizeDailyPhrase(phrase).split("\n").filter(Boolean);
      if (lines.length > 2) return false;
      if (lines.length > 1) {
        return lines.every((line) => measureContext.measureText(line).width <= availableWidth);
      }
      const width = measureContext.measureText(lines[0] || "").width;
      return width <= availableWidth * 1.92;
    });
  };

  let chosenSize = minSize;
  for (let size = maxSize; size >= minSize; size -= 1) {
    if (textFits(size)) {
      chosenSize = size;
      break;
    }
  }
  feature.style.setProperty("--diary-quote-font-size", `${chosenSize}px`);
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
fitDailyPhraseFont();
document.fonts?.ready?.then(fitDailyPhraseFont);

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

window.addEventListener("resize", fitDailyPhraseFont);
initMessageBoard();
initGardenMeadow();

resizeCanvas();
drawPetals();
window.addEventListener("resize", scheduleCanvasResize, { passive: true });

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
