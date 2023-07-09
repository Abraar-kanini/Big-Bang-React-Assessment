using Hospital_Mangement.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Mangement.Data
{
    public class HospitalDbContext: DbContext
    {
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options) : base(options)
        {

        }
        public DbSet<Doctor> doctors { get; set; }
        public DbSet<Patient> patients { get; set; }
        public DbSet<User> users { get; set; }

    }
}
