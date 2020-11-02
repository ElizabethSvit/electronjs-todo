import './App.css';
import TodoList from "../src/components/TodoList";
import React, {useState} from 'react';
import {
    Divider,
    IconButton,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions
} from '@material-ui/core';
import LeftBar from "./components/LeftBar";
import AddIcon from "@material-ui/icons/Add";

function App() {
    const [lists, setLists] = useState([{name: 'Список', date: 'Создан вчера'}]);
    const [currentList, setCurrentList] = useState({name: 'Список', date: 'Создан вчера'});
    const [backdrop, showBackdrop] = useState(false);
    const [newListName, setListName] = useState('');

    return (
        <div className="todo-app">
            <Dialog open={backdrop} onClose={() => showBackdrop(false)} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
                <DialogTitle id="form-dialog-title">Создать список</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название"
                        fullWidth
                        onChange={(e) => setListName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary">
                        Отмена
                    </Button>
                    <Button color="primary" onClick={() => setLists([...lists, {name: newListName, date: 'сейчас'}])}>
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <div style={{minWidth: '450px', flexBasis: 0, height: 900, justifyContent: 'center', zIndex: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h4" style={{color: 'rgba(0, 0, 0, 0.87)', margin: 0}}>
                        Все списки
                    </Typography>
                    <IconButton color="primary" aria-label="add list" size="large" style={{marginRight: 40}}
                                onClick={() => showBackdrop(true)}>
                        <AddIcon fontSizeLarge/>
                    </IconButton>
                </div>
                <LeftBar lists={lists}/>
            </div>
            <Divider orientation="vertical" flexItem style={{height: '100%'}}/>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <TodoList list={currentList}/>
            </div>
        </div>
    );
}

export default App;
