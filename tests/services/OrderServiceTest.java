package com.aitestgen.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class OrderServiceTest {

    @Test
    public void testCreateOrderValidAmount() {
        OrderService orderService = new OrderService();
        Order order = orderService.createOrder("1", 100.0);
        assertNotNull(order);
        assertEquals("1", order.id);
        assertEquals(100.0, order.amount);
        assertEquals("PENDING", order.status);
    }

    @Test
    public void testCreateOrderNegativeAmount() {
        OrderService orderService = new OrderService();
        assertThrows(IllegalArgumentException.class, () -> orderService.createOrder("1", -100.0));
    }

    @Test
    public void testProcessOrderExistingOrder() {
        OrderService orderService = new OrderService();
        orderService.createOrder("1", 100.0);
        assertTrue(orderService.processOrder("1"));
        assertEquals("COMPLETED", orderService.orders.get(0).status);
    }

    @Test
    public void testProcessOrderExistingOrderRequiresApproval() {
        OrderService orderService = new OrderService();
        orderService.createOrder("1", 1001.0);
        assertFalse(orderService.processOrder("1"));
        assertEquals("REQUIRES_APPROVAL", orderService.orders.get(0).status);
    }

    @Test
    public void testProcessOrderNonExistingOrder() {
        OrderService orderService = new OrderService();
        assertFalse(orderService.processOrder("1"));
    }

    @Test
    public void testCalculateTotalNoOrders() {
        OrderService orderService = new OrderService();
        assertEquals(0.0, orderService.calculateTotal());
    }

    @Test
    public void testCalculateTotalOneCompletedOrder() {
        OrderService orderService = new OrderService();
        orderService.createOrder("1", 100.0);
        orderService.processOrder("1");
        assertEquals(100.0, orderService.calculateTotal());
    }

    @Test
    public void testCalculateTotalMultipleOrders() {
        OrderService orderService = new OrderService();
        orderService.createOrder("1", 100.0);
        orderService.createOrder("2", 200.0);
        orderService.processOrder("1");
        orderService.processOrder("2");
        assertEquals(300.0, orderService.calculateTotal());
    }

    @Test
    public void testCalculateTotalMultipleOrdersWithPending() {
        OrderService orderService = new OrderService();
        orderService.createOrder("1", 100.0);
        orderService.createOrder("2", 200.0);
        orderService.processOrder("1");
        assertEquals(100.0, orderService.calculateTotal());
    }

    @Test
    public void testCalculateTotalMultipleOrdersWithRequiresApproval() {
        OrderService orderService = new OrderService();
        orderService.createOrder("1", 100.0);
        orderService.createOrder("2", 1001.0);
        orderService.processOrder("1");
        orderService.processOrder("2");
        assertEquals(100.0, orderService.calculateTotal());
    }
}