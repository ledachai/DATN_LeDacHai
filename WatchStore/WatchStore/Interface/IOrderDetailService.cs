using System;
using System.Collections.Generic;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface IOrderDetailService
    {
        IEnumerable<OrderDetail> GetAllOrders();
        string? InsertOrderDetail(Guid? Order_ID);
        IEnumerable<ThongKe> GetThongKes(int? year);
    }
}
