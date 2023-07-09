using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hospital_Mangement.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "doctors",
                columns: table => new
                {
                    Docter_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Doctor_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Docter_Specialist = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Docter_Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Docter_Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_doctors", x => x.Docter_Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "patients",
                columns: table => new
                {
                    Patient_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "101, 1"),
                    Patient_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_Disease = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_Age = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Patient_PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BookingDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BookingTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoctorDocter_Id = table.Column<int>(type: "int", nullable: true),
                    Docter_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_patients", x => x.Patient_Id);
                    table.ForeignKey(
                        name: "FK_patients_doctors_DoctorDocter_Id",
                        column: x => x.DoctorDocter_Id,
                        principalTable: "doctors",
                        principalColumn: "Docter_Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_patients_DoctorDocter_Id",
                table: "patients",
                column: "DoctorDocter_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "patients");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "doctors");
        }
    }
}
