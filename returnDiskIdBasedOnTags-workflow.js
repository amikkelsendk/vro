/*  Create a vRO action
    Add the below JS code
    Website:        www.amikkelsen.com
    Author:         Anders Mikkelsen
    Creation Date:  2024-01-04
    Tested on vRO 8

    Description:
    WorkFlow reads List of Disks (from a vRA managed VM), matches the MountPoint with each disks tags, and returns the match
    Return is a string with the matching DiskId (_Blank, if no disk found)

    List of Disks are gathered from
    https://{{vra-baseURL}}/iaas/api/machines/{id}/disks
    
    Update below inputs/outputs to fit your environment/needs
    Requires:
    - Inputs:
        - in_Disk
            String
        - in_MountPoint
            String
    - Outputs
        - out_DiskId
            String
*/


// ------ FUNCTIONS ------ //
function findDisk(item) {
    System.log( "  Processing disk: " + item.name + "(" + item.id + ")" );
    
    if ( returnDiskId == "" ) {
        System.log( "  - DiskPath:      " + item.customProperties.diskFile );
        System.log( "  - CurrentSize:   " + item.capacityInGB );
    
        // Check tags
        System.log( "  - Checking Tags: " );
        if ( item.tags ) {
            arrDiskTags = item.tags;
            arrDiskTags.forEach(checkTags);
        }
        else {
            System.log( "    No TAGS on disk !" );
        }

        // Add DiskId to return - if required
        if ( returnDiskId != "" ) {
            System.log( "!!! DISK SELECTED !!!" );
            returnDiskId = item.id;
        }
    }
    else {
        System.log( "    Skipping, as disk already found" );
    }
}


function checkTags(diskTag) {
    System.log( "    - " + diskTag.key + " || " + diskTag.value );
    // check for mountpoint
    if ( diskTag.key == strMountPointTagKey && diskTag.value == strMountPoint ) {
        returnDiskId = "yes";
    }
}


// ------ VARIABLES ------ //
var arrDisks = JSON.parse(in_Disks);        // Convert String to Array
var strMountPoint = in_MountPoint;          
var strMountPointTagKey = "MountPoint";     // TAG Key to check
var returnDiskId = "";
var arrDiskTags = "";


// ------ LOGIC ------ //
try {
    // Check each disk
    arrDisks.forEach(findDisk);


    // Verify return
    out_DiskId = returnDiskId;
    if ( out_DiskId != "" ) {
        System.log("ReturningDiskId: " + out_DiskId);
    }
    else {
        System.log("WARNING: DISK matching TAG ( " + strMountPointTagKey + "), not found !!" );
    }
} catch(e) {
	System.warn(e);
}