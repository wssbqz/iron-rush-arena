const units = {
  vanguard: {
    code: "QF-01",
    name: "青霜剑派",
    line: "剑路清寒，擅以快剑破阵，三尺青锋不染尘。",
    power: 91,
    armor: 76,
    speed: 95,
  },
  sentinel: {
    code: "CY-08",
    name: "赤羽刀盟",
    line: "刀势沉烈，擅以重刀压场，火羽一落定胜负。",
    power: 96,
    armor: 88,
    speed: 64,
  },
  wraith: {
    code: "MY-12",
    name: "墨隐楼",
    line: "身法如墨，擅隐踪奇袭，半步之间换天地。",
    power: 78,
    armor: 66,
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
const heroName = document.querySelector("#heroName");
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
  boostButton.querySelector("span:last-child").textContent = heat >= 99 ? "灯阵已盛" : "再添灯火";

  window.setTimeout(() => {
    arenaConsole.classList.remove("boosted");
  }, 420);
});

accessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = heroName.value.trim() || "无名侠客";
  formStatus.textContent = `${name} 已收入试剑帖`;
  formStatus.classList.add("success");
  accessForm.classList.add("submitted");
});
