import {
  findByUsernameService,
  findByIdService,
  updateAvatarService,
  deleteAvatarService,
  updateDescriptionService,
  updatePasswordService,
  eraseService,
} from "../services/user.service.js";

export const findByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await findByUsernameService(username);

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;

    if (!avatar) {
      res.status(400).send({ message: "Submit Avatar" });
    }

    await updateAvatarService(id, avatar);

    res.send({ message: "Avatar successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteAvatarService(id);

    res.send({ message: "Avatar successfully deleted!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      res.status(400).send({ message: "Submit Description" });
    }
    if (description.length <= 5) {
      res.status(400).send({ message: "Description must have a minimum of 5 characters." });
    }

    await updateDescriptionService(id, description.trim());

    res.send({ message: "Description successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, repeatPassword } = req.body;

    if (!oldPassword || !newPassword || !repeatPassword) {
      res.status(400).send({ message: "Please provide old password, new password, and repeat password." });
    }

    const user = await findByIdService(id);
    const isPasswordCorrect = await comparePasswords(oldPassword, user.password);

    if (!isPasswordCorrect) {
      res.status(401).send({ message: "Old password is incorrect." });
    }

    if (newPassword.length < 8 || oldPassword.length < 8 || repeatPassword.length < 8) {
      res.status(400).send({ message: "Passwords must have a minimum of 8 characters." });
    }

    if (newPassword !== repeatPassword) {
      res.status(400).send({ message: "Passwords must be the same." });
    }

    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialChars.test(newPassword) || !specialChars.test(repeatPassword)) {
      res.status(400).send({ message: "The passwords must contain at least one special character." });
    }

    await updatePasswordService(id, newPassword.trim(), repeatPassword.trim());

    res.send({ message: "Password successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await eraseService(id);

    if (!user) {
      res.status(404).send({ message: "User not found." });
    }

    res.send({ message: "User successfully deleted!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
