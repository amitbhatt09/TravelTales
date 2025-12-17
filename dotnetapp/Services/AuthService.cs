using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
    private readonly IConfiguration configuration;
    private readonly ApplicationDbContext context;

    public AuthService(IConfiguration configuration, ApplicationDbContext context){
        this.configuration = configuration;
        this.context = context;
    }
    public async Task<(int, string)> Registration(User newUser, string role){
        
        if(await context.Users.AnyAsync(i => i.Email == newUser.Email)){
            return (400, "User already exists!");
        }

        newUser.UserRole = role;
        context.Users.Add(newUser);
        await context.SaveChangesAsync();

        return (201, "User created successfully!");
    }
    public async Task<(int, object)> Login(LoginModel model)
    {
        var user = await context.Users.FirstOrDefaultAsync(i => i.Email == model.Email);
            if (user == null)
            {
                return (400, "Invalid email");
            }

           if (user.Password != model.Password)
           {
               return (400, "Invalid password");
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserRole)
            };
 
            var token = GenerateToken(claims);
            return (200, new { Token = token });
    }
    private string GenerateToken(IEnumerable<Claim> claims){
        var jwtSettings = configuration.GetSection("JWT");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = jwtSettings["ValidIssuer"],
                Audience = jwtSettings["ValidAudience"],
                SigningCredentials = credentials
            };
 
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
 
            return tokenHandler.WriteToken(token);
        }
    }
}
