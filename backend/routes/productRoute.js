const express =  require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails,  } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Routes
router.route("/products").get(isAuthenticatedUser,authorizeRoles("admin"), getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,createProduct);
router.route("/product/:id").put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct).get(isAuthenticatedUser,getProductDetails)

module.exports  = router