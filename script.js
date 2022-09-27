let taskList = [];
const hrPerWek = 24 * 7;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);

  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  const obj = {
    task,
    hr,
    type: "entry",
  };

  const total = taskList.reduce((acc, item) => acc + item.hr, 0) + hr;

  if (total > hrPerWek) {
    return alert(
      "Sorry boss, you don't have enought hour left to add this task."
    );
  }

  taskList.push(obj);
  display();
};

const display = () => {
  let str = "";

  taskList.map((item, i) => {
    str +=
      item.type === "entry"
        ? `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${item.task}</td>
        <td>${item.hr}hr</td>
        <td>
          <button onclick ="deleteItem(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button onclick="updateTask(${i}, 'bad')" class="btn btn-success">
            <i class="fa-solid fa-arrow-right-long"></i>
          </button>
        </td>
      </tr>`
        : "";
  });

  document.getElementById("task-list").innerHTML = str;
  totalTaskHours();
};

const displayBadList = () => {
  let str = "";

  taskList.map((item, i) => {
    str +=
      item.type === "bad"
        ? `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${item.task}</td>
        <td>${item.hr}hr</td>
        <td>
          <button onclick ="deleteItem(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button onclick="updateTask(${i}, 'entry')" class="btn btn-success">
            <i class="fa-solid fa-arrow-left-long"></i>
          </button>
        </td>
      </tr>`
        : "";
  });

  document.getElementById("bad-list").innerHTML = str;
  totalTaskHours();
  totalBadHours();
};

const totalTaskHours = () => {
  document.getElementById("totalHrs").innerText = taskList.reduce(
    (acc, item) => acc + item.hr,
    0
  );
};
const totalBadHours = () => {
  document.getElementById("totalBadHrs").innerText = taskList.reduce(
    (acc, item) => (item.type === "bad" ? acc + item.hr : acc + 0), 0
    
  );
};
const updateTask = (i, type) => {
  taskList = taskList.map((item, index) => {
    if (i === index) {
      item.type = type;
    }
    return item;
  });
  console.log(taskList);
  display();
  displayBadList();
};

const deleteItem = (i) => {
  if (window.confirm("Are you sure you want to delete this?")) {
    taskList.splice(i, 1);
    display();
    displayBadList();
  }
};