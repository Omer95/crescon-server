const express = require("express");
const functions = require("firebase-functions");
const bodyParser = require("body-parser");
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);
const admin = require("firebase-admin");
admin.initializeApp();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.get("/timestamp", (req, res) => {
//   res.send(`${Date.now()}`);
//   const msg = {
//     from: "quote@crescon.org",
//     templateId: "d-03b9053572554e1491f2bd97047e957b",
//     personalizations: [
//       {
//         to: [
//           {
//             email: "omerfarooqali@gmail.com"
//           }
//         ]
//       }
//     ]
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("quote email sent");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

app.post("/timestamp", (req, res) => {
  const username = req.name;
  console.log(username);
  const msg = {
    from: "quote@crescon.org",
    templateId: "d-03b9053572554e1491f2bd97047e957b",
    personalizations: [
      {
        to: [
          {
            email: "omerfarooqali@gmail.com"
          }
        ],
        dynamic_template_data: {
          name: username
        }
      }
    ]
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("quote email sent");
    })
    .catch(err => {
      console.log(err);
    });
});

exports.app = functions.https.onRequest(app);
