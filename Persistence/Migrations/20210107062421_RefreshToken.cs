using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RefreshToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("2fab4033-9bc2-4d48-a75c-5dc9a1fe8786"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("3e1562e3-6002-41a5-9ae0-d0b5ebac10b6"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("dd5aef0f-47ba-4195-ae83-7af80586a29f"));

            migrationBuilder.CreateTable(
                name: "RefreshToken",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Expires = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Revoked = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshToken", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshToken_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("6587c2f3-7c50-4a22-acb8-1d50d102a675"), "Value 101" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("464f6721-6ddf-4c94-bdd5-11da1e6b5292"), "Value 102" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("29939955-511e-4f6d-8f91-1eaa9eb913ab"), "Value 103" });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_AppUserId",
                table: "RefreshToken",
                column: "AppUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefreshToken");

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("29939955-511e-4f6d-8f91-1eaa9eb913ab"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("464f6721-6ddf-4c94-bdd5-11da1e6b5292"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("6587c2f3-7c50-4a22-acb8-1d50d102a675"));

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("3e1562e3-6002-41a5-9ae0-d0b5ebac10b6"), "Value 101" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("dd5aef0f-47ba-4195-ae83-7af80586a29f"), "Value 102" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("2fab4033-9bc2-4d48-a75c-5dc9a1fe8786"), "Value 103" });
        }
    }
}
