ssh $1 "echo $2 | sudo -S ifconfig $3 192.168.0.2 netmask 255.255.255.0"