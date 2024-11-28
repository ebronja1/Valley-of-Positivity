using AutoMapper;

namespace api.Mappers;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<api.Models.SearchParams, Dtos.Search.SearchParamsDto>().ReverseMap();
        // Mapping ActionDataUpdateDto -> ActionData
        CreateMap<api.Dtos.ActionData.ActionDataUpdateDto, api.Models.ActionData>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null)); // Ensure only non-null values are mapped
        CreateMap<api.Models.ActionData, Dtos.ActionData.ActionDataCreateDto>().ReverseMap();
        CreateMap<api.Models.ActionData, Dtos.ActionData.ActionDataDto>().ReverseMap();
        CreateMap<api.Models.SearchActionDataParams, Dtos.ActionData.SearchActionDataParamsDto>();
        CreateMap(typeof(api.Models.ResponsePage<>), typeof(Dtos.Search.ResponsePageDto<>)).ReverseMap();
    }
}