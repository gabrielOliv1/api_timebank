#!/bin/sh
/usr/sbin/sshd &

exec node dist/server.js