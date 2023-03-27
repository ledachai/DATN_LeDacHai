using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Services
{
    public class ProductService : IProductService
    {
        IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }
        public string CreateProducts(Product product)
        {
            return _repository.CreateProducts(product);
        }

        public string DeleteProducts(string? Pro_ID)
        {
            return _repository.DeleteProducts(Pro_ID);
        }

        public IEnumerable<Product> GetProducts(int? PageIndex, int? RowPerPage, string? Search)
        {
            return _repository.GetProducts(PageIndex, RowPerPage, Search);
        }

        public string UpdateProducts(Product product)
        {
            return _repository.UpdateProducts(product);
        }
    }
}
