using System.ComponentModel.DataAnnotations;
using MessagePack;

namespace Hospital_Mangement.Models
{
    public class User
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
