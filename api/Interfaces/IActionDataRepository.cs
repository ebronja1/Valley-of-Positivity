using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ActionData;
using api.Models;
using api.QueryObjects;

namespace api.Interfaces
{
    public interface IActionDataRepository
    {
        Task<List<ActionData>> GetAllAsync(ActionDataQueryObject queryObject);
        Task<ActionData?> GetByIdAsync(int id);
        Task<ActionData> CreateAsync(ActionData actionDataModel);
        Task<ActionData?> UpdateAsync(int id, ActionData actionDataModel);
        Task<ActionData?> DeleteAsync(int id);
    }
}