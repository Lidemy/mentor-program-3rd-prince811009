function join(arr, concatStr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    result += concatStr + arr[i];
  }
  return result;
}

console.log(join('a', '!'));

function repeat(str, times) {
  let result = '';
  for (let i = 0; i < times; i += 1) {
    result += str;
  }
  return result;
}

console.log(repeat('a', 5));
