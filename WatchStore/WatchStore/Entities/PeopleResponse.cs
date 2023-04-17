using System;

namespace WatchStore.Entities
{
    public class PeopleResponse
    {
        public string Per_Name { get; set; }
        public string Peo_Fullname { get; set; }
        public Guid? Peo_ID { get; set; }
        public PeopleResponse(string Per_Name, string Peo_Fullname, Guid? Peo_ID)
        {
            this.Per_Name = Per_Name;
            this.Peo_Fullname = Peo_Fullname;
            this.Peo_ID = Peo_ID;
        }
    }
}
