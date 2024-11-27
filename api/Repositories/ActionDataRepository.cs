using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.QueryObjects;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Mappers;
using api.Dtos.ActionData;

namespace api.Repositories
{
    public class ActionDataRepository : IActionDataRepository
    {
        private readonly ApplicationDbContext _context;
        public ActionDataRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ActionData> CreateAsync(ActionData actionDataModel)
        {
            await _context.ActionDatas.AddAsync(actionDataModel);
            await _context.SaveChangesAsync();
            return actionDataModel;
        }

        public async Task<ActionData?> DeleteAsync(int id)
        {
            var actionDataModel = await _context.ActionDatas.FirstOrDefaultAsync(ad => ad.Id == id);

            if (actionDataModel == null)
            {
                return null;
            }

            _context.ActionDatas.Remove(actionDataModel);
            await _context.SaveChangesAsync();
            return actionDataModel;
        }

        public async Task<List<ActionData>> GetAllAsync(ActionDataQueryObject queryObject)
        {
            var actionDatas = _context.ActionDatas.Include(a => a.AppUser).AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.ElementClass))
            {
                actionDatas = actionDatas.Where(a => a.ElementClass == queryObject.ElementClass);
            };
            if (!string.IsNullOrWhiteSpace(queryObject.Action))
            {
                actionDatas = actionDatas.Where(a => a.Action == queryObject.Action);
            };
            if (!string.IsNullOrWhiteSpace(queryObject.AppUserId))
            {
                actionDatas = actionDatas.Where(a => a.AppUserId == queryObject.AppUserId);
            };
            if (queryObject.IsDecsending == true)
            {
                actionDatas = actionDatas.OrderByDescending(ad => ad.Timestamp);
            }
            return await actionDatas.ToListAsync();
        }

        public async Task<ActionData?> GetByIdAsync(int id)
        {
            return await _context.ActionDatas.Include(ad => ad.AppUser).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<ActionData?> UpdateAsync(int id, ActionData actionDataModel)
        {
            var existingActionData = await _context.ActionDatas.FirstOrDefaultAsync(x => x.Id == actionDataModel.Id);

            if (existingActionData == null)
            {
                return null;
            }

            existingActionData = actionDataModel;

            await _context.SaveChangesAsync();

            return existingActionData;
        }

    }
}