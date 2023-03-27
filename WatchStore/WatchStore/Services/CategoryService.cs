using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Services
{
    public class CategoryService : ICategoryService
    {
        public ICategoryRepository _repository;
        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }
        public string? CreateCategory(Category category)
        {
            return _repository.CreateCategory(category);
        }

        public string? DeleteCategory(string? Cate_ID)
        {
            return _repository.DeleteCategory(Cate_ID);
        }

        public IEnumerable<Category> GetCategories()
        {
            return _repository.GetCategories();
        }

        public string? UpdateCategory(Category category)
        {
            return _repository.UpdateCategory(category);
        }
    }
}
