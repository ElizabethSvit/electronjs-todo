import './LeftBar.css';
import React from 'react';
import {CardActionArea, Grid, Typography, Card, CardContent} from '@material-ui/core';

class LeftBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            showItems: 'all',
            inputText: '',
            value: 0,
        }
    }

    renderList = (list) => (
        <Grid key={1} item xs={6} style={{flexBasis: 0}}>
            <Card style={{height: 200, width: 200}}>
                <CardActionArea style={{height: 200, width: 200}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {list.name}
                        </Typography>
                        <Typography  color="textSecondary" gutterBottom>
                            {list.date}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );

    render() {
        return (
            <div className="lists-container">
                <Grid container spacing={1}>
                    {this.props.lists.map(list => this.renderList(list))}
                </Grid>
            </div>
        )
    }
}

export default LeftBar;
