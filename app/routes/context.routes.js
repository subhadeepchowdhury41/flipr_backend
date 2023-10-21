const controller = require('../controllers/context.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.put("/api/context/toggle", controller.toggleListening);
  app.get("/api/context", controller.getContext);
  app.delete("/api/context/msgs", controller.deleteAllMsgs);
  app.post("/api/context/msg", controller.addToMsg);
  app.get("/api/context/listen", controller.getListeningStatus);
};