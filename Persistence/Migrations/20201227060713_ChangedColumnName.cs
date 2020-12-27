using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ChangedColumnName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("30a933d3-f2ae-4ee6-a31a-b8edfde90620"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("a28be920-9080-4daf-879a-85f3ca921e6a"));

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: new Guid("dc49e167-2307-4590-8ef3-c87b65a24b9d"));

            migrationBuilder.RenameColumn(
                name: "DateJoines",
                table: "UserActivities",
                newName: "DateJoined");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.RenameColumn(
                name: "DateJoined",
                table: "UserActivities",
                newName: "DateJoines");

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("a28be920-9080-4daf-879a-85f3ca921e6a"), "Value 101" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("30a933d3-f2ae-4ee6-a31a-b8edfde90620"), "Value 102" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("dc49e167-2307-4590-8ef3-c87b65a24b9d"), "Value 103" });
        }
    }
}
