import express from "express";
import  urlencoded from "body-parser";
import moment from "moment"
import mysql  from "mysql"
import util  from "util"

let app = express();

app.use(urlencoded({ extended: false }));


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

app.listen(2100, () => {
    console.log('server running on port 2100');
  });
  
  app.use(urlencoded({ extended: false }));

app.post('/temp', (req, res) => {
    let temperature = req.body.temp
    var ip_address = req.ip.replace('::ffff:', '')
    console.log(ip_address)
    insertSensorData(0, temperature, ip_address , 0)
    res.status(200).send({"success": true});
    return;
})

function insertSensorData(sensorTime, temperature, ip_address, server_time){
    return insert("sensorTime, temperature, ip_address", `'${moment().unix()}', ${temperature}, '${ip_address}'`, 'sensor_data');
}

function insert(cols, values, table){
    let db = makeDb(config);
    let sql = `INSERT INTO ${table}(${cols}) VALUES(${values});`;
    console.log(sql);
    db.query(sql);
    db.close()
    return true

}
