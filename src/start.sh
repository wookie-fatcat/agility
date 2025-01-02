# Script run whenever mg-showcase Container is started

dos2unix /opt/mgateway/mapped/*
chmod +x /opt/mgateway/mapped/tail
chmod +x /opt/mgateway/mapped/start
chmod +x /opt/mgateway/mapped/stop
chmod +x /opt/mgateway/mapped/restart
chmod +x /opt/mgateway/mapped/log
chmod +x /opt/mgateway/mapped/clearLog
chmod +x /opt/mgateway/mapped/agility_start
chmod +x /opt/mgateway/mapped/agility_stop
chmod +x /opt/mgateway/mapped/agility_restart
chmod +x /opt/mgateway/mapped/agility_log
chmod +x /opt/mgateway/mapped/test_loadConfig
chmod +x /opt/mgateway/mapped/test_octopus
chmod +x /opt/mgateway/mapped/test_solisapi
chmod +x /opt/mgateway/mapped/test_solischarge

echo "Permissions set for commands in mapped directory"

