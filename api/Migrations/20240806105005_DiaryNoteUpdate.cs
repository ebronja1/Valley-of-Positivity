using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class DiaryNoteUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ee160b6-e0bb-4440-8b64-ff4d67ea543d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e83eb90a-54ca-447d-af5f-6a62a04a2469");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0491421c-23e0-4e50-8813-1e50b881b105", null, "User", "USER" },
                    { "4f39526c-1950-417e-a9f7-7b97bc8e24be", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0491421c-23e0-4e50-8813-1e50b881b105");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4f39526c-1950-417e-a9f7-7b97bc8e24be");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ee160b6-e0bb-4440-8b64-ff4d67ea543d", null, "Admin", "ADMIN" },
                    { "e83eb90a-54ca-447d-af5f-6a62a04a2469", null, "User", "USER" }
                });
        }
    }
}
