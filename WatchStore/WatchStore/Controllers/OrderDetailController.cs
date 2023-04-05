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
        [HttpGet]
        [Route("{year}")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<ThongKe>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetThongKes([FromQuery] int? year)
        {
            try
            {
                var result = _orderDetailService.GetThongKes(year);
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
        [Route("{Order_ID}")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertOrderDetail([FromRoute] Guid? Order_ID)
        {
            try
            {
                var result = _orderDetailService.InsertOrderDetail(Order_ID);
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
