/*  Create a vRO action
    Add the below JS code
    Website:        www.amikkelsen.com
    Author:         Anders Mikkelsen
    Creation Date:  2023-09-07
    Tested on vRO 8

    Description:
    Script reads a Configuration Variable value, and increases it with 1, and updates variable value 
    It returns a string leading zero's [ 000x | 00xx | 0xxx | xxxx ]
    Update below variables to fit your environment

    Requires:
    - Assets -> Configurations -> New Configuration == "Counters"
    - With a Variable named "ServiceNow" of type: number, set to 0
    - Return Type: String

    References:
    https://gist.github.com/standit/5bc86ce89a887053c7316a59a8903465
    https://developer.vmware.com/samples/4953/get-vro-configuration-element?h=elements#code
    https://communities.vmware.com/t5/VMware-Aria-Automation/How-to-set-attributes-and-its-values-to-the-configuration/td-p/1417057
    https://communities.vmware.com/t5/VMware-Aria-Automation/Padd-string-with-zeroes/td-p/2220102
*/


// ------ VARIABLES ------ //
var categoryPath = "web-root";
var configName = "Counters";
var attributeName = "ServiceNow";
var defaultAttributeValue = 0;

var configElement = null;
var attribute = null;
var newAttributeValue = null;
var returnValue = null;

// ------ FUNCTIONS ------ //
function ZeroPadNumber ( nValue ) {
    if ( nValue < 10 ) {
        return ( '000' + nValue.toString () );
    } else if ( nValue < 100 ) {
        return ( '00' + nValue.toString () );
    } else if ( nValue < 1000 ) {
        return ( '0' + nValue.toString () );
    } else {
        return ( nValue );
    }
}

function UpdateAttribute( thisConfigElement, thisAttributeName, newValue) {
    // Update attribute
    System.log("Setting attribute '" + thisAttributeName + "' value to : " + newValue);
    thisConfigElement.setAttributeWithKey(thisAttributeName, newValue);
}

// ------ LOGIC ------ //
try {
	var configCategory = Server.getConfigurationElementCategoryWithPath(categoryPath);
	if(configCategory) {
		System.log("Found configuration category '"+configCategory.name+"'");
		
		//Find Configuration Element
		var configElements = configCategory.configurationElements;
		for (var i in configElements) {
			ce = configElements[i];
			if (ce.name == configName) {
				configElement = ce;
				break;
			}
		}

		if(configElement) {
			System.log("Found configuration '"+configElement.name+"'");
         
            // Find attribute
            attribute = configElement.getAttributeWithKey(attributeName);
            System.log("Current Attribute value '"+attribute.value+"'");
            if (attribute) {
                // Set new value
                if ( attribute.value == null ) {
                    System.log("Attribute value is 'blank or null', using value of 'defaultAttributeValue'")
                    newAttributeValue = defaultAttributeValue + 1;    
                }
                else {
                    newAttributeValue = attribute.value + 1;
                }

                // Update attribute value
                UpdateAttribute(configElement, attributeName, newAttributeValue);

                // Return updated value
                returnValue = ZeroPadNumber(newAttributeValue);
                System.log("Return value '" + returnValue + "'");
                //out_deploy_number = returnValue;
                return returnValue;
                
            } else {
                //System.log("Attribute not found '"+ attributeName + "'");
                throw "Attribute not found '"+ attributeName + "'";
            }
		} else {
			configElement = Server.createConfigurationElement(configCategory, configName);
			System.debug("Created configuration element '"+configElement.name+"'");
		}
	} else {
		configElement = Server.createConfigurationElement(categoryPath, configName);
		System.debug("Created category path '"+categoryPath+"' and configuration element '"+configElement.name+"'");
	}
} catch(e) {
	System.warn(e);
}