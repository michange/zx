
/**
* Define the config of zx
*/  
const zx = {
    libraryTests: {}, // will gather all tests of the zx library
    allSlices : {}, // will gather all slices for tests and execution
    createSlice : function(slice){
    if (zx.allSlices[slice.name] !== undefined &&
      zx.verifyType(slice.name, "String") &&
      zx.verifyType(slice.body, "Function") &&
      verifyClass(mySlice.signature, "Array") &&
      zx.verifyType(slice.test, "Function")){
        throw new Error(slice.name + 'slice already exists');
      } else {
        zx.allSlices[slice.name] = slice;
      };
    if(zx.executeSliceTests) {
      zx.log('');
      zx.log('executeSliceTests : ' + slice.name);
       slice.test();
      }
    },
    logging : function(input){console.log(input)}, // log implementation for logging 
    notLogging : function(){void(0)}, // log implementation for not logging 
  }; 
  
  
  /**
  * Test that a function call with the specified parameters does not throw an error.
  * @param {function} myFunction - The function to be called
  * @param {Array} myParams - An array of arguments to be passed to the function
  */
  zx.testFunctionOK = function(myFunction, myParams){
    zx.log ("");
    zx.log ('testFunctionOK : ');
    try {
      myFunction.apply(null, myParams);
      zx.log ('OK');
    } catch (error) {
      throw(error);
      zx.log ('Error in testFunctionOK : ' + error);
    } 
  };
  
  /**
  * Test that a function call with the specified parameters throws an expected error.
  * @param {function} myFunction - The function to be called
  * @param {Array} myParams - An array of arguments to be passed to the function
  * @param {string} myErr - The error message that is expected to be thrown
  * @returns {boolean} - Returns true if the expected error is thrown, otherwise throws an error
  */
  zx.testFunctionKO = function(myFunction, myParams, myErr){
  zx.log ("");
  zx.log ('testFunctionKO : ');
  try {
      myFunction.apply(null, myParams);
      zx.log('KO in testFunctionKO - The expected error was not thrown : ' + myErr); // "testFunctionKO" implies an error is expected
    } catch (error) {
          if(error.toString() == myErr) {
            zx.log ('OK - The expected error was thrown : ' + myErr);
            return(true);
          } else {
          zx.log ('KO- Error (' + error + ') does not match expected error : (' + myErr + ')');
          throw new Error ('KO- Error (' + error + ') does not match expected error : (' + myErr + ')');
          }
    }
  };
  
  
  /**
   * Verifies that a value has a specific type
   *
   * @param {any} val - The value to be verified
   * @param {string} expectedType - The expected type of the value. Must be one of the following values: "Number", "String", "Boolean", "Symbol", "Null", "Undefined", "Array", "Function", "Object", "<ClassName>" (where <ClassName> is the name of a class or constructor)
   *
   * @returns {boolean} - Returns true if the value has the expected type
   *
   * @throws {TypeError} - If the expectedType parameter is not a string
   * @throws {Error} - If the expectedType parameter is not an acceptable value
   * @throws {TypeError} - If the value does not have the expected type
   */
    zx.verifyType = function (val, expectedType) {
    zx.log('verifyType : ' +  Object.prototype.toString.call(val) + ' is ' + expectedType );
  
    // Check if the expectedType parameter is a string
    if (typeof expectedType !== "string") {
      throw new TypeError("The expectedType parameter must be a string");
    }
  
    // Check if the expectedType parameter is an acceptable value
    if (
      expectedType !== "Number" &&
      expectedType !== "String" &&
      expectedType !== "Boolean" &&
      expectedType !== "Symbol" &&
      expectedType !== "Null" &&
      expectedType !== "Undefined" &&
      expectedType !== "Array" &&
      expectedType !== "Function" &&
      expectedType !== "Object"
    ){
      throw new Error(
        'The expectedType parameter must be one of the following values: "Number", "String", "Boolean", "Symbol", "Null", "Undefined", "Array", "Function", "Object".'
      );
    }
    function getType(val) {
      return Object.prototype.toString.call(val).slice(8, -1);
    }
    let type = getType(val);
  
    // Compare the type of the value to the expected type
    if (type !== expectedType) {
      throw new TypeError(
        `The value (${val}) must be of type ${expectedType}, but it is of type ${type}`
      );
    }
  
    // If the value has the expected type, return true
    return true;
  };
  
  zx.listAllSlices = function(){
   let result = [];
   for (let prop in zx.allSlices) {
      if (zx.allSlices.hasOwnProperty(prop)) {
      result.push(prop);
      }
    } 
    return(JSON.stringify(result))
  };
  
  zx.verifyType.test = zx.libraryTests['verifyType'] = function(){
    zx.testFunctionOK(zx.verifyType, [42, "Number"]); 
    zx.testFunctionOK(zx.verifyType, ["abc", "String"]);   
    zx.testFunctionOK(zx.verifyType, [true, "Boolean"]);
    zx.testFunctionOK(zx.verifyType, [Symbol("zx"), "Symbol"]);
    const foo = null;
    zx.testFunctionOK(zx.verifyType, [foo, "Null"]);
    zx.testFunctionOK(zx.verifyType, [document.someName, "Undefined"]); 
    zx.testFunctionOK(zx.verifyType, [[1,[21, 22], 3], "Array"]);
    zx.testFunctionOK(zx.verifyType, [document.write, "Function"]);
    class MyClass {};
    zx.testFunctionOK(zx.verifyType, [new MyClass(), "Object"]);
  
    zx.testFunctionKO(zx.verifyType, [42, "someLabel"],'Error: The expectedType parameter must be one of the following values: "Number",'+
      ' "String", "Boolean", "Symbol", "Null", "Undefined", "Array", "Function", "Object".');
    zx.testFunctionKO(zx.verifyType, [42, "String"],`TypeError: The value (42) must be of type String, but it is of type Number`);
    }
  
  
  zx.log = zx.logging; // function, can point to "zx.logging" or to to "zx.notLogging"
  zx.executeLibraryTests = true; // boolean flag for tests  of library
  zx.executeSliceTests = true; // boolean flag for tests of slices
  zx.runSlices = true // boolean flag for runSlices mode
  
  
  
  zx.libraryTests['createSimpleSlice'] = function(){
    zx.createSlice({  
        name : "init",
        body : function(msg){
          alert(msg);
          zx.log("zx executed init");
            },
        signature : [],
        test : function(){
          void[0];
          zx.log("zx tested init");
          },
        });
      }
    
  zx.run = function(params){
    zx.log('run()');
    console.groupCollapsed('executeLibraryTests');
    if(zx.executeLibraryTests){
      zx.log('allSlices : ' + zx.listAllSlices());
      Object.keys(zx.libraryTests).forEach(someLibraryFunction => zx.libraryTests[someLibraryFunction]());
      }
    console.groupEnd();
    console.group('runSlices');
    zx.log('allSlices : ' + zx.listAllSlices());
    if(zx.runSlices){
        zx.allSlices['init'].body(params);
        }
    console.groupEnd();
    console.group('live zx');
  };
  
  window.addEventListener('load', function () {
    zx.log("window loaded")
    zx.run("Hello World");
    zx.createSlice({  
        name : "TestLiveSlice",
        body : function(msg){
          alert(msg);
          zx.log("zx executed TestLiveSlice");
            },
        signature : [],
        test : function(){
          void[0];
          zx.log("zx tested TestLiveSlice");
          },
        });
    zx.allSlices["TestLiveSlice"].body();
    zx.log('final allSlices : ' + zx.listAllSlices());
  });
  
  document.addEventListener("DOMContentLoaded", function(event){
    zx.log("DOMContentLoaded")
  });
  
  
  
      
  
  
  
  
  
  