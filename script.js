let input = document.getElementById("input");
let list = document.getElementById("list");
let submitBtn = document.getElementById("submit");
let clearAllBtn = document.getElementById("delete");
let errorMsg = document.getElementById("errorMsg");
let removeMsg = document.getElementById("removeMsg");
let allRemovedMsg = document.getElementById("allRemovedMsg");
removeMsg.style.color = "green";
let stringOfItems = [];
removeMsg.classList.add("error");
errorMsg.classList.add("error");
removeMsg.style.color = "green";

function addNewItem(item) {
  let li = document.createElement("li");
  li.classList.add("list-item");

  let text = document.createElement("p");
  let removeItem = document.createElement("button");

  removeItem.innerText = "X";
  removeItem.classList.add("icon");

  text.innerHTML = item.title;
  text.style.width = "100%";

  li.appendChild(text);
  li.appendChild(removeItem);
  list.appendChild(li);

  function timeToHideMsg() {
    li.classList.add("hide");
  }

  removeItem.addEventListener("click", function () {
    removeMsg = `${item.title}  Removed From The List`;
    li.innerHTML = removeMsg;
    setTimeout(timeToHideMsg, 2000);
    deleteItem(item.id);
  });
}

function getRandomId() {
  return Math.floor(Math.random() * 100);
}

function saveToString(item) {
  stringOfItems.push(item);
}
function deleteItem(itemId) {
  let index = stringOfItems.findIndex((obj) => obj.id == itemId);
  if (index !== -1) {
    stringOfItems.splice(index, 1);
  }
}
function sortItems() {
  list.innerHTML = "";
  stringOfItems.forEach((task) => {
    addNewItem(task);
    localStorage.setItem("items", JSON.stringify(stringOfItems));
  });
}

function refresh() {
  list.innerHTML = "";
  sortItems();
}
function isValid() {
  if (!input.value) {
    errorMsg.classList.remove("hide");
    errorMsg.innerText = "Please Add Grocery Item";
    errorMsg.style.color = "red";
    setTimeout(hideError, 3000);
  } else {
    saveToString({ title: input.value, id: getRandomId() });
    sortItems();
    errorMsg.classList.remove("hide");
    let message = input.value;
    errorMsg.innerText = `${message} Added To The List`;
    errorMsg.style.color = "green";
    errorMsg.style.marginBottom = "1rem";
    input.value = "";
    setTimeout(hideError, 3000);
  }
}
function hideError() {
  errorMsg.classList.add("hide");
}
function hideRemove() {
  removeMsg.classList.add("hide");
}
function allRemoved() {
  allRemovedMsg.classList.add("hide");
}
submitBtn.addEventListener("click", function () {
  isValid();
});

clearAllBtn.addEventListener("click", function () {
  if (!list.innerText) {
    allRemovedMsg.classList.remove("hide");
    allRemovedMsg.innerText = "No More Items To Delete";
    setTimeout(allRemoved, 3000);
  } else {
    removeMsg.classList.remove("hide");
    removeMsg.innerText = "All Items Removed";
    stringOfItems = [];
    list.innerHTML = "";
    setTimeout(hideRemove, 3000);
  }
});
let savedItems = JSON.parse(localStorage.getItem("items") || {});
