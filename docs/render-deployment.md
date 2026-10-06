# Legacy Render Deployment Note

The previous version of this site used a MySQL database and administrator OAuth. Those features are no longer part of the public website. Do not add `DATABASE_URL`, `JWT_SECRET`, `OAUTH_SERVER_URL`, `VITE_APP_ID`, `OWNER_OPEN_ID`, or `ADMIN_KEY` for the WhatsApp-first version.

The current customer flow prepares enquiry details in the browser and opens WhatsApp only after the visitor chooses to continue. The site does not retain those details in its database or browser storage. Non-personal cart selections may be saved in browser storage.

The Vercel deployment instructions are in the Production Configuration section of the [README](../README.md). This note remains only to clarify that the older Render environment checklist is obsolete.
