module.exports = {
    HTTP: {
        CODES: {
            SUCCESS: 200,
            CREATED: 201,
            UPDATE: 201,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            SERVER_ERROR: 500,
        },
        METHODS: {
            POST: "post",
            GET: "get",
            DELETE: "delete",
            PUT: "put"
        }
    },
    MESSAGES: {
        SIGNUP: {
            SUCCESS: "You have successfully signed up.",
            EXIST: "User already exists.",
            ERROR: "Error occurred please contact your web administrator"
        },
        LOGIN: {
            SUCCESS: "You have successfully logged in.",
            AUTH_FAILED: "User Authentication Failed, invalid username or password!",
            INACTIVE: "Your account is deactivated, please login again."
        },
        GENERAL: {
            SUCCESS: "Success",
            NOT_FOUND: "Nothing found",
            FAILED: "Failed to perform operation",
            NOT_ALLOWED: "You are not allowed to perform this operation",
            AUTH_REQUIRED: "Please login to continue",
            PARTIAL_SUCCESS: "Some records were invalid",
            BAD_QUERY: "Some or all of the parameter(s) in your query are invalid",
            INVALID_QUERY: "Query paramter(s) missing, please provide the required parameters",
            FIELDS_INVALID: "Input field(s) missing or invalid, please provide the correct required fields.",
            UNIQUE_CONSTRAINT: "Unique key error; key already exists",
            INTERNAL_ERROR: "We are fixing a few things internally. Sorry for the inconvinience!"
        }
    },
    SECRET: {
        superSecret: "djmo5bgfiewuprb9eai4ek"
    },
    SEARCH_LIMIT: 10,
    BASE_URL: ''
}