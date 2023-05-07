using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public CommentRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public IEnumerable<Comment> GetComments(string? Pro_ID)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getCommentProc = "sp_Comment_Select";
                //chuẩn bị param
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Pro_ID", Guid.Parse(Pro_ID));
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getCommentProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Comment>();
                }
                return null;
            }    
        }
        public string CreateComments(Comment comment)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var createCommentProc = "sp_Comment_Insert";
                //chuẩn bị param
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Co_Content", comment.Co_Content);
                parameters.Add("@Pro_ID", comment.Pro_ID);
                parameters.Add("@Peo_ID", comment.Peo_ID);
                //thực thi proc
                var result = SqlServerConnection.Query(createCommentProc, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return comment.Co_Content;
                }
                return null;
            }
        }

        public IEnumerable<Comment> GetAllComments()
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("DB")))
            {
                //chuẩn bị proc
                var getAllCommentProc = "sp_Comment_GetAll";
                //thực thi proc
                var result = SqlServerConnection.QueryMultiple(getAllCommentProc, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Comment>();
                }
                return null;
            }
        }
    }
}
