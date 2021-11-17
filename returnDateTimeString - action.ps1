<#
.SYNOPSIS
  VMware vRO Action generate DateTime and return as a string
.DESCRIPTION
  Type:         Action
  Script:       PowerShell 7
  Return Type:  String
.INPUTS
  None required
.OUTPUTS
  Return variable
.NOTES
  Website:        www.amikkelsen.com
  Author:         Anders Mikkelsen
  Creation Date:  2021-11-17
#>

function Handler($context, $inputs) {
    
    return $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
}
