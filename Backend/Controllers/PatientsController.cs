using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hospital_Mangement.Data;
using Hospital_Mangement.Models;
using Microsoft.AspNetCore.Authorization;

namespace Hospital_Mangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PatientsController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public PatientsController(HospitalDbContext context)
        {
            _context = context;
        }

        // GET: api/Patients
        [HttpGet]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 409)]
        public async Task<ActionResult<IEnumerable<Patient>>> Getpatients()
        {
            if (_context.patients == null)
            {
                return NotFound();
            }
            return await _context.patients.ToListAsync();
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 409)]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            if (_context.patients == null)
            {
                return NotFound();
            }
            var patient = await _context.patients.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            return patient;
        }

        // PUT: api/Patients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 409)]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.Patient_Id)
            {
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Patients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 409)]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            if (_context.patients == null)
            {
                return Problem("Entity set 'HospitalDbContext.patients' is null.");
            }
            _context.patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatient", new { id = patient.Patient_Id }, patient);
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 404)]
        [ProducesResponseType(statusCode: 400)]
        public async Task<IActionResult> DeletePatient(int id)
        {
            if (_context.patients == null)
            {
                return NotFound();
            }
            var patient = await _context.patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return (_context.patients?.Any(e => e.Patient_Id == id)).GetValueOrDefault();
        }

        [HttpGet("ByName/{patientName}")]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 409)]
        public ActionResult<IEnumerable<Patient>> GetPatientsByName(string patientName)
        {
            var patients = _context.patients.Where(p => p.Patient_Name == patientName).ToList();
            return patients;
        }

        // DELETE: api/Patients/doctor/5
        [HttpDelete("doctor/{id}")]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 404)]
        [ProducesResponseType(statusCode: 400)]
        public async Task<IActionResult> DeletePatientbydoctorid(int id)
        {
            if (_context.patients == null)
            {
                return NotFound();
            }

            var patient = await _context.patients.FirstOrDefaultAsync(p => p.Docter_Id == id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
