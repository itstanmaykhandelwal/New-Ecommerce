const express =  require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReview, deleteReview,  } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Routes
router.route("/products").get(getAllProducts);

router
    .route("/product/new")
    .post(isAuthenticatedUser,authorizeRoles("admin"),isAuthenticatedUser,createProduct);

router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
    
    router.route("/product/:id").get(getProductDetails);

    router.route("/review").put(isAuthenticatedUser,createProductReview);
    router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser,deleteReview)
    

module.exports  = router