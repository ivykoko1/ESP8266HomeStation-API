import express from "express";
import urlencoded from "body-parser";
import moment from "moment";
import {endpoint, insertTemperature} from './routes/temp.js'
import { getEndpoint, get_temp } from './routes/getTemp.js';

let app = express();
let router = express.Router()

app.use(urlencoded({ extended: false }));

app.listen(2100, () => {
    console.log('server running on port 2100');
  });
  
  app.use(urlencoded({ extended: false }));

app.post(endpoint, insertTemperature);
app.get(getEndpoint, get_temp);