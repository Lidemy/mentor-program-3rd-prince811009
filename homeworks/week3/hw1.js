function stars(n) {
  const result = [];
  let number = '';
  for (let i = 1; i <= n; i += 1) {
    number += '*';
    result.push(number);
  }
  return result;
}

module.exports = stars;
