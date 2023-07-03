# Email Project

## Table Of Content

- [Email Project](#email-project)
  - [Table Of Content](#table-of-content)
  - [Installation](#installation)
    - [Docker](#docker)
  - [Run project](#run-project)
    - [Run with docker](#run-with-docker)
      - [Run backend](#run-backend)

## Installation

This document is for setup this project

### Docker

The latest Docker version can be installed via docker. To make easily to use you can install docker desktop. It's available in [docker desktop](https://docs.docker.com/get-docker/)

## Run project

### Run with docker
To run project: 
```bash
docker-compose up
```
To shutdown: 
```bash
docker-compose down
```

#### Run backend
cd to Backend folder
```bash
docker-compose up
```
To shutdown: 
```bash
docker-compose down
```

### Run without docker
#### Run backend
cd to Backend folder
```bash
./gradlew bootJar
```
#### Run SMTPServer
cd to SMTPServer folder
```bash
./gradlew bootJar
```

#### Run Frontend
cd to frontend folder
```bash
npm install --force
npm start
```


