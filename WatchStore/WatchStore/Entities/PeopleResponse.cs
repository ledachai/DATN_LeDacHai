using System;

namespace WatchStore.Entities
{
    public class PeopleResponse
    {
        public string Per_Name { get; set; }
        public string Peo_Fullname { get; set; }
        public PeopleResponse(string Per_Name, string Peo_Fullname)
        {
            this.Per_Name = Per_Name;
            this.Peo_Fullname = Peo_Fullname;
        }
    }
}
