# asterisk server
FROM ubuntu:24.10

WORKDIR /usr/app
# install wget
RUN apt-get update && apt-get install -y wget build-essential libedit-dev uuid-dev libssl-dev libjansson-dev libxml2-dev libsqlite3-dev  libncurses5-dev
# alpine: apk add build-base
RUN wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-20-current.tar.gz
RUN tar zxvf asterisk-20-current.tar.gz
RUN cd asterisk-20.9.3 && ./configure --with-pjproject-bundled && make && make install && make samples

CMD [ "asterisk", "-f" ]