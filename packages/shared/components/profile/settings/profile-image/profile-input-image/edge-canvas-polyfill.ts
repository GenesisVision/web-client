if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
    value: function(
      callback: (blob: Blob) => any,
      mimeType?: string,
      quality?: number
    ) {
      const canvas = this;
      setTimeout(function() {
        const binStr = atob(canvas.toDataURL(mimeType, quality).split(",")[1]),
          len = binStr.length,
          arr = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], { type: mimeType || "image/png" }));
      });
    }
  });
}
