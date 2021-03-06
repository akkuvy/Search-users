var createError = require("http-errors");
var express = require("express");
var path = require("path");
var hbs= require("express-handlebars")

var usersRouter = require("./routes/users");

var app = express();
var db=require('./config/connection')
db.connect((err)=>{
  if (err)
  console.log("Connection error"+err)
  else
 console.log("Database connected");
})


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials'}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {});

module.exports = app;
