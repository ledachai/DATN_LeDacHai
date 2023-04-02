using System;

namespace WatchStore.Entities
{
    public class Order
    {
        public Guid? Order_ID { get; set; }
        public string? Order_Fullname { get; set; }
        public string? Order_Address { get; set; }
        public string? Pro_Name { get; set; }
        public double? Order_Phone { get; set; }
        public double? Cart_Pay { get; set; }
        public Guid? Pro_ID { get; set; }
        public Guid? Cart_ID { get; set; }
        public Guid? Peo_ID { get; set; }
        public DateTime? Order_Date { get; set; }
        public string? Order_Status { get; set; }
        public string? Order_IsDelete { get; set; }
        public Order()
        {

        }
    }
}
