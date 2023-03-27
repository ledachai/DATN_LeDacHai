using System;

namespace WatchStore.Controllers
{
    [Serializable]
    public class AuthenticationRequest
    {
        /// <summary>
        /// Email
        /// </summary>
        public string Peo_Email { get; set; }

        /// <summary>
        /// Mật khẩu
        /// </summary>
        public string Peo_Password { get; set; }
    }
}
