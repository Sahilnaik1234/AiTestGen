package com.aitestgen.services;

import java.util.*;
import java.util.stream.Collectors;

/**
 * OrderService - A services class to test AI Test Generation.
 * This class contains business logic for processing orders, calculating discounts,
 * and managing inventory status.
 */
public class OrderService {

    private final Map<String, Double> productPrices = new HashMap<>();
    private final List<Order> orderHistory = new ArrayList<>();

    public OrderService() {
        // Initialize with dummy data
        productPrices.put("LAPTOP", 1200.0);
        productPrices.put("PHONE", 800.0);
        productPrices.put("TABLET", 450.0);
        productPrices.put("MONITOR", 300.0);
        productPrices.put("KEYBOARD", 50.0);
    }

    public Order createOrder(String customerName, List<String> products) {
        if (customerName == null || customerName.trim().isEmpty()) {
            throw new IllegalArgumentException("Customer name cannot be empty");
        }
        if (products == null || products.isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one product");
        }

        double totalAmount = 0;
        List<String> validProducts = new ArrayList<>();

        for (String product : products) {
            if (productPrices.containsKey(product)) {
                totalAmount += productPrices.get(product);
                validProducts.add(product);
            }
        }

        double discount = calculateDiscount(totalAmount, customerName);
        double finalAmount = totalAmount - discount;

        Order order = new Order(
            UUID.randomUUID().toString(),
            customerName,
            validProducts,
            totalAmount,
            discount,
            finalAmount,
            new Date()
        );

        orderHistory.add(order);
        return order;
    }

    private double calculateDiscount(double amount, String customerName) {
        double discount = 0;

        // Loyalty discount
        long previousOrders = orderHistory.stream()
            .filter(o -> o.getCustomerName().equals(customerName))
            .count();

        if (previousOrders > 5) {
            discount += amount * 0.15; // 15% for loyal customers
        } else if (previousOrders > 2) {
            discount += amount * 0.05; // 5% for returning customers
        }

        // Seasonal bulk discount
        if (amount > 2000) {
            discount += amount * 0.10; // Extra 10% for large orders
        }

        return discount;
    }

    public List<Order> getOrdersByCustomer(String customerName) {
        return orderHistory.stream()
            .filter(o -> o.getCustomerName().equalsIgnoreCase(customerName))
            .collect(Collectors.toList());
    }

    public boolean cancelOrder(String orderId) {
        Optional<Order> order = orderHistory.stream()
            .filter(o -> o.getId().equals(orderId))
            .findFirst();

        if (order.isPresent()) {
            Order o = order.get();
            if (isOrderEligibleForCancellation(o)) {
                return orderHistory.remove(o);
            }
        }
        return false;
    }

    private boolean isOrderEligibleForCancellation(Order order) {
        long diffInMillies = Math.abs(new Date().getTime() - order.getCreatedAt().getTime());
        long diffInHours = diffInMillies / (60 * 60 * 1000);
        
        // Orders can only be cancelled within 24 hours
        return diffInHours < 24;
    }

    public double getTotalRevenue() {
        return orderHistory.stream()
            .mapToDouble(Order::getFinalAmount)
            .sum();
    }

    // Inner DTO Class
    public static class Order {
        private final String id;
        private final String customerName;
        private final List<String> products;
        private final double totalAmount;
        private final double discount;
        private final double finalAmount;
        private final Date createdAt;

        public Order(String id, String customerName, List<String> products, 
                     double totalAmount, double discount, double finalAmount, Date createdAt) {
            this.id = id;
            this.customerName = customerName;
            this.products = products;
            this.totalAmount = totalAmount;
            this.discount = discount;
            this.finalAmount = finalAmount;
            this.createdAt = createdAt;
        }

        public String getId() { return id; }
        public String getCustomerName() { return customerName; }
        public List<String> getProducts() { return products; }
        public double getTotalAmount() { return totalAmount; }
        public double getDiscount() { return discount; }
        public double getFinalAmount() { return finalAmount; }
        public Date getCreatedAt() { return createdAt; }
    }
}
