import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import { Header, List } from 'semantic-ui-react'
interface Value {
  id: number;
  name: string;
}

function App() {

  const data: Value[] = [];
  const [values, setValues] = useState(data);

  useEffect(()=> {
    axios.get('http://localhost:5000/api/values').then((response) => {
      setValues(response.data)
    });
  },[])
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
         {values.map((value: Value) => (
           <List.Item key={value.id}>{value.name}</List.Item>
         ))}
        </List>
    </div>
  );
}

export default App;
