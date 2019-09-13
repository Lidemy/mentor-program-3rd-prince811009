class Stack {
    constructor(size = 3) {
      this.arr = []
      this.size = size
    }
  
    push(el) {
    if (this.arr.length < 3) {
    	this.arr[this.arr.length] = el
    } else {
        console.log('error')  
      }
    }
  
    pop() {
    	if (this.arr.length > 0) {
      	let result = this.arr.splice(this.arr.length - 1, 1)[0]
      	return result
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
    	if (this.arr.length < 3) {
      	this.arr[this.arr.length] = el
    	} else
      	console.log('error')  
    }
  
    pop() {
	    if (this.arr.length > 0) {
      	let result = this.arr.splice(0,1)[0]
 		    return result
    	} else 
        console.log('error') 
    }
  }
  
  const stack = new Stack();
  stack.push(10);
  stack.push(5);
  stack.push(20);
  stack.push(25);
  console.log(stack.pop()); // 20
  console.log(stack.pop()); // 5
  console.log(stack.pop()); // 10
  console.log(stack.pop()); // error
  console.log(stack.pop()); // error
  
  const queue = new Queue();
  queue.push(1);
  queue.push(2);
  queue.push(3);
  queue.push(4);
  queue.push(5);
  queue.push(6);
  console.log(queue.pop()); // 1
  console.log(queue.pop()); // 2
  console.log(queue.pop()); // 3
  console.log(queue.pop()); // error
  console.log(queue.pop()); // error