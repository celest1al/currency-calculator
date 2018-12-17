import React from "react";
import PropTypes from "prop-types";
import currencyFormatter from "currency-formatter";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const ReuseableList = (props) => {
    const total = props.rate ? props.rate * props.value : 0;
    return (
        <ListItem button>
            <ListItemText
                primary={currencyFormatter.format(total, { code: props.symbol })}
                secondary={props.name ? props.name : null}
            />
            <ListItemSecondaryAction>
                <IconButton onClick={props.deleteList} aria-label="Delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

ReuseableList.propTypes = {
    rate: PropTypes.number,
    value: PropTypes.number,
    name: PropTypes.string,
    deleteList: PropTypes.func
}

export default ReuseableList;
