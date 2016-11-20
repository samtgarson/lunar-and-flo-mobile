import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  cell: {
    padding: 20
  }
});

const renderSupplement = (supplement, pressHandler) => (
  <TouchableOpacity onPress={() => pressHandler(supplement.id)} style={styles.cell} key={supplement.id}>
    <Text>{supplement.name}</Text>
  </TouchableOpacity>
)


const Pack = (props) => {
  const { pack, selectSupplement } = props
  return (
    <View style={styles.container}>
      { pack.effects && pack.effects.map(e => renderSupplement(e.supplement, selectSupplement) ) }
    </View>
  );
}

Pack.propTypes = {
  selectSupplement: React.PropTypes.func.isRequired,
  pack: React.PropTypes.object.isRequired,
};

export default Pack;
