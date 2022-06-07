param([String]$tid='', [String]$app='')

if ($tid -eq '' or $app -eq '') {
  $name = [Environment]::GetCommandLineArgs()[0]
  Write-Host "Usage: pwsh $name -tid [tenant id] -app [app id]"
  exit
}

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

if ((Get-module -ListAvailable -name 'AzureAD') -eq $null) {
  Install-Module 'AzureAD' -Scope CurrentUser
}

Import-Module AzureAD

Connect-AzureAD -TenantID "$tid"
New-AzureADServicePrincipal -AppId "$app"