import { Component } from 'react';

export default class Step extends Component {
  constructor(props) {
    super(props)
    this.existing = props.getState()[props.index] || {}
  }
  continue () {
    this.props.saveState(this.props.index, this.state)
    this.props.nextFn()
  }
}

