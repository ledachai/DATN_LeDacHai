using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Repositories
{
    public class ProductRepository : IProductRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public ProductRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string CreateProducts(Product product)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var createProductProc = "sp_Product_Insert";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Pro_Name", product.Pro_Name);
                parameters.Add("@Pro_Price", product.Pro_Price);
                parameters.Add("@Pro_Image", product.Pro_Image);
                parameters.Add("@Pro_Describe", product.Pro_Describe);
                parameters.Add("@Pro_Number", product.Pro_Number);
                parameters.Add("@Cate_ID", product.Cate_ID);
                //thực thi proc
                var result = SqlServerConnection.Query(createProductProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return product.Pro_Name;
                }
                return null;
            }
        }

        public string DeleteProducts(string? Pro_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var deleteProductProc = "sp_Product_Delete";
                //chuẩn bị param
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Pro_ID", Guid.Parse(Pro_ID));
                //thực thi proc
                var result = SqlServerConnection.Execute(deleteProductProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return Pro_ID;
                }
                return null;
            }
        }

        public IEnumerable<Product> GetProductById(Guid? Pro_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getProductByID = "sp_Product_Detail";
                //chuẩn bị param
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Pro_ID", Pro_ID);
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProductByID, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Product>();
                }
                return null;
            }
        }

        public IEnumerable<Product> GetProducts(int? PageIndex, int? RowPerPage, string? Search)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getProductProc = "sp_Product_GetPaging";
                //chuẩn bị param
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PageIndex", PageIndex);
                parameters.Add("@RowPerPage", RowPerPage);
                parameters.Add("@Search", Search);
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProductProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Product>();
                }
                return null;
            }
        }
        public string UpdateProducts(Product product)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var updateProductProc = "sp_Product_Update";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Pro_Name", product.Pro_Name);
                parameters.Add("@Pro_Price", product.Pro_Price);
                parameters.Add("@Pro_Image", product.Pro_Image);
                parameters.Add("@Pro_Describe", product.Pro_Describe);
                parameters.Add("@Pro_Number", product.Pro_Number);
                parameters.Add("@Pro_ID", product.Pro_ID);
                //thực thi proc
                var result = SqlServerConnection.Execute(updateProductProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
    }
}
