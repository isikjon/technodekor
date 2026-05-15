const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const headerActions = document.querySelector(".header-actions");
const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const toast = document.querySelector("[data-toast]");
const solutionPanel = document.querySelector("[data-solution-panel]");

const solutions = {
  homes: {
    eyebrow: "ИЖС дома",
    title: "Каменный дом за 3–5 дней",
    text: "Готовый тёплый контур, фасадные сценарии и понятная сборка для частного строительства.",
    action: "Подобрать проект ИЖС",
    bullets: ["экологичность и пожаробезопасность", "снижение ошибок на стройке", "готовые фасадные сценарии"],
  },
  business: {
    eyebrow: "Административные и коммерческие",
    title: "Корпус для бизнеса и общественных объектов",
    text: "Офисы, магазины, сервисные центры и общественные здания с прогнозируемой сметой.",
    action: "Получить решение для бизнеса",
    bullets: ["быстрая оболочка здания", "варианты отделки под бренд", "попап и лид-форма для ТЗ"],
  },
  partitions: {
    eyebrow: "Межкомнатные перегородки",
    title: "Ровные перегородки без мокрой стройки",
    text: "Листовые решения для зонирования, технических помещений и коммерческих интерьеров.",
    action: "Рассчитать перегородки",
    bullets: ["аккуратная геометрия", "стабильность размеров", "подходит для серийных объектов"],
  },
  fences: {
    eyebrow: "Заборы и ограждения",
    title: "Ограждения в архитектуре участка",
    text: "Секции, фактуры, ворота и сценарии для частных домов и коттеджных посёлков.",
    action: "Открыть страницу ограждений",
    bullets: ["единый стиль с домом", "быстрое производство секций", "варианты фактур и цветов"],
  },
  shore: {
    eyebrow: "Берегоукрепление",
    title: "Инженерные решения для сложных участков",
    text: "Экспертная заявка: задача, фото участка, город и контакт инженера.",
    action: "Отправить задачу инженеру",
    bullets: ["анкета объекта", "консультация специалиста", "технический расчёт"],
  },
  modules: {
    eyebrow: "Глэмпинги, НТО и хаусботы",
    title: "Модули для туризма, торговли и отдыха",
    text: "Форматы «Скала», «Круг», НТО и хаусботы через один понятный шаблон.",
    action: "Получить презентацию модулей",
    bullets: ["быстрый старт продаж", "модели для разных сценариев", "форма для партнёров и девелоперов"],
  },
};

function openModal(title = "Получить консультацию") {
  modalTitle.textContent = title;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  headerActions.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.openModal));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

document.querySelectorAll("[data-solution]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-solution]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const item = solutions[button.dataset.solution];
    solutionPanel.innerHTML = `
      <div>
        <p class="eyebrow">${item.eyebrow}</p>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <button class="btn" type="button" data-open-modal="${item.action}">${item.action}</button>
      </div>
      <ul>${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
    `;
    solutionPanel.querySelector("[data-open-modal]").addEventListener("click", () => openModal(item.action));
  });
});

document.querySelectorAll("[data-widget]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-widget]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const [title, meta] = button.dataset.widget.split("|");
    document.querySelector("[data-widget-title]").textContent = title;
    document.querySelector("[data-widget-meta]").textContent = meta;
  });
});

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formName = form.dataset.form;
    closeModal();
    form.reset();
    showToast(`${formName}: форма готова, в Tilda подключить к CRM/почте.`);
  });
});
