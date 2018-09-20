#!/bin/bash

echo "Setting up... "
npm install 

echo "You have entered the following values: 
 username for db: $1
 password for db: $2
 port for db: $3
 port for app: $4
 name for db: $5
 name for test db: $6
 base url for app: $7"

if [ -f .env ]; then
  echo -n "Env file already exists, do you wish to overwrite?"
  read answer
  if [ "$answer" != "${answer#[Yy]}" ] ;then
    rm .env
  else
    echo "Exiting"
    exit 0
  fi
fi

USERNAME=${1:-"username_placeholder"}
PASSWORD=${2:-"pw_placeholder"}
DB_PORT=${3:-5432}
APP_PORT=${4:-8080} 
DB_NAME=${5:-"shortener"}
TEST_DB_NAME=${6:-"test_shortener"}
BASE_URL=${7:-"localhost:8080"}

if test "$#" -ne 4; then
    echo "Using default values for arguments not supplied, please manually adjust in generated .env file later"
fi

echo "Now generating .env file"
echo "DB_NAME=${DB_NAME}
TEST_DB_NAME=${TEST_DB_NAME}
DB_USER=${USERNAME}
DB_PASSWORD=${PASSWORD}
DB_PORT=${DB_PORT}
PORT=${APP_PORT}
BASE_URL=${BASE_URL}">>.env

echo "Printing content of generated env file"
cat .env

echo -n "Do you need to manually adjust these values?"
read answer
if [ "$answer" != "${answer#[Yy]}" ] ;then
  echo "Exiting setup script; you can create database and run migrations after you manually adjust your .env file"
  exit 0
else
  psql -c "CREATE DATABASE ${DB_NAME}"
  ./node_modules/.bin/knex migrate:latest
fi

echo "Set up complete."