var babelPresetES2015Reflector = require('./babel-preset-es2015-reflector');

module.exports = function(compiler) {
  switch (compiler) {
    case 'babel-preset-es2015':
      return babelPresetES2015Reflector;
    default:
      throw new Error('Compiler not found');
  }
}
