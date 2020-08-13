/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  // set up variables
  const UNITpairs = { gal: 'l', lbs: 'kg',  mi: 'km',
                  l: 'gal',  kg: 'lbs', km: 'mi' };
  const UNITspelling = { gal: 'gallons', lbs: 'pounds', mi: 'miles',
                         l: 'liters', kg: 'kilograms',  km: 'kilometers'};
  const regexp = /([A-Z]*)([A-Z]+)$/i      // isolate first character position
  
  this.getNum = function(input) {
    var result = input.match(regexp); 
    if (result && result['index'] > 0) { 
      try {
        result = eval(input.slice(0, result['index']));
      } catch(err) {
        result = 'invalid number';
      } finally {
        return result; 
      }
    } else if (result['index'] == 0) {
      return 1;
    } else {
      return 'invalid number';
    }
  };
  
  this.getUnit = function(input) {
    var result = input.match(regexp); 
    if (result && result['index'] >= 0 && UNITpairs.hasOwnProperty(result[0].toLowerCase())) { 
      return input.slice(result['index'], input.length);
    } else {
      return 'invalid unit';
    }
  }; 
  
  this.getReturnUnit = function(initUnit) {
    var result = UNITpairs[initUnit.toLowerCase()]; // standardize input and look up in UNITpairs obj to find value
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result = UNITspelling[unit.toLowerCase()]; // standardize input and look up in UNITspelling obj to find value
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    initUnit = initUnit.toLowerCase(); // standardize unit
    if      (initUnit === 'gal') { result = initNum * galToL;  }
    else if (initUnit === 'lbs') { result = initNum * lbsToKg; }
    else if (initUnit === 'mi')  { result = initNum * miToKm;  }
    else if (initUnit === 'l')   { result = initNum / galToL;  }
    else if (initUnit === 'kg')  { result = initNum / lbsToKg; }
    else if (initUnit === 'km')  { result = initNum / miToKm;  }
    return Number(result); // round to 5 dec places and return as num
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var string = parseFloat(initNum.toFixed(5)) + ' ' + this.spellOutUnit(initUnit) + 
                  ' converts to ' + 
                 parseFloat(returnNum.toFixed(5)) + ' ' + this.spellOutUnit(returnUnit);
    return string;
  };
  
}


module.exports = ConvertHandler;
