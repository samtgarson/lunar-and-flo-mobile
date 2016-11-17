import React, { Component } from 'react';
import { ListView, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import globalStyles from '../styles';
import Pack from '../pack';
import * as Animatable from 'react-native-animatable';

const styles= {
  row: {
    paddingVertical: 16
  },
  searchContainer: {
    position: 'absolute',
    top: -80,
    left: 0,
    right: 0,
    padding: 10,
    paddingTop: 30,
    zIndex: 1
  },
  search: {
    height: 40,
    backgroundColor: 'white'
  },
  list: {
    paddingTop: 40
  }
}

export default class SupplementList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previousOffset: 0,
      scrollScore: 0,
      showSearch: true
    }
  }
  renderPack () {
    const { pack, selectSupplement } = this.props
    return <Pack selectSupplement={selectSupplement} pack={pack}/>
  }

  renderRow (row) {
    if (row.id == '__pack') return this.renderPack()
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.props.selectSupplement(row.id)}>
        <Text>{ row.name }</Text>
      </TouchableOpacity>
    )
  }

  handleScroll (event) {
    const [fwd, bck] = [1, 0]
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.state.previousOffset ? fwd : bck;
    const score = direction == fwd ? 1 : this.state.scrollScore - 1
    this.setState({ 
      scrollScore: score,
      previousOffset: currentOffset, 
      showSearch: score <= -5 || currentOffset < 20
    })
  }

  render () {
    const { supplements, updateSearchTerm, searchTerm } = this.props
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

    return (
      <View style={globalStyles.screen}>
        <Animatable.View transition="top" style={{...styles.searchContainer, top: this.state.showSearch ? 0 : -80}}>
          <TextInput onChangeText={updateSearchTerm} style={styles.search} value={searchTerm} autoCorrect={false} />
        </Animatable.View>
        <ScrollView transition="paddingTop" scrollEventThrottle={100} style={{
          ...styles.list
        }} onScroll={this.handleScroll.bind(this)}>
          {this.renderPack.bind(this)()}
          <ListView dataSource={ds.cloneWithRows(this.props.supplements)} renderRow={this.renderRow.bind(this)} />
        </ScrollView>
      </View>
    )
  }
}

SupplementList.propTypes = {
  pack: React.PropTypes.object,
  selectSupplement: React.PropTypes.func.isRequired,
  supplements: React.PropTypes.array,
  updateSearchTerm: React.PropTypes.func.isRequired,
  searchTerm: React.PropTypes.string
}
