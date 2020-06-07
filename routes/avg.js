import {raw} from "../db.js";
export let avgEndpoint = "/avg/:minutes";

export async function getAvg(req, res) {
    if(req.ip.substring(0, 2) !== '192') {
        res.status(401).send({"error" : "unauthorized"});
    }
	let mins = req.params.minutes;
	console.log(mins);
    let sql = `select avg(temperature) as avg from sensor_data where (sensorTime + ${mins * 60}) > unix_timestamp();`;
    console.log(sql);

    let results = await raw(sql);
    res.status(200).send({"success": 1, "avgTemp": results[0].avg, "since" : mins});
    return; 
}
