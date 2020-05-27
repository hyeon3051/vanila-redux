import { createStore } from "redux";

const form = document.querySelector('form'),
    input = form.querySelector('input'),
    ul = document.querySelector("ul");


const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETO_TODO";

const reducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case ADD_TODO:
            return [...state, { text: action.text, id: Date.now() }];
        case DELETE_TODO:
            return state.filter(text => text.id !== parseInt(action.id));
        default:
            return state;
    }
}

const store = createStore(reducer);

store.subscribe((() => { console.log(store.getState()) }))
const deletToDo = (e) => {
    const id = e.target.parentNode.id;
    store.dispatch({ type: DELETE_TODO, id })
}

const paintToDOs = () => {
    const toDos = store.getState();
    ul.innerHTML = '';
    toDos.forEach(todo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener('click', deletToDo);
        li.id = todo.id;
        li.innerText = todo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    })
}
store.subscribe(paintToDOs)

const onSubmit = (e) => {
    e.preventDefault();
    const todo = input.value;
    input.value = '';
    store.dispatch({ type: ADD_TODO, text: todo });
}

form.addEventListener('submit', onSubmit);