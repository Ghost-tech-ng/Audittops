# Render Backend Deployment Guide

## Prerequisites
1. Create a Render account at https://render.com
2. Have your Neon database URL ready
3. Have your custom domain ready for frontend

## Step 1: Deploy Backend to Render

### Option A: Using Render Dashboard (Recommended)

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Create Web Service on Render**:
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `auditops-backend`
     - **Runtime**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free (or paid for better performance)

3. **Add Environment Variables** in Render Dashboard:
   ```
   NODE_ENV=production
   DATABASE_URL=your_neon_database_url
   SESSION_SECRET=your_random_secret_key
   ADMIN_BOOTSTRAP_KEY=your_admin_key
   CORS_ORIGIN=https://yourdomain.com
   ```

4. **Deploy**: Click "Create Web Service"

### Option B: Using render.yaml (Automatic)

1. The `render.yaml` file is already in your project
2. Push to GitHub
3. In Render Dashboard, select "Blueprint" and connect your repo
4. Render will auto-detect the configuration
5. Add the environment variables manually in the dashboard

## Step 2: Get Your Backend URL

After deployment, Render will give you a URL like:
```
https://auditops-backend.onrender.com
```

**Important**: Free tier services sleep after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

## Step 3: Build Frontend for cPanel

1. **Update environment file**:
   Edit `client/.env.production`:
   ```
   VITE_API_URL=https://auditops-backend.onrender.com/api
   ```

2. **Build the frontend**:
   ```bash
   npm run build
   ```

3. **Upload to cPanel**:
   - Go to cPanel File Manager
   - Navigate to `public_html/` (or your domain folder)
   - Upload everything from `dist/public/`:
     - `index.html`
     - `assets/` folder
     - All other files

## Step 4: Configure CORS

In Render Dashboard, update the `CORS_ORIGIN` environment variable:
```
CORS_ORIGIN=https://yourdomain.com
```

If you have multiple domains (www and non-www):
```
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

## Step 5: Test Your Deployment

1. Visit your domain: `https://yourdomain.com`
2. Try to register/login
3. Check Render logs if there are issues

## Troubleshooting

### Backend not responding
- Check Render logs in dashboard
- Verify DATABASE_URL is correct
- Free tier services sleep - first request takes time

### CORS errors
- Make sure CORS_ORIGIN matches your domain exactly
- Include both www and non-www if needed
- Check browser console for exact error

### Database connection issues
- Verify Neon database is active
- Check DATABASE_URL format
- Ensure Neon allows connections from Render IPs

## Custom Domain (Optional)

To use a custom domain for the backend:
1. In Render Dashboard, go to your service
2. Click "Settings" → "Custom Domain"
3. Add your backend subdomain (e.g., `api.yourdomain.com`)
4. Update DNS records in your domain provider
5. Update `VITE_API_URL` in frontend to use custom domain

## Updating Your App

### Backend Updates:
1. Push changes to GitHub
2. Render auto-deploys (if auto-deploy is enabled)
3. Or manually deploy from Render dashboard

### Frontend Updates:
1. Update code
2. Run `npm run build`
3. Upload new files to cPanel (overwrite old ones)

## Cost Estimate

- **Render Free Tier**: $0/month (sleeps after 15 min)
- **Render Starter**: $7/month (always on, better performance)
- **cPanel Hosting**: Your existing cost
- **Neon Database**: Free tier available

## Next Steps

1. Deploy backend to Render
2. Get backend URL
3. Update frontend environment
4. Build and upload frontend to cPanel
5. Test everything works
