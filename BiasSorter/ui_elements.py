import tkinter as tk
from tkinter import ttk, messagebox, filedialog

COLORS = {
    'primary': '#6C63FF',
    'primary_dark': '#5A52D5',
    'secondary': '#FF6584',
    'success': '#00D9A5',
    'background': '#F7F7FC',
    'card': '#FFFFFF',
    'text_dark': '#2D3748',
    'text_light': '#718096',
    'border': '#E2E8F0'
}

def add_hover_effect(button, normal_color, hover_color):
    """Unified hover effect for all buttons."""
    button.bind("<Enter>", lambda e: button.config(bg=hover_color))
    button.bind("<Leave>", lambda e: button.config(bg=normal_color))

def create_styled_button(parent, text, command, bg_color, fg='white', width=None, **kwargs):
    """Factory method for creating styled buttons with common properties."""
    defaults = {
        'font': ("Segoe UI", 10, "bold"),
        'relief': "flat",
        'cursor': "hand2",
        'padx': 25,
        'pady': 12
    }
    defaults.update(kwargs)
    if width:
        defaults['width'] = width
    return tk.Button(parent, text=text, command=command, bg=bg_color, fg=fg, **defaults)

class InputWindow:
    def __init__(self, root, start_callback):
        self.root = root
        self.root.title("Bias Sorter - Input Items")
        self.root.configure(bg=COLORS['background'])
        self.start_callback = start_callback

        main_frame = tk.Frame(root, bg=COLORS['background'])
        main_frame.pack(fill="both", expand=True, padx=20, pady=20)

        # Header Section
        header_frame = tk.Frame(main_frame, bg=COLORS['background'])
        header_frame.pack(fill="x", pady=(0, 20))
        
        tk.Label(header_frame, text="✨ Bias Sorter", 
                font=("Segoe UI", 18, "bold"), 
                bg=COLORS['background'], 
                fg=COLORS['primary']).pack()
        
        tk.Label(header_frame, text="Rank your favorites with ease", 
                font=("Segoe UI", 10), 
                bg=COLORS['background'], 
                fg=COLORS['text_light']).pack()

        # Card-style container for input
        card_frame = tk.Frame(main_frame, bg=COLORS['card'], relief="flat", borderwidth=0)
        card_frame.pack(fill="both", expand=True, padx=10, pady=10)

        # Instructions
        tk.Label(card_frame, text="Enter items to rank:", 
                font=("Segoe UI", 11, "bold"), 
                bg=COLORS['card'], 
                fg=COLORS['text_dark']).pack(pady=(20, 5), padx=20, anchor="w")
        
        tk.Label(card_frame, text="One per line or separated by commas", 
                font=("Segoe UI", 9), 
                bg=COLORS['card'], 
                fg=COLORS['text_light']).pack(padx=20, anchor="w")

        # Text Area
        text_frame = tk.Frame(card_frame, bg=COLORS['card'])
        text_frame.pack(padx=20, pady=10, fill="both", expand=True)
        
        self.text_area = tk.Text(text_frame, width=45, height=10, 
                                font=("Segoe UI", 10),
                                relief="solid", borderwidth=1,
                                bg="#FAFAFA", fg=COLORS['text_dark'],
                                insertbackground=COLORS['primary'],
                                selectbackground=COLORS['primary'],
                                selectforeground="white",
                                padx=10, pady=10)
        self.text_area.pack(fill="both", expand=True)

        # Buttons Container
        btn_frame = tk.Frame(card_frame, bg=COLORS['card'])
        btn_frame.pack(side="bottom", pady=20, padx=20, fill="x")

        self.import_btn = tk.Button(btn_frame, text="📁 Import File", 
                                    command=self.import_file,
                                    font=("Segoe UI", 10),
                                    bg=COLORS['card'], fg=COLORS['text_dark'],
                                    relief="solid", borderwidth=1,
                                    cursor="hand2", padx=20, pady=10,
                                    activebackground=COLORS['border'])
        self.import_btn.pack(side="left", padx=(0, 10), fill="x", expand=True)
        add_hover_effect(self.import_btn, COLORS['card'], COLORS['border'])

        self.start_btn = create_styled_button(btn_frame, "Start Sorting →", self.submit, 
                                              COLORS['primary'], padx=20, pady=10)
        self.start_btn.pack(side="left", fill="x", expand=True)
        add_hover_effect(self.start_btn, COLORS['primary'], COLORS['primary_dark'])

    def import_file(self):
        """Opens a file dialog to load items from a text file."""
        file_path = filedialog.askopenfilename(filetypes=[("Text files", "*.txt")])
        if file_path:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    self.text_area.delete("1.0", tk.END)
                    self.text_area.insert(tk.END, content)
            except Exception as e:
                messagebox.showerror("Error", f"Could not read file: {e}")

    def submit(self):
        """Parses the text area and starts the sorting process."""
        raw_text = self.text_area.get("1.0", tk.END).strip()
        delimiter = "," if "," in raw_text and "\n" not in raw_text else "\n"
        items = [item.strip() for item in raw_text.split(delimiter) if item.strip()]

        if len(items) < 2:
            messagebox.showwarning("Warning", "Please enter at least 2 items to sort!")
        else:
            self.start_callback(items)


