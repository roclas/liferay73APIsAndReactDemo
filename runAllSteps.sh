#!/usr/bin/env zsh

i=1;
while [ "$(ls | grep step$i)" ];do
	cd step$i*
	#npm install
	export PORT=$((3000+$i))
	forever start -c "npm start" ./
	i=$(($i+1)) 
	#echo $PORT
	cd -
done
