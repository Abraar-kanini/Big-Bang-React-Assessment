using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital_Mangement.Models
{
    public class Doctor
    {
        [Key]
        public int Docter_Id { get; set; }
        public string Doctor_Name { get; set; }

        public string Docter_Specialist { get; set; }

        public string Docter_Email { get; set; }
        public string Docter_Phone { get; set; }

        public string? DocImagePath { get; set; }



        public virtual ICollection<Patient>? patients { get; set; }


    }
}
