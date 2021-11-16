<#
.SYNOPSIS
  VMware vRO Action to recieve project list from VMware vRA SaaS or On-Prem via REST
.DESCRIPTION
  Type:         Action
  Script:       PowerShell 7
  Return Type:  Properties
.INPUTS
  vRO Action Input (must be created manually)
  - vRAUrl                  (as String - URL for vRA enpoint SaaS or On-Prem)
  - vRAToken                (vRA generated token)
.OUTPUTS
  Return variable and log
.NOTES
  Website:        www.amikkelsen.com
  Author:         Anders Mikkelsen
  Creation Date:  2021-11-16
#>

function Handler($context, $inputs) {
    $token = $inputs.vRAToken
    $vRAUrl = $inputs.vRAUrl

    # Get BearerToken
    $bearerUrl = $vRAUrl + "/iaas/api/login"
    $body = "{`"refreshToken`": $token}"
    $bearerToken = Invoke-RestMethod $bearerUrl -ContentType "application/json" -Body $body -Method 'POST'

    # Get API info
    #$projectsUrl = $vRAUrl + "/project-service/api/projects"        # On-Prem 
    $projectsUrl = $vRAUrl + "/iaas/api/projects"                   # SaaS / https://api.mgmt.cloud.vmware.com
    $response = Invoke-RestMethod $projectsUrl -Headers @{'Authorization' = "Bearer $($bearerToken.token)" } -Method 'GET'

    #Write-Host "Got response: $response"
    Write-Host "Got response:`n$($response | ConvertTo-Json)"
    
    Return $response
}
