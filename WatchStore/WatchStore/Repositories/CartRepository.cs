using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Repositories
{
    public class CartRepository : ICartRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public CartRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string CreateCart(Cart cart)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var createCartProc = "sp_Cart_Insert";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Pro_ID", cart.Pro_ID);
                //parameters.Add("@Pro_Number", cart.Pro_Number);
                parameters.Add("@Peo_ID", cart.Peo_ID);
                //thực thi proc
                var result = SqlServerConnection.Query(createCartProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return "Thêm thành công!";
                }
                return null;
            }
        }

        public string DeleteCart(string Cart_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var deleteCartProc = "sp_Cart_Delete";
                //chuẩn bị param
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Cart_ID", Guid.Parse(Cart_ID));
                //thực thi proc
                var result = SqlServerConnection.Execute(deleteCartProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return Cart_ID;
                }
                return null;
            }
        }

        //public IEnumerable<Cart> GetCarts(Guid Peo_ID)
        //{
        //    //kết nối DB
        //    using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
        //    {
        //        //chuẩn bị proc
        //        var getCartProc = "sp_Cart_Select";
        //        DynamicParameters parameters = new DynamicParameters();
        //        parameters.Add("@Peo_ID", Peo_ID);
        //        //thực thi proc
        //        var result = SqlServerConnection.QueryMultiple(getCartProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
        //        if (result != null)
        //        {
        //            return result.Read<Cart>();
        //        }
        //        return null;
        //    }
        //}

        public IEnumerable<Cart> GetCarts(Guid? Peo_ID)
        {
            //kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getCartProc = "sp_Cart_Select";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_ID", Peo_ID);
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getCartProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Cart>();
                }
                return null;
            }
        }

        public string UpdateCart(Cart cart)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var updateCartProc = "sp_Cart_Update";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Cart_ID", cart.Cart_ID);
                parameters.Add("@Pro_Number", cart.Pro_Number);
                //thực thi proc
                var result = SqlServerConnection.Execute(updateCartProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
    }
}
