start docker
docker container run -it -d --name mosquitto-broker -p 1883:1883 -v "C:\Users\reed_\deep-dive\Fullstack\projects\mqtt-iot\mosquitto\config:/mosquitto/config" -v "C:\Users\reed_\deep-dive\Fullstack\projects\mqtt-iot\mosquitto\data:/mosquitto/data" -v "C:\Users\reed_\deep-dive\Fullstack\projects\mqtt-iot\mosquitto\log:/mosquitto/log" eclipse-mosquitto

docker exec -it mosquitto-broker mosquitto_sub -t "#" -v

docker exec -it mosquitto-broker mosquitto_pub \
-t "bootcamp/user1/pixel" \
-m "hello photon!" \
-u username1 -P yourpassword
