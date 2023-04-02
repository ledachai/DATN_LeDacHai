using System;

namespace WatchStore.Entities
{
    public class Cart
    {
        /// <summary>
        /// mã giỏ hàng
        /// </summary>
        public Guid? Cart_ID { get; set; }

        /// <summary>
        /// Tên sản phẩm
        /// </summary>
        public string? Pro_Name { get; set; }

        /// <summary>
        /// Giá
        /// </summary>
        public double? Pro_Price { get; set; }

        /// <summary>
        /// mô tả sản phẩm
        /// </summary>
        public string? Pro_Describe { get; set; }

        /// <summary>
        /// số lượng mua
        /// </summary>
        public int? Pro_Number { get; set; }

        /// <summary>
        /// mã sản phẩm
        /// </summary>
        public Guid? Pro_ID { get; set; }

        /// <summary>
        /// tổng tiền
        /// </summary>
        public double? Cart_Pay { get; set; }

        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public Guid? Peo_ID { get; set; }
        public Cart()
        {
                
        }
    }
}
