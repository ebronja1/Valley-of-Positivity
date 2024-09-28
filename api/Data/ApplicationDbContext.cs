using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }

        public DbSet<ActionData> ActionDatas { get; set; }
        public DbSet<Diary> Diaries { get; set; }
        public DbSet<DiaryNote> DiaryNotes { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Quote> Quotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasOne(u => u.Diary)
            .WithOne(d => d.AppUser)
            .HasForeignKey<Diary>(d => d.AppUserId);

            // Seed roles
            var adminRoleId = "role-admin-id";
            var userRoleId = "role-user-id";

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = adminRoleId,  // Use these IDs to connect roles to users later
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = userRoleId,
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);

            // Create password hasher to hash passwords
            var hasher = new PasswordHasher<AppUser>();

            // Seed admin user
            var adminUserId = "admin-user-id";
            var adminUser = new AppUser
            {
                Id = adminUserId, // Primary key
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                Email = "admin@example.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            adminUser.PasswordHash = hasher.HashPassword(adminUser, "AdminPassword123!");

            // Seed normal user
            var userUserId = "user-user-id";
            var normalUser = new AppUser
            {
                Id = userUserId, // Primary key
                UserName = "user",
                NormalizedUserName = "USER",
                Email = "user@example.com",
                NormalizedEmail = "USER@EXAMPLE.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            normalUser.PasswordHash = hasher.HashPassword(normalUser, "UserPassword123!");

            // Seed users into the database
            modelBuilder.Entity<AppUser>().HasData(adminUser, normalUser);

            // Assign roles to users (correctly using the RoleId and UserId)
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = adminRoleId,  // Connect the admin user to the Admin role
                    UserId = adminUserId   // Assign to the seeded admin
                },
                new IdentityUserRole<string>
                {
                    RoleId = userRoleId,   // Connect the normal user to the User role
                    UserId = userUserId    // Assign to the seeded user
                }
            );
        }

    }
}

