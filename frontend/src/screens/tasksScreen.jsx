import { LinkContainer } from 'react-router-bootstrap';
import {useGetTasksQuery, useAddTaskMutation,useUpdateTaskMutation,useDeleteTaskMutation} from '../slices/taskApiSlice.js'
import {Card, Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';

const TaskScreen=()=>{
    const {data,isLoading,error}=useGetTasksQuery();
    const [addTask]=useAddTaskMutation();
    const [deleteTask]=useDeleteTaskMutation();
    const [updateTask]=useUpdateTaskMutation();
    const [tasks,setTasks]=useState([]);
    useEffect(()=>{
      if(data) {
        const newTasks = [...data].sort((a, b) => {
          // false = 0, true = 1 → incomplete first, completed later
          return a.isCompleted - b.isCompleted;
          });
          setTasks(newTasks);
          console.log(tasks);
        }
    },[data]);
    const onToggleComplete=async (task)=>{
      try{
        const res=await updateTask(
          { 
            id: task._id,
            isCompleted:!task.isCompleted
          }).unwrap();
        /*console.log(res);*/
      }catch(err){
        toast.error(err?.data?.message || err.error);
      }
      
    }
    return (
    <>
    {tasks && tasks.map(task=>
    <Card className="mb-3 shadow-sm" key={task._id}>
      <Card.Body>
        <div className="d-flex align-items-center">
        <Form.Check 
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task)} 
            className="me-2"
        />
        <Card.Title>{task.title}</Card.Title>
        </div>
        <Card.Text>{task.description}</Card.Text>
        <Card.Text>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Card.Text>  
        <LinkContainer to={`/tasks/edit/${task._id}`}>
        <Button 
          variant="outline-primary" 
          size="sm" 
          className="me-2"
        >
          Edit
        </Button>
        </LinkContainer>
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={async ()=>{
                try {
                  await deleteTask(task._id);
                } catch (err) {
                  toast.error(err); 
                }
            }
        }
        >
          Delete
        </Button>
      </Card.Body>
    </Card>)}
    <Button
    onClick={async ()=>{
        const title=prompt('Enter task title');
        const description=prompt('Enter task description');
        let date=prompt('Enter due date');
        const [day, month, year] = date.split("/").map(Number);
        const dueDate= new Date(year, month - 1, day);
        console.log(dueDate);
        if(title && description && dueDate){
            try{
                await addTask({title,description,dueDate}).unwrap();
            }catch(err){
                toast.error(err);
            }
        }
        else{
            toast.error('All fields are required');
        }
    }
       }
    >Add Task</Button>
    </>
    )
}
export default TaskScreen;