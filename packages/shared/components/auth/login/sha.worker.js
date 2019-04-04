//import sha256 from "sha256";
/*eslint no-undef: "off"*/
/* eslint no-restricted-globals: "off"*/

importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js"
);
onmessage = event => {
  const [difficulty, nonce, login] = event.data;
  let prefix = 0;
  const diffString = [
    ...Array(difficulty).fill(0),
    ...Array(64 - difficulty).fill("F")
  ].join("");
  while (sha256(`${prefix}${nonce}${login}`) >= diffString) {
    if (prefix % 500 === 0) postMessage({ prefix, found: false });
    prefix++;
  }
  postMessage({ prefix, found: true });
};
