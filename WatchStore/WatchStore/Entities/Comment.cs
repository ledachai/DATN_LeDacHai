using System;

namespace WatchStore.Entities
{
    public class Comment
    {
        public Guid? Co_ID { get; set; }
        public string? Peo_Fullname { get; set; }
        public string? Pro_Name { get; set; }
        public string? Pro_Image { get; set; }
        public string? Co_Content { get; set; }
        public DateTime? Co_Date { get; set; }
        public Guid? Pro_ID { get; set; }
        public Guid? Peo_ID { get; set; }
        public Comment()
        {

        }
    }
}
