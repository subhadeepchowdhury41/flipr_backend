const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/employee", [authJwt.verifyToken], controller.employeeBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/auth/employees", controller.getAllEmployees
  );

  app.put(
    "/api/auth/employee/:id", controller.updateEmployee
  );

  app.delete(
    "/api/auth/employee/delete/:id", controller.deleteEmployee
  )
};