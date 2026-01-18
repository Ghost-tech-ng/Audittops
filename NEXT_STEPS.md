# 🎉 Next Steps: Deploy to Render + cPanel

## ✅ Completed
- Code pushed to GitHub: `https://github.com/Ghost-tech-ng/Audittops`
- Repository cleaned (3.68 MB - no sensitive files)
- All fixes applied and tested locally

---

## 🚀 Step 1: Deploy Backend to Render

### A. Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### B. Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repository: `Ghost-tech-ng/Audittops`
3. Configure:
   - **Name**: `auditops-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Starter for $7/month - no sleep)

### C. Add Environment Variables
In Render Dashboard, add these:
```
NODE_ENV=production
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_random_secret_key_here
ADMIN_BOOTSTRAP_KEY=your_admin_key
CORS_ORIGIN=https://yourdomain.com
```

### D. Deploy
Click **"Create Web Service"** - Render will auto-deploy!

**Your backend URL**: `https://auditops-backend.onrender.com`

---

## 📦 Step 2: Build Frontend for cPanel

### A. Update Environment
Edit `client/.env.production`:
```
VITE_API_URL=https://auditops-backend.onrender.com/api
```

### B. Build
Run:
```bash
build-for-cpanel.bat
```

Or manually:
```bash
npm run build
```

### C. Upload to cPanel
1. Go to cPanel **File Manager**
2. Navigate to `public_html/` (or your domain folder)
3. Upload **ALL files** from `dist/public/`:
   - `index.html`
   - `assets/` folder
   - All other files

---

## 🔧 Step 3: Update CORS

In Render Dashboard:
1. Go to your service → **Environment**
2. Update `CORS_ORIGIN`:
```
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

---

## ✅ Step 4: Test

1. Visit `https://yourdomain.com`
2. Try registration/login
3. Check Render logs if issues occur

---

## 📝 Important Notes

- **Render Free Tier**: Sleeps after 15 min inactivity (first request takes 30-60s)
- **Render Starter ($7/mo)**: Always on, faster performance
- **Database**: Make sure Neon database allows Render IPs

---

## 🔄 Future Updates

**Backend**: 
```bash
git add .
git commit -m "Update message"
git push
```
Render auto-deploys!

**Frontend**:
```bash
build-for-cpanel.bat
# Upload new files to cPanel
```

---

## 🆘 Troubleshooting

**CORS errors**: Check `CORS_ORIGIN` matches your domain exactly

**Backend not responding**: Check Render logs, verify DATABASE_URL

**Frontend shows errors**: Check browser console, verify API URL

---

**You're all set!** 🎉
