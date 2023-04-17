using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WatchStore.Interface;

namespace WatchStore.Entities
{
    public class JwtAuthenticationManager
    {
        public IPeopleService _peopleService;
        public JwtAuthenticationManager(IPeopleService peopleService)
        {
            _peopleService = peopleService;
        }
        public JwtAuthResponse Authenticate(string Peo_Email, string Peo_Password)
        {
            PeopleResponse KQ = KiemTra(Peo_Email, Peo_Password);
            if (KQ == null)
            {
                return null;
            }
            var tokenExpiryTimeStamp = DateTime.Now.AddMinutes(Constants.JWT_TOKEN_VALIDITY_MINS);
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(Constants.JWT_SECURITY_KEY);
            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new List<Claim>
                {
                    new Claim("Per_Name", KQ.Per_Name),
                    new Claim(ClaimTypes.PrimaryGroupSid, "User Group 01")
                }),
                Expires = tokenExpiryTimeStamp,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            var token = jwtSecurityTokenHandler.WriteToken(securityToken);
            return new JwtAuthResponse
            {
                Peo_Email = Peo_Email,
                Token = token,
                Peo_ID = KQ.Peo_ID,
                Per_Name = KQ.Per_Name,
                Peo_Fullname = KQ.Peo_Fullname,
                Expires_in = (int)tokenExpiryTimeStamp.Subtract(DateTime.Now).TotalSeconds
            };
        }
        public PeopleResponse KiemTra(string Peo_Email, string Peo_Password)
        {
            try
            {
                var peoples = _peopleService.GetAll();
                if (peoples != null)
                {
                    foreach (var People in peoples)
                    {
                        if (People.Peo_Email == Peo_Email && People.Peo_Password == Peo_Password)
                        {
                            return new PeopleResponse(People.Per_Name, People.Peo_Fullname, People.Peo_ID);
                        }
                    }
                    return null;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
