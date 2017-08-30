wifi.setmode(wifi.STATION)
station_cfg={}
station_cfg.ssid="Summercamp_24"
station_cfg.pwd="iotsummercamp"
wifi.sta.config(station_cfg)

wifi.sta.autoconnect(1)
net.dns.setdnsserver('8.8.8.8', 0)
