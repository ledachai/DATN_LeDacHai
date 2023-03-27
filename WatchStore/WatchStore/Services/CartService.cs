using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Services
{
    public class CartService : ICartService
    {
        ICartRepository _repository;
        public CartService(ICartRepository repository )
        {
            _repository = repository;
        }
        public string CreateCart(Cart cart)
        {
            return _repository.CreateCart( cart );
        }

        public string DeleteCart(string Cart_ID)
        {
            return _repository.DeleteCart( Cart_ID );
        }

        public IEnumerable<Cart> GetCarts(Guid? Peo_ID)
        {
            return _repository.GetCarts(Peo_ID);
        }

        public string UpdateCart(Cart cart)
        {
            return _repository.UpdateCart( cart );
        }
    }
}
