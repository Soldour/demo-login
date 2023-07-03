const express = require("express");
const bodyParser = require("body-parser");
let app = express();

const https = require("https");
const { Console } = require("console");

app.use(express.static("puplic"));

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  //   res.send("<h1 style='color:blue'>hello there !</h1> <input> <button>submit</button>");
});

app.post("/", function (req, res) {
  let fName = req.body.fName;
  let email = req.body.email;
  let pass = req.body.pass;
  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
        },
      },
    ],
  };

  let jsonData = JSON.stringify(data);
  console.log(jsonData);
  let url = "https://us9.api.mailchimp.com/3.0/lists/2b82c49dfc";
  let options = {
    method: "POST",
    auth: "soldour:02e80d40922ca8b5600cc7e63729546d-us9",
  };

  const request = https.request(url, options, function (responce) {
    if (responce.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    responce.on("data", function (data) {
      //   console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  //   let allInput = "<h1 style='color:blue; font-size: 100px'>" + fName + "</h1>" + " <h1 style='color:red'>" + email + "</h1>" + pass;
  //   res.send(`<h1>The reuslt is ${allInput}</h1>`);
});

app.post("/success", function (req, res) {
  res.redirect("/");
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Server listning to port 3000!");
});

//02e80d40922ca8b5600cc7e63729546d-us9
// 2b82c49dfc
