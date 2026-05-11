let todoData = JSON.parse(localStorage.getItem("todoData")) || [];

let todoInput = document.getElementById('todo-input');
let todoForm = document.querySelector('.todo-form');
let todoList = document.querySelector('.todo-list');
let currentFilter = "all";
let taskRemain = document.querySelector('.task-remain')

function renderTodos() {
    let filtered = todoData.filter(item => {
        if (currentFilter === "active") return !item.done;
        if (currentFilter === "completed") return item.done;
        return true;
    });

    todoList.innerHTML = filtered.map(item => `
        <li class="todo-item" ${item.done ? "done" : ""}>
            <label>
                <input type="checkbox" ${item.done ? "checked" : ""}>
                <span>${item.text}</span>
            </label>
            <button type="button" class="delete-button" aria-label="O'chirish">x</button>
        </li>
    `).join("");

     let remaining = todoData.filter(item => !item.done).length;
    document.querySelector('.todo-footer span').textContent = `${remaining} ta vazifa qoldi`;
}

renderTodos();

todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        let itemText = e.target.parentElement.querySelector("span").textContent;
        let index = todoData.findIndex(item => item.text === itemText)
        if (index !== -1) {
            todoData.splice(index, 1);
        }

        localStorage.setItem("todoData", JSON.stringify(todoData));
        renderTodos();
    }

    if (e.target.type === "checkbox") {
        let itemText = e.target.parentElement.querySelector("span").textContent;
        let index = todoData.findIndex(item => item.text === itemText);
        if (index !== -1) todoData[index].done = e.target.checked;
        localStorage.setItem("todoData", JSON.stringify(todoData));
        renderTodos();
    }
});


todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputValue = todoInput.value.trim();

    if (inputValue !== "") {
        todoData.push({ text: inputValue, done: false });
        localStorage.setItem("todoData", JSON.stringify(todoData));

        renderTodos();
        todoInput.value = "";
    }
});

const allBtn = document.querySelector('.all-button')
const activeBtn = document.querySelector('.active-button')
const complatedBtn = document.querySelector('.complated-button')


function activeBtns() {

    activeBtn.addEventListener('click', () => {
        currentFilter = "active";
        allBtn.classList.remove('active');
        activeBtn.classList.add('active');
        complatedBtn.classList.remove('active');
        renderTodos();
    })

    allBtn.addEventListener('click', () => {
        currentFilter = "all";
        allBtn.classList.add('active');
        activeBtn.classList.remove('active');
        complatedBtn.classList.remove('active');
        renderTodos();
    })

    complatedBtn.addEventListener('click', () => {
        currentFilter = "completed";
        complatedBtn.classList.add('active');
        activeBtn.classList.remove('active');
        allBtn.classList.remove('active');
        renderTodos();
    })

}

activeBtns()

