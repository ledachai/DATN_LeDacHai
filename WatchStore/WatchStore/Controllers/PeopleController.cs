using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;
using WatchStore.Services;

namespace WatchStore.Controllers
{
    [Route("api/V1/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        IPeopleService _peopleService;
        public PeopleController(IPeopleService peopleService) 
        {
            _peopleService= peopleService;
        }
        /// <summary>
        /// api login
        /// </summary>
        /// <param name="authenticationRequest"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] AuthenticationRequest authenticationRequest)
        {
            var jwtAuthenticationManager = new JwtAuthenticationManager(_peopleService);
            var authResult = jwtAuthenticationManager.Authenticate(authenticationRequest.Peo_Email, authenticationRequest.Peo_Password);
            if (authResult == null)
            {
                return Unauthorized();
            }
            else
                return Ok(authResult);
        }
        [HttpGet]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<People>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetPeople()
        {
            try
            {
                var result = _peopleService.GetAll();
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
        }

        [HttpGet]
        [Route("GetPeopleByRole")]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<People>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetPeopleByRole([FromQuery]int? PageIndex, [FromQuery] int? RowPerPage, [FromQuery] string? Search)
        {
            try
            {
                var result = _peopleService.GetByRole(PageIndex, RowPerPage, Search);
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
        }
        [HttpPost]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertPeople([FromBody] People people)
        {
            try
            {
                var result = _peopleService.CreatePeople(people);
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
        }
        [HttpPut]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdatePeople([FromBody] People people)

        {
            try
            {
                var result = _peopleService.UpdatePeople(people);
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
        }
        [HttpPut]
        //[Authorize]
        [Route("UpdateRole")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdatePeopleRole([FromBody] People people)

        {
            try
            {
                var result = _peopleService.UpdateRole(people);
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
        }
        [HttpDelete("{Peo_ID}")]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult DeletePeople([FromRoute] Guid? Peo_ID)
        {
            try
            {
                var result = _peopleService.DeletePeople(Peo_ID);
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
        }
    }
}
