import React, { Component } from 'react';
import { ListView, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import globalStyles from '../styles';
import * as Animatable from 'react-native-animatable';
import Pack from '../pack';
import Loader from '../loader';

const styles= {
 
}

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
  }

  handleScroll (event) {

  }

  render() {
    const { showLoader, pack, selectSupplement, checkIns } = this.props
    return (
      <View style={globalStyles.screen}>
        <Loader display={showLoader} />
        <Pack selectSupplement={selectSupplement} pack={pack} />
        { checkIns.map(c => <Text key={c.id}>{c.score}</Text>) }
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
