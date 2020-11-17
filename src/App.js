import './App.css';
import TodoList from "../src/components/TodoList";
import React, {useEffect, useState} from 'react';
import {
    Divider,
    IconButton,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from '@material-ui/core';
import LeftBar from "./components/LeftBar";
import AddIcon from "@material-ui/icons/Add";
import {generateUniqueId} from "./utils.js";

const CHARACTER_LIMIT = 70;

function App() {
    const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')) || []);
    const [currentList, setCurrentList] = useState({});
    const [backdrop, showBackdrop] = useState(false);
    const [newListName, setListName] = useState('');
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
        console.log(lists);
    }, [lists]);
    useEffect(() => {
        console.log('currentlist', currentList);
    }, [currentList]);

    const createNewList = async () => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let humanDate = day + '-' + month + '-' + year;
        let id = generateUniqueId();
        setLists([...lists, {id, name: newListName, date: 'Создан ' + humanDate}]);
        setCurrentList({id, name: newListName, items: []});
        showBackdrop(false);
    };

    const updateListItems = (listItems) => {
        setCurrentList({id: currentList.id, name: currentList.name, items: listItems});
    };

    const onListClick = (newList) => {
        // сохраняем все из текущего в общие
        const listsCopy = [...lists];
        for (let list in listsCopy) {
            console.log(list);
            if (listsCopy[list].id === currentList.id) {
                listsCopy[list].items = currentList.items;
            }
        }
        console.log(listsCopy);
        setLists(listsCopy);
        // переключаемся на новый
        setCurrentList(newList);
    };

    return (
        <div className="todo-app">
            <Dialog open={backdrop} onEnter={() => setListName('')} onClose={() => showBackdrop(false)}
                    aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
                <DialogTitle id="form-dialog-title">Создать список</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название"
                        fullWidth
                        onChange={(e) => setListName(e.target.value)}
                        inputProps={{
                            maxLength: CHARACTER_LIMIT,
                        }}
                        helperText={`${newListName.length}/${CHARACTER_LIMIT}`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => showBackdrop(false)}>
                        Отмена
                    </Button>
                    <Button color="primary" onClick={createNewList}>
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <div style={{minWidth: '450px', flexBasis: 0, height: 900, justifyContent: 'center', zIndex: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h4" style={{color: 'rgba(0, 0, 0, 0.87)', margin: 0}}>
                        Все списки
                    </Typography>
                    <IconButton color="primary" aria-label="add list" style={{marginRight: 40}}
                                onClick={() => {showBackdrop(true); onListClick(currentList);}}>
                        <AddIcon />
                    </IconButton>
                </div>
                <LeftBar lists={lists} onClick={newList => onListClick(newList)}/>
            </div>
            <Divider orientation="vertical" flexItem style={{height: '100%'}}/>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <TodoList list={currentList} updateListItems={updateListItems} />
            </div>
        </div>
    );
}

export default App;
