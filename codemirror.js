var require = function (mod) {
  if (mod == '@hyrious/codemirror-theme-mariana') return mariana;
  return CM[mod];
};