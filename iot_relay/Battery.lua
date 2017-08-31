--[[
Battery.lua module
Author: Arne Meeuw
github.com/ameeuw

Simple Battery switchable over MQTT.

Initialize:
Battery = require('Battery').new()

Methods:
Battery:on()
Battery:off()
Battery:toggle()
 --]]

local Battery = {}
Battery.__index = Battery

function Battery.new(mqttHost, mqttPort, relayPin, capacity)

	local self = setmetatable({}, Battery)
	name = name or 'Battery:'..string.sub(wifi.sta.getmac(),13,-1)
  self.timer = tmr.create()
  self.pin = relayPin or 4
  self.relay = require("Relay").new(4)
  self.soc = 650

	MqttClient = require('MqttClient').new(mqttHost, mqttPort, 'Battery', '{"MqttClient" : "true", "'..name..'" : "true", "Battery" : "true"}')
	if MqttClient ~= nil then
		-- add hooks for mqtt calls
		MqttClient:register("on/set",
			function(topic, message)
				self.relay:on()
			end)
		MqttClient:register("off/set",
			function(topic, message)
				self.relay:off()
			end)
		MqttClient:register("toggle/set",
			function(topic, message)
				self.relay:toggle()
			end)
		MqttClient:register("update",
			function(topic, message)
				self.relay:update()
			end)
		MqttClient:register("level/set",
			function(topic, message)
				self:getLevel()
			end)
		MqttClient:register("charge/set",
			function(topic, message)
        self.relay:on()
				self:charge()
			end)
		MqttClient:register("discharge/set",
			function(topic, message)
        self.relay:on()
				self:discharge()
			end)
		MqttClient:register("stop/set",
			function(topic, message)
        self.relay:off()
				self:stop()
			end)

	end

  tmr.create():alarm(2500, tmr.ALARM_AUTO, function()
    self:getLevel()
  end)

	return self
end

function Battery:charge()
  self.timer:alarm(1000, tmr.ALARM_AUTO, function()
    self.soc = self.soc + 1
  end)
end

function Battery:discharge()
  self.timer:alarm(1000, tmr.ALARM_AUTO, function()
    self.soc  = self.soc - 1
  end)
end

function Battery:stop()
  self.timer:stop()
end

function Battery:getLevel()
  MqttClient:publish(MqttClient.topic..'level/get',tostring(self.soc), 0, 0, nil)
end


return Battery
