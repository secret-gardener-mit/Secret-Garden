const pageArchive = document.getElementById("version-page-archive");
const allToggle = document.getElementById("version-page-all-toggle");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = document.getElementById("theme-toggle-label");
const petalCanvas = document.getElementById("petal-canvas");
const petalContext = petalCanvas?.getContext("2d");
const versionBackLink = document.getElementById("version-back-link");

const themeLabels = {
  light: "深色",
  dark: "淺色",
};

const savedTheme = localStorage.getItem("secret-garden-theme") || "light";
document.body.dataset.theme = savedTheme;

function syncThemeButton() {
  const currentTheme = document.body.dataset.theme || "light";
  if (themeToggleLabel) themeToggleLabel.textContent = themeLabels[currentTheme] || "深色";
  themeToggle?.setAttribute("aria-label", `切換到${themeLabels[currentTheme] || "深色"}主題`);
}

syncThemeButton();

versionBackLink?.addEventListener("click", (event) => {
  const openerWindow = window.opener;
  if (!openerWindow || openerWindow.closed) return;

  event.preventDefault();
  openerWindow.focus();
  window.close();

  window.setTimeout(() => {
    if (!window.closed) window.location.href = versionBackLink.href;
  }, 120);
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem("secret-garden-theme", nextTheme);
  themeToggle.classList.remove("is-switching");
  void themeToggle.offsetWidth;
  themeToggle.classList.add("is-switching");
  window.setTimeout(() => themeToggle.classList.remove("is-switching"), 760);
  syncThemeButton();
});

function prepareVersionItems() {
  document.querySelectorAll(".version-page .version-item").forEach((item) => {
    if (item.querySelector(".version-item-toggle")) return;
    const heading = item.querySelector(".version-item-heading");
    const body = item.querySelector("p");
    if (!heading || !body) return;

    const toggle = document.createElement("button");
    toggle.className = "version-item-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");

    const arrow = document.createElement("i");
    arrow.className = "version-item-arrow";
    arrow.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    content.className = "version-item-content";

    const contentInner = document.createElement("div");
    contentInner.className = "version-item-content-inner";

    toggle.append(heading, arrow);
    contentInner.appendChild(body);
    content.appendChild(contentInner);
    item.append(toggle, content);

    toggle.addEventListener("click", () => {
      item.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(item.classList.contains("is-open")));
      syncAllToggleState();
    });
  });
}

function syncAllToggleState() {
  const items = [...document.querySelectorAll(".version-page .version-item")];
  const allOpen = items.length > 0 && items.every((item) => item.classList.contains("is-open"));
  pageArchive?.classList.toggle("is-all-open", allOpen);
  allToggle?.setAttribute("aria-expanded", String(allOpen));
}

function setAllVersions(open) {
  document.querySelectorAll(".version-page .version-item").forEach((item) => {
    item.classList.toggle("is-open", open);
    item.querySelector(".version-item-toggle")?.setAttribute("aria-expanded", String(open));
  });
  syncAllToggleState();
}

prepareVersionItems();

allToggle?.addEventListener("click", () => {
  const allOpen = pageArchive?.classList.contains("is-all-open");
  setAllVersions(!allOpen);
});

const petals = [];
const petalColors = ["#e94545", "#ff7b59", "#ffd166", "#60d394", "#4d96ff", "#5048f4", "#9b5de5", "#acbe9a", "#fff8ec"];

function resizePetalCanvas() {
  if (!petalCanvas) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  petalCanvas.width = width * ratio;
  petalCanvas.height = height * ratio;
  petalCanvas.style.width = `${width}px`;
  petalCanvas.style.height = `${height}px`;
  petalContext?.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function makePetal(initial = false) {
  return {
    x: Math.random() * window.innerWidth,
    y: initial ? Math.random() * window.innerHeight : -24,
    size: 7 + Math.random() * 12,
    speed: 0.26 + Math.random() * 0.58,
    drift: -0.22 + Math.random() * 0.44,
    angle: Math.random() * Math.PI * 2,
    spin: -0.012 + Math.random() * 0.024,
    color: petalColors[Math.floor(Math.random() * petalColors.length)],
    alpha: 0.34 + Math.random() * 0.4,
  };
}

function seedPetals() {
  petals.length = 0;
  const count = window.innerWidth < 680 ? 28 : 52;
  for (let index = 0; index < count; index += 1) petals.push(makePetal(true));
}

function drawPetals() {
  if (!petalContext || !petalCanvas) return;
  petalContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  petals.forEach((petal) => {
    petal.x += petal.drift;
    petal.y += petal.speed;
    petal.angle += petal.spin;
    if (petal.y > window.innerHeight + 40) Object.assign(petal, makePetal(false));

    petalContext.save();
    petalContext.translate(petal.x, petal.y);
    petalContext.rotate(petal.angle);
    petalContext.globalAlpha = petal.alpha;
    petalContext.fillStyle = petal.color;
    petalContext.beginPath();
    petalContext.ellipse(0, 0, petal.size * 0.42, petal.size, 0, 0, Math.PI * 2);
    petalContext.fill();
    petalContext.restore();
  });
  window.requestAnimationFrame(drawPetals);
}

resizePetalCanvas();
seedPetals();
drawPetals();

let resizeTimer = 0;
window.addEventListener(
  "resize",
  () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resizePetalCanvas();
      seedPetals();
    }, 140);
  },
  { passive: true }
);
