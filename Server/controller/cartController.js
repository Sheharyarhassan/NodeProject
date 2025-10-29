const {Cart} = require('../models/cartModels');
const {Book} = require("../models/booksModels");

const AddToCartGuest = async (req, res) => {
  const guestId = req.cookies.guestId;
  const {bookId, quantity} = req.body;
  if (!bookId || !quantity) {
    return res.status(400).json({message: "Book ID and quantity are required."});
  }
  try {
    let cart = await Cart.findOne({guestId});
    if (!cart) {
      cart = new Cart({guestId, item: []});
    }
    const existingItemIndex = cart.item.findIndex(items => items.book.toString() === bookId);
    if (existingItemIndex > -1) {
      cart.item[existingItemIndex].quantity += quantity;
    } else {
      cart.item.push({book: bookId, quantity});
    }
    await cart.save();
    res.status(200).json("Item added cart");
  } catch (err) {
    res.status(500).json(err);
  }
}
const AddToCartUser = async (req, res) => {
  const userId = req.body.userId;
  const {bookId, quantity} = req.body;
  if (!bookId || !quantity) {
    return res.status(400).json({message: "Book ID and quantity are required."});
  }
  try {
    let cart = await Cart.findOne({userId});
    if (!cart) {
      cart = new Cart({userId, item: []});
    }
    const existingItemIndex = cart.item.findIndex(items => items.book.toString() === bookId);
    if (existingItemIndex > -1) {
      cart.item[existingItemIndex].quantity += quantity;
    } else {
      cart.item.push({book: bookId, quantity});
    }
    await cart.save();
    res.status(200).json("Item added cart");
  } catch (err) {
    res.status(500).json(err);
  }
}
const getCart = async (req, res) => {
  const userId = req.params.userId;
  const guestId = req.cookies.guestId;

  try {
    const filter = userId ? {userId} : {guestId};
    const cart = await Cart.findOne(filter).populate('item.book');
    if (!cart) {
      return res.status(200).json({cart: {items: []}});
    }
    res.status(200).json({cart});
  } catch (err) {
    res.status(500).json({message: "Error fetching cart", error: err.message});
  }
};
const removeItem = async (req, res) => {
  const userId = req.params.userId;
  const guestId = req.cookies.guestId;
  const itemId = req.query.itemId;
  if (!itemId) {
    return res.status(400).json({message: 'Item ID is required'});
  }
  try {
    const filter = userId ? {userId} : {guestId};
    const cart = await Cart.findOneAndUpdate(filter, {$pull: {item: {_id: itemId}}}, {new: true}).populate('item.book');
    if (!cart) {
      return res.status(404).json({message: 'Cart not found'});
    }
    res.status(200).json({message: 'Item removed successfully'});
  } catch (err) {
    res.status(500).json({message: "Error fetching cart", error: err.message});
  }
};
const checkOut = async (req, res) => {
  const {userId} = req.user;
  try {
    const cart = await Cart.findOne({userId: userId})
    if (!cart) {
      return res.status(404).json({message: 'Cart not found'});
    }
    for (const cartItem of cart.item) {
      const updatedBook = await Book.findOneAndUpdate(
        {_id: cartItem.book, quantity: {$gt: 0}},
        {$inc: {quantity: -cartItem.quantity}},
        {new: true}
      );

      if (!updatedBook) {
        return res.status(400).json({
          message: `Book ${cartItem.book} not found or out of stock`,
        });
      }
    }
    res.status(200).json({message: 'Your order is Confirmed'});
  } catch (err) {
    res.status(500).json({message: err})
  }
}
module.exports = {AddToCartGuest, AddToCartUser, getCart, removeItem, checkOut}