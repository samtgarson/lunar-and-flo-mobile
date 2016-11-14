import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import supplementState from '../../state/supplement/selector';

class SupplementModal extends Component {
  constructor(props) {
    super(props)
    this.supplement = props.supplements.withId(props.id)
  }
  render () {
    return (
      <View>
        <Text>{this.supplement.name}</Text>
      </View>
    )
  }
}

SupplementModal.propTypes = {
  id: React.PropTypes.string.isRequired,
  supplements: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    supplements: supplementState(state)
  };
}

export default connect(
  mapStateToProps
)(SupplementModal);
