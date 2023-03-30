using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;

namespace WatchStore.Controllers
{
    //[Authorize]
    [Route("api/V1/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        [HttpGet("{Pro_ID}")]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Comment>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetComment([FromRoute] string? Pro_ID)
        {
            try
            {
                var result = _commentService.GetComments(Pro_ID);
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
        public IActionResult InsertComment([FromBody] Comment comment)
        {
            try
            {
                var result = _commentService.CreateComments(comment);
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
