<p align="center">
  <img src="icon128.png" width="96" height="96" alt="Clipboard Image Fixer for Gemini" />
</p>

<h1 align="center">Clipboard Image Fixer for Gemini</h1>

<p align="center">
  A lightweight browser extension that fixes the annoying <b>"File image.png already uploaded"</b> error when pasting multiple images from the clipboard on Google Gemini.
</p>

<p align="center">
  <a href="#english">English</a> • <a href="#russian">Русский</a>
</p>

---

<a name="english"></a>
## 🇬🇧 English

### The Problem
When you paste an image into [gemini.google.com](https://gemini.google.com) directly from the clipboard (`Ctrl+V`), the browser automatically assigns it a default name (such as `image.png` or `изображение.png`). 

When you try to paste a second image into the same prompt, Gemini detects the identical filename and throws an error:
> *"File image.png already uploaded."*

Previously, you had to manually edit the first image in Gemini's built-in canvas editor (or save files to disk) just to change the filename.

### The Solution
This extension transparently patches the clipboard file extraction in the page context. Every pasted image automatically receives a unique timestamped name (e.g. `image_1731241234567_42.png`), while keeping the event 100% native and trusted (`isTrusted: true`).

You can now paste as many screenshots and images as you want with `Ctrl+V`!

### Features
- ⚡ **Zero configuration**: Just install and use.
- 🔒 **Privacy-friendly**: Does not send, read, or store any of your data or images.
- 🪶 **Ultra lightweight**: Pure vanilla JavaScript without external dependencies.
- 🦊 **Firefox compatible**: Built for Firefox Manifest V3.

### Installation

#### Temporary (for testing)
1. Clone or download this repository.
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
3. Click **"Load Temporary Add-on..."**.
4. Select the `manifest.json` file inside this repository.

#### Permanent (Self-hosting or AMO)
- Package the extension files into a `.zip` archive (containing `manifest.json`, `content.js`, `page-script.js`, and the icons).
- Submit it to [Mozilla Add-ons (AMO)](https://addons.mozilla.org/developers/) for unlisted signing or public publishing.

---

<a name="russian"></a>
## 🇷🇺 Русский

### Проблема
Когда вы вставляете скриншот или картинку из буфера обмена (`Ctrl+V`) в [gemini.google.com](https://gemini.google.com), браузер автоматически даёт файлу стандартное имя (например, `изображение.png` или `image.png`).

При попытке вставить второе изображение в это же сообщение Gemini блокирует добавление с ошибкой:
> *"Файл изображение.png уже загружен."*

Пользователям приходилось открывать встроенный редактор Gemini и ставить точку, чтобы имя сменилось на `edited-image.png`.

### Решение
Расширение динамически перехватывает обращение к свойствам файла в контексте страницы и присваивает каждому вставляемому файлу уникальное имя с таймштампом (например, `изображение_1731241234567_42.png`). Событие вставки остаётся полностью доверенным (`isTrusted: true`), а Gemini видит уникальные имена и без проблем прикрепляет подряд любое количество изображений.

### Установка в Firefox

#### Временная (для тестирования)
1. Скачайте этот репозиторий (или нажмите **Code -> Download ZIP** и распакуйте).
2. В Firefox откройте страницу `about:debugging#/runtime/this-firefox`.
3. Нажмите кнопку **«Загрузить временное дополнение...»** (*Load Temporary Add-on...*).
4. Выберите файл `manifest.json`.

---

## License
MIT License. See [LICENSE](LICENSE) for details.
