class Stack {
  constructor(size = 3) {
  	this.arr = []
    this.size = size
  }
  
  push (el) {
    if (this.arr.length < this.size) {
      this.arr[this.arr.length] = el
    } else {
      console.log('error')
    }
  }
  
  pop () {
    if (this.arr.length > 0) {
      return this.arr.splice(this.arr.length -1, 1)[0]
    } else {
      console.log('error')
    }
  }
}

class Queue {
  constructor(size = 3) {
    this.arr = []
    this.size = size
  }
  
  push(el) {
  	if (this.arr.length < this.size) {
      this.arr[this.arr.length] = el
   	} else {
      console.log('error')  
    }
  }
  
  pop() {
    if (this.arr.length > 0) {
      return this.arr.splice(0,1)[0]
  	} else {
      console.log('error') 
    }
  }
}
  
console.log('--- Stack ---'); 
const stack = new Stack(3);
console.log(stack.push(1));
console.log(stack.push(2));
console.log(stack.push(3));
console.log(stack.push(4)); //error
console.log(stack.push(5)); //error

console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.pop()); // 1
console.log(stack.pop()); // error
console.log(stack.pop()); // error

console.log('--- Queue ---');
const queue = new Queue();
console.log(queue.push(1));
console.log(queue.push(2));
console.log(queue.push(3));
console.log(queue.push(4)); // error
console.log(queue.push(5)); // error

console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
console.log(queue.pop()); // 3
console.log(queue.pop()); // error
console.log(queue.pop()); // error