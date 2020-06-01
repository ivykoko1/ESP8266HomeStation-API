import express from "express";
import urlencoded from "body-parser";
import    { endpoint, insertTemperature } from './routes/temp.js'
import { getEndpoint, getTemperatures } from './routes/getTemp.js';
import { avgEndpoint, getAvg } from './routes/avg.js';


let app = express();
let router = express.Router()

app.use(urlencoded({ extended: false }));

app.get(avgEndpoint, getAvg);
app.post(endpoint, insertTemperature);
app.get(getEndpoint, getTemperatures);

app.listen(2100, () => {
    console.log('server running on port 2100');
  });
  
