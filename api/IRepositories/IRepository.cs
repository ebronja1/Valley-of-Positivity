using System.Linq.Expressions;
using api.Models;

namespace api.IRepositories;

public interface IRepository<TModel> where TModel : class
{
    Task<TModel?> GetById(int id);
    Task<List<TModel>> GetAll();
    Task<List<TModel>> GetWithIncludesAsync(params Expression<Func<TModel, object>>[] includeProperties);

    Task<ResponsePage<TModel>> GetWithIncludesPaginatedAsync(SearchParams searchParams,
        params Expression<Func<TModel, object>>[] includeProperties);

    Task<ResponsePage<TModel>> GetFilteredWithIncludesPaginatedAsync(List<Expression<Func<TModel, bool>>> filters,
        SearchParams searchParams, params Expression<Func<TModel, object>>[] includeProperties);

    Task<List<TModel>> GetFilteredWithIncludesAsync(Expression<Func<TModel, bool>>? filter = null,
        params Expression<Func<TModel, object>>[] includeProperties);

    Task<TModel?> Find(Expression<Func<TModel, bool>> predicate);
    void Add(TModel model);
    void Update(TModel model);
    void Remove(TModel model);
    Task SaveChangesAsync();
}