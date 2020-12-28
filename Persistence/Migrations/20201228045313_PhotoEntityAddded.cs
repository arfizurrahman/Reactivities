using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PhotoEntityAddded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("3921d4b2-e2c5-4540-abc0-81a08de7cd87"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("7c0ec81c-55e1-436b-91e3-76d2c1db922a"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("d4f3c156-98c9-42b9-932b-0e316311d9af"));

            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMain = table.Column<bool>(type: "bit", nullable: false),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("35ba0329-c6be-4705-b889-8c774d029fc9"), "Value 101" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("d7bddc3a-562f-4399-a1e7-89ac1c1df87e"), "Value 102" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("fdb1d921-d12e-4d6d-8076-07f984c5fdf6"), "Value 103" });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AppUserId",
                table: "Photos",
                column: "AppUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("35ba0329-c6be-4705-b889-8c774d029fc9"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("d7bddc3a-562f-4399-a1e7-89ac1c1df87e"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("fdb1d921-d12e-4d6d-8076-07f984c5fdf6"));

            migrationBuilder.DropColumn(
                name: "Bio",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("3921d4b2-e2c5-4540-abc0-81a08de7cd87"), "Value 101" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("d4f3c156-98c9-42b9-932b-0e316311d9af"), "Value 102" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("7c0ec81c-55e1-436b-91e3-76d2c1db922a"), "Value 103" });
        }
    }
}
