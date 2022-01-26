using Dating_App.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating_App.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<AppUser> Users { get; set; }
    }
}
