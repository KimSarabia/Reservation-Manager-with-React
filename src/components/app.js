import React, { Component } from 'react';
import { HorizonRoute, connect } from 'react-hz';
// import Screen from './screen'
import Tables from './tables'
import Total from './total'

const styles = {
  container: {
    width: 500,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  btn: {
    border: 'none',
    padding: '6px 10px',
    borderRadius: 2,
    fontSize: 14,
    color: '#242424',
    marginTop: 30
  }
}

const range = (ln) => [...new Array(ln)].map((_, idx) => idx);

const generateTables = (rows, colls) => range(rows * colls).map((idx) => ({
  row: Math.ceil((idx + 1) / colls),
  table: (idx + 1) % colls,
  state: 'free'
}));

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      prices: [5, 5, 5, 6],
      totalPrice: 0,
      rowLn: 10,
    }

    this._handleTableSelect = this._handleTableSelect.bind(this)
  }
  componentDidMount() {
    window.generateTables = () => this.props.generateTables(4, this.state.rowLn);
  }
  _handleTableSelect(table) {

    let { totalPrice, prices } = this.state;

    const { uuid } = this.props;
    const nextTable = {...table};
    const nextPrice = prices[nextTable.row - 1];

    if ((nextTable.uuid === undefined ||
        nextTable.uuid === null ||
        nextTable.uuid === uuid) &&
        nextTable.state === 'free') {

      nextTable.state = 'taken';
      nextTable.uuid = uuid;

      totalPrice = totalPrice + nextPrice;

    } else if (nextTable.uuid === uuid &&
               nextTable.state === 'taken') {

      nextTable.state = 'free';
      nextTable.uuid = null;

      totalPrice = totalPrice - nextPrice;
    }

    this.props.takeTable(nextTable);
    this.setState({ totalPrice });
  }
  render() {

    const { totalPrice, rowLn } = this.state
    const { uuid, allTables, takeTable, resetTables } = this.props

    return (
      <div style={styles.container}>
        // <Screen />
        <Tables tables={allTables} rowLn={rowLn} uuid={uuid} onSelect={this._handleTableSelect} />
        <Total>{totalPrice}</Total>
        <button style={styles.btn} onClick={() => resetTables(allTables, 4, rowLn)}>reset tables</button>
      </div>
    )
  }
}

function buildTables(tables, row, coll, state) {
  return tables.map((_row, ridx) => _row.map((_state, cidx) => {
    if (ridx === row && cidx === coll) {
      return state;
    } else {
      return _state;
    }
  }))
}

export default connect(App, {
  subscriptions: {
    allTables: (hz) => hz('tables'),
  },
  mutations: {
    takeTable: (hz) => (table) => hz('tables').upsert(table),
    resetTables: (hz) => (tables, rows, colls) => hz('tables').upsert(tables.map((table) => {
      table.state = 'free';
      table.uuid = null;
      return table;
    })),
    generateTables: (hz) => (rows, colls) => hz('tables').store(generateTables(rows, colls))
  }
})
