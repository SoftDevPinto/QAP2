// QAP 2 - Full Stack Development
// Developer - Chris Pinto
// Due Date - Oct 4th, 2022


const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
const loggers = require("./loggers");

myEmitter.on("pageVisit", (location, res) => {
  loggers.logTraffic(location, res);
});

myEmitter.on("closeServer", () => {
  loggers.logTotal();
});

module.exports = { myEmitter };
