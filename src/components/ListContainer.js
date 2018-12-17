import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import currencyFormatter from "currency-formatter";
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  getAllCurrenciesAction,
  addCurrencyAction,
  removeCurrencyAction
} from "../actions/currencyActions";
import { styles } from "../constant/styles";
import { currenciesName } from "../constant/currenciesName";
import ReuseableList from './ReuseableList';

class ListContainer extends React.Component {
  state = {
    value: 1,
    currencyList: {},
    open: false,
    changeValueMode: false,
    selectedCurrencyList: [],
    selectedCurrency: "",
    newValue: ""
  };

  componentDidMount() {
    this.props.fetchCurrencyList()
  }

  componentDidUpdate(prevProps) {
    if (this.props.currencyList !==
      prevProps.currencyList &&
      this.props.currencyList.status === 200) {
      this.setState({
        currencyList: this.props.currencyList.data.rates
      })
    }

    if (this.props.selectedCurrency !== prevProps.selectedCurrency) {
      this.setState({
        selectedCurrencyList: this.props.selectedCurrency.data
      })
    }
  }

  handleDropdown = () => {
    this.setState(state => ({ open: !state.open }));
  };

  onChangeSelectedCurrency = (event) => {
    this.setState({
      selectedCurrency: event.target.value
    })
  }

  onAddCurrency = () => {
    const { selectedCurrency, currencyList } = this.state;
    let data = {
      symbol: selectedCurrency,
      rate: currencyList[selectedCurrency],
      name: currenciesName[selectedCurrency]
    }

    this.props.addCurrency(data)
    this.setState({
      selectedCurrency: "",
      open: false
    })
  }

  onRemoveCurrency = (data) => () => {
    this.props.removeCurrency(data);
  }

  onChangeValueMode = () => {
    this.setState({
      changeValueMode: true
    })
  }

  onChangeNewvalue = (event) => {
    this.setState({
      newValue: event.target.value
    })
  }

  onSubmitNewValue = () => {
    const { newValue } = this.state;
    this.setState({
      changeValueMode: false,
      value: newValue,
      newValue: ""
    })
  }

  render() {
    const { classes } = this.props;
    const {
      value,
      newValue,
      open,
      currencyList,
      selectedCurrencyList,
      selectedCurrency,
      changeValueMode
    } = this.state;
    let newList = [];

    if (Object.keys(currencyList).length > 0) {
      for (let key in currencyList) {
        newList.push({ key, rates: currencyList[key] })
      }
    }

    return (
      <Grid container justify="center">
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">
              Dollar to others currencies
            </ListSubheader>}
          className={classes.root}
        >
          <ListItem>
            {
              changeValueMode ?
                <React.Fragment>
                  <TextField
                    className={classes.input}
                    value={newValue}
                    onChange={this.onChangeNewvalue}
                    type="number"
                    helperText={`${newValue ? "" : "Please input new value!"}`}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      disabled={!newValue}
                      onClick={this.onSubmitNewValue}>
                      Submit
                    </Button>
                  </ListItemSecondaryAction>
                </React.Fragment> :
                <React.Fragment>
                  <ListItemText primary={`${currencyFormatter.format(value, { code: "USD" })}`} />
                  <ListItemSecondaryAction>
                    <Button onClick={this.onChangeValueMode}>
                      Change
                    </Button>
                  </ListItemSecondaryAction>
                </React.Fragment>
            }
          </ListItem>
          <Divider />
          {
            selectedCurrencyList.length > 0 ?
              selectedCurrencyList.map((currency, index) => {
                return (
                  <ReuseableList
                    key={`${currency.symbol}+${index}`}
                    value={value}
                    symbol={currency.symbol}
                    name={currency.name}
                    rate={currency.rate}
                    deleteList={this.onRemoveCurrency(currency)}
                  />
                )
              }) :
              <ListItem>
                <ListItemText primary="No currency is added :(" />
              </ListItem>
          }
          <Divider />
          <ListItem button onClick={this.handleDropdown}>
            <ListItemText primary="Add more currency" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="SelectCurrency">Select Currency</InputLabel>
                  <Select
                    value={selectedCurrency}
                    onChange={this.onChangeSelectedCurrency}
                    inputProps={{
                      name: 'selectCurrency',
                      id: 'selectCurrency',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      newList.map(value => {
                        return (
                          <MenuItem
                            key={value.key}
                            value={value.key}>
                            {value.key}
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                  {
                    selectedCurrency ?
                      "" :
                      <p style={{ color: "red", fontSize: 10 }}>Please insert the value!</p>
                  }
                </FormControl>
                <ListItemSecondaryAction>
                  <Button
                    disabled={!selectedCurrency}
                    onClick={this.onAddCurrency}>
                    Submit
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Grid>
    );
  }
}

ListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    currencyList: state.currencyList,
    selectedCurrency: state.selectedCurrency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrencyList: () => dispatch(getAllCurrenciesAction()),
    addCurrency: data => dispatch(addCurrencyAction(data)),
    removeCurrency: data => dispatch(removeCurrencyAction(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListContainer));
