const sgMail = require("@sendgrid/mail");
const sendgridAPIKey =
  "SG.RrrEnmISQVGZFNBgQCSSoA.cRqgIR1juMDY5f2QMR82GOYaRq27oCIroRaPGNUIFcU";

sgMail.setApiKey(sendgridAPIKey);

const sendWelocomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ramsar7002@gmail.com",
    subject: `Thanks for joining in!`,
    text: `Welcome to the app, ${name}. let me now how you get along with the app.`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ramsar7002@gmail.com",
    subject: `We’re sorry to see you leave ${name}!`,
    text: `Hope to see you soon, ${name}. We would like to hear from you why did you leave us.`,
  });
};

module.exports = {
  sendWelocomeEmail,
  sendCancelEmail,
};
