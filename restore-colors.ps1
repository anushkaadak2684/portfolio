# Reverse the zinc colour experiment — restore original blue/purple/cyan hex values
Get-ChildItem 'C:\Users\anush\Downloads\portfolio\app\components' -Recurse -Include '*.css','*.tsx' | ForEach-Object {
    $f = $_.FullName
    $c = Get-Content $f -Raw
    # Reverse hex accents (order matters — do most-specific first)
    $c = $c -replace '#e4e4e7', '#3B82F6'
    $c = $c -replace '#d4d4d8', '#8B5CF6'
    $c = $c -replace '#a1a1aa', '#06B6D4'
    [System.IO.File]::WriteAllText($f, $c)
    Write-Host "Restored hex: $f"
}
Write-Host "Hex restoration complete."
