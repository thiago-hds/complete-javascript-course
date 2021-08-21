document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', () => {
  const input = document.querySelector('textarea').value;
  const names = input.toLowerCase().split('\n');
  for ([key, varName] of names.entries()) {
    const checks = '✅'.repeat(key + 1);
    varName = varName.trim();
    const replacedValue = varName.slice(
      varName.indexOf('_'),
      varName.indexOf('_') + 2
    );
    const camelCaseName = varName.replace(
      replacedValue,
      replacedValue[1].toUpperCase()
    );
    console.log(`${camelCaseName.padEnd(16)}  ${checks}`);
  }
});
