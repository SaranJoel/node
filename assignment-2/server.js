const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const filePath =
    req.url === "/"
      ? path.join(__dirname, "index.html")
      : path.join(__dirname, req.url);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(
        '<h1 style="color:red;">The page you requested is not available</h1>'
      );
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});
