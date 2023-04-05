using System;
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

        public IEnumerable<ThongKe> GetThongKes(int? year)
        {
            return _orderDetailRepository.GetThongKes(year);
        }

        public string InsertOrderDetail(Guid? Order_ID)
        {
            return _orderDetailRepository.InsertOrderDetail(Order_ID);
        }
    }
}
