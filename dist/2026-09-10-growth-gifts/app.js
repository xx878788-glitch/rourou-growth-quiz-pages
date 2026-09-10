(function () {
  const data = window.QUIZ_DATA;
  if (!data || !Array.isArray(data.choices)) return;

  const choices = document.getElementById("choices");
  const result = document.getElementById("result");
  const status = document.getElementById("status");
  const fields = {
    image: document.getElementById("result-image"),
    symbol: document.getElementById("result-symbol"),
    kicker: document.getElementById("result-kicker"),
    title: document.getElementById("result-title"),
    summary: document.getElementById("result-summary"),
    state: document.getElementById("result-state"),
    block: document.getElementById("result-block"),
    practice: document.getElementById("result-practice"),
    quote: document.getElementById("result-quote")
  };

  data.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice choice-${choice.id.toLowerCase()}`;
    button.dataset.choice = choice.id;
    button.setAttribute("aria-controls", "result");
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `
      <img src="${choice.image}" alt="${choice.imageAlt}">
      <span class="choice-copy">
        <b>${choice.id}</b>
        <span><strong>${choice.label}</strong><small>${choice.hint}</small></span>
      </span>
    `;
    button.addEventListener("click", () => showResult(choice, button));
    choices.appendChild(button);
  });

  function showResult(choice, button) {
    document.querySelectorAll(".choice").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    fields.image.src = choice.image;
    fields.image.alt = choice.imageAlt;
    fields.symbol.textContent = choice.symbol;
    fields.kicker.textContent = choice.kicker;
    fields.title.textContent = choice.title;
    fields.summary.textContent = choice.summary;
    fields.state.textContent = choice.state;
    fields.block.textContent = choice.block;
    fields.practice.textContent = choice.practice;
    fields.quote.textContent = choice.quote;
    result.dataset.choice = choice.id.toLowerCase();
    result.hidden = false;
    status.textContent = `已顯示 ${choice.label} 的解析`;
    requestAnimationFrame(() => result.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  document.getElementById("reset").addEventListener("click", () => {
    result.hidden = true;
    document.querySelectorAll(".choice").forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });
    status.textContent = "已重設測驗";
    document.querySelector(".quiz-heading").scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
