using System.Collections.Generic;
using System;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetProducts(int? PageIndex, int? RowPerPage, string? Search);
        IEnumerable<Product> GetProductById(Guid? Pro_ID);
        string? CreateProducts(Product product);
        string? UpdateProducts(Product product);
        string? DeleteProducts(string? Pro_ID);
    }
}
