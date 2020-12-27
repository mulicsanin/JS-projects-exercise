const form=document.getElementById("form");
const input=document.getElementById("input");
const todos=document.getElementById("todos");
const GetTodosLS = JSON.parse(localStorage.getItem('todos'));
if(GetTodosLS)
{
    GetTodosLS.forEach((todo) => {
        addTodo(todo);
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    addTodo();
});


function addTodo(todo)
{
    let todoText= input.value;
   
    if(todo)
    {
        todoText=todo.text;
    }
    
    if(todoText)  
    {
        const todoEl=document.createElement
       ("li");
       todoEl.innerText=todoText;
       
       if(todo && todo.completed)
       {
           todoEl.classList.add('completed');
       }
       todoEl.addEventListener('click', () =>{
           todoEl.classList.toggle('completed');
           updateLS();
        });
        
        todoEl.addEventListener("contextmenu", (e) =>{
            e.preventDefault();
            
            todoEl.remove();
           updateLS();
        })
        
        todos.appendChild(todoEl);
        
       updateLS();
       input.value="";
    }
}

function updateLS()
{
    const todosEl = document.querySelectorAll('li');
    const todosLS = [];
    
    todosEl.forEach((todoEl) =>{
        todosLS.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todosLS));
    
}  