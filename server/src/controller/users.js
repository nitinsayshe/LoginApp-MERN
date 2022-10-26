const User = require("../models/user");
const Token = require("../models/token");
const { sendMail } = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// zlwxjjdxvcgbhfaz
exports.registerUser = async (req, res) => {
	try {
		let { email, password } = req.body
		let user = await User.findOne({ email: email });
		if (user) return res.status(409).send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();

		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendMail(user.email, "Verify Email", url);

		res.status(201).send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.verifyEmail = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.loginUser = async (req, res) => {
	try {
		let { email, password } = req.body
		const user = await User.findOne({ email: email });
		if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
				await sendMail(user.email, "Verify Email", url);
			}

			return res.status(400).send({ message: "An Email sent to your account please verify" });
		}
		const token = jwt.sign({ _id: user._id,user:email }, process.env.JWTKEY, {
			expiresIn: "7d",
		});
		res.status(200).send({ data: {token,email}, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};
