import express from 'express';
import mysql from 'mysql';

const api = express();


api.post('/api/insertTemperature', async (req, res) => {
    let paramsOk = req.body.sensorTime && req.body.temperature && req.body.humidity && req.body.temp_index;
    if(paramsOk){
        insertSensorData(req.body.sensorTime, req.body.temperature, req.body.humidity, req.body.temp_index);
        res.status(200).send({"success": true});
        return
    }
})

api.listen(2100, () => {
    console.log('server running on port 2100');
  });

async function insertSensorData(sensorTime, temperature, humidity, temp_index){
    return insert("sensorTime, temperature, humidity, temp_index", `'${sensorTime}', ${temperature}, ${humidity}, ${temp_index}`, 'sensor_data');
}

async function insert(cols, values, table){
    let sql = `INSERT INTO ${table}(${cols} VALUES(${values}))`;
    console.log(sql);
}