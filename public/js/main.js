
import { apiUrl, table } from "./config.js";
import { fillTable, getTasks } from "./tasks.js";

const btnSubmitTask =document.getElementById('submit');

btnSubmitTask.addEventListener("click",(e)=>{
    e.preventDefault();

    // post task
    let value = document.getElementById("value")
    value=value.value;
    const order = table.rows.length;

    const task = {value:value,order:order};
    console.log(task)
     fetch(apiUrl,{
        method:"POST",
        body:JSON.stringify(task),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>response.json()).then(res=>{
          alert(res.message);
          fillTable(task);
    }).catch(err=>{
        alert(err);
    })
    
})

window.addEventListener("load",()=>{
    getTasks();
})

document.getElementById('Refresh').addEventListener("click",()=>{
    window.location.reload();
})