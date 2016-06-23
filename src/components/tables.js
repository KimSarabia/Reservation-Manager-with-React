import React from 'react';
import Table from './table';

const styles = {
  container: {
    marginLeft: -20,
    marginTop: 30
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  rowNum: {
    color: '#898989',
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 20,
    fontWeight: 200,
    marginRight: 10
  },
  collNum: {
    width: 30,
    textAlign: 'center',
    color: '#898989',
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 20,
    fontWeight: 200,
    marginBottom: 10
  },
  collNumsRow: {
    display: 'flex',
    height: 28,
    marginLeft: 27,
    marginRight: 5,
    justifyContent: 'space-between'
  },
}

const range = (ln) => [...new Array(ln)].map((_, idx) => idx);

const RowNum = ({ children }) => <div style={styles.rowNum}>{children}</div>;
const CollNum = ({ children }) => <div style={styles.collNum}>{children}</div>;

const Tables = ({ tables, rowLn, uuid, onSelect }) => (
  <div style={styles.container}>
    <div style={styles.collNumsRow}>
      {range(rowLn).map((_, idx) => <CollNum key={idx}>{idx + 1}</CollNum>)}
    </div>
    {renderTables(tables, { uuid, onSelect })}
  </div>
)

function renderTables(tables, props) {

  let tablesArray = [];

  tables.forEach((table) => {
    const row = table.row - 1;
    tablesArray[row] = tablesArray[row] || [];
    tablesArray[row].push(table);
  });

  return tablesArray.map((row, idx) => (
    <div key={idx} style={styles.row}>
      <RowNum>{idx + 1}</RowNum>
      {renderRow(row.sort((a, b) => a.table - b.table), idx, props)}
    </div>
  ))
}

function renderRow(row, ridx, props) {
  return row.map((table, idx) => <Table key={idx} {...props} table={table} />)
}

export default Tables
