***
# myserver
this is my server on ubuntu 18.04, I try to make a Template flowing a MVC struct, every body can use and pull request for me to introduce this server

***
# After clone this git :
 ## step 1: 
 npm install 
 
 ## step 2 :
 npm install --save dotenv

 ## step 3 :
 create file .env 

 ## step 4 : 
 coppy content from env.document.txt to .env (change some information of you into it)
 
 ## step 5: 
 ### for development 
 npm run dev 
 ### for release
 node app.js
 
***
# if have error when port can not open on port 6969 : see PID of the server which is running to kill
 sudo lsof -i :6969
 
 kill -9 {$PID}
 ***
# 4/3/2020 
 complete template, only display data with char real time 
# 23/3/2020
 complete code controll esp with message protoc-c
