function alphaSwap(str) {
  let answer = '';
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      answer += str[i].toLowerCase();
    } else {
      answer += str[i].toUpperCase();
    }
  }
  return answer;
}

module.exports = alphaSwap;
