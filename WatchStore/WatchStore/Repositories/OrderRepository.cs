using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public OrderRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreateOrder(Order order)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var createOrderProc = "sp_Order_Insert";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Order_Fullname", order.Order_Fullname);
                parameters.Add("@Order_Address", order.Order_Address);
                parameters.Add("@Order_Phone", order.Order_Phone);
                parameters.Add("@Cart_ID", order.Cart_ID);
                //thực thi proc
                var result = SqlServerConnection.Query(createOrderProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return "Thêm thành công!";
                }
                return null;
            }
        }
        public IEnumerable<Order> GetAllOrders()
        {
            //kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getOrderProc = "sp_Order_SelectAll";
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getOrderProc, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Order>();
                }
                return null;
            }
        }
        public IEnumerable<Order> GetOrderByPeople(Guid? Peo_ID)
        {
            //kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getOrderProc = "sp_Order_Select";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_ID", Peo_ID);
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getOrderProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Order>();
                }
                return null;
            }
        }
        public string UpdateOrder(Guid? Order_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var updateOrderProc = "sp_Order_Update";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Order_ID", Order_ID);
                //thực thi proc
                var result = SqlServerConnection.Execute(updateOrderProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
        public string UpdateStatus(Guid? Order_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var updateOrderProc = "sp_Order_Confirm";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Order_ID", Order_ID);
                //thực thi proc
                var result = SqlServerConnection.Execute(updateOrderProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
    }
}
