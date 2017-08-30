-- init.lua module
-- Author: Arne Meeuw
-- github.com/ameeuw
--

-- Declare global name concatenated from purpose-name and MAC address
name = 'BATTERY:'..string.sub(wifi.sta.getmac(),13,-1)

-- Initialize Esp module and add begin() callback
Esp = require("Esp").new(
	function()
		mqttHost = ''
		mqttPort = 0
		Battery = require("Relay").new(mqttHost, mqttPort, 4)
	end)
