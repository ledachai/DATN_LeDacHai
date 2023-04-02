using System;

namespace WatchStore.Entities
{
    public class Category
    {
        /// <summary>
        /// mã danh mục
        /// </summary>
        public Guid? Cate_ID { get; set; }

        /// <summary>
        /// Tên danh mục
        /// </summary>
        public string? Cate_Name { get; set; }
        public string? Cate_Descibe { get; set; }
        public int? Cate_Count { get; set; }

        public Category()
        {

        }
    }
}
