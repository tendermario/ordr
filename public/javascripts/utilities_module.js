let utilities_module = {};

utilities_module.convertWhitespaces = function (string) {
  return string.toLowerCase().replace(/\s/g, '_');
};

export default utilities_module;