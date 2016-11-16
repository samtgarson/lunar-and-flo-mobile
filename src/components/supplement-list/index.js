import React, { Component } from 'react';
import { ListView, Text, View, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../styles';
import Pack from '../pack';

const styles= {
  row: {
    paddingVertical: 16
  },
  search: {
    height: 40,
    backgroundColor: 'white'
  }
}

const renderPack = (props) => {
  const { pack, selectSupplement } = props
  return <Pack selectSupplement={selectSupplement} pack={pack} />
}

const renderRow = (props) => (row) => {
  if (row === true) return renderPack(props)
  return (
    <TouchableOpacity style={styles.row} onPress={() => props.selectSupplement(row.id)}>
      <Text>{ row.name }</Text>
    </TouchableOpacity>
  )
}

export default SupplementList = (props) => {
  const { supplements, updateSearchTerm, searchTerm } = props
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id ? r1.id !== r2.id : r1 !== r2});
  const source = supplements.unshift(true)

  return (
    <View style={globalStyles.screen}>
      <TextInput onChangeText={ updateSearchTerm } style={styles.search} value={searchTerm} autoCorrect={false} />
      <ListView dataSource={ds.cloneWithRows(props.supplements)} renderRow={renderRow(props)} />
    </View>
  )
}

SupplementList.propTypes = {
  pack: React.PropTypes.object,
  selectSupplement: React.PropTypes.func.isRequired,
  supplements: React.PropTypes.array,
  updateSearchTerm: React.PropTypes.func.isRequired,
  searchTerm: React.PropTypes.string
}
