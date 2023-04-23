using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public EmployeeRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreateEmployee(People people)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var createEmployeeProc = "sp_EmployeeInsert";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_Fullname", people.Peo_Fullname);
                parameters.Add("@Peo_Password", people.Peo_Password);
                parameters.Add("@Peo_Email", people.Peo_Email);
                parameters.Add("@Peo_Dateofbirth", people.Peo_Dateofbirth);
                parameters.Add("@Peo_Address", people.Peo_Address);
                parameters.Add("@Peo_Sex", people.Peo_Sex);
                //thực thi proc
                var result = SqlServerConnection.Query(createEmployeeProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return "Thêm thành công";
                }
                return null;
            }
        }

        public string DeleteEmployee(Guid? Peo_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var deleteEmployeeProc = "sp_EmployeeDelete";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_ID", Peo_ID);
                //thực thi proc
                var result = SqlServerConnection.Execute(deleteEmployeeProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Xóa thành công";
                }
                return null;
            }
        }

        public IEnumerable<People> GetEmployee(string? Search)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getEmployeeProc = "sp_EmployeeGetAll";
                //chuẩn bị param
                DynamicParameters Parameters = new DynamicParameters();
                Parameters.Add("@Search", Search);
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getEmployeeProc, Parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<People>();
                }
                return null;
            }
        }

        public IEnumerable<People> GetPeopleByID(Guid? Peo_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getPeopleByIDProc = "sp_People_GetByID";
                //chuẩn bị param
                DynamicParameters Parameters = new DynamicParameters();
                Parameters.Add("@Peo_ID", Peo_ID);
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getPeopleByIDProc, Parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<People>();
                }
                return null;
            }
        }

        public string UpdateEmployee(People people)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var updateEmployeeProc = "sp_Employee_Update";
                //chuẩn bị tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Peo_ID", people.Peo_ID);
                parameters.Add("@Peo_Fullname", people.Peo_Fullname);
                parameters.Add("@Peo_Dateofbirth", people.Peo_Dateofbirth);
                parameters.Add("@Peo_Address", people.Peo_Address);
                parameters.Add("@Peo_Sex", people.Peo_Sex);
                //thực thi proc
                var result = SqlServerConnection.Execute(updateEmployeeProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
    }
}
