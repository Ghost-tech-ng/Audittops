#!/bin/bash

# Deployment Script for Split Hosting
# Frontend: cPanel | Backend: Vercel

echo "🚀 AuditOps Split Deployment Script"
echo "===================================="
echo ""

# Check if .env.production exists in client folder
if [ ! -f "client/.env.production" ]; then
    echo "❌ Error: client/.env.production not found!"
    echo "📝 Please create it from .env.frontend.example"
    echo ""
    echo "Example:"
    echo "  cp .env.frontend.example client/.env.production"
    echo "  # Then edit client/.env.production with your backend URL"
    exit 1
fi

echo "✅ Found client/.env.production"
echo ""

# Show the backend URL being used
BACKEND_URL=$(grep VITE_API_URL client/.env.production | cut -d '=' -f2)
echo "🔗 Backend URL: $BACKEND_URL"
echo ""

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Create a deployment package for cPanel
echo "📁 Creating cPanel deployment package..."
cd dist/public
zip -r ../../cpanel-frontend.zip .
cd ../..

echo "✅ Created cpanel-frontend.zip"
echo ""

echo "📋 Next Steps:"
echo "=============="
echo ""
echo "FRONTEND (cPanel):"
echo "1. Upload cpanel-frontend.zip to your cPanel File Manager"
echo "2. Extract it in your public_html/ directory"
echo "3. Delete the zip file after extraction"
echo ""
echo "BACKEND (Vercel):"
echo "1. Run: vercel --prod"
echo "2. Set environment variables in Vercel dashboard"
echo "3. Copy the deployment URL"
echo ""
echo "IMPORTANT:"
echo "- If backend URL changes, update client/.env.production"
echo "- Rebuild and re-upload frontend"
echo "- Add your cPanel domain to CORS_ORIGIN in Vercel env vars"
echo ""
echo "✨ Deployment package ready!"
