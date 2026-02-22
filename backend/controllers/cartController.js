import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

export const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    const { id } = req.user;
    const menuItem = await Menu.findById(menuId);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuId, quantity });
    }

    await cart.save();
    res
      .status(200)
      .json({ message: "Item added to cart", success: true, cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json({ cart, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuId } = req.params;

    const cart = await Cart.findOne({ user: id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuId
    );
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuId } = req.params;
    const { quantity } = req.body;

    const parsedQuantity = Number(quantity);
    if (!Number.isFinite(parsedQuantity)) {
      return res
        .status(400)
        .json({ message: "Invalid quantity", success: false });
    }

    const cart = await Cart.findOne({ user: id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in cart", success: false });
    }

    if (parsedQuantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = parsedQuantity;
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", success: true, cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// 🔹 Merge guest cart into user cart
export const mergeGuestCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items to merge", success: false });
    }

    let userCart = await Cart.findOne({ user: id });
    if (!userCart) {
      userCart = new Cart({ user: id, items: [] });
    }

    // Merge each guest item into user cart
    for (const guestItem of items) {
      const menuId = guestItem.menuItem._id;
      const quantity = guestItem.quantity;

      // Check if menu item exists
      const menuItem = await Menu.findById(menuId);
      if (!menuItem) {
        console.log(`Menu item ${menuId} not found, skipping`);
        continue;
      }

      // Find if item already exists in user cart
      const existingItem = userCart.items.find(
        (item) => item.menuItem.toString() === menuId
      );

      if (existingItem) {
        // Add to existing quantity
        existingItem.quantity += quantity;
      } else {
        // Add as new item
        userCart.items.push({ menuItem: menuId, quantity });
      }
    }

    await userCart.save();
    res.status(200).json({ 
      message: "Guest cart merged successfully", 
      success: true, 
      cart: userCart 
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};
