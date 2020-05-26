import express from "express";
import  urlencoded from "body-parser";
import moment from "moment"


let app = express();

app.use(urlencoded({ extended: false }));



app.listen(2100, () => {
    console.log('server running on port 2100');
  });
  
  app.use(urlencoded({ extended: false }));

app.post('/temp', (req, res) => {
    console.log( req.body.temp);
    console.log(insertSensorData(0, req.body.temp, 0, 0));
    /*if(paramsOk){
        insertSensorData(req.body.sensorTime, req.body.temperature, req.body.humidity, req.body.temp_index);

        return
    }*/
            res.status(200).send({"success": true});
            return;
})

function insertSensorData(sensorTime, temperature, humidity, temp_index){
    return insert("sensorTime, temperature, humidity, temp_index", `'${moment().unix()}', ${temperature}, 0, ${temperature}`, 'sensor_data');
}

function insert(cols, values, table){
    let sql = `INSERT INTO ${table}(${cols} VALUES(${values}))`;
    console.log(sql);
}
