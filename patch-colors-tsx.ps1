Get-ChildItem 'C:\Users\anush\Downloads\portfolio\app\components' -Recurse -Filter '*.tsx' | ForEach-Object {
    $f = $_.FullName
    $c = Get-Content $f -Raw
    $c = $c -replace 'rgba\(59, 130, 246, ([0-9.]+)\)', 'rgba(255, 255, 255, $1)'
    $c = $c -replace 'rgba\(139, 92, 246, ([0-9.]+)\)', 'rgba(255, 255, 255, $1)'
    $c = $c -replace 'rgba\(6, 182, 212, ([0-9.]+)\)', 'rgba(255, 255, 255, $1)'
    $c = $c -replace 'rgba\(59,130,246,([0-9.]+)\)', 'rgba(255,255,255,$1)'
    $c = $c -replace 'rgba\(139,92,246,([0-9.]+)\)', 'rgba(255,255,255,$1)'
    $c = $c -replace 'rgba\(6,182,212,([0-9.]+)\)', 'rgba(255,255,255,$1)'
    $c = $c -replace '#3B82F6', '#e4e4e7'
    $c = $c -replace '#8B5CF6', '#d4d4d8'
    $c = $c -replace '#06B6D4', '#a1a1aa'
    # Difficulty bar colours in DevProfile are semantic (green/amber/red) — keep those
    [System.IO.File]::WriteAllText($f, $c)
    Write-Host "Patched: $f"
}
Write-Host "Done."
