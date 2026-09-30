const interpretations = {
  A: {
    title: '現在先讓自己休息',
    lead: '你第一眼走進那間有燈光的房間，也許是因為你很久沒有一段真正屬於自己的安靜時間',
    now: '最近的你可能一直在撐，事情做完一件又來一件，連躺下來時腦袋都還在排明天的進度\n\n你看起來照常上班、回訊息、處理生活，心裡卻常冒出「我怎麼連這點事都覺得累」，有時候連喜歡的事也提不起勁',
    stuck: '你一停下來，就擔心進度被別人追過，於是休息變成另一件需要說服自己的事\n\n身體坐在椅子上，心裡仍在算還有多少事情沒做，越想趕快恢復以前的狀態，越難真正放鬆',
    step: '今晚挑一件可以晚點做的事，真的讓它晚點再做\n\n好好吃一頓飯，或提早半小時放下手機，先給自己一段不需要交代進度的時間，明天再看看有沒有力氣處理下一件事',
    note: '飛不起來的時候，掃帚可以先放在一旁，你不用每一天都證明自己還能飛'
  },
  B: {
    title: '先找回自己的方向',
    lead: '你看見通往海邊的路，心裡可能還是很想往前，只是最近不太確定自己的力氣該放在哪裡',
    now: '你有在努力，也試了不少方法，看到有人做得很快，會忍不住想自己是不是選錯了方向\n\n今天想學這個，明天又覺得另一條路比較好，忙了一整天，到了晚上卻說不出自己往哪裡靠近了一點',
    stuck: '你可能很怕把時間花在一條最後走不通的路上，所以一直想先找到最好的答案\n\n每次才走出一小段，就急著回頭檢查別人的路，自己的方向很難走出足夠長的距離讓你看見變化',
    step: '先寫下這個星期最想靠近的一件事，選一件就好\n\n替它留二十分鐘，做完後記下自己比昨天多知道了什麼，七天後再決定要繼續還是調整，現在先走這一段',
    note: '你不用一次看見整片天空，先知道下一個轉彎在哪裡，就能往前走了'
  },
  C: {
    title: '讓一個人陪你走一段',
    lead: '你選了有人一起吃麵包的畫面，也許你現在最想要的，是一個可以不用說「我沒事」的人',
    now: '別人問你好不好，你常常說還好啦，回去再自己慢慢消化，因為你怕心事說出口會麻煩對方\n\n你很會接住別人的情緒，輪到自己的時候卻只想先藏起來，最近可能連平常會聯絡的人都少聊了',
    stuck: '你總想等自己整理好了，再去見朋友，於是越難受越安靜，對方也無從知道你其實需要一點陪伴\n\n有些心情可以邊說邊弄清楚，不需要先準備一份完整的解釋，才有資格找人吃飯',
    step: '想一個你不用逞強的人，傳一句「最近有點卡住，找天一起吃飯嗎」\n\n見面時不必立刻聊低潮，先吃東西、聊聊今天發生的事，等你想說的時候再說',
    note: '柔柔想跟你說，你可以繼續努力，也可以讓人陪你走一小段'
  },
  D: {
    title: '先留下第一筆就好',
    lead: '你看見窗邊的空白筆記本，心裡可能有一件想做的事，已經想了很久，卻遲遲沒寫下第一筆',
    now: '你可能查過資料、存過範例，也在腦中排過好多次步驟，連做不好會怎樣都預演過了\n\n你其實有不少想法，只是每次要開始，就覺得今天狀態不夠好，或還少準備了什麼',
    stuck: '你希望第一版就能看出成果，於是每一步都像在替自己打分數，越想做好越難動手\n\n空白頁放得越久，開始這件事在心裡就越像一道很大的考題，連十分鐘的小嘗試也變得沉重',
    step: '把那件事縮到十分鐘內做得完，寫第一句、畫第一筆，或只把材料打開排好\n\n做完就停也可以，今天只要留下一點明天能接著做的痕跡，不用急著拿給任何人看',
    note: '手感會在一次次動手裡慢慢回來，第一筆可以很普通，下一筆才有地方接上'
  }
};

const buttons = [...document.querySelectorAll('.choice')];
const result = document.querySelector('#result');
const fields = {
  letter: document.querySelector('#result-letter'),
  title: document.querySelector('#result-title'),
  lead: document.querySelector('#result-lead'),
  now: document.querySelector('#result-now'),
  stuck: document.querySelector('#result-stuck'),
  step: document.querySelector('#result-step'),
  note: document.querySelector('#result-note')
};

function choose(letter) {
  const content = interpretations[letter];
  if (!content) return;
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choice === letter)));
  fields.letter.textContent = letter;
  for (const key of ['title', 'lead', 'now', 'stuck', 'step', 'note']) fields[key].textContent = content[key];
  result.hidden = false;
  result.focus({ preventScroll: true });
  result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}

buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.choice)));
document.querySelector('#retry').addEventListener('click', () => {
  result.hidden = true;
  buttons.forEach(button => button.setAttribute('aria-pressed', 'false'));
  document.querySelector('#choices').scrollIntoView({ behavior: 'smooth', block: 'center' });
  buttons[0].focus({ preventScroll: true });
});

if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  try {
    Promise.resolve(document.modelContext.registerTool({
      name: 'choose_growth_scene',
      title: '選擇直覺畫面',
      description: '選擇 A 到 D 的畫面並顯示對應的成長解析',
      inputSchema: {
        type: 'object',
        properties: { choice: { type: 'string', enum: ['A', 'B', 'C', 'D'] } },
        required: ['choice'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const letter = input?.choice;
        if (!Object.hasOwn(interpretations, letter)) throw new Error('請選擇 A B C 或 D');
        choose(letter);
        return { choice: letter, title: interpretations[letter].title };
      }
    }, { signal: lifecycle.signal })).catch(() => {});
  } catch (_) {}
  window.addEventListener('pagehide', () => lifecycle.abort(), { once: true });
}
