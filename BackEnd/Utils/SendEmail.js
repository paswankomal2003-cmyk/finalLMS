//  here we are using node mailers to send email.

import nodemailer from 'nodemailer'


const sendEmail = async(email,subject,message)=>{

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "kylee.herzog@ethereal.risebuildings.com",
      pass: "fh2BvWGe6vu1JpTuFS",
    },
  }); 

  console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from:email , // sender address
      to: "aarti1223334444@gmail.com", // list of receivers
      subject: subject, // Subject line
      text:message, // plain text body
      html: message, // html body
    });
  
    console.log("Message sent: %s", email);
    // Message sent:<d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

main().catch(console.error);
}

export default sendEmail


// async.. await is not allowed in global scope, must use a wrapper


