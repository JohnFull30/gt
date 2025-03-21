#!/bin/bash

# Ask for a commit message
echo "Enter your commit message:"
read commit_message

# Deploy with message
git checkout master
git add .
git commit -m "$commit_message"
git push origin master

git checkout main
git merge master
git push origin main

git checkout gh-pages
git merge main
git push origin gh-pages
