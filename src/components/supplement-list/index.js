import React, { Component } from 'react';
import { ListView, Text, View, TouchableOpacity } from 'react-native';
import supplementState from '../../state/supplement/selector'
import { connect } from 'react-redux';
import globalStyles from '../styles';
import Pack from '../pack';

const styles= {
  row: {
    paddingVertical: 16
  }
}

export class SupplementList extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: ds.cloneWithRows(props.supplements)
    }
  }
  renderRow (row) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.props.selectSupplement(row.id)}>
        <Text>{ row.name }</Text>
      </TouchableOpacity>
    )
  }
  render () {
    const { pack, selectSupplement } = this.props
    return (
      <View style={globalStyles.screen}>
        <Pack selectSupplement={selectSupplement} pack={pack} />
        <ListView style={{flex: 1}} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

SupplementList.propTypes = {
  pack: React.PropTypes.object,
  selectSupplement: React.PropTypes.func.isRequired,
  supplements: React.PropTypes.array
}

function mapStateToProps(state) {
  return {
    supplements: supplementState(state)
  }
}

export default connect(
  mapStateToProps
)(SupplementList);
