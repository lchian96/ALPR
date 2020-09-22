//console.time('test');

var mosca = require('mosca');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://172.20.10.13');

const Influx = require('influx');
//creating database
const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'Vehicle_check',
    schema: [
      {
        measurement: 'ABC1234',
      fields: { i:true },
      tags: ['Owner', 'Veh_Type'] //parameters
      }
    ]
});

influx.getDatabaseNames().then(names =>{
    if (names.indexOf('Vehicle_check') == -1 ) 
    {return influx.createDatabase('Vehicle_check');}
}).catch(error => console.log({ error }));


//mqtt part
var settings = {
		port:1883           //set up broker on local port 1883
		}

var server = new mosca.Server(settings);

server.on('ready', function(){
console.log("ready");
});

//subscribe message from excel.js
client.on('connect', function () {
	client.subscribe('myTopic');
	console.log("subscribed to excel.js");
})
client.on('message', function (topic, message) {
context = message.toString();
New_message = JSON.parse(message);
//console.log(New_message);

influx.query(`select * from Vehicle_check.."${New_message}"`)
.then(result => { var resultArray = JSON.stringify(result)
//console.log(resultArray);

  var parsedData = JSON.parse(resultArray)
  if (parsedData.length == 0)
    {
      console.log("Warning! The vehicle is not recorded in database.");
    }
  else
    {
    console.log("The owner is " + parsedData[0]["Owner"]+ ".");
    console.log("The vehicle is registered as " + parsedData[0]["Veh_Type"]
    + " for vehicle type. \r\n \r\n" );
    }
})
.catch(error => console.log(error));
})

//console.timeEnd('test');