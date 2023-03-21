const express = require("express");
const session = require("express-session");
const { v4: uuidV4 } = require("uuid");
const app = express();

app.use(express.json());
app.use(express.static("./public"));


app.use(
  session({
    secret: uuidV4(),
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },

  })
);
app.use((req,res,next)=>{
    if(!req.session.tasks){
        req.session.tasks=[];
        next();
    }else{
        next()
    }
         
   
    
})
app.get("/tasks", (req, res) => {
  if (req.session.tasks) {

    let limit = req.query.limit || req.session.tasks.length;
    const tasks = req.session.tasks.slice(0, limit);
    res.status(200).json(tasks);
  }else{
    res.status(404).json({ "message": "no task found ,create one!!" });
  }
});

app.post("/tasks", (req, res) => {
  const { value, order } = req.body;
  const id = uuidV4();
  if (!value || isNaN(order)) {
    res.status(400).json({ "message": "value and order are required" });
  } else {
    const task = {
      id: id,
      value: value,
      order: order,
    };
    
    req.session.tasks.push(task);
    console.log(req.session.tasks);
    res.status(200).json({ "message": "task is saved successfully" });
  }
});

app.delete("/tasks/:id",(req,res)=>{

    const id = req.params.id;
    if(req.session.tasks){
        const taskToDelete = req.session.tasks.find(task=>task.id == id);
        if(taskToDelete){
            req.session.tasks=req.session.tasks.filter(task=>task != taskToDelete);
            res.status(200).json({ "message": "task with id :"+id+" is deleted successfully" });
        }else{
            res.status(404).json({ "message": "task with id :"+id+" is not found !!" });
        }

    }else{
        res.status(404).json({ "message": "you have no tasks to delete" })
    }
})

app.listen(3000, console.log("server is running on port 3000"));
