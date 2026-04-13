package com.aitestgen.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.*;
import java.util.stream.Collectors;

public class OrderServiceTest {
    @Test
    void triggerCoverage() {
        // This is a placeholder to trigger Jacoco reporting
        OrderService service = new OrderService();
        assertNotNull(service);
    }

    @Test
    void testCreateOrder() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        Order order = service.createOrder("John Doe", products);
        assertNotNull(order);
        assertEquals("John Doe", order.getCustomerName());
        assertEquals(2, order.getProducts().size());
        assertTrue(order.getProducts().contains("LAPTOP"));
        assertTrue(order.getProducts().contains("PHONE"));
    }

    @Test
    void testCreateOrderWithInvalidCustomerName() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        assertThrows(IllegalArgumentException.class, () -> service.createOrder(null, products));
        assertThrows(IllegalArgumentException.class, () -> service.createOrder("", products));
        assertThrows(IllegalArgumentException.class, () -> service.createOrder("   ", products));
    }

    @Test
    void testCreateOrderWithEmptyProducts() {
        OrderService service = new OrderService();
        assertThrows(IllegalArgumentException.class, () -> service.createOrder("John Doe", null));
        assertThrows(IllegalArgumentException.class, () -> service.createOrder("John Doe", new ArrayList<>()));
    }

    @Test
    void testCalculateDiscount() {
        OrderService service = new OrderService();
        double amount = 1000;
        String customerName = "John Doe";
        double discount = service.calculateDiscount(amount, customerName);
        assertEquals(0, discount, 0.01);
    }

    @Test
    void testCalculateDiscountWithLoyalCustomer() {
        OrderService service = new OrderService();
        String customerName = "John Doe";
        for (int i = 0; i < 6; i++) {
            service.createOrder(customerName, Arrays.asList("LAPTOP"));
        }
        double amount = 1000;
        double discount = service.calculateDiscount(amount, customerName);
        assertEquals(150, discount, 0.01);
    }

    @Test
    void testCalculateDiscountWithReturningCustomer() {
        OrderService service = new OrderService();
        String customerName = "John Doe";
        for (int i = 0; i < 3; i++) {
            service.createOrder(customerName, Arrays.asList("LAPTOP"));
        }
        double amount = 1000;
        double discount = service.calculateDiscount(amount, customerName);
        assertEquals(50, discount, 0.01);
    }

    @Test
    void testCalculateDiscountWithBulkOrder() {
        OrderService service = new OrderService();
        double amount = 2500;
        String customerName = "John Doe";
        double discount = service.calculateDiscount(amount, customerName);
        assertEquals(250, discount, 0.01);
    }

    @Test
    void testGetOrdersByCustomer() {
        OrderService service = new OrderService();
        String customerName = "John Doe";
        service.createOrder(customerName, Arrays.asList("LAPTOP"));
        service.createOrder(customerName, Arrays.asList("PHONE"));
        List<OrderService.Order> orders = service.getOrdersByCustomer(customerName);
        assertEquals(2, orders.size());
    }

    @Test
    void testCancelOrder() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        Order order = service.createOrder("John Doe", products);
        assertTrue(service.cancelOrder(order.getId()));
    }

    @Test
    void testCancelOrderWithInvalidOrderId() {
        OrderService service = new OrderService();
        assertFalse(service.cancelOrder("invalid-id"));
    }

    @Test
    void testCancelOrderAfter24Hours() throws InterruptedException {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        Order order = service.createOrder("John Doe", products);
        Thread.sleep(24 * 60 * 60 * 1000 + 1); // sleep for 24 hours and 1 millisecond
        assertFalse(service.cancelOrder(order.getId()));
    }

    @Test
    void testGetTotalRevenue() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        service.createOrder("John Doe", products);
        double totalRevenue = service.getTotalRevenue();
        assertEquals(2000, totalRevenue, 0.01);
    }

    @Test
    void testCreateOrderWithMultipleProducts() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE", "TABLET");
        Order order = service.createOrder("John Doe", products);
        assertNotNull(order);
        assertEquals("John Doe", order.getCustomerName());
        assertEquals(3, order.getProducts().size());
        assertTrue(order.getProducts().contains("LAPTOP"));
        assertTrue(order.getProducts().contains("PHONE"));
        assertTrue(order.getProducts().contains("TABLET"));
    }

    @Test
    void testCreateOrderWithUnknownProduct() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "UNKNOWN");
        Order order = service.createOrder("John Doe", products);
        assertNotNull(order);
        assertEquals("John Doe", order.getCustomerName());
        assertEquals(1, order.getProducts().size());
        assertTrue(order.getProducts().contains("LAPTOP"));
    }

    @Test
    void testGetOrdersByCustomerWithNoOrders() {
        OrderService service = new OrderService();
        String customerName = "John Doe";
        List<OrderService.Order> orders = service.getOrdersByCustomer(customerName);
        assertEquals(0, orders.size());
    }

    @Test
    void testGetTotalRevenueWithNoOrders() {
        OrderService service = new OrderService();
        double totalRevenue = service.getTotalRevenue();
        assertEquals(0, totalRevenue, 0.01);
    }

    @Test
    void testCancelOrderWithOrderIdThatDoesNotExist() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        service.createOrder("John Doe", products);
        assertFalse(service.cancelOrder("non-existent-id"));
    }

    @Test
    void testCreateOrderWithSameCustomerMultipleTimes() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        service.createOrder("John Doe", products);
        service.createOrder("John Doe", products);
        List<OrderService.Order> orders = service.getOrdersByCustomer("John Doe");
        assertEquals(2, orders.size());
    }

    @Test
    void testCalculateDiscountWithMultipleDiscounts() {
        OrderService service = new OrderService();
        String customerName = "John Doe";
        for (int i = 0; i < 6; i++) {
            service.createOrder(customerName, Arrays.asList("LAPTOP"));
        }
        double amount = 2500;
        double discount = service.calculateDiscount(amount, customerName);
        assertEquals(475, discount, 0.01);
    }

    @Test
    void testCreateOrderWithMultipleUnknownProducts() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "UNKNOWN1", "UNKNOWN2");
        Order order = service.createOrder("John Doe", products);
        assertNotNull(order);
        assertEquals("John Doe", order.getCustomerName());
        assertEquals(1, order.getProducts().size());
        assertTrue(order.getProducts().contains("LAPTOP"));
    }

    @Test
    void testGetOrdersByCustomerWithMultipleCustomers() {
        OrderService service = new OrderService();
        String customerName1 = "John Doe";
        String customerName2 = "Jane Doe";
        service.createOrder(customerName1, Arrays.asList("LAPTOP"));
        service.createOrder(customerName2, Arrays.asList("PHONE"));
        List<OrderService.Order> orders1 = service.getOrdersByCustomer(customerName1);
        List<OrderService.Order> orders2 = service.getOrdersByCustomer(customerName2);
        assertEquals(1, orders1.size());
        assertEquals(1, orders2.size());
    }

    @Test
    void testGetTotalRevenueWithMultipleOrders() {
        OrderService service = new OrderService();
        List<String> products1 = Arrays.asList("LAPTOP", "PHONE");
        List<String> products2 = Arrays.asList("TABLET", "MONITOR");
        service.createOrder("John Doe", products1);
        service.createOrder("Jane Doe", products2);
        double totalRevenue = service.getTotalRevenue();
        assertEquals(3550, totalRevenue, 0.01);
    }

    @Test
    void testCancelOrderWithMultipleOrders() {
        OrderService service = new OrderService();
        List<String> products1 = Arrays.asList("LAPTOP", "PHONE");
        List<String> products2 = Arrays.asList("TABLET", "MONITOR");
        Order order1 = service.createOrder("John Doe", products1);
        Order order2 = service.createOrder("Jane Doe", products2);
        assertTrue(service.cancelOrder(order1.getId()));
        assertFalse(service.cancelOrder(order1.getId()));
        assertTrue(service.cancelOrder(order2.getId()));
    }

    @Test
    void testGetTotalRevenueAfterCancellation() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        Order order = service.createOrder("John Doe", products);
        service.cancelOrder(order.getId());
        double totalRevenue = service.getTotalRevenue();
        assertEquals(0, totalRevenue, 0.01);
    }

    @Test
    void testGetOrdersByCustomerAfterCancellation() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        Order order = service.createOrder("John Doe", products);
        service.cancelOrder(order.getId());
        List<OrderService.Order> orders = service.getOrdersByCustomer("John Doe");
        assertEquals(0, orders.size());
    }

    @Test
    void testCreateOrderWithSameProductMultipleTimes() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "LAPTOP");
        Order order = service.createOrder("John Doe", products);
        assertNotNull(order);
        assertEquals("John Doe", order.getCustomerName());
        assertEquals(1, order.getProducts().size());
        assertTrue(order.getProducts().contains("LAPTOP"));
    }

    @Test
    void testCalculateDiscountWithZeroAmount() {
        OrderService service = new OrderService();
        double amount = 0;
        String customerName = "John Doe";
        double discount = service.calculateDiscount(amount, customerName);
        assertEquals(0, discount, 0.01);
    }

    @Test
    void testGetTotalRevenueWithZeroAmount() {
        OrderService service = new OrderService();
        List<String> products = Arrays.asList("LAPTOP", "PHONE");
        Order order = service.createOrder("John Doe", products);
        order.setTotalAmount(0);
        double totalRevenue = service.getTotalRevenue();
        assertEquals(0, totalRevenue, 0.01);
    }
}