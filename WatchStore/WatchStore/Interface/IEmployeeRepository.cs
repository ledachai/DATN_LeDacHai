using System.Collections.Generic;
using System;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface IEmployeeRepository
    {
        IEnumerable<People> GetEmployee(string? Search);
        string? CreateEmployee(People people);
        string? UpdateEmployee(People people);
        string? DeleteEmployee(Guid? Peo_ID);
    }
}
