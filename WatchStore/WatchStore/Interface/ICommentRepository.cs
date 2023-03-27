using System.Collections.Generic;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface ICommentRepository
    {
        IEnumerable<Comment> GetComments(string? Pro_ID);
        string? CreateComments(Comment comment);
    }
}
