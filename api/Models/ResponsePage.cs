namespace api.Models;

public class ResponsePage<TModel> where TModel : class
{
    public required List<TModel> Data { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int NumberOfElements { get; set; }
}