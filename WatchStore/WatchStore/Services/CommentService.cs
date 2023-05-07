using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Services
{
    public class CommentService : ICommentService
    {
        ICommentRepository _repository;
        public CommentService(ICommentRepository repository)
        {
            _repository = repository;
        }
        public IEnumerable<Comment> GetComments(string? Pro_ID)
        {
            return _repository.GetComments(Pro_ID);
        }
        public string CreateComments(Comment comment)
        {
            return _repository.CreateComments(comment);
        }

        public IEnumerable<Comment> GetAllComments()
        {
            return _repository.GetAllComments();
        }
    }
}
