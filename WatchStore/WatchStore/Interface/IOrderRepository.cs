using System.Collections.Generic;
using System;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAllOrders();
        IEnumerable<Order> GetOrderByPeople(Guid? Peo_ID);
        string? CreateOrder(Order order);
        string? UpdateOrder(Guid? Order_ID);
        string? UpdateStatus(Guid? Order_ID);
    }
}
