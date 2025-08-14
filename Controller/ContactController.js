const nodemailer = require("nodemailer");
const {
  contactValidationSchema,
  ContactModel,
} = require("../Models/ContactModel");
const  EnviroModel  = require("../Models/EnviroModel");

module.exports.ContactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const { error } = contactValidationSchema.validate({
      name,
      email,
      message,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newContact = new ContactModel({ name, email, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📬 New Contact Message from ${name}`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background: #f9f9f9; max-width: 600px; margin: auto;">
      <h2 style="color: #2c3e50;">📩 New Contact Form Submission</h2>
      <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 16px; color: #333;"><strong>Message:</strong></p>
      <div style="background: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ccc; font-size: 15px; color: #555;">
        ${message}
      </div>
      <hr style="margin-top: 30px;">
      <footer style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
        This message was sent via your website's contact form.
      </footer>
    </div>
  `,
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Contact entry created and email sent successfully" });
  } catch (error) {
    console.error("Error creating contact entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.enviroController = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Save contact entry to DB
    const newContact = new EnviroModel({
      name,
      email,
      phone,
      subject,
      message,
    });
    await newContact.save();

    // Nodemailer transporter (your Gmail + App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail for sending
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    // Send to the Enviro owner's Gmail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ENVIRO_OWNER_EMAIL, // 👈 store owner's email in .env
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background: #f9f9f9; max-width: 600px; margin: auto;">
          <h2 style="color: #2c3e50;">📩 New Contact Form Submission</h2>
          <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; color: #333;"><strong>Phone:</strong> ${phone}</p>
          <p style="font-size: 16px; color: #333;"><strong>Subject:</strong> ${subject}</p>
          <p style="font-size: 16px; color: #333;"><strong>Message:</strong></p>
          <div style="background: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ccc; font-size: 15px; color: #555;">
            ${message}
          </div>
          <hr style="margin-top: 30px;">
          <footer style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
            This message was sent via your website's contact form.
          </footer>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({
        message: "Contact entry created and email sent to owner successfully",
      });
  } catch (error) {
    console.error("Error creating contact entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
