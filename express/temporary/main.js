const main = () => {
    const todoForm = document.getElementById('todo-form');
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!(content = e.target.content.value.trim())) {
            return;
        }
        const todo = createTodo(content);
        todoForm.reset();
        renderTodo(todo);
    });
    todoForm.addEventListener('keypress', (e) => e.key === 'Enter' ? e.preventDefault() : null);
};

/**
 * @typedef Todo
 * @property {number} id
 * @property {string} content
 */

/**
 * TODOを作成する
 *
 * @param {string} content
 * @return {Todo} todo
 */
const createTodo = (content) => {
    return {
        id: Date.now(),
        content,
    };
};

/**
 * TODOを描画する
 *
 * @param {Todo} todo
 */
const renderTodo = (todo) => {
    const todoList = document.getElementById('todo-list');
    const el = document.createElement('li');
    el.setAttribute('key', todo.id);
    el.textContent = todo.content;
    todoList.append(el);
};

main();
