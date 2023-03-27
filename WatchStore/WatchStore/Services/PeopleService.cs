using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Services
{
    public class PeopleService : IPeopleService
    {
        IPeopleRepository _repository;
        public PeopleService(IPeopleRepository repository)
        {
            _repository = repository;
        }
        public string CreatePeople(People people)
        {
            return _repository.CreatePeople(people);
        }

        public string DeletePeople(Guid? Peo_ID)
        {
            return _repository.DeletePeople(Peo_ID);
        }
        public IEnumerable<People> GetAll()
        {
            return _repository.GetAll();
        }

        public IEnumerable<People> GetByRole(int? PageIndex, int? RowPerPage, string? Search)
        {
            return _repository.GetByRole(PageIndex, RowPerPage, Search);
        }

        public string UpdatePeople(People people)
        {
            return _repository.UpdatePeople(people);
        }

        public string UpdateRole(People people)
        {
            return _repository.UpdateRole(people);
        }
    }
}
