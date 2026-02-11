import webview
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, "..", "assets", "texts")

class API:
    def get_words(self):
        path = os.path.join(ASSETS_DIR, "words.json")
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

def main():
    api = API()
    webview.create_window(
        "Finger Go BRR",
        os.path.join(BASE_DIR, "ui", "index.html"),
        js_api=api,
        width=1200,
        height=700,
        resizable=True
    )
    webview.start()

if __name__ == "__main__":
    main()

