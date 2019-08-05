const AMQP_CONNECTION_STRING = "amqp://nyfxmmwr:F7MbsFjw3_clzK_47RpxZD7W7uOB2YYI@moose.rmq.cloudamqp.com/nyfxmmwr";
const AMQP_CHANNEL_NAME = "PAYMENTS_GATEWAY";
const AMQP_QUEUE_NAME = "PAYMENTS_QUEUE";

const TOKEN_ISSUER = "saas";
const AUTH_SECRET = "IWantToSeekMyFortune,SomeLongWayOff";

module.exports = {
    apps: [
        {
            name: "plans-service",
            script: "./plans-service/index.js",
            watch: true,
            env: {
                NODE_ENV: "development",
                MYSQL_USER: "root",
                MYSQL_PASS: "123456789",
                MYSQL_PORT: 3307,
                MYSQL_DB: "PlansDb",
                PORT: 3001,
                TOKEN_ISSUER,
                AUTH_SECRET,
                REDIS_HOST: "localhost",
                REDIS_PORT: 6380,
                REDIS_PASSWORD: ""
            },

            env_production: {
                NODE_ENV: "production"
            }

        },
        {
            name: "subscriptions-service",
            script: "./subscriptions-service/index.js",
            watch: true,
            env: {
                NODE_ENV: "development",
                MYSQL_USER: "root",
                MYSQL_PASS: "123456789",
                MYSQL_PORT: 3308,
                MYSQL_DB: "SubscriptionsDb",
                PORT: 3002,
                AMQP_CONNECTION_STRING,
                AMQP_CHANNEL_NAME,
                AMQP_QUEUE_NAME,
                TOKEN_ISSUER,
                AUTH_SECRET
            },

            env_production: {
                NODE_ENV: "production"
            }

        },
        {
            name: "payments-service",
            script: "./payments-service/index.js",
            watch: true,
            env: {
                AMQP_CONNECTION_STRING,
                AMQP_CHANNEL_NAME,
                AMQP_QUEUE_NAME
            },
            env_production: {}
        },
        {
            name: "auth-service",
            script: "./auth-service/index.js",
            watch: true,
            env: {
                NODE_ENV: "development",
                MYSQL_USER: "root",
                MYSQL_PASS: "123456789",
                MYSQL_PORT: 3309,
                MYSQL_DB: "UsersDb",
                PORT: 3003,
                TOKEN_ISSUER,
                AUTH_SECRET

            },

            env_production: {
                NODE_ENV: "production"
            }

        }
    ]
}