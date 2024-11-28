using api.Dtos.ActionData;
using api.Dtos.Search;

namespace api.IServices
{
    public interface IActionDataService
    {
        Task<ResponsePageDto<ActionDataDto>> GetAllActionDatas(SearchActionDataParamsDto searchParamsDto);
        Task<ActionDataDto> GetActionDataById(int id);
        Task<ActionDataDto> CreateActionData(ActionDataCreateDto actionDataCreateDto);
        Task<ActionDataDto> UpdateActionData(int actionDataId, ActionDataUpdateDto actionDataUpdateDto);
        Task<ActionDataDto> DeleteActionData(int admissionId);
    }
}