﻿using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values {get;set;}
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
                .HasData(
                    new Value{Id = Guid.NewGuid(), Name="Value 101"},
                    new Value{Id = Guid.NewGuid(), Name="Value 102"},
                    new Value{Id = Guid.NewGuid(), Name="Value 103"}
                );
        }
    }
}
