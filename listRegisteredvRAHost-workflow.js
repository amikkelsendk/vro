// Create a workflow with a scriptable task
// Add the below JS code
// Website:        www.amikkelsen.com
// Author:         Anders Mikkelsen
// Creation Date:  2021-12-09
// Tested on vRO 8

var vrahosts = Server.findAllForType("vRA:Host",null);
for each ( var vraHost in vrahosts ) {
    System.log("NAME : " + vraHost.name);
    System.log("URL  : " + vraHost.vraHost);
}
