import {selectSensorData} from "../db.js"


export let getEndpoint = "/getTemp/:max";

export function get_temp(req, res) {
	let max = req.params.max;
	console.log(max);
    let SQL = "select temperature, sensorTime, server_time from sensor_data sort by sensorTime desc limit " + max + ";"
    console.log(SQL);
    select(SQL)
    res.status(200).send({"success": 1});
    return;
}