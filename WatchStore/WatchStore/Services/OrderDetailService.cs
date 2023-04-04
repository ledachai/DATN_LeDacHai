using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Services
{
    public class OrderDetailService : IOrderDetailService
    {
        IOrderDetailRepository _orderDetailRepository;
        public OrderDetailService(IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }
        public IEnumerable<OrderDetail> GetAllOrders()
        {
            return _orderDetailRepository.GetAllOrders();
        }

        public string InsertOrderDetail(OrderDetail orderDetail)
        {
            return _orderDetailRepository.InsertOrderDetail(orderDetail);
        }
    }
}
