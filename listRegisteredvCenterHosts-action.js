// Create a vRO action
// Add the below JS code
// Website:        www.amikkelsen.com
// Author:         Anders Mikkelsen
// Creation Date:  2022-01-18
// Tested on vRO 8

var allConnections = VcPlugin.allSdkConnections;

for (var i = 0; i < allConnections.length; i++){
    var sdkConnection = VcPlugin.allSdkConnections[i];
    System.log("vCenter ["+i+"]: " + sdkConnection.toString());
}
