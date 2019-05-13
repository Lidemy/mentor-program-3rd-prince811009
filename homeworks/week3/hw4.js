function isPalindromes(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }
  return result === str;
}

module.exports = isPalindromes;
console.log(isPalindromes('applppa'));
