#Summery:

This application consists of 4 micro services:

1. Plans Service
2. Subscriptions Service
3. Authentication Service
4. Payments Service

This application need 4 docker container

krypton:subscription-management-application hasan$ docker ps

NAMES

plans-cache

auth-db

subscriptions-db

plans-db

pm2 was used to run all micro services:

pm2 start ./ecosystem.config.js

[PM2][WARN] Applications plans-service, subscriptions-service, payments-service, auth-service not running, starting...

[PM2] App [plans-service] launched (1 instances)

[PM2] App [subscriptions-service] launched (1 instances)

[PM2] App [payments-service] launched (1 instances)

[PM2] App [auth-service] launched (1 instances)

This application need 1 main gateway

main-gateway/server.js file must run before call api

This application need cloudAMQ account with a name subscription-as-a-service for payment

#1. Plan Service

All folder that depends on Plans Services recites with in plans-service folder except errors which is in the parent folder.
To run this plans-service:


docker run  --name plans-db -e MYSQL_ROOT_PASSWORD=123456789 -p 3307:3306 -d mysql:5.7
plans-db -> docker name not db name

create schema PlansDb character set 'utf8mb4';

after docker and schema creation but make sure migrations folder have the file :  20190728071103-create-plan.js


run sequelize db:migrate #install sequelize-cli globally first

#2. Subscription Plan:

docker run  --name subscriptions-db -e MYSQL_ROOT_PASSWORD=123456789 -p 3308:3306 -d mysql:5.7

create schema SubscriptionDb character set 'utf8mb4';

after docker and schema creation but make sure migrations folder have the file :  2019####-create-plan.js


run sequelize db:migrate

#3. Authentication Service:

docker run  --name users-db -e MYSQL_ROOT_PASSWORD=123456789 -p 3309:3306 -d mysql:5.7
create schema UsersDb character set 'utf8mb4';


create schema UsersDb character set 'utf8mb4';

after docker and schema creation but make sure migrations folder have the file :  2019#####-create-plan.js


run sequelize db:migrate #install sequelize-cli globally first


#4. Payment Service:

Go create an account : https://api.cloudamqp.com/

Create an instance :
subscription-as-a-service

Change the property values accordingly

#API :

Sign-up:
```
{
	"firstName":"McDillion",
	"lastName":"Crefer",
	"email": "crefer@gmail.com",
	"password":"12345678"
}
```

Sign-in:
```
{
"email":"crefer@gmail.com",
"password":"12345678"
}
```
returns TOKEN: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7.....

#How to Test:

Use the token in the header as:
Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7.....

Use the token to get plans or create plan


Create plans: POST
```console
http://localhost:8080/api/plans/
```
```
{
	"name": "Professional Plan",
    "price": 300,
    "type": "monthly",
    "userId": 1
}
```
Get plans: GET

http://localhost:8080/api/plans/

Delete plans: DELETE

http://localhost:8080/api/plans/1




Create Subscription:
```
{
"planId": 1,
"coupon":"44",
"cardNumber":"4510142620262768",
"holderName":"JohnDoe",
"expirationDate":"12/22",
"cvv":"123",
"userId":1
}
```

```
nvm use v12.6.0

docker restart $(docker ps -a -q)

pm2 start ./ecosystem.config.js

node main-gateway/server.js

```

Only Plan uses authentications not subscription. (For Testing Purpose)



#Caching:

docker run --name plans-cache -p 6380:6379 -d redis

Each time you POST a plan or GET a plan, automatically cache in the redis server:

Check the redis:
As this app was done in mac, I used global npm:
npm install -g redis-cli
```
rdcli -h localhost -p 6380 #This connects to redis docker container

localhost:6380>hset user#1 plans "[{'name':'Test','price':'44'}]" # I have not checked if plans need to be created by this before running the app

localhost:6380>keys * #This will show if any plans are there in the cache

localhost:6380>hget user#1 plans #This shows the data in the plans
```


This commands were used frequently but may not need
sequelize db:migrate

npm i sequelize-cli -g

npm install -g redis-cli

pm2 kill

pm2 logs

db:migrate:undo:all

sequelize model:generate --name Subscription --attributes planId:integer,coupon:string,cardNumber:string,holderName:string,expirationDate:string,cvv:string --forceç

sequelize model:generate --name Plan --attributes name:string,price:float,type:string,userId:integer --force
