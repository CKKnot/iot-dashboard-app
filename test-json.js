var DashboardItems = [
   {
      "id":0,
      "name":"Soil Moisture",
      "vizState":{
         "query":{
            "measures":[
               "Sensor.soilMoisture"
            ],
            "dimensions":[

            ],
            "timeDimensions":[
               {
                  "dimension":"Sensor.timestamp",
                  "granularity":"second"
               }
            ],
            "order":{
               "Sensor.timestamp":"desc"
            },
            "limit":1,
            "renewQuery":true
         },
         "chartType":"number"
      }
   },
   {
      "id":1,
      "name":"Light Intensity",
      "vizState":{
         "query":{
            "measures":[
               "Sensor.lightIntensity"
            ],
            "dimensions":[

            ],
            "timeDimensions":[
               {
                  "dimension":"Sensor.timestamp",
                  "granularity":"second"
               }
            ],
            "order":{
               "Sensor.timestamp":"desc"
            },
            "limit":1,
            "renewQuery":true
         },
         "chartType":"number"
      }
   },
   {
      "id":2,
      "name":"Hourly Average Soil Moisture",
      "vizState":{
         "query":{
            "measures":[
               "Sensor.averageSoilMoisture"
            ],
            "dimensions":[

            ],
            "timeDimensions":[
               {
                  "dimension":"Sensor.timestamp",
                  "granularity":"second"
               }
            ]
         },
         "chartType":"line"
      }
   },
   {
      "id":3,
      "name":"Hourly Average Light Intensity",
      "vizState":{
         "query":{
            "measures":[
               "Sensor.averageLightIntensity"
            ],
            "dimensions":[

            ],
            "timeDimensions":[
               {
                  "dimension":"Sensor.timestamp",
                  "granularity":"second"
               }
            ],
            "filters":[

            ]
         },
         "chartType":"line"
      }
   },
   {
      "id":4,
      "name":"Intruder Count",
      "vizState":{
         "query":{
            "measures":[
               "Sensor.intruderCount"
            ],
            "dimensions":[

            ],
            "timeDimensions":[
               {
                  "dimension":"Sensor.timestamp",
                  "dateRange":"from 1 hour ago to now"
               }
            ],
            "order":{
               "Sensor.timestamp":"desc"
            },
            "renewQuery":true
         },
         "chartType":"number"
      }
   },
   {
      "id":5,
      "name":"Watering Count",
      "vizState":{
      "query":{
         "measures":[
            "Sensor.wateringCount"
         ],
         "dimensions":[

         ],
         "timeDimensions":[
            {
               "dimension":"Sensor.timestamp",
               "dateRange":"from 1 hour ago to now"
            }
         ],
         "order":{
            "Sensor.timestamp":"desc"
         },
         "renewQuery":true
      },
      "chartType":"number"
      }
   }
  ];

// DashboardItems.forEach(DashboardItem => {
//     if(DashboardItem.id == "3" && DashboardItem.vizState.chartType == 'line'){
//         DashboardItem.vizState.query.timeDimensions[0].granularity = "hour";
//         console.log(DashboardItem.vizState.query.timeDimensions[0].granularity);
//     }
// });
DashboardItems.forEach(DashboardItem => {
      // if(DashboardItem.vizState.query.measures === "3"){
         //  DashboardItem.vizState.query.timeDimensions[0].granularity = "hour";
          console.log(DashboardItem.vizState.query.measures[0]);
      // }
});