using Hospital_Mangement.Data;
using Hospital_Mangement.Models;
using Hospital_Mangement.Repository.IClass;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Mangement.Repository.Interface
{
    public class DoctorRepository:IDoctor
    {
        private readonly HospitalDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public DoctorRepository(HospitalDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<ActionResult<IEnumerable<Doctor>>> GetEmployees()
        {
            if (_context.doctors == null)
            {
                return new NotFoundResult();
            }
            return await _context.doctors.ToListAsync();
        }

        public async Task<ActionResult<Doctor>> GetEmployee(int id)
        {
            if (_context.doctors == null)
            {
                return new NotFoundResult();
            }
            var employee = await _context.doctors.FindAsync(id);

            if (employee == null)
            {
                return new NotFoundResult();
            }

            return employee;
        }

        public async Task<Doctor> UpdateDoctor(int id, [FromForm] Doctor doctor, IFormFile imageFile)
        {
            var existingDoctor = await _context.doctors.FindAsync(id);

            if (existingDoctor == null)
            {
                throw new ArgumentException("Doctor not found");
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads/doctor");

                if (!string.IsNullOrEmpty(existingDoctor.DocImagePath))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingDoctor.DocImagePath);
                    if (File.Exists(existingFilePath))
                    {
                        File.Delete(existingFilePath);
                    }
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                doctor.DocImagePath = fileName;
            }
            else
            {
                doctor.DocImagePath = existingDoctor.DocImagePath;
            }

           

        existingDoctor.Doctor_Name = doctor.Doctor_Name;
            existingDoctor.Docter_Specialist = doctor.Docter_Specialist;
            existingDoctor.Docter_Email = doctor.Docter_Email;
            existingDoctor.Docter_Phone = doctor.Docter_Phone;
            
            existingDoctor.DocImagePath = doctor.DocImagePath;

            await _context.SaveChangesAsync();

            return existingDoctor;
        }
        public async Task<Doctor> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads/doctor");
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                doctor.DocImagePath = fileName;
            }

            _context.doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return doctor;
        }

        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.doctors == null)
            {
                return new NotFoundResult();
            }
            var employee = await _context.doctors.FindAsync(id);
            if (employee == null)
            {
                return new NotFoundResult();
            }

            _context.doctors.Remove(employee);
            await _context.SaveChangesAsync();

            return new NoContentResult();
        }

        
    }
}
