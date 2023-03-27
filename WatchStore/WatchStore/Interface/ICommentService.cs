﻿using System.Collections.Generic;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface ICommentService
    {
        IEnumerable<Comment> GetComments(string? Pro_ID);
        string? CreateComments(Comment comment);
    }
}
