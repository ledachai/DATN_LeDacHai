using System;
using System.Collections.Generic;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface ICartService
    {
        IEnumerable<Cart> GetCarts(Guid? Peo_ID);
        string? CreateCart(Cart cart);
        string? UpdateCart(Cart cart);
        string? DeleteCart(string? Cart_ID);
    }
}
