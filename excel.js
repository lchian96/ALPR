//console.time('test');

var xlsx = require('xlsx');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://172.20.10.13');
client.on('connect', function () {
  setInterval(function() {
    var wb = xlsx.readFile('result.xlsx');
    var first_sheet_name = wb.SheetNames[0];
    var worksheet = wb.Sheets[first_sheet_name]; 

    var address1 = 'A1' ;
    var desired_cell1 = worksheet[address1];
    var desired_value1 = (desired_cell1 ? desired_cell1.v : undefined);

    var address2 = 'B1' ;
    var desired_cell2 = worksheet[address2];
    var desired_value2 = (desired_cell2 ? desired_cell2.v : undefined);

    var address3 = 'C1' ;
    var desired_cell3 = worksheet[address3];
    var desired_value3 = (desired_cell3 ? desired_cell3.v : undefined);

    var address5 = 'E1' ;
    var desired_cell5 = worksheet[address5];
    var desired_value5 = (desired_cell5 ? desired_cell5.v : undefined);

    var address6 = 'F1' ;
    var desired_cell6 = worksheet[address6];
    var desired_value6 = (desired_cell6 ? desired_cell6.v : undefined);
    
    var address7 = 'G1' ;
    var desired_cell7 = worksheet[address7];
    var desired_value7 = (desired_cell7 ? desired_cell7.v : undefined);
    
    var address8 = 'H1' ;
    var desired_cell8 = worksheet[address8];
    var desired_value8 = (desired_cell8 ? desired_cell8.v : undefined);

    var string_final = (`"${desired_value1}${desired_value2}${desired_value3}${desired_value5}${desired_value6}${desired_value7}${desired_value8}"`);

    client.publish('myTopic', string_final); //publisher
    console.log(`${string_final} Sent`);

  
  } ,8000);
});

//console.timeEnd('test');