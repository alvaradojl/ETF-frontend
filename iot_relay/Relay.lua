--[[
Relay.lua module
Author: Arne Meeuw
github.com/ameeuw

Simple relay switchable over MQTT.

Initialize:
Relay = require('Relay').new()

Methods:
Relay:on()
Relay:off()
Relay:toggle()
 --]]

local Relay = {}
Relay.__index = Relay

function Relay.new(pin)

	local self = setmetatable({}, Relay)
	name = name or 'Relay:'..string.sub(wifi.sta.getmac(),13,-1)
  self.pin = pin or 4
	self.state = 0

	-- set up gpio as output for relay
	gpio.mode(self.pin, gpio.OUTPUT)
	gpio.write(self.pin, self.state)

	return self
end

function Relay:on()
	self.state = 1
	self:update()
	MqttClient:publish(MqttClient.topic..'on/get',tostring(self.state), 0, 0, nil)
end

function Relay:off()
	self.state = 0
	self:update()
	MqttClient:publish(MqttClient.topic..'off/get',tostring(self.state), 0, 0, nil)
end

function Relay:toggle()
	self.state = 1 - self.state
	self:update()
	MqttClient:publish(MqttClient.topic..'toggle/get',tostring(self.state), 0, 0, nil)
end

function Relay:update()
	gpio.write(self.pin, self.state)
	MqttClient:publish(MqttClient.topic..'state/get',tostring(self.state), 0, 0, nil)
end

return Relay
