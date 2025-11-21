$ts = Get-Date -Format yyyyMMddHHmmss
$email = "smoke" + $ts + "@example.com"
Write-Output "Registering $email"
$regBody = @{ name='Smoke Tester'; email=$email; password='Password1!'; phone='9876543210' } | ConvertTo-Json
try {
  $reg = Invoke-RestMethod -Method Post -Uri 'http://localhost:6789/api/auth/register' -ContentType 'application/json' -Body $regBody -ErrorAction Stop
  $reg | ConvertTo-Json -Depth 5
} catch {
  Write-Output "Register error:"; $_ | Out-String
}

Write-Output 'Logging in'
$loginBody = @{ email=$email; password='Password1!' } | ConvertTo-Json
try {
  $login = Invoke-RestMethod -Method Post -Uri 'http://localhost:6789/api/auth/login' -ContentType 'application/json' -Body $loginBody -ErrorAction Stop
  $login | ConvertTo-Json -Depth 5
} catch {
  Write-Output 'Login error:'; $_ | Out-String; exit 0
}

$token = $null
if ($login -is [System.Management.Automation.PSCustomObject]) {
  if ($login.token) { $token = $login.token }
  elseif ($login.data -and $login.data.token) { $token = $login.data.token }
  elseif ($login.accessToken) { $token = $login.accessToken }
}

if (-not $token) { Write-Output 'No token found in login response'; exit 0 }

Write-Output 'Fetching /api/auth/me'
try {
  $me = Invoke-RestMethod -Method Get -Uri 'http://localhost:6789/api/auth/me' -Headers @{ Authorization = "Bearer $token" } -ErrorAction Stop
  $me | ConvertTo-Json -Depth 5
} catch {
  Write-Output 'Me error:'; $_ | Out-String
}
