#!/usr/bin/env bash

cd src
npm run build
cd ..
git add .
git status
git commit -m "$1"
git push