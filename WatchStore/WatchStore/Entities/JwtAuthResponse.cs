using System;

namespace WatchStore.Entities
{
    [Serializable]
    public class JwtAuthResponse
    {
        public string Peo_Fullname { get; set; }
        public Guid? Peo_ID { get; set; }
        public string Token { get; set; }
        public string Peo_Email { get; set; }
        public string Per_Name { get; set; }
        public int Expires_in { get; set; }
    }
}
