-- init.lua module
-- Author: Arne Meeuw
-- github.com/ameeuw
--

-- Declare global name concatenated from purpose-name and MAC address
name = 'BATTERY:'..string.sub(wifi.sta.getmac(),13,-1)

-- Initialize Esp module and add begin() callback
Esp = require("Esp").new(
	function()
		mqttHost = 'meeuw.me'
		mqttPort = 62763
		Battery = require("Battery").new(mqttHost, mqttPort, 4, 10000)
	end)
