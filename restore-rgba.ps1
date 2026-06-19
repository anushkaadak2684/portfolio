# ================================================================
# FULL RGBA RESTORATION — restores original blue/purple/cyan RGBA
# values that were replaced with rgba(255,255,255,X) by the zinc patch.
# Each file is handled with targeted, context-specific replacements.
# ================================================================

function Restore-File($path, $replacements) {
    $c = [System.IO.File]::ReadAllText($path)
    foreach ($pair in $replacements) {
        $c = $c.Replace($pair[0], $pair[1])
    }
    [System.IO.File]::WriteAllText($path, $c)
    Write-Host "RGBA restored: $path"
}

# ── NAVBAR ──────────────────────────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\Navbar\Navbar.module.css' @(
    ,@('rgba(255, 255, 255, 0.08)', 'rgba(59, 130, 246, 0.08)')
)

# ── HERO ────────────────────────────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\Hero\Hero.module.css' @(
    # Ambient background glows
    ,@('radial-gradient(ellipse at center, rgba(255, 255, 255, 0.12) 0%, transparent 65%)', 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, transparent 65%)')
    ,@('radial-gradient(ellipse at center, rgba(255, 255, 255, 0.10) 0%, transparent 65%)', 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.10) 0%, transparent 65%)')
    # Status badge
    ,@('rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2)', 'rgba(6, 182, 212, 0.08);
  border: 1px solid rgba(6, 182, 212, 0.2)')
    # Status dot glow (already done via hex patch - box-shadow was set inline)
    # Stat chip hover
    ,@('rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25)', 'rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.25)')
    # Profile image gradient/shadow
    ,@('rgba(255, 255, 255, 0.22) 0%,
    rgba(255, 255, 255, 0.12) 45%,', 'rgba(139, 92, 246, 0.22) 0%,
    rgba(59, 130, 246, 0.12) 45%,')
    ,@('0 24px 60px rgba(255, 255, 255, 0.2),', '0 24px 60px rgba(59, 130, 246, 0.2),')
    ,@('rgba(255, 255, 255, 0.15) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.1) 100%', 'rgba(59, 130, 246, 0.15) 0%,
    transparent 50%,
    rgba(139, 92, 246, 0.1) 100%')
)

# ── HIGHLIGHTS ──────────────────────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\Highlights\Highlights.module.css' @(
    # Background gradient blobs
    ,@('rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.3) 70%,', 'rgba(59, 130, 246, 0.3) 30%,
    rgba(139, 92, 246, 0.3) 70%,')
    # Icon containers
    ,@('rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.1)', 'rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.15);
  box-shadow: 0 0 16px rgba(59, 130, 246, 0.1)')
    ,@('rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.1)', 'rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.15);
  box-shadow: 0 0 16px rgba(139, 92, 246, 0.1)')
    ,@('rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.1)', 'rgba(6, 182, 212, 0.12);
  border: 1px solid rgba(6, 182, 212, 0.15);
  box-shadow: 0 0 16px rgba(6, 182, 212, 0.1)')
)

# ── RECOGNITION ─────────────────────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\Recognition\Recognition.module.css' @(
    ,@('rgba(255, 255, 255, 0.06) 0%,', 'rgba(139, 92, 246, 0.06) 0%,')
    ,@('background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);', 'background: rgba(139, 92, 246, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.15);')
    ,@('background: rgba(255, 255, 255, 0.12);', 'background: rgba(139, 92, 246, 0.12);')
)

# ── FEATURED WORK ───────────────────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\FeaturedWork\FeaturedWork.module.css' @(
    ,@('.arrow-blue   { background: rgba(255, 255, 255, 0.15); color: var(--accent-blue);   }', '.arrow-blue   { background: rgba(59, 130, 246, 0.15); color: var(--accent-blue);   }')
    ,@('.arrow-purple { background: rgba(255, 255, 255, 0.15); color: var(--accent-purple); }', '.arrow-purple { background: rgba(139, 92, 246, 0.15); color: var(--accent-purple); }')
    ,@('.arrow-cyan   { background: rgba(255, 255, 255, 0.15);  color: var(--accent-cyan);   }', '.arrow-cyan   { background: rgba(6, 182, 212, 0.15);  color: var(--accent-cyan);   }')
    ,@('.tag-blue   { background: rgba(255, 255, 255, 0.1);  color: var(--accent-blue);   border: 1px solid rgba(255, 255, 255, 0.2);  }', '.tag-blue   { background: rgba(59, 130, 246, 0.1);  color: var(--accent-blue);   border: 1px solid rgba(59, 130, 246, 0.2);  }')
    ,@('.tag-purple { background: rgba(255, 255, 255, 0.1);  color: var(--accent-purple); border: 1px solid rgba(255, 255, 255, 0.2);  }', '.tag-purple { background: rgba(139, 92, 246, 0.1);  color: var(--accent-purple); border: 1px solid rgba(139, 92, 246, 0.2);  }')
    ,@('.tag-cyan   { background: rgba(255, 255, 255, 0.1);   color: var(--accent-cyan);   border: 1px solid rgba(255, 255, 255, 0.2);   }', '.tag-cyan   { background: rgba(6, 182, 212, 0.1);   color: var(--accent-cyan);   border: 1px solid rgba(6, 182, 212, 0.2);   }')
)

# ── DEV PROFILE ─────────────────────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\DevProfile\DevProfile.module.css' @(
    # GitHub panel icon bg/border
    ,@('background: rgba(255, 255, 255, 0.08);
  color: var(--accent-blue);', 'background: rgba(59, 130, 246, 0.08);
  color: var(--accent-blue);')
    ,@('border: 1px solid rgba(255, 255, 255, 0.2);', 'border: 1px solid rgba(59, 130, 246, 0.2);')
    # LeetCode panel
    ,@('background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);', 'background: rgba(139, 92, 246, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.1);')
    ,@('background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);', 'background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.2);')
    # Heatmap levels
    ,@('.level1 { background: rgba(255,255,255,0.12); }', '.level1 { background: rgba(59,130,246,0.2);  }')
    ,@('.level2 { background: rgba(255,255,255,0.30); }', '.level2 { background: rgba(59,130,246,0.42); }')
    ,@('.level3 { background: rgba(255,255,255,0.55); }', '.level3 { background: rgba(59,130,246,0.65); }')
    ,@('.level4 { background: rgba(255,255,255,0.85); }', '.level4 { background: rgba(59,130,246,0.90); }')
)

# ── CONTACT ─────────────────────────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\Contact\Contact.module.css' @(
    ,@('rgba(255, 255, 255, 0.07) 0%,', 'rgba(59, 130, 246, 0.07) 0%,')
    ,@('background: rgba(255, 255, 255, 0.08);
  color: var(--accent-blue)', 'background: rgba(59, 130, 246, 0.08);
  color: var(--accent-blue)')
    ,@('background: rgba(255, 255, 255, 0.14);
  color: var(--accent-blue)', 'background: rgba(59, 130, 246, 0.14);
  color: var(--accent-blue)')
    ,@('box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);', 'box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);')
    ,@('box-shadow: 0 8px 28px rgba(255, 255, 255, 0.45);', 'box-shadow: 0 8px 28px rgba(59, 130, 246, 0.45);')
    ,@('border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 60px rgba(0, 0, 0, 0.4);', 'border-color: rgba(59, 130, 246, 0.2);
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.08), 0 24px 60px rgba(0, 0, 0, 0.4);')
    ,@('border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.04);
  box-shadow:
    0 0 0 3px rgba(255, 255, 255, 0.12),
    0 0 16px rgba(255, 255, 255, 0.08);', 'border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.04);
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, 0.12),
    0 0 16px rgba(59, 130, 246, 0.08);')
    ,@('box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);', 'box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);')
    ,@('box-shadow: 0 10px 32px rgba(255, 255, 255, 0.45);', 'box-shadow: 0 10px 32px rgba(59, 130, 246, 0.45);')
)

# ── ASKADAK ─────────────────────────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\AskAdak\AskAdak.module.css' @(
    ,@('rgba(255, 255, 255, 0.25)', 'rgba(6, 182, 212, 0.5)')
    ,@('rgba(255, 255, 255, 0)', 'rgba(6, 182, 212, 0)')
)

# ── DEVPROFILE TSX inline styles ────────────────────────────────
Restore-File 'C:\Users\anush\Downloads\portfolio\app\components\DevProfile\DevProfile.tsx' @(
    ,@('"rgba(255, 255, 255, 0.12)"', '"rgba(59, 130, 246, 0.12)"')
    ,@('"rgba(255, 255, 255, 0.08)"', '"rgba(139, 92, 246, 0.08)"')
)

Write-Host "All RGBA values restored."
