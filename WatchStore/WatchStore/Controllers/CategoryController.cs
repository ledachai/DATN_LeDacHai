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
    public class CategoryController : ControllerBase
    {
        ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        /// <summary>
        /// api lấy ra các hãng đồng hồ
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type:typeof(List<Category>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetCategory()
        {
            try
            {
                var result = _categoryService.GetCategories();
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
        /// <summary>
        /// api thêm mới hãng đồng hồ
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        [HttpPost]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertCategory([FromBody] Category category)
        {
            try
            {
                var result = _categoryService.CreateCategory(category);
                // Xử lý trả về của DB
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
        public IActionResult UpdateCategory([FromBody] Category category)
        {
            try
            {
                var result = _categoryService.UpdateCategory(category);

                // Xử lý giá trị trả về từ db
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }
        [HttpDelete("{Cate_ID}")]
        //[Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteCategoryByID([FromRoute] string? Cate_ID)
        {
            try
            {
                var result = _categoryService.DeleteCategory(Cate_ID);

                // Xử lý giá trị trả về từ db
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, Cate_ID);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }
    }
}
