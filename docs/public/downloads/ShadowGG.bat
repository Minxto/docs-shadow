@echo off
netsh advfirewall reset

netsh advfirewall set allprofiles state on

netsh advfirewall set currentprofile firewallpolicy blockinbound,allowoutbound
netsh advfirewall set domainprofile firewallpolicy blockinbound,allowoutbound
netsh advfirewall set privateprofile firewallpolicy blockinbound,allowoutbound
netsh advfirewall set publicprofile firewallpolicy blockinbound,allowoutbound
netsh advfirewall set allprofiles state on
netsh advfirewall set allprofiles firewallpolicy allowinbound,allowoutbound
netsh advfirewall firewall set rule all new enable=yes
echo Firewall settings have been reset and activated.
pause