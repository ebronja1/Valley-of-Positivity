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
                Id = string.Empty,
                Action = actionDataCreateDto.Action,
                ElementClass = actionDataCreateDto.ElementClass,
                Quantity = actionDataCreateDto.Quantity,
                AppUserId = string.Empty,
            };
        }
        public static ActionData ToActionDataFromUpdateDto (this ActionDataUpdateDto actionDataUpdateDto)
        {
            return new ActionData
            {
                Id = string.Empty,
                Action = actionDataUpdateDto.Action,
                ElementClass = actionDataUpdateDto.ElementClass,
                Quantity = actionDataUpdateDto.Quantity,
                AppUserId = string.Empty,
            };
        }

    }
}