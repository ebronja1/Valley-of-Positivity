using System.Linq.Expressions;
using api.Data;
using api.Models;
using api.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public abstract class Repository<TModel> : IRepository<TModel> where TModel : class
{
    private readonly ApplicationDbContext _dbContext;

    public Repository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<TModel>> GetAll()
    {   
        return await _dbContext.Set<TModel>().ToListAsync();
    }

    public async Task<TModel?> GetById(int id)
    {
        return await _dbContext.Set<TModel>().FindAsync(id);
    }       

    public async Task<TModel?> Find(Expression<Func<TModel, bool>> predicate)
    {
        return await _dbContext.Set<TModel>().Where(predicate).FirstOrDefaultAsync();
    }

    public void Add(TModel model)
    {
        _dbContext.Set<TModel>().Add(model);
    }

    public void Update(TModel model)
    {
        _dbContext.Set<TModel>().Update(model);
    }

    public void Remove(TModel model)
    {
        _dbContext.Set<TModel>().Remove(model);
    }

    public Task SaveChangesAsync()
    {
        return _dbContext.SaveChangesAsync();
    }

    public async Task<List<TModel>> GetWithIncludesAsync(params Expression<Func<TModel, object>>[] includeProperties)
    {
        var query = _dbContext.Set<TModel>().AsQueryable();

        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }

        return await query.ToListAsync();
    }

    public async Task<List<TModel>> GetFilteredWithIncludesAsync(
        Expression<Func<TModel, bool>>? filter = null,
        params Expression<Func<TModel, object>>[] includeProperties)
    {
        var query = _dbContext.Set<TModel>().AsQueryable();

        if (filter != null)
        {
            query = query.Where(filter);
        }

        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }

        return await query.ToListAsync();
    }

    public async Task<ResponsePage<TModel>> GetWithIncludesPaginatedAsync(SearchParams searchParams, params Expression<Func<TModel, object>>[] includeProperties)
    {
        var query = _dbContext.Set<TModel>().AsQueryable();

        var size = await query.CountAsync();

        query = query.Skip((searchParams.Page - 1) * searchParams.PageSize)
        .Take(searchParams.PageSize);

        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }

        var data = await query.ToListAsync();

        var responsePage = new ResponsePage<TModel>
        {
            Data = data,
            NumberOfElements = size,
            Page = searchParams.Page,
            PageSize = searchParams.PageSize
        };

        return responsePage;
    }

    public async Task<ResponsePage<TModel>> GetFilteredWithIncludesPaginatedAsync(List<Expression<Func<TModel, bool>>> filters, SearchParams searchParams, params Expression<Func<TModel, object>>[] includeProperties)
    {
        var query = _dbContext.Set<TModel>().AsQueryable();

        foreach (var filter in filters)
        {
            query = query.Where(filter);
        }

        var size = await query.CountAsync();

        query = query.Skip((searchParams.Page - 1) * searchParams.PageSize)
        .Take(searchParams.PageSize);

        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }

        var data = await query.ToListAsync();

        var responsePage = new ResponsePage<TModel>
        {
            Data = data,
            NumberOfElements = size,
            Page = searchParams.Page,
            PageSize = searchParams.PageSize
        };

        return responsePage;
    }
}