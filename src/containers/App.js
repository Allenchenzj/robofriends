import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import {setSearchField, requestRobots} from '../actions';



const mapStateToProps = state => {  
  return{
    //searchField is to be used as props by the App component
    // come from the state.searchRobots.searchField from reducers
    //becasue in index.js we create the store with search robot 
    //reducer, listen to state change
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error

  }
}


//dispatch is what triggers action in flux, action is dispatched
//into the reducer, dispatch is to send action
//action is just a function return object, we want dispatch that,
//so the reducers are aware of it and when dispatch setSearchField
//would listen to the text user enter (event.target.value)
const mapDispatchToProps = (dispatch) => {
  //onSearchChange is what props is named,it receives a event, which is dipatch the
  //action setSearchField
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),

    //dispatch return a function
    onReqestRobots: () => dispatch(requestRobots())
  }

}


class App extends Component {

  //we don't need contructor any more because there's no
  // more state. this robots are going to be returned as
  // part of the props from onRequestRobots

  // constructor() {
  //   super()
  //   this.state = {
  //     robots: [],
  //     // searchfield: ''
  //   }
  // }

  componentDidMount() {
      this.props.onReqestRobots();
  }

  // onSearchChange = (event) => {
  //   this.setState({ searchfield: event.target.value })
  // }

  render() {
    // const { robots} = this.state;
    
    //come from props
    const {searchField, onSearchChange, robots, isPending} = this.props;

    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    // return !robots.length ?
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

// connect is higher order function which is a function return
//another function, connect is going to run and whatever connect
//does in this function is going to return another function with
// App run inside

//right now connect the App component and subscribe to any state 
//changes in the redux store ,now needs to tell it what it interested
//in (what state should listen to. what dispatch or what action
//should i listen to)
export default connect(mapStateToProps, mapDispatchToProps)(App);


