module.exports = {

    APP_NAME: "Project Name",

    /* ENVIRONMENT */
    ENVIRONMENT: {

        ENV: process.env.NODE_ENV == 'development' ? 'DEV' : (process.env.TARGET_ENV == 'staging' ? 'STAGING' : 'PRODUCTION'),

        DEV: {
            BACKEND_BASE_URL: 'http://localhost:1337/',
        },

        STAGING: {
            BACKEND_BASE_URL: 'http://localhost:1337/',
        },

        PRODUCTION: {
            BACKEND_BASE_URL: 'http://localhost:1337/',
        },
    },
};
