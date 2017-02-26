

import {Component} from 'react';

class TestComponents extends Component {

  constructor(props){
    super(props);
    console.warn('TestComponents', props);
  }
  componentWillMount(){
    console.warn('componentWillMount');
  }
  componentDidMount(){
    console.warn('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.warn('shouldComponentUpdate', nextProps, nextState);
    return true;
  }
  render(){
    console.warn('render')
    return null;
  }
  componentDidUpdate(prevProps, prevState){
    console.warn('componentDidUpdate', prevProps, prevState);

  }
  componentWillUpdate(nextProps, nextState){
    console.warn('componentWillUpdate', nextProps, nextState);
  }
  componentWillReceiveProps(props){
    console.warn('componentWillReceiveProps', props);
  }
  componentWillUnMount(){
    console.warn('component unmount');
  }
}

export default TestComponents;
