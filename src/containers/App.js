import React, { Component } from 'react';
import { connect } from 'react-redux';
//import logo from './logo.svg';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
//import {robots} from './robots'; // to load from robots.js

import {setSearchField, requestRobots} from '../actions';

const mapStateToProps=state=>{
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    onSearchChange: (event)=>dispatch(setSearchField(event.target.value)),
    onRequestRobots: ()=> dispatch(requestRobots())
  }
}

class App extends Component {
 /*  constructor() {
    super()
    this.state={
      robots: [],
      //searchfield: ''
    }
    console.log('constructor');
  } */

  componentDidMount(){
    //console.log(this.props.store.getState());
    this.props.onRequestRobots();
    /* fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>{
      return response.json();
    })
    .then(users=>{
      this.setState({robots: users});
    })
    */
    console.log('componentDidMount');
  } 

// onSearchChange=(event)=>{
//   this.setState({searchfield: event.target.value});
//   //console.log(filteredRobots);
// }

  render()
  {
    //const {robots}=this.state;
    const { searchField, onSearchChange, robots, isPending }=this.props;
    const filteredRobots=robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    console.log('render');
    //if (this.state.robots.length===0){
    if (isPending){
      return <h1>Loading...</h1>
    } else {
    return (
    <div className='tc'>
    <h1 className='f2'>Robofriends</h1>
    <SearchBox searchChange={onSearchChange}/>
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots}/>
        </ErrorBoundry>
      </Scroll>
    </div>
  );
  }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
