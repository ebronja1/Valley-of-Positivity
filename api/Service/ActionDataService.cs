using api.Interfaces;
using api.QueryObjects;
using api.Dtos.ActionData;
using api.IServices;
using api.Mappers;

namespace api.Service
{
	public class ActionDataService : IActionDataService
	{
		private readonly IActionDataRepository _actionDataRepo;

		public ActionDataService(IActionDataRepository actionDataRepo)
		{
			_actionDataRepo = actionDataRepo;
		}
		
		public async Task<List<ActionDataDto>> GetAllActionDatas(ActionDataQueryObject query)
		{
			var actionDatas = await _actionDataRepo.GetAllAsync(query);

			return actionDatas.Select(s => s.ToActionDataDto()).ToList();
		}
		
		public async Task<ActionDataDto> GetActionDataById(int id)
		{
			var actionData = await _actionDataRepo.GetByIdAsync(id);
			
			if (actionData == null) return null;

			return actionData.ToActionDataDto();
		}

		public async Task<ActionDataDto> CreateActionData(ActionDataCreateDto actionDataCreateDto, string userId)
		{
			var actionDataModel = actionDataCreateDto.ToActionDataFromCreateDto();
			actionDataModel.AppUserId = userId;
            
			var actionDataCreated = await _actionDataRepo.CreateAsync(actionDataModel);
			
			return actionDataCreated.ToActionDataDto();
		}

		public async Task<ActionDataDto> UpdateActionData(int actionDataId, ActionDataUpdateDto actionDataUpdateDto)
		{
			var existingActionData = await _actionDataRepo.GetByIdAsync(actionDataId);

			var actionDataModel = actionDataUpdateDto.ToActionDataFromUpdateDto(existingActionData);

			var updatedActionData = await _actionDataRepo.UpdateAsync(actionDataId, actionDataModel);

			return updatedActionData.ToActionDataDto();
		}


		public async Task<ActionDataDto> DeleteActionData(int actionDataId)
		{
			var actionData = await _actionDataRepo.DeleteAsync(actionDataId);
			
			if (actionData == null) return null;

			return actionData.ToActionDataDto();
		}
	}
}	
		