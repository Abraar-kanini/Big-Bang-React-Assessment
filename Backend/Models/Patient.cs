using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Hospital_Mangement.Models
{
    public class Patient
    {
        [Key]
        public int Patient_Id { get; set; }

        public string Patient_Name { get; set; }

        public string Patient_Address { get; set; }

        public string Patient_Disease { get; set; }

        public String Patient_Age { get; set; }

        public String Patient_PhoneNumber { get; set; }

        public string BookingDate { get; set; }

        public string BookingTime { get; set; }


        [JsonIgnore]

        public Doctor? Doctor { get; set; }
        public int Docter_Id { get; set; }
    }
}
