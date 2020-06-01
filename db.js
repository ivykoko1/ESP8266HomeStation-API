<<<<<<< HEAD
import mysql  from "mysql"
import util  from "util"
import moment from  "moment"


var config = {        
    host: "localhost",
    user: "nodejs",
    password: "nodejs",
    database: "sensorstation_testing"
  };

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
    let db = makeDb(config);
    let sql = `INSERT INTO ${table}(${cols}) VALUES(${values});`;
    console.log(sql);
    db.query(sql);
    db.close()
    return true
}
export function select (sql){
    let db = makeDB(config);
    let result = db.query(sql);
    db.close();
    print(result)
    return result
}   
export  default function insertSensorData(sensorTime, temperature, ip_address, server_time){
    return insert("sensorTime, temperature, ip_address", `'${moment().unix()}', ${temperature}, '${ip_address}'`, 'sensor_data');
}
=======
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
    db =makeDb(config);
    let sql = `INSERT INTO ${table}(${cols}) VALUES(${values});`;
    console.log(sql);
    db.query(sql);
    db.close()
    return true
  }

async function select(cols, table, conditions){
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
>>>>>>> refs/remotes/origin/master
