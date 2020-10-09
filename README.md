# SEEance - an extensible repository analysis tool for facilitating feedback processes in software engineering education
SEEance offers a chance for inspecting student github repositories via a set of analyses taken from related research 
work. The analyses help you understand better, what is going on within the projects and visualize potential problems of 
your students for better and timely intervention. 

## Rollout 
At its current stage, you need to rollout and host the Webapplication at your organization. The following information
give you a hint on how to achieve this. 

## Requirements
- Installation of Docker (get it at https://www.docker.com/products/docker-desktop)
- A registered Github Application (read more on this topic here https://developer.github.com/apps/building-github-apps/creating-a-github-app/)
    - Permission to READ all user profile data
    - FULL CONTROL of private repositories
- A linux based server
- An installation of NodeJS, NPM and Angular
- An installation of Docker and Docker-Compose
- An installation of Letsencrypt Certbot für Linux (https://certbot.eff.org/lets-encrypt/debianstretch-nginx.html) 
- A domain for your application

## Installation

### Setting up the Github App
- Set your Client Secret and Client ID in the `backend/secret/github_api.ts` file
- Update the Redirect URL for github to `<DOMAINNAME>/auth/callback`

### Setting up Certificates
- Make sure, that port 80 of your system is not in usage for the duration of the certification
- Use the certbot nginx-workflow to generate certificates ` sudo certbot certonly --standalone --preferred-challenges http -d <DOMAINNAME> -d <DOMAINNAME>` (https://certbot.eff.org/lets-encrypt/debianstretch-nginx.html)
- The certificates should be stored at `/etc/letsencrypt`
- Copy the certificates to `nginx-dev`
- Copy the certificates to `nginx-static`

(Read a more detailed description here: https://phip1611.de/2020/02/programmierung-und-skripte/running-nginx-with-lets-encrypt-certificates-outside-of-the-container/)


### Database Security
- You should change the passwords for docker in the `dcss.yml` and the `docker-compose.yml` 
- Adapt the password in `backend/config.json` accordingly

### Add Custom Repositories
- Add the URLs to your custom repositories to `conf.json`

## Starting Up (Dev Version)
The dev version allows you to make changes on SEEance and instantly get your changes display. It is a bit slower, than the 
static version.

- Use `sudo docker-compose up` to start all services

## Starting Up (Static/Productive Version)
The productive version allows you to serve a compiled and optimized version of the application. It requires some preparation 
first:

### Compile the frontend 
- Navigate into the frontend folder
- Install dependencies (`npm i`)
- Build the project (`ng build --prod`)
- Move the contents of `frontend/dist/seeance-frontend` into the `static` folder

- User `sudo docker-compose -f dcss.yml up` to start all services