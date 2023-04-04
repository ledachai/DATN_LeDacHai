using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using WatchStore.Entities;
using WatchStore.Interface;
using WatchStore.Services;

namespace WatchStore.Controllers
{
    //[Authorize]
    [Route("api/V1/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        IOrderDetailService _orderDetailService;
        public OrderDetailController(IOrderDetailService orderDetailService)
        {
            _orderDetailService = orderDetailService;
        }
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<OrderDetail>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllOrders()
        {
            try
            {
                var result = _orderDetailService.GetAllOrders();
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
        }
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertOrderDetail([FromBody] OrderDetail orderDetail)
        {
            try
            {
                var result = _orderDetailService.InsertOrderDetail(orderDetail);
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
        }
    }
}
