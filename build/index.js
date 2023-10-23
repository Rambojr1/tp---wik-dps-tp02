"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const requestListener = function (req, res) {
    try {
        if (req.method === "GET" && req.url === "/ping") {
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(req.headers));
            console.log(req.headers);
            res.end();
        }
        else {
            res.statusCode = 404;
            console.log(res.statusCode);
            res.end();
        }
    }
    catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end();
    }
};
const server = (0, http_1.createServer)(requestListener);
const port = (_a = process.env.PING_LISTEN_PORT) !== null && _a !== void 0 ? _a : 8000;
server.listen(port, () => {
    console.log('Server is running on port: ${port}');
});
