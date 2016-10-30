let utilities_module = {};

utilities_module.convertWhitespace = function (string) {
  return string.toLowerCase().replace(/\s/g, '_');
};

module.exports = utilities_module;