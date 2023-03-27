using System;
using System.Collections;
using System.Collections.Generic;
using WatchStore.Entities;

namespace WatchStore.Interface
{
    public interface IPeopleService
    {
        IEnumerable<People> GetAll();
        IEnumerable<People> GetByRole(int? PageIndex, int? RowPerPage, string? Search);
        string? CreatePeople(People people);
        string? UpdatePeople(People people);
        string? DeletePeople(Guid? Peo_ID);
        string? UpdateRole(People people);
    }
}
