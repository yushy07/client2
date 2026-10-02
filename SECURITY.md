# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The security of the **Jaymurti Traders** web platform is taken seriously. If you discover a security vulnerability or sensitive information exposure, please report it responsibly.

### Disclosure Process

1. **Do not create public GitHub issues** for security vulnerabilities.
2. Direct security disclosures to the showroom management team via email or direct contact:
   - **Showroom Contact**: `support@jaymurtitraders.com` / `+91 87566 59035`
3. Please provide a clear description of the vulnerability, reproduction steps, and potential impact.
4. Reports will be acknowledged within 48 hours, and patches will be deployed promptly upon verification.

## Security Practices in this Repository

- **Zero Client-Side Secrets**: All API secrets, database credentials, and session keys are strictly isolated to server-side environments (`server/_core/env.ts`).
- **Input Validation**: Strict request schema validation via [Zod](https://zod.dev/) on all tRPC procedures and endpoints.
- **Session Protection**: HS256 JWT cookie signing with `HttpOnly`, `SameSite=Lax`, and `Secure` attributes.
- **Rate Limiting**: IP-based rate limiting on all API routes and visualizer endpoints to mitigate abuse.
- **Dependency Audits**: Regular vulnerability remediation via `pnpm` overrides and automated Dependabot scans.
