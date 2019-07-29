const express = require("express");
const functions = require("firebase-functions");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
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

app.get("/timestamp", (req, res) => {
  cors(req, res, () => {
    res.send(`${Date.now()}`);
    const msg = {
      from: "quote@crescon.org",
      templateId: "d-03b9053572554e1491f2bd97047e957b",
      personalizations: [
        {
          to: [
            {
              email: "usama.ahmed@crescongroup.com"
            }
          ]
        }
      ]
    };
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log("quote email sent");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  });
});

app.post("/workwithus", (req, res) => {
  cors(req, res, () => {
    const user = req.body;
    console.log("user", user);
    const msg = {
      from: "careers@crescon.org",
      templateId: "d-03b9053572554e1491f2bd97047e957b",
      personalizations: [
        {
          to: [
            {
              email: "usama.ahmed@crescongroup.com"
            }
          ],
          dynamic_template_data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            position: user.position,
            message: user.message
          }
        }
      ]
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("contact email sent");
        res.statusCode = 200;
        res.send("success!");
      })
      .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.send(err);
      });
  });
});

app.post("/quote", (req, res) => {
  cors(req, res, () => {
    const user = req.body;
    console.log("user", user);
    const msg = {
      from: "rfq@crescon.org",
      templateId: "d-a49142de9dce4d8b9c9ad1f5e1f37b7a",
      personalizations: [
        {
          to: [
            {
              email: "usama.ahmed@crescongroup.com"
            }
          ],
          dynamic_template_data: {
            name: user.qname,
            email: user.qemail,
            phone: user.qphone,
            company: user.company,
            work: user.work,
            details: user.details
          }
        }
      ]
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("quote email sent");
        res.statusCode = 200;
        res.send("success!");
      })
      .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.send(err);
      });
  });
});

exports.app = functions.https.onRequest(app);
