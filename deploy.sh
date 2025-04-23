#!/bin/bash

# Ask for a commit message
echo "Enter your commit message:"
read commit_message

# Switch to main and pull latest from remote
git checkout main
git pull origin main

# Stage, commit, and push explicitly to origin main
git add .
git commit -m "$commit_message"
git push origin main

# Deploy using npm script (pushes to gh-pages automatically)
npm run deploy

echo "✅ Deployed to gh-pages using npm run deploy!"
