import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import supplementState from '../../state/db/supplement/selector';
import styles from '../styles'

class SupplementModal extends Component {
  constructor(props) {
    super(props)
    this.supplement = props.supplements.find(s => s.id == props.id)
  }
  render () {
    return (
      <View style={styles.modal}>
        <Text>{this.supplement.name}</Text>
        { this.supplement.symptoms.map(s => <Text key={s.id}>{s.name}</Text>) }
        <TouchableOpacity style={{position: 'absolute', top: 30, right: 12}} onPress={this.props.dismiss}><Text>X</Text></TouchableOpacity>
      </View>
    )
  }
}

SupplementModal.propTypes = {
  id: React.PropTypes.string.isRequired,
  supplements: React.PropTypes.array.isRequired,
  dismiss: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    supplements: supplementState(state)
  };
}

export default connect(
  mapStateToProps
)(SupplementModal);
