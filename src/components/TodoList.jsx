import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Add as AddIcon, Delete as DeleteIcon, Check as CheckIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthContext from './Auth/AuthContext';

export default function TodoList() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { logout } = useContext(AuthContext);
  

  const addTask = () => {
    if (inputValue.trim() === '') {
      return;
    }
    setTodoList([...todoList, { name: inputValue, completed: false }]);
    setInputValue('');
  };

  const completedTodo = (index) => {
    const newTodoList = [...todoList];
    newTodoList[index].completed = !newTodoList[index].completed;
    setTodoList(newTodoList);
  };

  const deleteTodo = (index) => {
    let filteredArray = todoList.filter((item, i) => i !== index);
    setTodoList(filteredArray);
  };

  const deleteAll = () => {
    setTodoList([]);
  };
  
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="app">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <TextField
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a todo"
            fullWidth
            style={{ marginRight: '1rem' }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={addTask}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </div>
        <List>
          {todoList.map((item, index) => (
            <ListItem divider key={index}>
              <ListItemText primary={item.name} sx={{ textDecoration: item.completed ? 'line-through' : 'none' }} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => completedTodo(index)} aria-label="complete">
                  <CheckIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteTodo(index)} aria-label="delete">
                  <DeleteIcon color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" onClick={deleteAll} color="secondary" className="delete-all-button">
          Delete All
        </Button>
      </Container>
    </ThemeProvider>
  );
}
