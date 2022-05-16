#!/bin/bash

mkdir -p /var/jail/{dev,etc,lib,lib64,usr,bin}
mkdir -p /var/jail/usr/bin
chown root.root /var/jail
mknod -m 666 /var/jail/dev/null c 1 3

cd /var/jail/etc
cp /etc/ld.so.cache .
cp /etc/ld.so.conf .
cp /etc/nsswitch.conf .
cp /etc/hosts .

cd /var/jail/usr/bin
cp /bin/ls .
cp /bin/bash .

/root/${REPO_DIR}/install_scripts/l2chroot.sh ls
/root/${REPO_DIR}/install_scripts/l2chroot.sh bash

echo 'Match Group jailed  
    PasswordAuthentication no 
    ChrootDirectory /var/jail/  
    X11Forwarding no 
    AllowTcpForwarding no ' >> /etc/ssh/sshd_config


