import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetTaskQuery,useUpdateTaskMutation } from "../slices/taskApiSlice.js";
import {useNavigate} from 'react-router-dom';
import Loader from '../components/loader.jsx';
import { toast } from "react-toastify";


const EditTaskScreen = () => {
  const { id } = useParams();
  const {data,isLoading,error}=useGetTaskQuery(id);
  console.log(data);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState('');
  const [updateTask]=useUpdateTaskMutation();
  const navigate=useNavigate();

  useEffect(() => {
  if (data) {
    setTitle(data.title);
    setDescription(data.description);
    setDueDate(data.dueDate ? data.dueDate.split('T')[0] : '');
    setIsCompleted(data.isCompleted);
  }
}, [data]);
if (isLoading) return <Loader />;
if (error) return <div>{error?.data?.message || error.error}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res=await updateTask({id,title,description,dueDate,isCompleted}).unwrap();
      toast.success('Task updated successfully');
    navigate('/tasks');
    }catch(err){
      toast.error(err?.data?.message || err.error);
    }
    
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </Form.Group>

      <Form.Check
        type="checkbox"
        label="Completed"
        checked={isCompleted}
        onChange={(e) => setIsCompleted(e.target.checked)}
        className="mb-3"
      />

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit">Save</Button>
        <Button variant="secondary" onClick={()=>{
            navigate('/tasks');
        }} >Cancel</Button>
      </div>
    </Form>
  );
};

export default EditTaskScreen;
