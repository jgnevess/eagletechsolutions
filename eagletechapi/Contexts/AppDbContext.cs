using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.models;
using eagletechapi.models.chamado;
using Microsoft.EntityFrameworkCore;

namespace eagletechapi.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Chamado> Chamados { get; set; }
        public DbSet<Chatbot> Chatbots { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chatbot>()
                .HasMany(c => c.Conversation)
                .WithOne(m => m.Chatbot)
                .HasForeignKey(m => m.ChatbotId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}