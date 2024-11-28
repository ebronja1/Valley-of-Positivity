using api.Dtos.Search;

namespace api.Dtos.ActionData;

public class SearchActionDataParamsDto : SearchParamsDto
{
    public DateTime? Timestamp { get; set; }

    public string ElementClass { get; set; } = string.Empty;
    public string AppUserId { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public bool IsDecsending { get; set; } = false;
}