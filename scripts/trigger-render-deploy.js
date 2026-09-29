import fs from 'fs';
import path from 'path';

// Helper to load .env without exposing secrets
function getDeployHookUrl() {
  if (process.env.RENDER_DEPLOY_HOOK_URL) {
    return process.env.RENDER_DEPLOY_HOOK_URL.trim();
  }
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*RENDER_DEPLOY_HOOK_URL\s*=\s*(.*)$/);
      if (match) {
        return match[1].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
  return null;
}

async function triggerDeploy() {
  const hookUrl = getDeployHookUrl();
  if (!hookUrl) {
    console.warn('[Render Deploy] No RENDER_DEPLOY_HOOK_URL found in environment or .env. Skipping hook trigger.');
    process.exit(0);
  }

  try {
    const response = await fetch(hookUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Jaymurti-Deploy-Runner/1.0'
      }
    });

    if (!response.ok) {
      console.error(`[Render Deploy] Trigger returned status ${response.status} ${response.statusText}`);
      process.exit(1);
    }

    const data = await response.json().catch(() => null);
    if (data && data.deploy) {
      console.log(`[Render Deploy] Successfully triggered deployment! Deploy ID: ${data.deploy.id || 'received'} (Status: ${data.deploy.status || 'in-progress'})`);
    } else {
      console.log(`[Render Deploy] Successfully triggered deployment (HTTP ${response.status}).`);
    }
  } catch (err) {
    console.error('[Render Deploy] Failed to trigger deploy hook:', err.message || err);
    process.exit(1);
  }
}

triggerDeploy();
