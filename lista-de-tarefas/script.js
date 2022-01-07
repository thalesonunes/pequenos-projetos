// Informações sobre data
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");

// Tasks Container
const tasksContainer = document.getElementById("tasksContainer");

// Inserindo informações de datas nos elementos
const setDate = () => {
    const date = new Date();

    dateNumber.textContent = date.toLocaleString('pt-br', {day: 'numeric'});
    dateText.textContent = date.toLocaleString('pt-br', {weekday: 'long'});
    dateMonth.textContent = date.toLocaleString('pt-br', {month: 'short'});
    dateYear.textContent = date.toLocaleString('pt-br', {year: 'numeric'});
};



const addNewTask = (event) => {
    event.preventDefault(); // para o envio de um input com texto inválido

    const {value} = event.target.taskText;
    if(!value) return; // evita inserir tarefas vazias

    const task = document.createElement('div'); // cria um novo elemento
    task.classList.add('task', 'roundBorder'); // adiciona as classes a esse elemento
    task.addEventListener('click', changeTaskState); // adiciona um eventListener de clique chamando a função de mudança de estado
    task.textContent = value; // adiciona ao texto do elemento os dados de "value"
    tasksContainer.prepend(task); // adiciona ao container no início da lista
    event.target.reset(); // limpa caixa de input
}

const changeTaskState = (event) => {
    event.target.classList.toggle('done'); // se tiver a classe done ela é removida, se nao tiver ela é inserida
};

const order = () => {

    const done = [];
    const toDo = [];

    tasksContainer.childNodes.forEach( el => {
        // se tiver a classe done irá para o array "done" senão vai pro array toDo;
        el.classList.contains('done') ? done.push(el) : toDo.push(el); 
    })
    
    return [...toDo, ...done]; // distribui os elementos dos arrays "toDo" e "done" em um unico array que será retornado
}

const renderOrderedTasks = () => {
    // chama a função de ordenar as tasks e adiciona uma a uma novamente, agora ordenadas
    order().forEach(el => tasksContainer.appendChild(el))
};

setDate();