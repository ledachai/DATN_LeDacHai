using System.Collections.Generic;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface ICategoryRepository
    {
        IEnumerable<Category> GetCategories();
        string? CreateCategory(Category category);
        string? UpdateCategory(Category category);
        string? DeleteCategory(string? Cate_ID);
    }
}
