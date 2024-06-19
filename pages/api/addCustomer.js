import Customers from "@/model/Customers";
import connectDb from "../../middleware/mongoose";
import { parse } from "cookie";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

// Function to generate customer ID in series
const generateCustomerID = async () => {
  try {
    const highestCustomer = await Customers.findOne({}, { CustomerID: 1 }).sort({ CustomerID: -1 });
    let nextID;
    if (highestCustomer) {
      const highestIDNumber = parseInt(highestCustomer.CustomerID.slice(1));
      nextID = `C${(highestIDNumber + 1).toString().padStart(3, "0")}`;
    } else {
      nextID = "C001";
    }
    return nextID;
  } catch (error) {
    throw new Error("Error generating customer ID");
  }
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      console.log(req.body);

      const email = await Customers.findOne({ CustomerEmail: req.body.CustomerEmail });
      if (email) {
          return res
              .status(400)
              .json({ success: false, msg: "This email is already registered, try login." });
      }

      // Generate the next customer ID
      const nextCustomerID = await generateCustomerID();
      const hashedPassword = await argon2.hash(req.body.CustomerPassword);

      const newCard = new Customers({
        CustomerID: nextCustomerID,
        CustomerName: req.body.CustomerName,
        CustomerPhone: req.body.CustomerPhone,
        CustomerEmail: req.body.CustomerEmail,
        CustomerBranch: req.body.CustomerBranch,
        CustomerCollege: req.body.CustomerCollege,
        Password: hashedPassword
      });

      await newCard.save();

      const fetch_api = await fetch("https://script.google.com/macros/s/AKfycbwy0HfRtY6VF9Xmkby60OJyJAqi_7HIn7T_IssuRua1N1iJAnVBukYO94t-74NMhViVFg/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: req.body.CustomerName,
          email: req.body.CustomerEmail,
          message: req.body.CustomerBranch,
        }),
      });
      const datas = await fetch_api;
      console.log("okay");
      const token = jwt.sign({ _id: process.env.ADMIN_USERNAME }, process.env.TOKEN_ADMIN, { expiresIn: "48h" });
      return res.setHeader('Set-Cookie', serialize('user_access_token', token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: '/',
      })).status(200).json({ success: true, msg: `${nextCustomerID} - Student Added Successfully.` });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, msg: "Server error. Contact the Developers." });
    }
  }
};

export default connectDb(handler);