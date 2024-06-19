import Products from "@/model/Products";
import { parse } from "cookie"; import jwt from "jsonwebtoken";
import connectDb from "../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.user_access_token;
      let decoded = await jwt.verify(token, process.env.TOKEN_ADMIN);
      if (!decoded._id == process.env.ADMIN_PASSWORD) {
        return res
          .status(403)
          .json({ success: false, errors: "Unable to Authenticate" });
      }


      const productBranch = req.body.branch;
      const productSemester = req.body.semester;
      console.log('Product Branch:', productBranch);
      console.log('Product Semester:', productSemester);
      // Find the card in the database based on the provided cardid
      const foundProduct = await Products.find({ ProductSemester: productSemester, ProductBranch: productBranch });

      if (!foundProduct) {
        return res.status(404).json({ success: false, msg: "Product not found." });
      }

      // Return the details of the found card as a JSON response
      return res.status(200).json({ success: true, Product: foundProduct });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: "Server error. Contact the Developers." });
    }
  } else if (req.method === "GET") {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.admin_access_token;
      let decoded = await jwt.verify(token, process.env.TOKEN_ADMIN);
      if (!decoded._id == process.env.ADMIN_PASSWORD) {
        return res
          .status(403)
          .json({ success: false, errors: "Unable to Authenticate" });
      }
      // Find all cards in the database
      const allCards = await Products.find({});

      // Return the found cards as a JSON response
      return res.status(200).json({ success: true, products: allCards });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: "Server error. Contact the Developers." });
    }
  }

};

export default connectDb(handler);
