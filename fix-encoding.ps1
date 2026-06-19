# Fix encoding corruption caused by Get-Content reading UTF-8 files as Windows-1252
# Replaces each mojibake sequence with its correct Unicode character

$encUtf8 = [System.Text.Encoding]::UTF8

# Build correct Unicode characters using char codes
$emDash          = [char]0x2014   # —
$rightArrow      = [char]0x2192   # →
$middleDot       = [char]0x00B7   # ·
$rightSingleQ    = [char]0x2019   # '
$leftSingleQ     = [char]0x2018   # '
$leftDoubleQ     = [char]0x201C   # "
$rightDoubleQ    = [char]0x201D   # "
$bullet          = [char]0x2022   # •
$ellipsis        = [char]0x2026   # …
$ndash           = [char]0x2013   # –

# Build mojibake sequences (what UTF-8 multi-byte chars look like when read as Win-1252)
$mj_emDash       = [char]0x00E2 + [char]0x20AC + [char]0x201D   # â€" → —
$mj_rightArrow   = [char]0x00E2 + [char]0x2020 + [char]0x2019   # â†' → →
$mj_middleDot    = [char]0x00C2 + [char]0x00B7                   # Â·  → ·
$mj_rightSingleQ = [char]0x00E2 + [char]0x20AC + [char]0x2122   # â€™ → '
$mj_leftSingleQ  = [char]0x00E2 + [char]0x20AC + [char]0x02DC   # â€˜ → '
$mj_leftDoubleQ  = [char]0x00E2 + [char]0x20AC + [char]0x0153   # â€œ → "
$mj_bullet       = [char]0x00E2 + [char]0x20AC + [char]0x00A2   # â€¢ → •
$mj_ndash        = [char]0x00E2 + [char]0x20AC + [char]0x201C   # â€" (n-dash variant)
$mj_Acirc        = [char]0x00C3 + [char]0x00A9                   # Ã© → é

$replacements = @(
    # ORDER MATTERS — longer/specific patterns first
    ,@($mj_emDash,       $emDash)
    ,@($mj_rightArrow,   $rightArrow)
    ,@($mj_rightSingleQ, $rightSingleQ)
    ,@($mj_leftSingleQ,  $leftSingleQ)
    ,@($mj_leftDoubleQ,  $leftDoubleQ)
    ,@($mj_bullet,       $bullet)
    ,@($mj_middleDot,    $middleDot)
    ,@($mj_Acirc,        'e')
    # Also fix the Â prefix that sometimes appears alone before regular chars
    ,@(([char]0x00C2).ToString() + ([char]0x00A0).ToString(), ' ')  # Â + NBSP → space
)

$files = Get-ChildItem 'C:\Users\anush\Downloads\portfolio\app\components' -Recurse -Include '*.tsx','*.css'

foreach ($file in $files) {
    $f = $file.FullName
    $c = [System.IO.File]::ReadAllText($f, $encUtf8)
    $changed = $false
    foreach ($pair in $replacements) {
        if ($c.Contains($pair[0])) {
            $c = $c.Replace($pair[0], $pair[1])
            $changed = $true
        }
    }
    if ($changed) {
        [System.IO.File]::WriteAllText($f, $c, $encUtf8)
        Write-Host "Fixed: $f"
    }
}

Write-Host "`nEncoding fix complete."
