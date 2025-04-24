#!/bin/bash

# Ask for a commit message
read -p "Enter your commit message: " commit_message < /dev/tty

# Stash any changes to allow rebase
git stash

# Switch to main and rebase
git checkout main
git pull --rebase origin main

# Apply stashed changes
git stash pop

# Stage, commit, and push to main
git add .
git commit -m "$commit_message"
git push origin main

# Deploy using npm script (pushes to gh-pages automatically)
npm run deploy

echo "✅ Deployed to gh-pages using npm run deploy!"
