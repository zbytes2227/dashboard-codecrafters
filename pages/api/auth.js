import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { serialize } from "cookie";
import Customers from "@/model/Customers";

const handler = async (req, res) => {
  if (req.method == 'GET') {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.user_access_token;

    try {
      let decoded = await jwt.verify(token, process.env.TOKEN_ADMIN);
      let user = await Customers.findOne({ _id: decoded._id });

      if (!user) {
        return res.status(400).json({ success: false, msg: "User Not Found" });
      }

        let decodedx = {
          id: user.CustomerID,
          branch: user.CustomerBranch
        };
        return res.status(200).json({ success: true, msg: "send", user_details: decodedx });
      
    } catch (err) {
      // Handle token verification errors
      return res.status(400).json({ success: false, msg: "User Invalid" });
    }
  }
}

export default connectDb(handler);