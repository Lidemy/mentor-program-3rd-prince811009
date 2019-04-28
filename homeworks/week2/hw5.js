function join(array, concatStr) {
  if (array.length === 0) {
    return ''; 
  }
  var result = array[0]
  for (i = 1; i < array.length; i++) {
    result += concatStr + array[i];
  }
  return result;
}


function repeat(str, times) {
  var result = '';
  for (var i = 0; i < times; i++) {
  result += str;
  }
  return result;
}

console.log(join('a', '!'));
console.log(repeat('a', 5));
