// Create a vRO action
// Add the below JS code
// Website:        www.amikkelsen.com
// Author:         Anders Mikkelsen
// Creation Date:  2022-01-18
// Tested on vRO 8

var vmName = "<VMs name in vCenter>";
var allConnections = VcPlugin.allSdkConnections;

for (var i = 0; i < allConnections.length; i++){
    var sdkConnection = VcPlugin.allSdkConnections[i];
    System.log("Checking vCenter: " + sdkConnection.toString());

    var vms = VcPlugin.getAllVirtualMachines(null, vmName);
    if(vms){
        System.log("Found VM object: " + vms[0]);
        break;
    }
}

if (vms){
    objVM = vms[0];
    arrSDKConnections = allConnections[i];
}
else{
    throw "VM '" + vmName + "' not found!!";
}