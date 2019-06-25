const download = (() => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  return (data: Blob, name: string): void => {
    const url = URL.createObjectURL(data);
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };
})();

export default download;
