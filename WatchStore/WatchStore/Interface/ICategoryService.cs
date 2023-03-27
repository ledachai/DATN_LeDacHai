using System.Collections.Generic;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetCategories();
        string? CreateCategory(Category category);
        string? UpdateCategory(Category category);
        string? DeleteCategory(string? Cate_ID);
    }
}
