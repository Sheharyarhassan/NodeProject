const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { userType, Signup } = require("../models/userModels");
require("dotenv").config();

const connectdb = async () => {
	try {
		await mongoose.connect(process.env.DB_URI).then(async () => {
			const userTypes = ["Admin", "User"];
			const totalSize = await userType.countDocuments();
			if (totalSize < 2) {
				for (const type of userTypes) {
					const exists = await userType.findOne({ name: type });
					if (!exists) {
						const newType = new userType({ name: type });
						await newType.save();
						console.log(`${type} userType created successfully`);
					}
				}
			} else {
				console.log("Skipping Seeding");
			}
			const adminType = await userType.findOne({ name: "Admin" });
			if (!adminType) {
				console.error("Admin userType not found, cannot create super admin.");
				return;
			}
			const sa = await Signup.findOne({
				userType: adminType._id,
				userName: "super",
			});
			if (!sa) {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash("Abc@1234", salt);
				const newAdmin = new Signup({
					name: "super",
					userName: "super",
					password: hashedPassword,
					userType: adminType._id,
					email: "super@admin.com",
				});
			} else {
				console.log("Super already exists");
			}
		});
		console.log("MongoDb connected....");
	} catch (err) {
		console.log("Error: " + err);
	}
};
module.exports = connectdb;
