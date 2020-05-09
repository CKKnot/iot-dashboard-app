import React from "react";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
import { CardActions } from "@material-ui/core";
import { createMuiTheme, makeStyles, ThemeProvider  } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
const theme = createMuiTheme({
   palette: {
     primary: blue,
     secondary: {
         main: '#ff4081',
      },
   },
 });
var {WebSocketUnsubscribe} = require('../App');
var mButton = "minute", hButton="hour", dButton="day", clickCount = 0;
//Query data is here.
var DashboardItems = [
   {
     "id":1,
     "name":"Soil Moisture",
       "vizState":{
        "query":{
           "measures":[
              "Sensor.soilMoisture"
            ],
           "timeDimensions":[
              {
                 "dimension":"Sensor.timestamp",
                 "granularity": "second"
              }
            ],
           "order":{
              "Sensor.timestamp":"desc"
            },
           "limit":1,
         },
        "chartType":"number"
      }
   },
  {
     "id":2,
     "name":"Light Intensity",
     "vizState":{
        "query":{
           "measures":[
              "Sensor.lightIntensity"
           ],
           "timeDimensions":[
              {
                 "dimension":"Sensor.timestamp",
                 "granularity": "second"
              }
           ],
           "order":{
              "Sensor.timestamp":"desc"
           },
           "limit":1
        },
        "chartType":"number"
     }
  },
  {
     "id":3,
     "name":"Average Soil Moisture",
     "vizState":{
        "query":{
           "measures":[
              "Sensor.averageSoilMoisture"
           ],
           "timeDimensions":[
              {
                 "dimension":"Sensor.timestamp",
                 "granularity":"hour"
              }
           ]
        },
        "chartType":"line"
     }
  },
  {
     "id":4,
     "name":"Average Light Intensity",
     "vizState":{
        "query":{
           "measures":[
              "Sensor.averageLightIntensity"
           ],
           "timeDimensions":[
              {
                 "dimension":"Sensor.timestamp",
                 "granularity":"hour"
              }
           ]
        },
        "chartType":"line"
     }
  },
  {
     "id":5,
     "name":"Intruder Count Within Last 1 Hour",
     "vizState":{
        "query":{
           "measures":[
              "Sensor.intruderCount"
           ],
           "timeDimensions":[
              {
                 "dimension":"Sensor.timestamp",
                 "dateRange":"from 1 hour ago to now"
              }
           ],
           "order":{
              "Sensor.timestamp":"desc"
           }
        },
        "chartType":"number"
     }
  },
  {
     "id":6,
     "name":"Watering Count Within Last 1 Hour",
     "vizState":{
        "query":{
           "measures":[
              "Sensor.wateringCount"
            ],
           "timeDimensions":[
              {
                 "dimension":"Sensor.timestamp",
                 "dateRange":"from 1 hour ago to now"
              }
           ],
           "order":{
              "Sensor.timestamp":"desc"
           }
        },
        "chartType":"number"
     }
  }
];

/* This function will handles clicking of graph's time axis Button
** and perform nesscessary operation to unsubscribe previous websocket request.
** It will also request for newer request with updated time granularity
** that the user has selected.
*/
function handleClick(wButton, itemname) {
   return function (e){
      clickCount++;
      console.log("Clicked!: " + wButton + " With Name: " + itemname);
      DashboardItems.forEach(DashboardItem => {
         if(DashboardItem.name === itemname && DashboardItem.vizState.chartType === 'line'){
            WebSocketUnsubscribe(DashboardItem.id);
            DashboardItem.id = 6 + clickCount;
            DashboardItem.vizState.query.timeDimensions[0].granularity = wButton;
            console.log(DashboardItem.id);
            console.log(DashboardItem.vizState.query.timeDimensions[0].granularity);
         }
      });
   };
};

//Dashboard elements are defined and added here.
var DashboardPage = () => {
  var dashboardItem = item => (
    <Grid item xs={12} lg={6} key={item.id}>
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState}/>
        {item.vizState.chartType == "line" && 
          <CardActions>
            <Button variant="contained" size="medium" color="primary" onClick={handleClick(mButton, item.name)}>Every Minute</Button>
            <Button variant="contained" size="medium" color="primary" onClick={handleClick(hButton, item.name)}>Hourly</Button>
            <Button variant="contained" size="medium" color="primary" onClick={handleClick(dButton, item.name)}>Daily</Button>
          </CardActions>
        }
      </DashboardItem>
    </Grid>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: "center",
        padding: 12
      }}
    >
      <Typography variant="h5" color="inherit">
        There are no charts on this dashboard. Use Playground Build to add one.
      </Typography>
    </div>
  );
  
  return DashboardItems.length ? (
   <ThemeProvider theme={theme}>
      <Dashboard>{DashboardItems.map(dashboardItem)}</Dashboard>
   </ThemeProvider>
  ) : (
    <Empty />
  );
};
export default DashboardPage;