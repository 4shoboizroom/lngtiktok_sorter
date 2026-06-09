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
    return this.queue[0] ?? [];
  }
}

function parseItems(text) {
  return text
    .split(/[,\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
