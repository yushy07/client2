# Render Deployment & Environment Configuration Guide

This guide outlines the production deployment requirements for **Jaymurti Traders** on [Render](https://render.com/).

---

## 1. Production Startup Modes

The application supports two deployment modes:

### Mode A: Standalone Demo Mode (Recommended for Client Showcase)
Set one environment variable in Render:
- **`DEMO_MODE`**: `true`

This mode starts the Node web server immediately without requiring external MySQL or OAuth infrastructure. All 17 public routes, 159 Birla Opus shades, 3D visualizers, room inspiration studio, surface textures, paint calculators, and static media work 100% locally. Inquiries and review submissions show a friendly notification that they are disabled in demo mode and prompt direct WhatsApp/phone contact.

### Mode B: Full Production Mode (`DEMO_MODE=false`)
Requires setting all production infrastructure variables (`DATABASE_URL`, `JWT_SECRET`, `OAUTH_SERVER_URL`, `VITE_APP_ID`). If any mandatory variable is missing, the server will intentionally fail fast and refuse to start.

---

## 2. Environment Variables Checklist

Configure these variables in the **Render Dashboard → Your Web Service → Environment**:

### A. Mandatory Variables for Full Production (`DEMO_MODE=false`)

| Variable | Description & Format | How to Obtain / Generate |
|---|---|---|
| `DATABASE_URL` | MySQL connection URI for storing enquiries, reviews, and user records. <br>Format: `mysql://<user>:<password>@<host>:<port>/<dbname>?ssl={"rejectUnauthorized":true}` | Obtain from your production MySQL database provider (TiDB Cloud, AWS RDS, PlanetScale, Aiven, or Render MySQL). |
| `JWT_SECRET` | Cryptographic key (minimum 32 characters) used to sign and verify HS256 session cookies. | **Generate a new secure secret.** <br>Terminal command: `openssl rand -hex 32` or `openssl rand -base64 32`. <br>*Do not use predictable or short strings.* |
| `OAUTH_SERVER_URL` | Base URL of the OAuth identity service used to authenticate admin and customer logins. | Obtain from your OAuth service configuration / dashboard. |
| `VITE_APP_ID` | The registered Application / Project ID issued for this web application by the OAuth provider. | Obtain from your OAuth service project settings. |

---

### B. Admin Functionality Variables

| Variable | Description | How to Obtain / Generate |
|---|---|---|
| `OWNER_OPEN_ID` | The specific OAuth OpenID string corresponding to the store owner's account. When this user logs in, they are automatically assigned the `admin` role for review moderation (`/admin/reviews`). | Log in via OAuth or check your identity provider user records to copy the owner's OpenID string. |
| `ADMIN_KEY` | *(Optional fallback)* A shared secret (min 8 chars) that allows admin access via the `x-admin-key` HTTP header. | Generate a secure secret if API-based moderation without OAuth is desired. |

---

### C. Optional & Platform Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | Auto-set by Render (usually `10000`) | The port the Node HTTP server binds to. The server automatically detects and binds to `0.0.0.0:$PORT`. |
| `NODE_ENV` | `production` | Set to `production` for production builds. |
| `DB_POOL_SIZE` | `10` | Maximum number of pooled MySQL connections. |
| `DB_QUERY_TIMEOUT_MS` | `5000` | Query execution timeout in milliseconds. |
| `BUILT_IN_FORGE_API_URL` | `""` | Optional proxy URL for internal Google Maps / Storage services. |
| `BUILT_IN_FORGE_API_KEY` | `""` | Optional API key for the internal proxy service. |

---

## 3. Render Web Service Settings

- **Environment**: `Node`
- **Build Command**: `pnpm install && pnpm run build`
- **Start Command**: `pnpm run start` (which executes `cross-env NODE_ENV=production node dist/index.js`)
- **Health Check Path**: `/health` or `/api/health`

---

## 4. Troubleshooting

### "No open ports detected"
This message occurs when the application exits during initialization before calling `server.listen(port)`.
1. Check the Render **Logs** tab.
2. Look for `[Config] Refusing to start: missing required production configuration.`
3. Verify that `DATABASE_URL`, `JWT_SECRET`, `OAUTH_SERVER_URL`, and `VITE_APP_ID` are all present in the **Environment** tab.
4. Verify that `JWT_SECRET` is at least 32 characters in length.
