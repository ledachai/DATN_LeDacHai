using System;

namespace WatchStore.Entities
{
    public class People
    {
        public Guid? Peo_ID { get; set; }
        public string? Peo_Fullname { get; set; }
        public string? Peo_Password { get; set; }
        public string? Peo_Email { get; set; }
        public Guid? Per_ID { get; set; }
        public string? Per_Name { get; set; }
        public DateTime? Peo_CreateDate { get; set; }
        public DateTime? Peo_Dateofbirth { get; set; }
        public string? Peo_Address { get; set; }
        public string? Peo_Sex { get; set; }
        public People()
        {

        }
    }
}
