import React from 'react';
import {
    View,
    asset,
    Text,
    VrButton,
    StyleSheet,
    Image
} from 'react-360';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class Menu extends React.Component {

  constructor(){
    super();

    this.state = {
      val: 0,
      start: false,
      count: 20
    }
    RCTDeviceEventEmitter.addListener('clickedObj', (e) => { this.ScoreUpdate(e) });
  }

  onChangebg = (image) => {
    postMessage({
      type: 'bg',
      image
    })
  }

  ScoreUpdate(e){
    this.setState({
      val: this.state.val + e.score
    })
  }

  startGame = () => {

    this.setState({ start: true })

    setTimeout(()=>{
      
      const timer = setInterval(()=>{
        if(this.state.count <= 0) {
          clearInterval(timer)
          this.setState({ count: 20, start: false })
          postMessage({ type: 'game', status: 'stop' })
        }
        else {
          this.setState({
            count: this.state.count - 1
          })
        }
      }, 1000)
      postMessage({ type: 'game', status: 'start' })

    }, 1000)
  }

  render(){
      return(
      <View style={styles.panel}>
          <View style={styles.column}>
            <Text style={{ fontSize: 30 }}>
              Funny Game 360 ({this.state.count})
            </Text>
            <Text style={{ fontSize: 30 }}>
              Score: {this.state.val}
            </Text>
          </View>
          <View style={[styles.row, { opacity: this.state.start ? 0:1 }]}>
            <VrButton style={styles.greetingBox} onClick={() => this.onChangebg('1') }>
              <Image
                source={asset('image/1.png')}
                style={styles.greeting}
              />
            </VrButton>
            <VrButton style={styles.greetingBox} onClick={() => this.onChangebg('2') }>
              <Image
                source={asset('image/2.png')}
                style={styles.greeting}
              />
            </VrButton>
            <VrButton style={styles.greetingBox} onClick={() => this.onChangebg('3') }>
              <Image
                source={asset('image/3.png')}
                style={styles.greeting}
              />
            </VrButton>
            <VrButton style={styles.greetingBox} onClick={() => this.onChangebg('4') }>
              <Image
                source={asset('image/4.png')}
                style={styles.greeting}
              />
            </VrButton>
          </View>
          <View style={[styles.column, { opacity: this.state.start ? 0:1 }]}>
            <VrButton
              style={[styles.greetingBox, { padding: 20 }]} 
              onClick={this.startGame}
            >
              <Text style={{ fontSize: 20 }}>
                Start Game
              </Text>
            </VrButton>
          </View>
      </View>
      )
  }
}

const styles = StyleSheet.create({
    panel: {
      // Fill the entire surface
      width: 1000,
      height: 600,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      alignItems: 'center',
    },
    row: {
      width: 1000,
      height: 300,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      margin: 20,
    },
    greetingBox: {
      backgroundColor: '#000000',
      borderColor: '#639dda',
      borderWidth: 2,
    },
    greeting: {
      width: 150,
      height: 100
    },
  });