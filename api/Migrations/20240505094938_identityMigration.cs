using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class identityMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4628352e-3f2e-4d2f-85d3-890a26b90aab");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5431a49b-9242-4ec7-80fc-bf800203e1ee");

            migrationBuilder.RenameColumn(
                name: "Element",
                table: "ActionDatas",
                newName: "ElementClass");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "ActionDatas",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "ActionDatas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "01455578-b8d5-4b00-bb85-4f67ad6dfb7a", null, "User", "USER" },
                    { "87044756-02a7-4174-8cd1-f2805134735f", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "01455578-b8d5-4b00-bb85-4f67ad6dfb7a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "87044756-02a7-4174-8cd1-f2805134735f");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "ActionDatas");

            migrationBuilder.RenameColumn(
                name: "ElementClass",
                table: "ActionDatas",
                newName: "Element");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ActionDatas",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4628352e-3f2e-4d2f-85d3-890a26b90aab", null, "User", "USER" },
                    { "5431a49b-9242-4ec7-80fc-bf800203e1ee", null, "Admin", "ADMIN" }
                });
        }
    }
}
