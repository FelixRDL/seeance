FROM node:12
ENV NODE_ROOT /usr/app/
#RUN mkdir -p $NODE_ROOT
WORKDIR $NODE_ROOT
COPY package.json ./
RUN npm install
RUN apt update && \
   apt -y upgrade && \
   apt -y install git diffstat
COPY . .
EXPOSE 3000