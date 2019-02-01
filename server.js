const express = require('express');
const app = express();

const SERVER_PORT = process.env.PORT || 8000;
app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`));