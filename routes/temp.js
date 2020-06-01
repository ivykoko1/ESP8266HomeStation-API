import {insertSensorData} from "../db.js"
import moment from  "moment"
export let endpoint  = "/temp";

export function insertTemperature(req, res) {
    let temperature = req.body.temp;
    var ip_address = req.ip.replace('::ffff:', '');
    console.log(ip_address);
    insertSensorData(0, temperature, ip_address, 0);
    res.status(200).send({"success": true});
    return;
}
