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

    let base =
      (this.mergesCompleted / this.totalMergesNeeded) * 100;

    if (this.leftSet.length && this.rightSet.length) {
      const currentTotal = this.leftSet.length + this.rightSet.length;
      const currentDone = this.i + this.j;
      const partial =
        (currentDone / currentTotal / this.totalMergesNeeded) * 100;
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
    return this.queue ?? [];
  }
}

const tiktoks = [
  "<video src=\"https://google.com\18N-Njj-LRWpk0yqyCcbCBUkks1ZBiimF\" controls width=\"100%\"></video><div class=\"desc\">подпись: эмммммм я в восторге -</div>",
"<video src=\"https://google.com\181wQbNYFEUkEwPsgyHk2w8jeXXfT0l8h\" controls width=\"100%\"></video><div class=\"desc\">подпись: без комментариев -</div>",
   "<video src=\"https://google.com\1C6c5nOuWJawqZlM2V_h7IK6_Bh7krook\" controls width=\"100%\"></video><div class=\"desc\">подпись: невероятно -</div>",
"<video src=\"https://google.com\16GF-bNaeSenC4x7fcnUcKxatol0L6rO0\" controls width=\"100%\"></video><div class=\"desc\">подпись: ..................... -</div>",
   "<video src=\"https://google.com\13kvGGBICS05SlzDL58aDo7F-MMbC7zXn\" controls width=\"100%\"></video><div class=\"desc\">подпись: ноль попаданий -</div>",
"<video src=\"https://google.com\1vWPS8HTVTLnmTioFt0liFe_ATxTHtnUg\" controls width=\"100%\"></video><div class=\"desc\">подпись: super idol de xiào róng -</div>",
   "<video src=\"https://google.com\1VNQmtKJkw070g9Q57NpEVI-IB5MsgcKY\" controls width=\"100%\"></video><div class=\"desc\">подпись: я не понимаю почему это всегда рюль -</div>",
"<video src=\"https://google.com\1lXcIg6RbDF7uZUTqa2UIFGRUYwRMoSSu\" controls width=\"100%\"></video><div class=\"desc\">подпись: bro chill -</div>",
   "<video src=\"https://google.com\12DvmBBBsqgI9AQvzD8dqgr6bEaDoAjj3\" controls width=\"100%\"></video><div class=\"desc\">подпись: вот этот мой самый любимый в мире -</div>",
"<video src=\"https://google.com\10iGnqfoFhMFrdrBpwHERzw2ip9Pt5W66\" controls width=\"100%\"></video><div class=\"desc\">подпись: ТО САМОЕ состязание -</div>",
   "<video src=\"https://google.com\1qcnMe6Sh1k92PMtr0RaffreFKKyCVps4\" controls width=\"100%\"></video><div class=\"desc\">подпись: и тут тоже рюль -</div>",
"<video src=\"https://google.com\1Z0YRTeXI19sqULMbXI1gl4IjBdUt8HrW\" controls width=\"100%\"></video><div class=\"desc\">подпись: moya -</div>",
 "<video src=\"https://google.com\1p1lSEM0FT-lrdc4s7FjFce3s-xT0lKEr\" controls width=\"100%\"></video><div class=\"desc\">подпись: соник уджин -</div>",
"<video src=\"https://google.com\1oX8TwzqGicQVgN4BEo4akJjQSY7oYInr\" controls width=\"100%\"></video><div class=\"desc\">подпись: вот эта хореография(??) -</div>",
   "<video src=\"https://google.com\1ATjozfOCBcj8EPd3vg2WWX1FK_jkQXNU\" controls width=\"100%\"></video><div class=\"desc\">подпись: сабвей серф лоншат версия -</div>",
"<video src=\"https://google.com\1tcNRwJgXbN76DJLtK2-fJrgVoa_auD1y\" controls width=\"100%\"></video><div class=\"desc\">подпись: заметьте опять рюль. -</div>",
   "<video src=\"https://google.com\1jxk6OilfP4Loq6bwGWqvbDxlfUIKpTNt\" controls width=\"100%\"></video><div class=\"desc\">подпись: вот это я просто тут оставлю -</div>",
"<video src=\"https://google.com\1EiC03eKgrQFWK3V7z2bA03iDQLem3Ssh\" controls width=\"100%\"></video><div class=\"desc\">подпись: это один из сотни таких тт под no hi no hey -</div>",
   "<video src=\"https://google.com\1b8b2Ux2tf_WYegpEU0r2IcCwZi7a4tEy\" controls width=\"100%\"></video><div class=\"desc\">подпись: рюльву две дебильности -</div>",
"<video src=\"https://google.com\1-xlgjLGVmuktFRHl7RlI2efH0DxwF6CY\" controls width=\"100%\"></video><div class=\"desc\">подпись: :((((( мне оч радостно когда я это смотрю -</div>",
   "<video src=\"https://google.com\1qHCd9A5W1SmXnOugdznnV27uQqVw_ROP\" controls width=\"100%\"></video><div class=\"desc\">подпись: вот это. -</div>",
"<video src=\"https://google.com\1sm6MG_Mf5cB6DCMZd9qzs7KnL9YHLnwx\" controls width=\"100%\"></video><div class=\"desc\">подпись: от этого тт мне тоже радостно -</div>",
   "<video src=\"https://google.com\1fyReJ7xKRwUeoaYOVjTrNMbkbO3F0DR2\" controls width=\"100%\"></video><div class=\"desc\">подпись: и это опять РЮЛЬЬЬ -</div>",
"<video src=\"https://google.com\1Hc3ciwrDId_3siiiIbVraF7FPz2CBU1w\" controls width=\"100%\"></video><div class=\"desc\">подпись: и вот этот луи тоже балбесный чуть-чуть -</div>",
    "<video src=\"https://google.com\1Damib3pEnlgHAcpySQ-8JRTYPcmF4-Y2\" controls width=\"100%\"></video><div class=\"desc\">подпись: без комментариев вы поняли что это опять ОН -</div>",
   "<video src=\"https://google.com\1FnkbUut-8_7eVvnofJ5TMZekvPkFieh9\" controls width=\"100%\"></video><div class=\"desc\">подпись: дурачье -</div>",
"<video src=\"https://google.com\10_5q4JPcmQA-lIMYNtQgYdSXlE3quJdY\" controls width=\"100%\"></video><div class=\"desc\">подпись: ....................бляяяя -</div>",
   "<video src=\"https://google.com\1srkhjimQADVo6O9HE8UD7YqG7J_WfFjt\" controls width=\"100%\"></video><div class=\"desc\">подпись: уджин у тебя что-то упало -</div>",
"<video src=\"https://google.com\1h3PRESRSC_WKHA-ricX6a_oJ9zKy3vrZ\" controls width=\"100%\"></video><div class=\"desc\">подпись: вот тут рюль порвал штаны -</div>",
   "<video src=\"https://google.com\1LJMclEctD3RPpMyeQJu_KeXklVdJFlp8\" controls width=\"100%\"></video><div class=\"desc\">подпись: а вот тут балбесные подкаты -</div>",
"<video src=\"https://google.com\18aM879I3fISV9gBNoCcC1USp_OZHl7TR\" controls width=\"100%\"></video><div class=\"desc\">подпись: невероятно -</div>",
   "<video src=\"https://google.com\19c0WWdTeAyWbvCMU1BlXXoQSY5uax1o-\" controls width=\"100%\"></video><div class=\"desc\">подпись: ........... -</div>",
"<video src=\"https://google.com\1gU-_RPb9By3qO6Pb0q77iEKu7KBjTdMB\" controls width=\"100%\"></video><div class=\"desc\">подпись: если честно у меня больше нет слов -</div>",
    "<video src=\"https://google.com\1LZvdZmAVRIoma2z1KPrbDn20Qu2THbjV\" controls width=\"100%\"></video><div class=\"desc\">подпись: туюли..... -</div>",
    "<video src=\"https://google.com\1ilu0pugsMxeRUSI_-9i5Krc0R9whwyz1\" controls width=\"100%\"></video><div class=\"desc\">подпись: протект уджин -</div>",
   "<video src=\"https://google.com\1vSVeoP1CIK2bZlaCn9_qF-HvMj69ZYlh\" controls width=\"100%\"></video><div class=\"desc\">подпись: дамб дамб дамб дамб дамб дамб -</div>",
"<video src=\"https://google.com\1-m2GOscUR9gxITNu86R2L7XQHRBd5lq3\" controls width=\"100%\"></video><div class=\"desc\">подпись: я их не вывожу -</div>",
   "<video src=\"https://google.com\10OfOjmKqHMnuSSs7oMRKp2z-ls8QfHsG\" controls width=\"100%\"></video><div class=\"desc\">подпись: я хз как это подписывать -</div>",
"<video src=\"https://google.com\1HdyH00TIXVernAcSylDSUx0ZIeBMORnm\" controls width=\"100%\"></video><div class=\"desc\">подпись: актерища фр -</div>",
   "<video src=\"https://google.com\1N1S-e0GmN8iMF03hFu1mTBwQFBfB24FS\" controls width=\"100%\"></video><div class=\"desc\">подпись: я обожаю -</div>",
"<video src=\"https://google.com\1gRM7SEwBgQGKeDsBzPQfMPGNmoR8DpyJ\" controls width=\"100%\"></video><div class=\"desc\">подпись: школьники -</div>",
   "<video src=\"https://google.com\1XRDRAKeeTuPb58R9Kb4rprPiYKdKSadc\" controls width=\"100%\"></video><div class=\"desc\">подпись:  ??????? забоялись -</div>",
"<video src=\"https://google.com\1vyFSOOVcLBkzVjHjshqVCmPafpg_Sq2D\" controls width=\"100%\"></video><div class=\"desc\">подпись: утиное -</div>",
"<video src=\"https://google.com\1hInJsSY6hMERXpwI0L0_JMdjw5JBzq7Y\" controls width=\"100%\"></video><div class=\"desc\">подпись: история повторяется -</div>",
  
];

function parseItems(text) {
  return tiktoks;
}
