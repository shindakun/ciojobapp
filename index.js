const csv = require('csvtojson');
const csvFilePath = './sample_data.csv';

// total number of rows in csv minus the header row.
const numRecords = 10000;

// const technically works here but use let since we're changing the contents.
let reasons = {};

// conver csv to json to make it a bit easier to work with.
csv().fromFile(csvFilePath)
  .on('done', (error) => {
    if (error) {
      console.error(`An error occured: ${error}`);
    }
  })
  .on('end_parsed', (jsonArrObj) => {

    // could be moved out to it's own function but for this excercise we should be ok.
    // make sure we parsed the correct number of records.
    if (numRecords === jsonArrObj.length) {
  
      // for each entry in the object create entry in new object, start count at 1.
      for (let i in jsonArrObj) {
         if (reasons[jsonArrObj[i].reason] == null) {
          reasons[jsonArrObj[i].reason] = 1;
        } else {

          // if entry already exists in the object increment the count.
          if (reasons.hasOwnProperty(jsonArrObj[i].reason)) {
            reasons[jsonArrObj[i].reason] += 1;
          }
        }
      }
      
      // just a quick check to see if our total record number matches the expected 10000 rows.
      let spotCheck = 0;
      for (let i in reasons) {
        spotCheck += reasons[i];
      }
      if (spotCheck != numRecords) {
        console.error(`Spot check failed! Somethings not right there are only ${spotCheck} records.`);
      }
    
      // build our descending list of text reasons
      let out = Object.keys(reasons).sort((a, b) => reasons[b] - reasons[a]);

      // use our list and the original reasons object to output our top ten.
      for (let i = 0; i <= 9; i += 1) {
        console.log(`${reasons[out[i]]}: ${out[i]}`);
      }
    } else {
      console.error('Something went wrong.');
    }
  });