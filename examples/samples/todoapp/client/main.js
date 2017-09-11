let tasks = []

window.toggleComplete = async(event) => {
  let li = event.target
  let task = tasks.filter((task) => task.id === li.taskId)[0]
  try {
    await task.update({
      complete: !task.complete
    })
    li.style.textDecoration = task.complete ? "line-through" : "none"
  } catch (e) {
    // e == 'Error: failed to update task with title: have fun'
    $('#errorMsg').innerHTML = e.toString()
    setTimeout(() => {
      $('#errorMsg').innerHTML = ''
    }, 10000)
  }
}

window.submit = async(event) => {
  let task = await Task.create({
    title: document.getElementById('title').value
  })
  tasks.push(task)
}

window.refreshTasks = async() => {
  tasks = await Task.read()
  $('#taskList').innerHTML = ''
  tasks.forEach((task) => {
    $('#taskList').innerHTML += `<li task-id="${task.id}" on-click="window.toggleComplete(this)">${task.title}</li>`
  })
}

setTimeout(window.refreshTasks, 15000)
