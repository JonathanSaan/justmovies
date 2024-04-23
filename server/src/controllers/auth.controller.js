import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { loginService, generateTokenService, createService, findByUsernameService, findByEmailService, validateService } from "../services/auth.service.js";
import { updatePasswordService } from "../services/user.service.js";
import transporter from "../helpers/sendEmail.js";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!email && !password) {
      return res.status(400).send({ message: "Fill in all the fields" });
    }
  
    if (!email || !email.length) {
      return res.status(400).send({ message: "Email is required" });
    }
  
    if (!password || !password.length) {
      return res.status(400).send({ message: "Password is required" });
    }
    
    if (!password || password.length < 8) {
      return res.status(400).send({ message: "Password must have at least 8 characters" });
    }
    
    const user = await loginService(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(404).send({ message: "User or Password not found" });
    }

    const token = generateTokenService(user.id, "24hr");

    res.send({
      user: {
        id: user._id,
        username: user.username,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, repeatPassword } = req.body;

    if ( !username || !email || !password || !repeatPassword ) {
      return res.status(400).send({ message: "Fill in all the fields." });
    }
    
    if (username.length < 4) {
      return res.status(400).send({ message: "Username must have at least 4 characters." });
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).send({ message: "Username can only contain letters, numbers, underscores, and hyphens." });
    }
    
    if (password.length < 8 || repeatPassword.length < 8) {
      return res.status(400).send({ message: "Passwords must have at least 8 characters." });
    }
    
    if (password !== repeatPassword) {
      return res.status(400).send({ message: "Passwords must be the same." });
    }

    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialChars.test(password) || !specialChars.test(repeatPassword)) {
      return res.status(400).send({ message: "The password must contain at least one special character." });
    }
    
    const existingUsername = await findByUsernameService(username);
    if (existingUsername) {
      return res.status(400).send({ message: "Username is already in use. Please choose a different username." });
    }

    const existingEmail = await findByEmailService(email);
    if (existingEmail) {
      return res.status(400).send({ message: "Email is already in use. Please choose a different email." });
    }
    
    const user = await createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }

    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        username,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const recovery = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await findByEmailService(email);
    
    if (!email) {
      return res.status(400).send({ message: "Fill in the field" });
    }

    if (!user) {
      return res.status(400).send({ message: "This email is not registered in our system" });
    }
    
    const resetToken = generateTokenService(user.id, "1hr");
    
    const resetLink = `${process.env.SERVER_FRONT_URL}/reset-password/id=${user.id}/token=${resetToken}`;

    const mailOptions = {
      from: "justmovies <justmoviescontact@gmail.com>",
      to: email,
      subject: "Password Reset Request",
      text: `Dear ${user.username},\nWe have received a request to reset the password for your account. To proceed with the password recovery process, please click the link below:\n\n${resetLink}\n\nIf you did not initiate this change, please disregard this email. No changes will be made to your account.\n\nSincerely,\nSupport Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: "Password reset email sent" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { password, repeatPassword } = req.body;
    const { id, token } = req.params;

    await validateService(req, res, token);

    if ( !password || !repeatPassword ) {
      return res.status(400).send({ message: "Fill in all the fields." });
    }
    
    if (password !== repeatPassword) {
      return res.status(400).send({ message: "Passwords must be the same." });
    }

    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialChars.test(password) || !specialChars.test(repeatPassword)) {
      return res.status(400).send({ message: "The password must contain at least one special character." });
    }
    
	  if (password.length < 8 || repeatPassword.length < 8) {
      return res.status(400).send({ message: "Passwords must have at least 8 characters." });
    }

    await updatePasswordService(id, password.trim(), repeatPassword.trim());
    
    res.status(200).send({ message: "Password successfully updated!" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Session expired. Please repeat the protocol." });
    }
    res.status(500).send(err.message);
  }
}
