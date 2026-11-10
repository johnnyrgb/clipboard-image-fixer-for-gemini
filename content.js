// Инжектируем page-script.js в контекст страницы (MAIN world)
try {
  const script = document.createElement("script");
  script.src = browser.runtime.getURL("page-script.js");
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
} catch (e) {
  console.error("[Gemini Clipboard Renamer] Injection error:", e);
}
