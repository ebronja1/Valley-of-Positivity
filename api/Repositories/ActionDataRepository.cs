using System;
using api.Data;
using api.Repositories;
using api.Models;
using api.IRepositories;
using api.Repositories;

namespace api.Repositories
{
    public class ActionDataRepository : Repository<ActionData>, IActionDataRepository
    {
        public ActionDataRepository(ApplicationDbContext dbContext): base(dbContext)
        {
        }
    }
}