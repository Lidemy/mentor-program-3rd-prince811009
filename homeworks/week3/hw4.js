function isPalindromes(str) {
  let answer = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    answer += str[i];
  }
  return answer === str;
}

module.exports = isPalindromes;
