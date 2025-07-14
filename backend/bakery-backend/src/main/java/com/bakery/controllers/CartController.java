package com.bakery.controllers;

import com.bakery.models.CartItem;
import com.bakery.models.Product;
import com.bakery.models.User;
import com.bakery.repositories.CartItemRepository;
import com.bakery.repositories.ProductRepository;
import com.bakery.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all cart items for a user
    @GetMapping("/{username}")
    public List<CartItem> getCartItems(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        return cartItemRepository.findByUser(user);
    }

    // ✅ Add item to cart
    @PostMapping("/add")
    public CartItem addToCart(@RequestParam String username, @RequestParam Long productId, @RequestParam int quantity) {
        User user = userRepository.findByUsername(username);
        Product product = productRepository.findById(productId).orElse(null);

        if (user == null || product == null) {
            throw new RuntimeException("User or Product not found");
        }

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

    // ✅ Remove item from cart
    @DeleteMapping("/remove/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartItemRepository.deleteById(id);
    }

    // ✅ Clear all items for a user (optional)
    @DeleteMapping("/clear/{username}")
    public void clearCart(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        List<CartItem> items = cartItemRepository.findByUser(user);
        cartItemRepository.deleteAll(items);
    }
}
