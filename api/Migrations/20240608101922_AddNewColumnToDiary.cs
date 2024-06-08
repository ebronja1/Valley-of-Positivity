using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumnToDiary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3d34c14-bd83-48c3-b6e5-0108c0aa2f37");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c5961f2b-38af-478e-a36d-890dd96999ba");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Diaries",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ee160b6-e0bb-4440-8b64-ff4d67ea543d", null, "Admin", "ADMIN" },
                    { "e83eb90a-54ca-447d-af5f-6a62a04a2469", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ee160b6-e0bb-4440-8b64-ff4d67ea543d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e83eb90a-54ca-447d-af5f-6a62a04a2469");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Diaries");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c3d34c14-bd83-48c3-b6e5-0108c0aa2f37", null, "Admin", "ADMIN" },
                    { "c5961f2b-38af-478e-a36d-890dd96999ba", null, "User", "USER" }
                });
        }
    }
}
