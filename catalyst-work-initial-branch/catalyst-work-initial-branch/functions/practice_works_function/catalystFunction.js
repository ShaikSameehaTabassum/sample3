
function ZCQL (app, query) {
  const zcql = app.zcql()
  const zcqlPromise = zcql.executeZCQLQuery(query)
  return new Promise((resolve, reject) => {
    zcqlPromise
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
};

function insertRow (app, tableName, insertData) {
  const datastore = app.datastore()
  const table = datastore.table(tableName)
  const insertPromise = table.insertRow(insertData)
  return new Promise((resolve, reject) => {
    insertPromise
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
};

function getRow (app, tableName, ROWID) {
  const datastore = app.datastore()
  const table = datastore.table(tableName)
  const rowPromise = table.getRow(ROWID)
  return new Promise((resolve, reject) => {
    rowPromise
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


module.exports = {
  ZCQL,
  insertRow,
  getRow
}