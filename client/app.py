import webview
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UI_PATH = os.path.join(BASE_DIR, "ui", "index.html")

def main():
    webview.create_window(
        "Finger Go BRR",
        UI_PATH,
        width=1200,
        height=700,
        resizable=True
    )
    webview.start()

if __name__ == "__main__":
    main()
