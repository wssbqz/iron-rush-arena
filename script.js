const units = {
  vanguard: {
    code: "AX-17",
    name: "赤核先锋",
    line: "高机动突击型，以等离子拳刃撕开防线。",
    power: 88,
    armor: 72,
    speed: 94,
  },
  sentinel: {
    code: "BK-02",
    name: "黑塔哨兵",
    line: "重装守卫型，肩部磁轨盾阵压制赛道。",
    power: 81,
    armor: 96,
    speed: 58,
  },
  wraith: {
    code: "VL-44",
    name: "幽蓝瞬影",
    line: "光学扰动型，在雨幕里留下错位残影。",
    power: 74,
    armor: 63,
    speed: 99,
  },
};

const activeUnitCode = document.querySelector("#activeUnitCode");
const activeUnitName = document.querySelector("#activeUnitName");
const activeUnitLine = document.querySelector("#activeUnitLine");
const powerMeter = document.querySelector("#powerMeter");
const armorMeter = document.querySelector("#armorMeter");
const speedMeter = document.querySelector("#speedMeter");
const machineButtons = document.querySelectorAll(".machine-card");
const teaserModal = document.querySelector("#teaserModal");
const modalOpeners = document.querySelectorAll("[data-open-modal]");
const modalClosers = document.querySelectorAll("[data-close-modal]");
const boostButton = document.querySelector("#boostButton");
const arenaConsole = document.querySelector(".arena-console");
const heatValue = document.querySelector("#heatValue");
const accessForm = document.querySelector("#accessForm");
const pilotName = document.querySelector("#pilotName");
const formStatus = document.querySelector("#formStatus");

let heat = 61;

function setUnit(unitKey) {
  const unit = units[unitKey];

  activeUnitCode.textContent = unit.code;
  activeUnitName.textContent = unit.name;
  activeUnitLine.textContent = unit.line;
  powerMeter.value = unit.power;
  armorMeter.value = unit.armor;
  speedMeter.value = unit.speed;

  machineButtons.forEach((button) => {
    const isActive = button.dataset.unit === unitKey;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function openModal() {
  if (typeof teaserModal.showModal === "function") {
    teaserModal.showModal();
    return;
  }

  teaserModal.setAttribute("open", "");
}

function closeModal() {
  if (typeof teaserModal.close === "function") {
    teaserModal.close();
    return;
  }

  teaserModal.removeAttribute("open");
}

machineButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  button.addEventListener("click", () => setUnit(button.dataset.unit));
});

modalOpeners.forEach((button) => {
  button.addEventListener("click", openModal);
});

modalClosers.forEach((button) => {
  button.addEventListener("click", closeModal);
});

boostButton.addEventListener("click", () => {
  heat = Math.min(99, heat + 8);
  heatValue.textContent = `${heat}%`;
  arenaConsole.classList.add("boosted");
  boostButton.querySelector("span:last-child").textContent = heat >= 99 ? "信号已满" : "继续提升";

  window.setTimeout(() => {
    arenaConsole.classList.remove("boosted");
  }, 420);
});

accessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = pilotName.value.trim() || "UNKNOWN";
  formStatus.textContent = `${name} 已接入闭测候补队列`;
  formStatus.classList.add("success");
  accessForm.classList.add("submitted");
});
