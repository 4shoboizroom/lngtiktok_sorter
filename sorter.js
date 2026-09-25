// база данных ваших тиктоков
const tiktoks = [
  { id: "18N-Njj-LRWpk0yqyCcbCBUkks1ZBiimF", desc: "подпись: эмммммм я в восторге -" },
  { id: "181wQbNYFEUkEwPsgyHk2w8jeXXfT0l8h", desc: "подпись: без комментариев -" },
  { id: "1C6c5nOuWJawqZlM2V_h7IK6_Bh7krook", desc: "подпись: невероятно -" },
  { id: "16GF-bNaeSenC4x7fcnUcKxatol0L6rO0", desc: "подпись: ..................... -" },
  { id: "13kvGGBICS05SlzDL58aDo7F-MMbC7zXn", desc: "подпись: ноль попаданий -" },
  { id: "1vWPS8HTVTLnmTioFt0liFe_ATxTHtnUg", desc: "подпись: super idol de xiào róng -" },
  { id: "1VNQmtKJkw070g9Q57NpEVI-IB5MsgcKY", desc: "подпись: я не понимаю почему это всегда рюль -" },
  { id: "1lXcIg6RbDF7uZUTqa2UIFGRUYwRMoSSu", desc: "подпись: bro chill -" },
  { id: "12DvmBBBsqgI9AQvzD8dqgr6bEaDoAjj3", desc: "подпись: вот этот мой самый любимый в мире -" },
  { id: "10iGnqfoFhMFrdrBpwHERzw2ip9Pt5W66", desc: "подпись: то самое состязание -" },
  { id: "1qcnMe6Sh1k92PMtr0RaffreFKKyCVps4", desc: "подпись: и тут тоже рюль -" },
  { id: "1Z0YRTeXI19sqULMbXI1gl4IjBdUt8HrW", desc: "подпись: moya -" },
  { id: "1p1lSEM0FT-lrdc4s7FjFce3s-xT0lKEr", desc: "подпись: соник уджин -" },
  { id: "1oX8TwzqGicQVgN4BEo4akJjQSY7oYInr", desc: "подпись: вот эта хореография(??) -" },
  { id: "1ATjozfOCBcj8EPd3vg2WWX1FK_jkQXNU", desc: "подпись: сабвей серф лоншат версия -" },
  { id: "1tcNRwJgXbN76DJLtK2-fJrgVoa_auD1y", desc: "подпись: заметьте опять рюль. -" },
  { id: "1jxk6OilfP4Loq6bwGWqvbDxlfUIKpTNt", desc: "подпись: вот это я просто тут оставлю -" },
  { id: "1EiC03eKgrQFWK3V7z2bA03iDQLem3Ssh", desc: "подпись: это один из сотни таких тт под no hi no hey -" },
  { id: "1b8b2Ux2tf_WYegpEU0r2IcCwZi7a4tEy", desc: "подпись: рюльву две дебильности -" },
  { id: "1-xlgjLGVmuktFRHl7RlI2efH0DxwF6CY", desc: "подпись: :((((( мне оч радостно когда я это смотрю -" },
  { id: "1qHCd9A5W1SmXnOugdznnV27uQqVw_ROP", desc: "подпись: вот это. -" },
  { id: "1sm6MG_Mf5cB6DCMZd9qzs7KnL9YHLnwx", desc: "подпись: от этого тт мне тоже радостно -" },
  { id: "1fyReJ7xKRwUeoaYOVjTrNMbkbO3F0DR2", desc: "подпись: и это опять рюлььь -" },
  { id: "1Hc3ciwrDId_3siiiIbVraF7FPz2CBU1w", desc: "подпись: и вот этот луи тоже балбесный чуть-чуть -" },
  { id: "1Damib3pEnlgHAcpySQ-8JRTYPcmF4-Y2", desc: "подпись: без комментариев вы поняли что это опять он -" },
  { id: "1FnkbUut-8_7eVvnofJ5TMZekvPkFieh9", desc: "подпись: дурачье -" },
  { id: "10_5q4JPcmQA-lIMYNtQgYdSXlE3quJdY", desc: "подпись: ....................бляяяя -" },
  { id: "1srkhjimQADVo6O9HE8UD7YqG7J_WfFjt", desc: "подпись: уджин у тебя что-то упало -" },
  { id: "1h3PRESRSC_WKHA-ricX6a_oJ9zKy3vrZ", desc: "подпись: вот тут рюль порвал штаны -" },
  { id: "1LJMclEctD3RPpMyeQJu_KeXklVdJFlp8", desc: "подпись: а вот тут балбесные подкаты -" },
  { id: "18aM879I3fISV9gBNoCcC1USp_OZHl7TR", desc: "подпись: невероятно -" },
  { id: "19c0WWdTeAyWbvCMU1BlXXoQSY5uax1o-", desc: "подпись: ........... -" },
  { id: "1gU-_RPb9By3qO6Pb0q77iEKu7KBjTdMB", desc: "подпись: если честно у меня больше нет слов -" },
  { id: "1LZvdZmAVRIoma2z1KPrbDn20Qu2THbjV", desc: "подпись: туюли..... -" },
  { id: "1ilu0pugsMxeRUSI_-9i5Krc0R9whwyz1", desc: "подпись: протект уджин -" },
  { id: "1vSVeoP1CIK2bZlaCn9_qF-HvMj69ZYlh", desc: "подпись: дамб дамб дамб дамб дамб дамб -" },
  { id: "1-m2GOscUR9gxITNu86R2L7XQHRBd5lq3", desc: "подпись: я их не вывожу -" },
  { id: "10OfOjmKqHMnuSSs7oMRKp2z-ls8QfHsG", desc: "подпись: я хз как это подписывать -" },
  { id: "1HdyH00TIXVernAcSylDSUx0ZIeBMORnm", desc: "подпись: актерища фр -" },
  { id: "1N1S-e0GmN8iMF03hFu1mTBwQFBfB24FS", desc: "подпись: я обожаю -" },
  { id: "1gRM7SEwBgQGKeDsBzPQfMPGNmoR8DpyJ", desc: "подпись: школьники -" },
  { id: "1XRDRAKeeTuPb58R9Kb4rprPiYKdKSadc", desc: "подпись:  ??????? забоялись -" },
  { id: "1vyFSOOVcLBkzVjHjshqVCmPafpg_Sq2D", desc: "подпись: утиное -" },
  { id: "1hInJsSY6hMERXpwI0L0_JMdjw5JBzq7Y", desc: "подпись: история повторяется -" }
];

