# Quick Push Guide

## ✅ Repository is Ready!

All files are committed and ready to push to:
`https://github.com/Ghost-tech-ng/Audittops.git`

## 🔐 Authentication Required

Choose ONE of these methods:

### Method 1: GitHub CLI (Easiest)
```bash
gh auth login
git push -u origin main
```

### Method 2: Personal Access Token
1. Go to: https://github.com/settings/tokens/new
2. Name: "AuditOps Deployment"
3. Expiration: 90 days
4. Scopes: Check "repo" (full control)
5. Generate token
6. Copy the token
7. Run:
```bash
git push -u origin main
```
8. Username: Ghost-tech-ng
9. Password: PASTE_YOUR_TOKEN_HERE

### Method 3: SSH (If you have SSH keys)
```bash
git remote set-url origin git@github.com:Ghost-tech-ng/Audittops.git
git push -u origin main
```

## 📋 After Successful Push

1. Go to https://render.com
2. Create New Web Service
3. Connect your GitHub repo: `Ghost-tech-ng/Audittops`
4. Render will auto-detect the configuration
5. Add environment variables
6. Deploy!

Then run `build-for-cpanel.bat` to prepare frontend files.
