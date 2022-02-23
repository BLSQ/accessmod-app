#!/usr/bin/env bash

echo "Copy template of Env file"
cp .env.dist .env

echo "Install dependencies"
npm install

echo "Prepare Husky"
npm run prepare