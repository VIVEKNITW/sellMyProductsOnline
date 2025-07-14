package com.bakery.controllers;

import com.bakery.models.CartItem;
import com.bakery.models.Order;
import com.bakery.models.User;
import com.bakery.repositories.CartItemRepository;
import com.bakery.repositories.OrderRepository;
import com.bakery.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    // ✅ Get all orders for a user
    @GetMapping("/{username}")
    public List<Order> getOrders(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        return orderRepository.findByUser(user);
    }

    // ✅ Place an order (creates a new order from user's cart)
    @PostMapping("/place")
    public Order placeOrder(@RequestParam String username, @RequestParam String deliveryAddress) {
        User user = userRepository.findByUsername(username);
        List<CartItem> cartItems = cartItemRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty. Add items first.");
        }

        double totalPrice = cartItems.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();

        Order order = new Order();
        order.setUser(user);
        order.setItems(cartItems);
        order.setDeliveryAddress(deliveryAddress);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        // Clear user's cart
        cartItemRepository.deleteAll(cartItems);

        return savedOrder;
    }
}
