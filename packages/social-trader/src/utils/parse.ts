export const getLastWord = (words: string): string => {
  const n = words.split(/[\s,]+/);
  return n[n.length - 1];
};

export const getInputTag = (word: string): string => {
  const n = word.split(/[@]+/);
  return n.length > 1 ? n[n.length - 1] : "";
};

export const getTagFromInputText = (text: string): string => {
  return getInputTag(getLastWord(text));
};
