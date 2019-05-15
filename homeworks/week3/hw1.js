function stars(n) {
  const answer = [];
  for (let i = 0; i < n; i += 1) {
    let result = '*';
    for (let j = 0; j < i; j += 1) {
      result += '*';
    }
    answer.push(result);
  }
  return answer;
}

module.exports = stars;
console.log(stars(6));
