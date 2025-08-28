# Signup Troubleshooting Guide

If the signup functionality is not working in production, check these common issues:

## 1. Environment Variables

Make sure these environment variables are set correctly in production:

```bash
# Enable user registration
DISABLE_REGISTRATION=false

# Make sure UI is not disabled
DISABLE_UI=false

# If using cloud mode, ensure these don't interfere
CLOUD_MODE=false
CLOUD_URL=""
```

## 2. Check Configuration

Visit `/debug` endpoint to see current environment settings:
```
https://analytics.imoogleai.xyz/debug
```

## 3. Verify Files Are Deployed

Ensure these files exist in production:
- `/src/app/signup/page.tsx`
- `/src/app/signup/SignupForm.tsx`
- `/src/app/api/auth/register/route.ts`

## 4. Test API Endpoint

Test the registration API directly:
```bash
curl -X POST https://analytics.imoogleai.xyz/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpassword123"}'
```

## 5. Check Browser Console

Open browser dev tools and check for:
- JavaScript errors
- Failed network requests to `/api/auth/register`
- CSP (Content Security Policy) violations

## 6. Common Issues

- **Cloud Mode**: If `CLOUD_MODE=true`, login redirects may interfere
- **Base Path**: If `BASE_PATH` is set, URLs might be different
- **Build Issues**: Ensure `npm run build` completed successfully
- **Static Export**: If using static export, API routes won't work

## 7. Quick Fixes

### Force Rebuild
```bash
rm -rf .next
npm run build
npm start
```

### Check Next.js Build Output
Look for signup routes in build output:
```
Route (app)                  Size
├ /signup                    [dynamic]
├ /api/auth/register         [dynamic]
```

### Test in Incognito Mode
Sometimes browser cache can cause issues with new routes.