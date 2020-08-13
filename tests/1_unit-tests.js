/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("Function convertHandler.getNum(input)", function() {
    test("Whole number input", function(done) {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function(done) {
      var input = "3.45kg";
      assert.equal(convertHandler.getNum(input), 3.45);
      done();
    });

    test("Fractional Input", function(done) {
      var input = "50/20lbs";
      assert.equal(convertHandler.getNum(input), 2.5);
      done();
    });

    test("Fractional Input w/ Decimal", function(done) {
      var input = "2.5/5km";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Invalid Input (double fraction)", function(done) {
      var input = "(5/2)/(J/5)mi";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

    test("No Numerical Input", function(done) {
      var input = "gal";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ];
      input.forEach(function(ele) {
        var input = "1" + ele;
        assert.equal(convertHandler.getUnit(input), ele);
      });
      done();
    });

    test("Unknown Unit Input", function(done) {
      var input = "1miles";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms"
      ];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function() {
    test("Gal to L", function(done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function(done) {
      var input = [7, "l"];
      var expected = 1.84921;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Mi to Km", function(done) {
      var input = [2, "mi"];
      var expected = 3.21869;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Km to Mi", function(done) {
      var input = [5, "km"];
      var expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Lbs to Kg", function(done) {
      var input = [3.1, "lbs"];
      var expected = 1.40614;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Kg to Lbs", function(done) {
      var input = [5, "kg"];
      var expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
  
  suite("function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)", () => {
    test("Get string for 5kgs to 11.0231 lbs", function(done) {
      var input = [5, 'kg', 11.0231, 'lbs'];
      var expected = '5 kilograms converts to 11.0231 pounds';
      assert.strictEqual(convertHandler.getString(input[0], input[1], input[2], input[3]), expected);
      done()
    });
  });
});
