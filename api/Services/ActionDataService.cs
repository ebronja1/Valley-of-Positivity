using System.Linq.Expressions;
using api.IServices;
using api.Dtos.ActionData;
using api.Dtos.Search;
using api.IRepositories;
using api.Mappers;
using api.Models;
using AutoMapper;

namespace api.Services
{
	public class ActionDataService : IActionDataService
	{
		private readonly IActionDataRepository _actionDataRepo;
		private readonly IMapper _mapper;

		public ActionDataService(IActionDataRepository actionDataRepo, IMapper mapper)
		{
			_actionDataRepo = actionDataRepo;
			_mapper = mapper;
		}
		
		public async Task<ResponsePageDto<ActionDataDto>> GetAllActionDatas(SearchActionDataParamsDto searchParamsDto)
		{
			// Map DTO to domain model for search parameters
			var searchParams = _mapper.Map<SearchParams>(searchParamsDto);

			// Create a list of filters
			var filters = new List<Expression<Func<ActionData, bool>>>();

			if (!string.IsNullOrWhiteSpace(searchParamsDto.ElementClass))
			{
				filters.Add(a => a.ElementClass == searchParamsDto.ElementClass);
			}

			if (!string.IsNullOrWhiteSpace(searchParamsDto.Action))
			{
				filters.Add(a => a.Action == searchParamsDto.Action);
			}
			
			if (!string.IsNullOrWhiteSpace(searchParamsDto.AppUserId))
			{
				filters.Add(a => a.AppUserId == searchParamsDto.AppUserId);
			}
			
			if (searchParamsDto.Timestamp.HasValue)
			{
				filters.Add(a => a.Timestamp >= searchParamsDto.Timestamp.Value);
			}
			
			var actionDatas = await _actionDataRepo.GetFilteredWithIncludesPaginatedAsync(filters, searchParams, x => x.AppUser); 
			
			return _mapper.Map<ResponsePageDto<ActionDataDto>>(actionDatas);
		}

		
		public async Task<ActionDataDto> GetActionDataById(int id)
		{
			var actionData = await _actionDataRepo.GetById(id);
			
			if (actionData == null) return null;

			return actionData.ToActionDataDto();
		}

		public async Task<ActionDataDto> CreateActionData(ActionDataCreateDto actionDataCreateDto)
		{
			var actionData = _mapper.Map<ActionData>(actionDataCreateDto);
			_actionDataRepo.Add(actionData);
			await _actionDataRepo.SaveChangesAsync();
			return _mapper.Map<ActionDataDto>(actionData);
		}

		public async Task<ActionDataDto> UpdateActionData(int actionDataId, ActionDataUpdateDto actionDataUpdateDto)
		{
			// Retrieve the existing entity from the repository
			var existingActionData = await _actionDataRepo.GetById(actionDataId);
			if (existingActionData == null)
			{
				throw new KeyNotFoundException($"ActionData with ID {actionDataId} not found.");
			}

			// Map the update DTO to the existing entity
			_mapper.Map(actionDataUpdateDto, existingActionData);

			// Save changes
			_actionDataRepo.Update(existingActionData);
			await _actionDataRepo.SaveChangesAsync();

			// Map the updated entity to a DTO and return it
			return _mapper.Map<ActionDataDto>(existingActionData);
		}



		public async Task<ActionDataDto> DeleteActionData(int actionDataId)
		{
			var actionData = await _actionDataRepo.GetById(actionDataId);

			if (actionData == null)
			{
				throw new Exception($"ActionData with id : {actionDataId} does not exist");
			}
			
			_actionDataRepo.Remove(actionData);
			
			await _actionDataRepo.SaveChangesAsync();

			return _mapper.Map<ActionDataDto>(actionData);
		}
	}
}	
		