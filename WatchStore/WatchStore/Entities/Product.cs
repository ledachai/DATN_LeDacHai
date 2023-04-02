using System;
using System.ComponentModel.DataAnnotations;

namespace WatchStore.Entities
{
    public class Product
    {
        /// <summary>
        /// Mã sản phẩm
        /// </summary>
        public Guid? Pro_ID { get; set; }

        /// <summary>
        /// tên sản phẩm
        /// </summary>
        //[Required(ErrorMessage = "e001")]
        public string? Pro_Name { get; set; }

        /// <summary>
        /// Giá
        /// </summary>
        //[Required(ErrorMessage = "e002")]
        public double? Pro_Price { get; set; }

        /// <summary>
        /// hình ảnh
        /// </summary>
        //[Required(ErrorMessage = "e003")]
        public string? Pro_Image { get; set; }

        /// <summary>
        /// mô tả sản phẩm
        /// </summary>
        //[Required(ErrorMessage = "e004")]
        public string? Pro_Describe { get; set; }

        /// <summary>
        /// Số lượng còn
        /// </summary>
        //[Required(ErrorMessage = "e005")]
        public int? Pro_Number { get; set; }

        /// <summary>
        /// Mã danh mục
        /// </summary>
        public Guid? Cate_ID { get; set; }

        /// <summary>
        /// tên danh mục
        /// </summary>
        public string? Cate_Name { get; set; }
        public Product()
        {

        }
    }
}
