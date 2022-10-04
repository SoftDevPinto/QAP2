// QAP 2 - Full Stack Development
// Developer - Chris Pinto
// Due Date - Oct 4th, 2022

const http = require("http");
const port = 3000;
const routes = require("./routes");
const { myEmitter } = require("./events");
const startTime = new Date();

const server = http.createServer((req, res) => {
  var path = "../html/";
  switch (req.url) {
    case "/":
      res.statusCode = 200;
      path += "index.html";
      routes.displayFile(path, res, "Home");
      break;

    case "/about":
      res.statusCode = 200;
      path += "about.html";
      routes.displayFile(path, res, "About");
      break;

    case "/sub":
      res.statusCode = 200;
      path += "subscribe.html";
      routes.displayFile(path, res, "Subscribe");
      break;

    case "/products":
      res.statusCode = 200;
      path += "products.html";
      routes.displayFile(path, res, "Products");
      break;

    case "/contact":
      res.statusCode = 200;
      path += "contact.html";
      routes.displayFile(path, res, "Contact");
      break;

    case "/stuff":
      // Sample Redirect - sends you to products page
      res.statusCode = 301;
      res.setHeader("Location", "/products");
      res.end();
      break;

    case "/coding":
      res.statusCode = 200;
      path += "coding.html";
      routes.displayFile(path, res, "Coding");
      break;

    case "/gotyou":
      // Sample 418 code - Gotyou page
      res.statusCode = 418;
      path += "gotyou.html";
      routes.displayFile(path, res, "Gotyou");
      break;

    case "/refresh":
      // Refresh page - 304
      res.statusCode = 304;
      path += "refresh.html";
      routes.displayFile(path, res, "refresh");
      break;

      case "/410":
        // Refresh page - 304
        res.statusCode = 410;
        path += "410.html";
        routes.displayFile(path, res, "410");
        break;

    default:
      // In the event of a non-existing page.
      path += "404.html";
      res.statusCode = 404;
      routes.displayFile(path, res, "404");
      break;
  }
});

// This will run when the server is closed
server.on("close", () => {});

process.on("SIGINT", () => {
  const endTime = new Date();
  const upTime = (endTime - startTime) / 1000;
  console.log("Stopping server...");

  // This doesn't really do anything special. It saves a counter of how many individual pages were visited.
  // Mostly just did this to see if I could get an event to fire when the server closes.
  myEmitter.emit("closeServer");

  // Testing to see if i could record server uptime.
  console.log(`Server uptime: ${Math.round(upTime)} seconds`);
  process.exit(0);
});

server.listen(port, "localhost");
console.log(`Server listening on port ${port}, Please Visit Localhost:3000.`);
