FROM node:latest

COPY init_setup /usr/bin
RUN  chmod +x /usr/bin/init_setup

COPY init /usr/bin/
RUN  chmod +x /usr/bin/init

CMD ["init"]