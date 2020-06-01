import mysql  from "mysql"
import util  from "util"

var config = {        
  host: "localhost",
  user: "nodejs",
  password: "nodejs",
  database: "sensorstation_testing"
};

let db = makeDb(config);



function makeDb( config ) {
    const connection = mysql.createConnection( config );
    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
  }
 
  function insert(cols, values, table){
    db = makeDb(config);
    let sql = `INSERT INTO ${table}(${cols}) VALUES(${values});`;
    console.log(sql);
    db.query(sql);
    db.close()
    return true
  }

export async function raw(sql){
  db = makeDb(config);
  let res = await db.query(sql);
  db.close();
  return res 
}

export async function select(cols, table, conditions){
  db = makeDb(config);
  let sql = `SELECT ${cols} FROM ${table} ${conditions};`;
  console.log(sql);
  let result =   db.query(sql);
  db.close()
  return result
}


export async function selectSensorData(cols, table, conditions){
  return select(cols, table, conditions)
}

export function insertSensorData(epoch, temperature, ip_address){
    return insert("sensorTime, temperature, ip_address", `'${epoch}', ${temperature}, '${ip_address}'`, 'sensor_data');
}
