Last Updated: May 12, 2026
Current Phase: Phase 2 COMPLETE — Razorpay integration done
Next Phase: Phase 3 — GST Invoice Generator

SUPABASE (CURRENT - WORKING):
- Strapi DB: bharatcms-strapi (cbpbpjjtcvvlawcspzqe)
- Host: aws-1-ap-south-1.pooler.supabase.com
- Port: 6543
- User: postgres.cbpbpjjtcvvlawcspzqe
- Pass: BharatCMS2026
- Landing DB: wchxscnykcqtenlacdag (unchanged)

PROJECT PATH: ~/Desktop/Projects/bharatcms-workspace/

PHASE 2 DONE:
- useRazorpay.ts — dynamic tenantId, user.reload(), router.refresh()
- billing/page.tsx — plan from Clerk unsafeMetadata (survives refresh)
- Strapi controller + service + routes — all working
- Payment verified → Tenant plan updated in DB + Clerk metadata

PHASE 3 NEXT: GST Invoice PDF
- pdf-lib (no puppeteer — too heavy for Railway free tier)
- Strapi endpoint: POST /api/invoices/generate
- Fields: buyer name, GSTIN, items, HSN codes, CGST/SGST/IGST
- Output: PDF buffer → download or email via Resend

PHASE 4 AFTER: Multi-tenant + Clerk webhook sync

---

## CONTEXT UPDATE — May 13, 2026 (Day 10)

### COMPLETED TODAY

Phase 2: Razorpay Integration - 100% DONE
- useRazorpay.ts — dynamic tenantId, user.reload(), router.refresh()
- billing/page.tsx — plan reads from Clerk unsafeMetadata (survives refresh)
- Strapi controller + service + routes working
- Payment verified → Tenant plan updated in DB + Clerk metadata
- Pushed: bharatcms c2083bc, bharatcms-landing cec9ee7

Phase 3: GST Invoice PDF Generator - 100% DONE
- Invoice content type in Strapi
- pdf-lib + DejaVu TTF font (rupee symbol renders correctly)
- BCMS-2026-XXXX invoice numbering
- CGST+SGST (same state) / IGST (interstate) logic
- POST /api/invoices/generate — HTTP 200, PDF 410KB
- Frontend auto-downloads PDF after payment success
- Both committed and pushed to GitHub

### SUPABASE (UPDATED)
- PAUSED/BROKEN: bharatcms-prod (pvlrulntlfvjmlgmbwlq) — do not use
- ACTIVE Strapi DB: bharatcms-strapi (cbpbpjjtcvvlawcspzqe)
  Host: aws-1-ap-south-1.pooler.supabase.com (NOT aws-0)
  Port: 6543, User: postgres.cbpbpjjtcvvlawcspzqe, Pass: BharatCMS2026
- ACTIVE Landing DB: bharatcms-landing (wchxscnykcqtenlacdag) — waitlist only

### CORRECT PROJECT PATH
Desktop/Projects/bharatcms-workspace/ (NOT ~/Projects)

### NEXT: Phase 4 — Multi-tenant + Clerk webhook
- Clerk webhook → auto-create Tenant in Strapi on signup
- Store tenantId in Clerk unsafeMetadata on registration
- Remove hardcoded tenantId: 1 permanently

### BUGS FIXED TODAY
- Supabase pooler aws-0 broken → use aws-1, new project
- pdf-lib rupee WinAnsi error → DejaVu TTF embedding
- Plan lost on refresh → Clerk unsafeMetadata
- tenantId hardcoded → dynamic from Clerk metadata
- Clerk crash after payment → user.reload() + router.refresh()
