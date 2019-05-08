function printStars(n) {
  let result = '';
  for (let i = 0; i < n; i += 1) {
    result += '*';
  }
  return result;
}

console.log(printStars(6));
