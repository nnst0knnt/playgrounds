FROM mysql:8.0-debian

RUN apt-get update \
	&& apt-get install -y locales \
	&& locale-gen ja_JP.UTF-8 \
	&& echo "export LANG=ja_JP.UTF-8 LANGUAGE=ja_JP:ja" >> ~/.bashrc

ENV LC_ALL C.UTF-8

COPY ./containers/mysql/my.cnf /etc/mysql/conf.d/my.cnf