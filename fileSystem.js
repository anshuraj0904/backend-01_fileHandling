// Starting the backend journey, and we'll start with reading and writing into a file, basically into a file system.

const fs = require("fs")
const filePath = './tasks.json'
const prompt = require('prompt-sync')();  // This will allow us to use the prompt in the console itself. 


// We'll be adding a task from the argument(cli) into the tasks.json

// So, as I remember from python, the first one is the python3 i.e, argv[0], argv[1] is the name of the file, and, what follows next are the arguments of our use.

let command = process.argv[2]
let argument = process.argv[3]


const listTasks= ()=>{
    const tasks = loadTasks()
    tasks.forEach((task, index) => {
        console.log(`${index + 1} - ${task}`);
        
    });
} 


const loadTasks = ()=>{
    // Here, we'll use the fs for reading the file.
    try{
        const dataBuffer = fs.readFileSync(filePath) // It will be reading the file synchronously i.e, in a thread.
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(error)
    {
        return []
    }
}


const saveTasks = (tasks)=>{
    try {
        // Let us first convert the data into the format that a json file can store.
        const dataJSON = JSON.stringify(tasks)
        fs.writeFileSync(filePath, dataJSON) // Writing needs the path as well.
    } catch (error) {
        console.log("Some error occurred!")
    }
}

const addTask = (task)=>{
    const tasks = loadTasks()
    tasks.push(task)
    saveTasks(tasks) 
    console.log("Task added successfully!");
    
}



const updateTask = (updated_task) =>{
    let tasks = loadTasks()
    let flag = false
    
    tasks.forEach((task, index)=>{
        if(index+1 == argument)
        {
            tasks[index] = updated_task // Mark it that, here we've used tasks[index] and not task[index] as, task cannot have an index. 
            flag = true           
        }})
    
    if(flag)
        {           
            saveTasks(tasks)
            console.log("Task updated successfully!")
        }    
    else{
        console.log("Task doesn't exist to be updated!");
        
    }    

}

const removeTask = (task_num)=>{
    let tasks = loadTasks()
    let flag = false
    tasks.forEach((task,index)=>{
            if(index+1 == task_num)
            {
                flag = true
            }
    })

    if(flag)
    {
        tasks = tasks.filter((task,index) => index+1 != task_num)
        saveTasks(tasks)
        console.log("Task updated successfully!");
        
    }
    else{
        console.log("Task number greater than the last task number available");
        
    }

}



if (command === "add")
{
    addTask(argument)
}
else if(command === "list")
{
    listTasks()
}
else if(command === "remove")
{
    removeTask(parseInt(argument)) // As, we'll be removing it as per the id.
}
else if(command === "update")
{
    let updated_task = prompt("Enter the updated task: ")
    updated_task = (updated_task.toString()).trim()
    updateTask(updated_task)
}
else{
    console.log("Command not found!");    
}