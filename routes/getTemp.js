import {selectSensorData} from "../db.js"

export let getEndpoint = "/getTemp/:max";

export async function get_temp(req, res) {
	let max = req.params.max;
	console.log(max);
    let SQL = "select temperature, sensorTime, server_time from sensor_data order by sensorTime desc limit " + max + ";"
    console.log(SQL);

    let results = await selectSensorData("temperature, server_time", "sensor_data", `order by server_time desc limit ${max}` );
    res.status(200).send({"success": 1, "results": results});
    return; 
}
 