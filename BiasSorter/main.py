import tkinter as tk
from sorter_logic import MergeSortLogic
from ui_elements import InputWindow, SorterWindow

class Controller:
    def __init__(self):
        self.root = tk.Tk()
        self.set_window_size(450, 550)
        self.show_input_screen()
        self.root.mainloop()

    def set_window_size(self, width, height):
        """Helper method to set both geometry and minsize."""
        self.root.geometry(f"{width}x{height}")
        self.root.minsize(width, height)

    def show_input_screen(self):
        """Shows the input screen."""
        for widget in self.root.winfo_children():
            widget.destroy()
        
        self.set_window_size(450, 550)
        self.input_ui = InputWindow(self.root, self.start_sorting)

    def start_sorting(self, items):
        self.set_window_size(700, 450)
        self.logic = MergeSortLogic(items)
        self.ui = SorterWindow(self.root, self.handle_user_choice)
        self.refresh_ui()

    def handle_user_choice(self, choice):
        if choice == 'undo':
            if self.logic.undo():
                self.refresh_ui()
        elif choice == 'equal':
            self.logic.record_choice(0)
            self.refresh_ui()
        else:
            self.logic.record_choice(choice)
            self.refresh_ui()

    def refresh_ui(self):
        next_pair = self.logic.get_next_pair()
        progress = self.logic.get_progress()
        
        if next_pair:
            self.ui.update_display(next_pair[0], next_pair[1], progress)
        else:
            self.set_window_size(700, 550)
            self.ui.show_results(self.logic.get_final_ranking(), self.show_input_screen)

if __name__ == "__main__":
    Controller()