// функция вывода плеера и подписи
function getTikTokHTML(index) {
  const item = tiktoks[index];
  if (!item) return "";
  return `<video src="https://google.com{item.id}" controls width="100%"></video><div class="desc">${item.desc}</div>`;
}

/**
 * Interactive merge sort — user picks the winner of each comparison.
 */
class MergeSortLogic {
  constructor(items) {
    this.totalItems = items.length;
    this.queue = items.map((item) => [item]);
    this.leftSet = [];
    this.rightSet = [];
    this.merged = [];
    this.i = 0;
    this.j = 0;

    this.totalMergesNeeded = items.length - 1;
    this.mergesCompleted = 0;
    this.history = [];
  }

  saveState() {
    this.history.push({
      queue: this.queue.map((g) => [...g]),
      leftSet: [...this.leftSet],
      rightSet: [...this.rightSet],
      merged: [...this.merged],
      i: this.i,
      j: this.j,
      mergesCompleted: this.mergesCompleted,
    });
  }

  canUndo() {
    return this.history.length > 0;
  }

  undo() {
    if (!this.canUndo()) return false;

    const state = this.history.pop();
    this.queue = state.queue;
    this.leftSet = state.leftSet;
    this.rightSet = state.rightSet;
    this.merged = state.merged;
    this.i = state.i;
    this.j = state.j;
    this.mergesCompleted = state.mergesCompleted;
    return true;
  }

  getProgress() {
    if (this.totalMergesNeeded === 0) return 100;

    let base = (this.mergesCompleted / this.totalMergesNeeded) * 100;

    if (this.leftSet.length && this.rightSet.length) {
      const currentTotal = this.leftSet.length + this.rightSet.length;
      const currentDone = this.i + this.j;
      const partial = (currentDone / currentTotal / this.totalMergesNeeded) * 100;
      base += partial;
    }

    return Math.min(99, base);
  }

  recordChoice(choice) {
    this.saveState();

    if (choice === "equal") {
      this.merged.push(this.leftSet[this.i]);
      this.merged.push(this.rightSet[this.j]);
      this.i++;
      this.j++;
    } else if (choice === 0) {
      this.merged.push(this.leftSet[this.i]);
      this.i++;
    } else {
      this.merged.push(this.rightSet[this.j]);
      this.j++;
    }

    if (this.i >= this.leftSet.length) {
      this.merged.push(...this.rightSet.slice(this.j));
      this.finalizeMergeStep();
    } else if (this.j >= this.rightSet.length) {
      this.merged.push(...this.leftSet.slice(this.i));
      this.finalizeMergeStep();
    }
  }

  getNextPair() {
    if (!this.leftSet.length && !this.rightSet.length) {
      if (this.queue.length <= 1) return null;
      this.leftSet = this.queue.shift();
      this.rightSet = this.queue.shift();
      this.merged = [];
      this.i = 0;
      this.j = 0;
    }
    return [this.leftSet[this.i], this.rightSet[this.j]];
  }

  finalizeMergeStep() {
    this.queue.push(this.merged);
    this.leftSet = [];
    this.rightSet = [];
    this.mergesCompleted++;
  }

  getFinalRanking() {
    return this.queue[0] ?? [];
  }
}

function parseItems(text) {
  return tiktoks.map((_, index) => index);
}
