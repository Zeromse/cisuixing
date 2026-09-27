const stages = {
  "CW-1": {
    title: "雪尽",
    desc: "年关前的第一段路。雪线退去后，古驿道露出了被灯影遮住的旧痕。",
    level: "Lv. 35",
    cost: "9",
    reward: "源石",
    modal: "适合熟悉活动机制的前哨关卡。敌方路线清晰，但会频繁试探侧路。"
  },
  "CW-2": {
    title: "归灯",
    desc: "灯队在风里走得很慢。有人记得回家的路，也有人只记得离开的方向。",
    level: "精英 1 Lv. 1",
    cost: "12",
    reward: "票据",
    modal: "场地存在可部署高台。优先处理快速单位，能明显降低防线压力。"
  },
  "CW-3": {
    title: "旧巷",
    desc: "巷口的门牌被烟熏黑了一半，剩下的一半刻着早已无人提起的名字。",
    level: "剧情",
    cost: "0",
    reward: "档案",
    modal: "剧情节点已解锁。阅读后可获得活动票据，并更新情报档案。"
  },
  "CW-4": {
    title: "岁火",
    desc: "烟花亮起的时候，藏在屋檐下的影子也短暂拥有了轮廓。",
    level: "精英 1 Lv. 30",
    cost: "15",
    reward: "家具",
    modal: "精英敌人会在中段出现。建议保留爆发技能，应对第二波压力。"
  },
  "CW-5": {
    title: "长街",
    desc: "长街一眼望不到头。人群、灯影、脚步声，像一条仍在醒来的河。",
    level: "精英 1 Lv. 50",
    cost: "18",
    reward: "材料",
    modal: "路线交叉较多。分线阻挡与治疗覆盖决定通关稳定度。"
  },
  "CW-EX": {
    title: "辞岁",
    desc: "当最后一盏灯被举起，旧岁并未离去，只是安静地坐到了回忆里。",
    level: "精英 2 Lv. 10",
    cost: "21",
    reward: "蚀刻章",
    modal: "高难关卡。敌人强度和行动节奏上升，需要提前规划技能轴。"
  }
};

const viewMessages = {
  story: "已切换至剧情路线。",
  combat: "已切换至作战视图。",
  shop: "已打开岁集兑换入口。",
  intel: "情报档案已载入。"
};

const selectedCode = document.querySelector("#selected-code");
const selectedTitle = document.querySelector("#selected-title");
const selectedDesc = document.querySelector("#selected-desc");
const selectedLevel = document.querySelector("#selected-level");
const selectedCost = document.querySelector("#selected-cost");
const selectedReward = document.querySelector("#selected-reward");
const activityLog = document.querySelector("#activity-log");
const toast = document.querySelector("#toast");
const modal = document.querySelector("#stage-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCopy = document.querySelector("#modal-copy");

let activeStage = "CW-1";
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = message;
  activityLog.prepend(item);

  while (activityLog.children.length > 4) {
    activityLog.lastElementChild.remove();
  }
}

function selectStage(code) {
  const stage = stages[code];
  activeStage = code;

  selectedCode.textContent = code;
  selectedTitle.textContent = stage.title;
  selectedDesc.textContent = stage.desc;
  selectedLevel.textContent = stage.level;
  selectedCost.textContent = stage.cost;
  selectedReward.textContent = stage.reward;

  document.querySelectorAll(".stage").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.stage === code);
  });

  addLog(`已选择 ${code} / ${stage.title}`);
}

document.querySelectorAll(".stage").forEach((button) => {
  button.addEventListener("click", () => {
    selectStage(button.dataset.stage);
  });
});

document.querySelector("#start-stage").addEventListener("click", () => {
  const stage = stages[activeStage];
  modalTitle.textContent = `${activeStage} ${stage.title}`;
  modalCopy.textContent = stage.modal;

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    showToast(`${activeStage} 行动简报已打开`);
  }
});

document.querySelector("#read-story").addEventListener("click", () => {
  const stage = stages[activeStage];
  showToast(`正在回放「${stage.title}」剧情`);
  addLog(`剧情回看：${stage.title}`);
});

document.querySelector(".audio-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const active = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!active));
  showToast(active ? "环境音已关闭" : "环境音已开启");
});

document.querySelectorAll(".rail__item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".rail__item").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    showToast(viewMessages[button.dataset.view]);
    addLog(viewMessages[button.dataset.view]);
  });
});

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.remove("is-active");
      tab.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("is-active"));

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    document.querySelector(`#${button.dataset.panel}`).classList.add("is-active");
  });
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

document.querySelector(".rail__back").addEventListener("click", () => {
  showToast("已返回活动总览");
  addLog("活动总览已刷新。");
});

document.querySelector(".modal__start").addEventListener("click", () => {
  showToast(`${activeStage} 编队确认`);
  addLog(`${activeStage} 行动准备中。`);
});
