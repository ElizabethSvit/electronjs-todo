import './TodoList.css';
import React from 'react';
import {IconButton, Button, TextField, Checkbox, Tabs, Tab, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            showItems: 'all',
            inputText: '',
            value: 0,
        }
    }
    componentDidMount() {
        // const listItems = localStorage.getItem('rememberMe') === 'true';
        // const user = rememberMe ? localStorage.getItem('user') : '';
        // this.setState({ user, rememberMe });
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    onCheckItem = (item) => {
        let checked;
        this.setState({listItems: this.state.listItems.map(el => {
                if (el.code === item.code) {
                    checked = el.checked;
                    el.checked = !el.checked;
                }
                return el;
            })
        });
    };

    renderListItem = (listItem) => {
        return (<div className="todo__list-item" key={listItem.code}>
            <Checkbox color="primary" checked={listItem.checked} onClick={() => this.onCheckItem(listItem)}/>
            <div className={listItem.checked && "todo__list-item_done"}>{listItem.text}</div>
        </div>);
    };

    showCompleted = () => {
        this.setState({showItems: 'completed'});
    };

    showInProcess = () => {
        this.setState({showItems: 'process'});
    };

    showAll = () => {
        this.setState({showItems: 'all'});
    };

    addItem = () => {
        if (this.state.inputText.length > 0) {
            this.setState({
                listItems: [...this.state.listItems,
                    {code: Math.random(), checked: false, text: this.state.inputText}]
            });
            document.getElementById('item-input').value = '';
            this.setState({inputText: ''});
        }
    };

    renderItems = () => {
        switch (this.state.showItems) {
            case 'all':
                return this.state.listItems.map(item => this.renderListItem(item));
            case 'completed':
                return this.state.listItems.map(item => {
                    if (item.checked) return this.renderListItem(item);
                });
            case 'process':
                return this.state.listItems.map(item => {
                    if (!item.checked) return this.renderListItem(item);
                });
            default:
                return;
        }
    };

    render() {
        return (
            <div className="todo">
                <h2>{this.props.listName}</h2>
                <div className="todo__list-form">
                    <div className="todo__list-form_input">
                        <TextField id="item-input" label="Новый пункт" style={{width: '100%'}}
                                   onChange={(event) => this.setState({inputText: event.target.value})}/>
                        <IconButton aria-label="add" onClick={this.addItem}>
                            <AddIcon fontSize="medium" color="primary"/>
                        </IconButton>
                    </div>
                    <div style={{marginTop: '20px', alignSelf: 'start'}}>
                        {this.renderItems()}
                    </div>
                    <Paper style={{position: 'absolute', bottom: '10px'}}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            aria-label="example"
                        >
                            <Tab onClick={this.showAll} label="Все" />
                            <Tab onClick={this.showInProcess} label="В процессе" />
                            <Tab onClick={this.showCompleted} label="Выполненные" />
                        </Tabs>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default TodoList;
