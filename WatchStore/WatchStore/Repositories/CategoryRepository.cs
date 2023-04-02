using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public CategoryRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreateCategory(Category category)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var createCategoryProc = "sp_Category_Insert";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Cate_Name", category.Cate_Name);
                parameters.Add("@Cate_Descibe", category.Cate_Descibe);
                //thực thi proc
                var result = SqlServerConnection.Query(createCategoryProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return category.Cate_Name;
                }
                return null;
            }
        }

        public string DeleteCategory(string Cate_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var deleteCategoryProc = "sp_Category_Delete";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Cate_ID", Guid.Parse(input: Cate_ID));
                //thực thi proc
                var result = SqlServerConnection.Execute(deleteCategoryProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return Cate_ID;
                }
                return null;
            }
        }

        public IEnumerable<Category> GetCategories()
        {
            //kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getCategoryProc = "sp_Category_Select";
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getCategoryProc, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Category>();
                }
                return null;
            }
        }

        public string UpdateCategory(Category category)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var updateCategoryProc = "sp_Category_Update";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Cate_ID", category.Cate_ID);
                parameters.Add("@Cate_Name", category.Cate_Name);
                parameters.Add("@Cate_Descibe", category.Cate_Descibe);
                //thực thi proc
                var result = SqlServerConnection.Execute(updateCategoryProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
    }
}
