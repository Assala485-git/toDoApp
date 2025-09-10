import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/homescreen.jsx';
import LoginScreen from './screens/loginScreen.jsx';
import RegisterScreen from './screens/registerScreen.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoute from './components/privateRoute.jsx';
import TaskScreen from './screens/tasksScreen.jsx';
import EditTaskScreen from './screens/editTaskScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} /> 
      <Route path='' element={<PrivateRoute />}>
      <Route path='/tasks' element={<TaskScreen/>} />
      <Route path='/tasks/edit/:id' element={<EditTaskScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);