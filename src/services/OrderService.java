package com.aitestgen.services;

import java.util.ArrayList;
import java.util.List;

public class OrderService {
    private List<Order> orders = new ArrayList<>();

    public static class Order {
        public String id;
        public double amount;
        public String status;

        public Order(String id, double amount) {
            this.id = id;
            this.amount = amount;
            this.status = "PENDING";
        }
    }

    public Order createOrder(String id, double amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
        Order order = new Order(id, amount);
        orders.add(order);
        return order;
    }

    public boolean processOrder(String id) {
        for (Order order : orders) {
            if (order.id.equals(id)) {
                if (order.amount > 1000) {
                    order.status = "REQUIRES_APPROVAL";
                    return false;
                }
                order.status = "COMPLETED";
                return true;
            }
        }
        return false;
    }

    public double calculateTotal() {
        return orders.stream()
                .filter(o -> o.status.equals("COMPLETED"))
                .mapToDouble(o -> o.amount)
                .sum();
    }
}
