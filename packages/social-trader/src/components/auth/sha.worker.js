/* eslint no-undef: "off"*/
/* eslint no-restricted-globals: "off"*/

self.importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js"
);

self.onmessage = event => {
  const [difficulty, nonce, login] = event.data;
  let prefix = 0;
  const diffString = "0".repeat(difficulty) + "F".repeat(64 - difficulty);
  while (sha256(`${prefix}${nonce}${login}`) >= diffString) {
    if (prefix % (difficulty * 100) === 0)
      postMessage({ prefix, found: false });
    prefix++;
  }
  postMessage({ prefix, found: true });
};
