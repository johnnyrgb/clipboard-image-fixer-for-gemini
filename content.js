// Инжектируем page-script.js в контекст страницы (MAIN world)
try {
  const extensionApi = globalThis.browser || globalThis.chrome;
  const script = document.createElement("script");
  script.src = extensionApi.runtime.getURL("page-script.js");
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
} catch (e) {
  console.error("[Gemini Clipboard Renamer] Injection error:", e);
}
