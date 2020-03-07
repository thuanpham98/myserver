# myserver
***
this is my server on ubuntu 18.04, I try to make a Template flowing a MVC struct, every body can use and pull request for me to introduce this server
# After clone this git :
 ## First time : 
 ***
 npm install 
 ## second :
 ***
 npm install --save dotenv
 ## three :
 ***
 make file .env 
 ## 4 : 
 coppy content from env.document.txt to .env
 ## 5: 
 ### for development 
 ***
 npm run dev 
 ### for release
 ***
 node app.js

# run if lag : see PID of the server which is running to kill
 ***
 sudo lsof -i :6969
 kill -9 {PID}
 
# 4/3/2020 
 ***
 complete template, only display data with char real time 
