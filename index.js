import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-360';
import Menu from './components/Menu';
import ObjectComponent from './components/ObjectComponent';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class game360 extends React.Component {

  constructor(){
    super();
    this.state = {
      started: false
    }
    RCTDeviceEventEmitter.addListener('game', (e) => { this.UpdateStatus(e) });
  }

  UpdateStatus(e){
    if(e.status === 'start') {
        this.setState({
          started: true
        })
    }
    else{
      this.setState({
        started: false
      })
    }
  }

  render() {
    return (
      <View>
        {this.renderObject()}
      </View>
    );
  }

  renderObject() {
    if(this.state.started === true){
      return(
        <View>
          <ObjectComponent x={5} speed={0.5}/>
          <ObjectComponent x={0} speed={0.6}/>
          <ObjectComponent x={-5} speed={0.7}/>
          <ObjectComponent x={10} speed={0.8}/>
          <ObjectComponent x={-10} speed={0.9}/>
          <ObjectComponent x={-15} speed={0.3}/>
          <ObjectComponent x={15} speed={0.5}/>
          <ObjectComponent x={-20} speed={0.4}/>
          <ObjectComponent x={20} speed={0.3}/>
          <ObjectComponent x={3} speed={0.4}/>
        </View>
      )
    }
    else {
      return <View></View>
    }
  }
};

AppRegistry.registerComponent('game360', () => game360);
AppRegistry.registerComponent('Menu', () => Menu);
