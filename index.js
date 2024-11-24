const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTaskToTaskList(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

function addTaskToTaskList(tasks, taskId, text, priority) {
  let newArr = tasks.slice();
  let taskObj = {};
  taskObj.taskId = taskId;
  taskObj.text = text;
  taskObj.priority = priority;
  newArr.push(taskObj);
  return newArr;
}

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let taskArr = tasks.slice();
  let results = taskArr.sort(sortByPriority);
  res.json({ tasks: results });
});
function sortByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

function updateProrityOnTaskId(taskArr, taskId, priority) {
  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].taskId === taskId) {
      taskArr[i].priority = priority;
    }
  }
  return taskArr;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskArr = tasks.slice();
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = updateProrityOnTaskId(taskArr, taskId, priority);
  res.json({ tasks: result });
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let taskArr = tasks.slice();
  let result = updateTaskText(taskArr, taskId, text);
  res.json({ tasks: result });
});
function updateTaskText(taskArr, taskId, text) {
  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].taskId === taskId) {
      taskArr[i].text = text;
    }
  }
  return taskArr;
}
function deleteTaskByTaskId(task, taskId) {
  return task.taskId != taskId;
}
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = tasks.filter((task) => deleteTaskByTaskId(task, taskId));
  res.json({ tasks: result });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let results = tasks.filter((task) => filterByPriority(task, priority));
  res.json({ tasks: results });
});
function filterByPriority(task, priority) {
  return task.priority === priority;
}
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
