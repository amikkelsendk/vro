/* 
    1. Create a workflow 
    2. Create an output named "out_vRAHost" of type: VRA:Host
    3. Add a scriptable task 
        - Add "out_vRAHost" under Outputs
        - Add the below JS code
  
    Website:        www.amikkelsen.com
    Author:         Anders Mikkelsen
    Creation Date:  2024-09-19
    Tested on vRO 8
*/ 

var vrahosts = Server.findAllForType("vRA:Host",null);
for each (var vraHost in vrahosts) {
    if ( vraHost.name == "Default" ) {
        System.log("NAME : " + vraHost.name);
        System.log("URL  : " + vraHost.vraHost);
        out_vRAHost = vraHost;
    }
}
