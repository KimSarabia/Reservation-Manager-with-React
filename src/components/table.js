import React, { Component } from 'react';

const styles = {
  table: {
    margin: 10
  },
}

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
      states: {
        free: '#ACACAC',
        hovered: '#6EAFCD',
        selected: '#4EAAE3',
        taken: '#E36C4E',
      },
    }
  }
  render() {

    const { states, hovered } = this.state;
    const { table, uuid, onSelect } = this.props;
    const { state } = table;

    let color = hovered ? states.hovered : states[state];

    if (table.uuid === uuid && state === 'taken') {
      color = states.selected
    }

    const highlight = () => this.setState({ hovered: true });
    const unhighlight = () => this.setState({ hovered: false });

    return (
      <svg
        width='70px'
        height='70px'
        viewBox='0 0 30 30'
        style={styles.table}
        onMouseOver={highlight}
        onMouseOut={unhighlight}
        onClick={() => onSelect(table)}>

        <path d='M0,0 L5.15087891,0 L5.15087891,20 L15,20 L15,18.0546875 L7.07177734,18.0546875 L7.07177734,0 L23,0 L23,18.0546875 L15,18.0546875 L15,20 L25,20 C25.4020182,20 25,0 25,0 L30,0 L30,30 L0,30 L0,0 Z' fill={color} />
      </svg>
    )
  }
}

export default Table
