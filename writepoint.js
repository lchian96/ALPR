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
influx.writePoints([{         // write info into database
    measurement: 'UTM9999',
    tags: {Owner:'Tester02',Veh_Type:'car'}, //parameters
    fields:{ status:1}       // cannot be blank
}])