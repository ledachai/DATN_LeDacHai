using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Services
{
    public class EmployeeService:IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public IEnumerable<People> GetEmployee(string? Search)
        {
            return _employeeRepository.GetEmployee(Search);
        }

        public string CreateEmployee(People people)
        {
            return _employeeRepository.CreateEmployee(people);
        }

        public string UpdateEmployee(People people)
        {
            return _employeeRepository.UpdateEmployee(people);
        }

        public string DeleteEmployee(Guid? Peo_ID)
        {
            return _employeeRepository.DeleteEmployee(Peo_ID);
        }
        public IEnumerable<People> GetPeopleByID(Guid? Peo_ID)
        {
            return _employeeRepository.GetPeopleByID(Peo_ID);
        }
    }
}
