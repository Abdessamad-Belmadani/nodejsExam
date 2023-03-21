
import { tBody,apiUrl } from "./config.js";

export const fillTable=(task)=>{

   
    
 
    const taskValue = document.createElement('td');
    const taskOption = document.createElement('button');
    const taskOrder = document.createElement('td');
    const tr=document.createElement('tr');


    const {id,value,order}=task;

    tr.appendChild(taskValue);
    tr.appendChild(taskOption);
    tr.appendChild(taskOrder);

    tBody.appendChild(tr);


    taskValue.innerText=value;
    taskOrder.innerText=order;
    

    taskOption.addEventListener("click",async ()=>{
      //delete task
     let res = await fetch(apiUrl+"/"+id,{method:"DELETE"});
     if(res.ok){
        tr.remove();
        alert(res);
     }


    })



}

export const getTasks=()=>{
     fetch(apiUrl,{method:"GET"}).then(response=>response.json())
     .then(res=>{
        //console.log(res);
        res.forEach(task => {
            console.log(task);
            fillTable(task);
      });
     })
  
  
}