using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ActionData;
using api.Models;

namespace api.Mappers
{
    public static class ActionDataMapper
    {
        public static ActionDataDto ToActionDataDto(this ActionData actionDataModel)
        {
            return new ActionDataDto
            {
                Id = actionDataModel.Id,
                Action = actionDataModel.Action,
                ElementClass = actionDataModel.ElementClass,
                Quantity = actionDataModel.Quantity,
                Timestamp = actionDataModel.Timestamp,
                AppUserId = actionDataModel.AppUserId,
            };
        }

        public static ActionData ToActionDataFromCreateDto (this ActionDataCreateDto actionDataCreateDto)
        {
            return new ActionData
            {
                Action = actionDataCreateDto.Action,
                ElementClass = actionDataCreateDto.ElementClass,
                Quantity = actionDataCreateDto.Quantity,
                AppUserId = string.Empty,
            };
        }
        public static void UpdateFromDto(this ActionData actionData, ActionDataUpdateDto dto)
        {
            if (dto.Action != null)
            {
                actionData.Action = dto.Action;
            }
            if (dto.ElementClass != null)
            {
                actionData.ElementClass = dto.ElementClass;
            }
            if (dto.Timestamp.HasValue)
            {
                actionData.Timestamp = dto.Timestamp.Value;
            }
            if (dto.Quantity.HasValue)
            {
                actionData.Quantity = dto.Quantity.Value;
            }
        }
    }
}