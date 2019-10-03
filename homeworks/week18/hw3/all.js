$(document).ready(() => {
    let list = [];
  
    function render() {
      $('.todo-list').empty();
      $('.todo-list').append(list.map((item) => 
      `
      <div class="col-12 margin">
        <div class="list-group-item d-flex justify-content-between align-items-center ${item.isDone ? 'list-group-item-success' : ''}" dataId="${item.dataId}">
        ${item.content}
          <div class="button-container">
            <button class="todo-complete btn btn-warning">complete</button>
            <button class="todo-delete btn btn-danger">delete</button>
          </div>
        </div>  
      </div>
      `))
    }
  
    function addTodo(content) {
      list.push({ dataId: Math.random().toString(), content, isDone: false })
      $('.form-control').val('')
      render()
    }
  
    function removeTodo(id) {
      list = list.filter((item) => item.dataId !== id)
      render()
    }
  
    function todoCompleted(id) {
      list.forEach((item, index) => {
        if (item.dataId === id) {
          list[index].isDone = !list[index].isDone
        }
      })
      render()
    }
  
    $('.container').click((e) => {
        e.preventDefault()
        const target = $(e.target)
        if (target.hasClass('todo-delete')) {
            const id = target.parent().parent().attr('dataId')
            removeTodo(id)
        } else if (target.hasClass('todo-complete')) {
            const id = target.parent().parent().attr('dataId')
            todoCompleted(id)
        } else if (target.hasClass('btn btn-outline-secondary') && $('.form-control').val()) {
            // prevent users from using whitespace in input field 
            const content = $('.form-control').val().trim()
            // console.log(content.length)
            if(content.length === 0) return;
            addTodo(content)
        }
    })
  })