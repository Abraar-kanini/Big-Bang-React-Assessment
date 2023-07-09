using Hospital_Mangement.Data;
using Hospital_Mangement.Models;
using Hospital_Mangement.Repository.IClass;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospital_Mangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  [Authorize]
    
    public class DoctorController : ControllerBase
    {
        private readonly IDoctor _doctorRepository;

        public DoctorController(IDoctor doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        [HttpGet]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 200)]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetEmployees()
        {
            return await _doctorRepository.GetEmployees();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 200)]
        public async Task<ActionResult<Doctor>> GetEmployee(int id)
        {
            return await _doctorRepository.GetEmployee(id);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 409)]
        public async Task<ActionResult<Doctor>> UpdateDoctor(int id, [FromForm] Doctor doctor, IFormFile imageFile)
        {
            return await _doctorRepository.UpdateDoctor(id, doctor, imageFile);
        }

        [HttpPost]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 409)]
        public async Task<ActionResult<Doctor>> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile)
        {
            return await _doctorRepository.CreateDoctor(doctor, imageFile);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 404)]
        [ProducesResponseType(statusCode: 400)]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            return await _doctorRepository.DeleteEmployee(id);
        }
    }
}
