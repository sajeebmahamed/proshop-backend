const dotenv = require("dotenv");

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = (body, to) => {
   return client.messages
      .create({
         body,
         from: process.env.TWILIO_PHONE_NUMBER,
         to,
      })
      .then((message) => console.log(message.sid));
};