class SorterWindow:
    """The main sorting interface with the progress bar and choice buttons."""
    def __init__(self, root, on_choice_callback):
        self.root = root
        self.on_choice = on_choice_callback
        
        for widget in self.root.winfo_children():
            widget.destroy()

        self.root.title("Sorting in Progress...")
        self.root.configure(bg=COLORS['background'])
        self.root.geometry("700x450")

        main_frame = tk.Frame(root, bg=COLORS['background'])
        main_frame.pack(fill="both", expand=True, padx=30, pady=30)

        # Header
        self.header_frame = tk.Frame(main_frame, bg=COLORS['background'])
        self.header_frame.pack(fill="x", pady=(0, 20))
        
        self.battle_label = tk.Label(self.header_frame, text="Battle #1", 
                font=("Segoe UI", 16, "bold"),
                bg=COLORS['background'], 
                fg=COLORS['text_dark'])
        self.battle_label.pack()
        
        self.percent_label = tk.Label(self.header_frame, text="0% sorted", 
                                      font=("Segoe UI", 12),
                                      bg=COLORS['background'],
                                      fg=COLORS['text_light'])
        self.percent_label.pack(pady=(5, 0))

        # Progress Bar
        self.progress_frame = tk.Frame(self.header_frame, bg=COLORS['background'])
        self.progress_frame.pack(fill="x", pady=(10, 0))
        
        style = ttk.Style()
        style.theme_use('default')
        style.configure("Modern.Horizontal.TProgressbar",
                       troughcolor=COLORS['border'],
                       background=COLORS['primary'],
                       borderwidth=0,
                       thickness=10)
        
        self.progress_bar = ttk.Progressbar(self.progress_frame, 
                                           orient="horizontal",
                                           mode="determinate", 
                                           style="Modern.Horizontal.TProgressbar")
        self.progress_bar.pack(fill="x")

        # Comparison area
        self.comparison_frame = tk.Frame(main_frame, bg=COLORS['background'])
        self.comparison_frame.pack(expand=True, fill="both", pady=(10, 0))

        self.comparison_frame.columnconfigure(0, weight=1)
        self.comparison_frame.columnconfigure(1, weight=0, minsize=140)
        self.comparison_frame.columnconfigure(2, weight=1)

        # Left button
        self.btn_left = tk.Button(self.comparison_frame, text="", 
                                  width=14, height=8,
                                  wraplength=140, justify="center",
                                  bg=COLORS['card'], fg=COLORS['text_dark'],
                                  font=("Segoe UI", 11),
                                  relief="solid", borderwidth=2,
                                  cursor="hand2",
                                  activebackground=COLORS['primary'],
                                  activeforeground="white",
                                  command=lambda: self.on_choice(0))
        self.btn_left.grid(row=0, column=0, padx=10, sticky="nsew")
        add_hover_effect(self.btn_left, COLORS['card'], COLORS['border'])

        # Middle column buttons
        middle_frame = tk.Frame(self.comparison_frame, bg=COLORS['background'])
        middle_frame.grid(row=0, column=1, padx=10, sticky="ns")
        
        middle_frame.grid_rowconfigure(0, weight=1)
        middle_frame.grid_rowconfigure(1, weight=0)
        middle_frame.grid_rowconfigure(2, weight=0)
        middle_frame.grid_rowconfigure(3, weight=1)
        
        self.btn_equal = tk.Button(middle_frame, text="Equal", 
                                   command=lambda: self.on_choice('equal'),
                                   bg=COLORS['card'], fg=COLORS['text_dark'],
                                   font=("Segoe UI", 10),
                                   relief="solid", borderwidth=2,
                                   cursor="hand2",
                                   padx=20, pady=12,
                                   activebackground=COLORS['success'],
                                   activeforeground="white")
        self.btn_equal.grid(row=1, column=0, pady=(0, 8), sticky="ew")
        add_hover_effect(self.btn_equal, COLORS['card'], COLORS['border'])
        
        self.btn_undo = tk.Button(middle_frame, text="Undo", 
                                  command=lambda: self.on_choice('undo'),
                                  bg=COLORS['card'], fg=COLORS['text_dark'],
                                  font=("Segoe UI", 10),
                                  relief="solid", borderwidth=2,
                                  cursor="hand2",
                                  padx=20, pady=12,
                                  activebackground=COLORS['secondary'],
                                  activeforeground="white")
        self.btn_undo.grid(row=2, column=0, sticky="ew")
        add_hover_effect(self.btn_undo, COLORS['card'], COLORS['border'])

        # Right button
        self.btn_right = tk.Button(self.comparison_frame, text="", 
                                   width=14, height=8,
                                   wraplength=140, justify="center",
                                   bg=COLORS['card'], fg=COLORS['text_dark'],
                                   font=("Segoe UI", 11),
                                   relief="solid", borderwidth=2,
                                   cursor="hand2",
                                   activebackground=COLORS['secondary'],
                                   activeforeground="white",
                                   command=lambda: self.on_choice(1))
        self.btn_right.grid(row=0, column=2, padx=10, sticky="nsew")
        add_hover_effect(self.btn_right, COLORS['card'], COLORS['border'])

        self.results_frame = tk.Frame(main_frame, bg=COLORS['background'])
        self.battle_count = 0

    def update_display(self, item_left, item_right, progress_val):
        self.btn_left.config(text=item_left)
        self.btn_right.config(text=item_right)
        
        self.battle_count += 1
        self.battle_label.config(text=f"Battle #{self.battle_count}")
        self.percent_label.config(text=f"{int(progress_val)}% sorted")
        self.progress_bar["value"] = progress_val

    def show_results(self, final_list, restart_callback):
        self.battle_label.config(text="🎉 Complete!")
        self.percent_label.config(text="100% sorted")
        self.progress_bar["value"] = 100
        
        self.comparison_frame.pack_forget()
        self.root.title("✨ Sorting Complete!")
        self.root.geometry("700x550")
        
        self.results_frame.pack(fill="both", expand=True, pady=(20, 0))
        
        title_label = tk.Label(self.results_frame, text="Your Rankings", 
                font=("Segoe UI", 18, "bold"),
                bg=COLORS['background'],
                fg=COLORS['text_dark'])
        title_label.pack(pady=(0, 15))
        
        # Action buttons
        btn_container = tk.Frame(self.results_frame, bg=COLORS['background'])
        btn_container.pack(side="bottom", pady=(10, 0))
        
        self.restart_btn = create_styled_button(btn_container, "🔄 Restart", restart_callback,
                                                COLORS['secondary'], width=12)
        self.restart_btn.pack(side="left", padx=5)
        add_hover_effect(self.restart_btn, COLORS['secondary'], '#E55573')
        
        self.save_btn = create_styled_button(btn_container, "💾 Save to File", 
                                             lambda: self.save_to_file(final_list),
                                             COLORS['primary'], width=15)
        self.save_btn.pack(side="left", padx=5)
        add_hover_effect(self.save_btn, COLORS['primary'], COLORS['primary_dark'])
        
        self.close_btn = create_styled_button(btn_container, "✓ Close", self.root.destroy,
                                              COLORS['success'], width=10)
        self.close_btn.pack(side="left", padx=5)
        add_hover_effect(self.close_btn, COLORS['success'], '#00B888')
        
        # Card for results
        results_card = tk.Frame(self.results_frame, bg=COLORS['card'], 
                               relief="solid", borderwidth=1)
        results_card.pack(fill="both", expand=True, pady=(0, 15))
        
        results_container = tk.Frame(results_card, bg=COLORS['card'])
        results_container.pack(fill="both", expand=True, padx=20, pady=20)
        
        scrollbar = tk.Scrollbar(results_container)
        scrollbar.pack(side="right", fill="y")
        
        self.results_text = tk.Text(results_container, width=50,
                                    font=("Segoe UI", 11),
                                    yscrollcommand=scrollbar.set,
                                    bg=COLORS['card'], fg=COLORS['text_dark'],
                                    relief="flat", borderwidth=0,
                                    padx=10, pady=5,
                                    spacing3=5)
        self.results_text.pack(side="left", fill="both", expand=True)
        scrollbar.config(command=self.results_text.yview)
        
        for i, item in enumerate(final_list, 1):
            self.results_text.insert(tk.END, f"{i}. {item}\n")
        
        self.results_text.config(state="disabled")

    def save_to_file(self, final_list):
        file_path = filedialog.asksaveasfilename(defaultextension=".txt", 
                                                 filetypes=[("Text files", "*.txt")])
        if file_path:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write("--- Your Ranked List ---\n\n")
                    for i, item in enumerate(final_list, 1):
                        f.write(f"{i}. {item}\n")
                
                self.save_btn.config(text="✓ Saved!", bg=COLORS['success'])
                self.root.after(2000, lambda: self.save_btn.config(
                    text="💾 Save to File", bg=COLORS['primary']))
            except Exception as e:
                messagebox.showerror("Error", f"Could not save file: {e}")