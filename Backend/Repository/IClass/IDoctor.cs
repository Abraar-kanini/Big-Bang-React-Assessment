using Hospital_Mangement.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Mangement.Repository.IClass
{
    public interface IDoctor
    {
        
            Task<ActionResult<IEnumerable<Doctor>>> GetEmployees();
            Task<ActionResult<Doctor>> GetEmployee(int id);
            Task<Doctor> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile);
            Task<Doctor> UpdateDoctor(int id, [FromForm] Doctor doctor, IFormFile imageFile);
            Task<IActionResult> DeleteEmployee(int id);
        }
    }

