import { createServer, IncomingMessage, ServerResponse } from "http"

const requestListener = function (req: IncomingMessage, res: ServerResponse){
    try {
        if (req.method === "GET" && req.url === "/ping") {
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify(req.headers))
            console.log(req.headers);
            res.end();
        } else {
            res.statusCode = 404
            console.log(res.statusCode);
            res.end();

        }
        } catch (err) {
            console.error(err)
            res.statusCode = 500
            res.end()
    }
};

const server = createServer(requestListener);
const port = process.env.PING_LISTEN_PORT ?? 8000
server.listen(port, () => {
console.log('Server is running on port: ${port}')
});