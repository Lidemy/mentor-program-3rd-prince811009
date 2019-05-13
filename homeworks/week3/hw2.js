function alphaSwap(str) {
  let answer = '';
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      answer += str[i].toLowerCase();
    } else if (str[i] >= 'a' && str[i] <= 'z') {
      answer += str[i].toUpperCase();
    } else answer += str[i];
  }
  return answer;
}

module.exports = alphaSwap;
console.log(alphaSwap('A1Lkk2'));
