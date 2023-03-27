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
    public class PeopleRepository : IPeopleRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public PeopleRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreatePeople(People people)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var createPeopleProc = "sp_People_Insert";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_Fullname", people.Peo_Fullname);
                parameters.Add("@Peo_Password", people.Peo_Password);
                parameters.Add("@Peo_Email", people.Peo_Email);
                parameters.Add("@Peo_Dateofbirth", people.Peo_Dateofbirth);
                parameters.Add("@Peo_Address", people.Peo_Address);
                parameters.Add("@Peo_Sex", people.Peo_Sex);
                //thực thi proc
                var result = SqlServerConnection.Query(createPeopleProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return "Thêm thành công";
                }
                return null;
            }
        }

        public string DeletePeople(Guid? Peo_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var deletePeopleProc = "sp_People_Delete";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_ID", Peo_ID);
                //thực thi proc
                var result = SqlServerConnection.Execute(deletePeopleProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Xóa thành công";
                }
                return null;
            }
        }
        public IEnumerable<People> GetAll()
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getPeopleProc = "sp_People_Select";
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getPeopleProc, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<People>();
                }
                return null;
            }
        }

        public IEnumerable<People> GetByRole(int? PageIndex, int? RowPerPage, string? Search)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getPeopleProc = "sp_People_SelectByRole";
                //chuẩn bị param
                DynamicParameters Parameters = new DynamicParameters();
                Parameters.Add("@PageIndex", PageIndex);
                Parameters.Add("@RowPerPage", RowPerPage);
                Parameters.Add("@Search", Search);
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getPeopleProc,Parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<People>();
                }
                return null;
            }    
        }

        public string UpdatePeople(People people)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var updatePeopleProc = "sp_People_Update";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_ID", people.Peo_ID);
                parameters.Add("@Peo_Fullname", people.Peo_Fullname);
                parameters.Add("@Peo_Password", people.Peo_Password);
                parameters.Add("@Peo_Email", people.Peo_Email);
                parameters.Add("@Peo_Dateofbirth", people.Peo_Dateofbirth);
                //thực thi proc
                var result = SqlServerConnection.Execute(updatePeopleProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
        public string UpdateRole(People people)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var updatePeopleRoleProc = "sp_People_UpdateRole";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_ID", people.Peo_ID);
                parameters.Add("@Peo_Fullname", people.Peo_Fullname);
                parameters.Add("@Peo_Password", people.Peo_Password);
                parameters.Add("@Peo_Email", people.Peo_Email);
                parameters.Add("@Per_ID", people.Per_ID);
                parameters.Add("@Peo_Dateofbirth", people.Peo_Dateofbirth);
                //thực thi proc
                var result = SqlServerConnection.Execute(updatePeopleRoleProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
    }
}
