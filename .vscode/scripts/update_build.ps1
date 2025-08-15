# update_build.ps1

$userPath = $env:USERPROFILE
$globalTsPath = Join-Path $userPath "Documents\GitHub\mini-react\client\src\store\global.ts"
(Get-Content $globalTsPath) -replace 'BUILD = "\d{10}"', ('BUILD = "' + (Get-Date -Format "yyMMddHH") + '01"') | Set-Content $globalTsPath
