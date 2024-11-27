using api.Dtos.ActionData;
using api.QueryObjects;

namespace api.IServices
{
    public interface IActionDataService
    {
        Task<List<ActionDataDto>> GetAllActionDatas(ActionDataQueryObject queryObject);
        
        Task<ActionDataDto> GetActionDataById(int id);
        Task<ActionDataDto> CreateActionData(ActionDataCreateDto actionDataCreateDto, string userId);
        Task<ActionDataDto> UpdateActionData(int actionDataId, ActionDataUpdateDto actionDataUpdateDto);
        Task<ActionDataDto> DeleteActionData(int admissionId);
    }
}