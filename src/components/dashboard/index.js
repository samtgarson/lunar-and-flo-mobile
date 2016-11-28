import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import globalStyles from '../styles';
import * as Animatable from 'react-native-animatable';
import Pack from '../pack';
import Loader from '../loader';
import moment from 'moment'
import Grapher from '../../services/check-in-grapher'
import Svg, { Polyline, Rect } from 'react-native-svg';


const styles= {
  pin: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    height: 50,
    bottom: 300
  }
}

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartHeight: 300,
      chartWidth: 300,
      currentProgress: 0,
      currentHeight: 300
    }
    this.grapher = new Grapher(this.props.checkIns, this.state.chartHeight)
  }

  componentWillUpdate () {
    if (this.props.checkIns != this.grapher.data || this.state.chartHeight != this.grapher.height) {
      this.grapher = new Grapher(this.props.checkIns, {height: this.state.chartHeight})
      console.log(this.grapher)
    }
  }

  handleScroll (event) {
    const percent = 1 - (event.nativeEvent.contentOffset.x / (event.nativeEvent.contentSize.width - (this.state.chartWidth / 2)))
    this.setState({currentProgress: percent})
  }

  handleLayout (ev) {
    const { width, height } = ev.nativeEvent.layout
    this.setState({chartHeight: height, chartWidth: width})
  }

  renderChart () {
    const [x, y, w, h] = this.grapher.viewBox.split(' ')
    return (
        <View style={{flex: 1}} >
          <InvertibleScrollView style={{marginVertical: 50}} onLayout={this.handleLayout.bind(this)} scrollEventThrottle={30} onScroll={this.handleScroll.bind(this)} inverted horizontal={true} vertical={false} showsHorizontalScrollIndicator={false}>
            <Svg height={this.grapher.height} viewBox={this.grapher.viewBox} width={this.grapher.width}>
              <Polyline
                points={this.grapher.SVGPoints}
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
            </Svg>
          </InvertibleScrollView>  
          <View style={{left: 0, right: 0, bottom: 0, position: 'absolute', height: 50, backgroundColor: 'white'}} />
        </View>
    )
  }

  render() {
    const { showLoader, pack, selectSupplement } = this.props    
    return (
      <View style={{ ...globalStyles.tabScreen, paddingHorizontal: 0}}>
        <Loader display={showLoader} />
        <Pack selectSupplement={selectSupplement} pack={pack} />
        { this.grapher.ready && this.renderChart() }
      </View>
    );
  }
}

Dashboard.propTypes = {
  showLoader: React.PropTypes.bool.isRequired,
  pack: React.PropTypes.object,
  selectSupplement: React.PropTypes.func.isRequired,
  checkIns: React.PropTypes.array
};
