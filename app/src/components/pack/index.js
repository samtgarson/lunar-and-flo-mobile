import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 30
  },
  cell: {
    padding: 20
  }
});


class Pack extends Component {
  renderSupplement(supplement) {
    return (
      <TouchableOpacity onPress={() => this.props.selectSupplement(supplement.id)} style={styles.cell} key={supplement.id}>
        <Text>{supplement.name}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const { pack } = this.props
    return (
      <View style={styles.container}>
        { pack.effects.map(e => this.renderSupplement(e.supplement) ) }
      </View>
    );
  }
}

Pack.propTypes = {
  selectSupplement: React.PropTypes.func.isRequired,
  pack: React.PropTypes.object.isRequired,
};

export default Pack;
