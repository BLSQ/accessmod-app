#!/usr/bin/env bash

echo "Copy template of Env file"
cp .env.local.dist .env.local

echo "Install dependencies"
npm install
