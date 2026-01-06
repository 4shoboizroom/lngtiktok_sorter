import math
import copy

class MergeSortLogic:
    def __init__(self, items):
        self.total_items = len(items)
        self.queue = [[item] for item in items]
        self.left_set = []
        self.right_set = []
        self.merged = []
        self.i = 0
        self.j = 0
        
        self.total_merges_needed = len(items) - 1
        self.merges_completed = 0
        self.history = []

    def _save_state(self):
        """Saves the current state for undo functionality."""
        self.history.append(copy.deepcopy({
            'queue': self.queue,
            'left_set': self.left_set,
            'right_set': self.right_set,
            'merged': self.merged,
            'i': self.i,
            'j': self.j,
            'merges_completed': self.merges_completed
        }))

    def can_undo(self):
        """Returns True if there are actions to undo."""
        return len(self.history) > 0

    def undo(self):
        """Undoes the last choice and restores previous state."""
        if not self.can_undo():
            return False
        
        state = self.history.pop()
        self.queue = state['queue']
        self.left_set = state['left_set']
        self.right_set = state['right_set']
        self.merged = state['merged']
        self.i = state['i']
        self.j = state['j']
        self.merges_completed = state['merges_completed']
        return True

    def get_progress(self):
        """Returns progress as a percentage (0 to 100) based on merges completed."""
        if self.total_merges_needed == 0:
            return 100
        
        base_progress = (self.merges_completed / self.total_merges_needed) * 100
        
        if self.left_set and self.right_set:
            current_merge_total = len(self.left_set) + len(self.right_set)
            current_merge_done = self.i + self.j
            partial_progress = (current_merge_done / current_merge_total) / self.total_merges_needed * 100
            base_progress += partial_progress
        
        return min(99, base_progress)

    def record_choice(self, choice_index):
        self._save_state()
        
        if choice_index == 0:
            self.merged.append(self.left_set[self.i])
            self.i += 1
        else:
            self.merged.append(self.right_set[self.j])
            self.j += 1

        if self.i >= len(self.left_set):
            self.merged.extend(self.right_set[self.j:])
            self.finalize_merge_step()
        elif self.j >= len(self.right_set):
            self.merged.extend(self.left_set[self.i:])
            self.finalize_merge_step()
    
    def get_next_pair(self):
        if not self.left_set and not self.right_set:
            if len(self.queue) <= 1:
                return None
            self.left_set = self.queue.pop(0)
            self.right_set = self.queue.pop(0)
            self.merged = []
            self.i = 0
            self.j = 0
        return (self.left_set[self.i], self.right_set[self.j])

    def finalize_merge_step(self):
        self.queue.append(self.merged)
        self.left_set = []
        self.right_set = []
        self.merges_completed += 1

    def get_final_ranking(self):
        return self.queue[0] if self.queue else []