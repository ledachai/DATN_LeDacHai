using System.Collections.Generic;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface IOrderDetailRepository
    {
        IEnumerable<OrderDetail> GetAllOrders();
        string? InsertOrderDetail(OrderDetail orderDetail);
    }
}
