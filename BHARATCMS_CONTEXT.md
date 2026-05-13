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
