/*  Create a vRO action
    Add the below JS code
    Website:        www.amikkelsen.com
    Author:         Anders Mikkelsen
    Creation Date:  2023-09-07
    Tested on vRO 8
*/



/// Test for 'blank' input
if (myString === "") {
    throw new TypeError("ERROR: blank input")
}
else {
    System.log ("Input: " + myString)
}

// Test that it contains anything 
if (myString) {
    System.log ("Input: " + myString)
}
else {
    throw new TypeError("ERROR: blank input")
}

// Test if a string
if (typeof myString === 'string' || myString instanceof String) {
    System.log ("String: " + myString)
}

// Test if a boolean
if (typeof myBool === 'boolean' || myBool instanceof Boolean) {
    System.log ("Boolean: " + myBool)
}

// Test if a number
if (typeof myNum === 'number' || myNum instanceof Number) {
    System.log ("Number: " + myNum)
}



/*
var booleanValue = true;
var numericalValue = 354;
var stringValue = "This is a String";
var stringObject = new String("This is a String Object");
console.log(typeof booleanValue) // displays "boolean"
console.log(typeof numericalValue) // displays "number"
console.log(typeof stringValue) // displays "string"
console.log(typeof stringObject) // displays "object"
*/
