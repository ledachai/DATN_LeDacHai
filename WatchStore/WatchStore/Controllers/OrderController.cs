using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System;
using WatchStore.Entities;
using WatchStore.Interface;
using WatchStore.Services;
using Microsoft.AspNetCore.Authorization;

namespace WatchStore.Controllers
{
    [Authorize]
    [Route("api/V1/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet]
        [Route("GetAllOrder")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Order>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllOrders()
        {
            try
            {
                var result = _orderService.GetAllOrders();
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
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Order>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetOrder([FromQuery] Guid? Peo_ID)
        {
            try
            {
                var result = _orderService.GetOrderByPeople(Peo_ID);
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
        public IActionResult InsertOrder([FromBody] Order order)
        {
            try
            {
                var result = _orderService.CreateOrder(order);
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
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateOrder([FromQuery] Guid? Order_ID)
        {
            try
            {
                var result = _orderService.UpdateOrder(Order_ID);
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
        [HttpPut]
        [Route("UpdateStatus")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateStatus([FromQuery] Guid? Order_ID)
        {
            try
            {
                var result = _orderService.UpdateStatus(Order_ID);
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
