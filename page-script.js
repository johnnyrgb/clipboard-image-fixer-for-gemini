// Скрипт, который будет выполняться непосредственно в контексте страницы Gemini
(function () {
  let counter = 0;

  function patchFile(file) {
    if (!file || !(file instanceof File)) return file;

    // Проверяем, патчили ли мы уже этот файл
    if (file.__gemini_renamed) return file;

    const timestamp = Date.now();
    counter = (counter + 1) % 1000;

    let baseName = "image";
    let ext = "png";
    const dotIndex = file.name.lastIndexOf(".");

    if (dotIndex !== -1) {
      baseName = file.name.substring(0, dotIndex);
      ext = file.name.substring(dotIndex + 1);
    } else if (file.type) {
      const parts = file.type.split("/");
      if (parts[1]) ext = parts[1];
    }

    const uniqueName = `${baseName}_${timestamp}_${counter}.${ext}`;

    try {
      Object.defineProperty(file, "name", {
        get: () => uniqueName,
        configurable: true,
      });
      Object.defineProperty(file, "__gemini_renamed", {
        value: true,
        enumerable: false,
      });
    } catch (e) {
      console.warn("[Gemini Clipboard Renamer] Не удалось переопределить name:", e);
    }

    return file;
  }

  // Патчим DataTransferItemList.prototype.getAsFile
  if (typeof DataTransferItemList !== "undefined" && DataTransferItemList.prototype) {
    const origGetAsFile = DataTransferItemList.prototype.getAsFile;
    DataTransferItemList.prototype.getAsFile = function () {
      const file = origGetAsFile.apply(this, arguments);
      if (file) {
        return patchFile(file);
      }
      return file;
    };
  }

  // Патчим геттер DataTransfer.prototype.files
  if (typeof DataTransfer !== "undefined" && DataTransfer.prototype) {
    const origFilesDesc = Object.getOwnPropertyDescriptor(
      DataTransfer.prototype,
      "files"
    );
    if (origFilesDesc && origFilesDesc.get) {
      Object.defineProperty(DataTransfer.prototype, "files", {
        get: function () {
          const fileList = origFilesDesc.get.apply(this, arguments);
          if (fileList && fileList.length > 0) {
            for (let i = 0; i < fileList.length; i++) {
              patchFile(fileList[i]);
            }
          }
          return fileList;
        },
        configurable: true,
        enumerable: origFilesDesc.enumerable,
      });
    }
  }

  // Дополнительно слушаем событие paste в фазе capture, чтобы пропатчить файлы до того, как их прочитает Gemini
  window.addEventListener(
    "paste",
    (event) => {
      const cd = event.clipboardData;
      if (!cd) return;

      try {
        if (cd.files && cd.files.length > 0) {
          for (let i = 0; i < cd.files.length; i++) {
            patchFile(cd.files[i]);
          }
        }
      } catch (e) {}

      try {
        if (cd.items && cd.items.length > 0) {
          for (let i = 0; i < cd.items.length; i++) {
            if (cd.items[i].kind === "file") {
              const f = cd.items[i].getAsFile();
              if (f) patchFile(f);
            }
          }
        }
      } catch (e) {}
    },
    true
  );

  console.log("[Gemini Clipboard Renamer] Активен в контексте страницы");
})();
