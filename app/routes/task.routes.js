const { authJwt } = require("../middlewares");
const controller = require('../controllers/task.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/task/add/:id", controller.addTask);
  app.get("/api/tasks/:id", controller.getTasks);
  app.delete("/api/task/delete/:id", controller.deleteTask);
};