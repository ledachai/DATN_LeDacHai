using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Repositories
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public OrderDetailRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public IEnumerable<OrderDetail> GetAllOrders()
        {
            //kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getOrderDetailProc = "sp_OrderDetail_Select";
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getOrderDetailProc, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<OrderDetail>();
                }
                return null;
            }
        }

        public IEnumerable<ThongKe> GetThongKes(int? year)
        {
            //kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getThongKeProc = "sp_OrderDetail_ThongKe";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Year", year);
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getThongKeProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<ThongKe>();
                }
                return null;
            }
        }

        public string InsertOrderDetail(Guid? Order_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var createOrderDetailProc = "sp_OrderDetail_Insert";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Order_ID", Order_ID);
                //thực thi proc
                var result = SqlServerConnection.Query(createOrderDetailProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return "Thêm thành công!";
                }
                return null;
            }
        }
    }
}
