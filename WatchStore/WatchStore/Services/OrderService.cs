using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Services
{
    public class OrderService : IOrderService
    {
        IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public string CreateOrder(Order order)
        {
            return _orderRepository.CreateOrder(order);
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return _orderRepository.GetAllOrders();
        }
        public IEnumerable<Order> GetOrderByPeople(Guid? Peo_ID)
        {
            return _orderRepository.GetOrderByPeople(Peo_ID);
        }

        public string UpdateOrder(Guid? Order_ID)
        {
            return _orderRepository.UpdateOrder(Order_ID);
        }
        public string UpdateStatus(Guid? Order_ID)
        {
            return _orderRepository.UpdateStatus(Order_ID);
        }
    }
}
