/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      // get initial values
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
    
      if (initNum == 'invalid number' && initUnit == 'invalid unit') {   // error routing
        // res.status(400).json({ string: 'invalid number and unit' });
        var obj = {initNum, initUnit, returnNum: '', returnUnit: '', string: 'invalid number and unit'};
        // console.log(obj);
        res.status(400).json(obj);
      } else if (initNum == 'invalid number') {
        var obj = {initNum, initUnit, returnNum: '', returnUnit: '', string: 'invalid number'};
        // console.log(obj);
        res.status(400).json(obj);
      } else if (initUnit == 'invalid unit') {
        var obj = {initNum, initUnit, returnNum: '', returnUnit: '', string: 'invalid unit'};
        // console.log(obj);
        res.status(400).json(obj);
      } else {                                                           // if no errors, compute conversion and return
        var returnNum = convertHandler.convert(initNum, initUnit);
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        var obj = {initNum: parseFloat(initNum.toFixed(5)), initUnit: initUnit, returnNum: parseFloat(returnNum.toFixed(5)), returnUnit: returnUnit, string: toString};
        // console.log(obj);
        res.status(200).json(obj);
      }
    });
    
};
