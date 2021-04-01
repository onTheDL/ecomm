const express = require("express");
const cartsRepo = require("../repositories/carts");

const router = express.Router();

// Receive a POST request to add an item to a cart
router.post("/cart/products", async (req, res) => {
  // Identify the cart
  let cart;
  if (!req.session.cartId) {
    // cart doesn't exist --> need to create one
    // store cart id in req.session.cartId property

    cart = await cartsRepo.create({ items: [] });

    req.session.cartId = cart.id;
  } else {
    // we have a cart --> get from repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  console.log(cart)
  // Either increment quantity of existing product, OR add new product to items array

  res.send("Product added to cart");
});

// Receive a GET request to show all items in cart

// Receive a POST request to delete an item from a cart

module.exports = router;
