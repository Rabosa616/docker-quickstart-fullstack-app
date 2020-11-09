﻿using System.Collections.Generic;

using HMI.API.Helpers;
using HMI.API.Services.OpcUa.ApiModels.Sensor;
using HMI.API.Services.OpcUa.Interfaces;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HMI.API.Controllers
{
    /// <summary>
    /// The sensor controller.
    /// </summary>
    [Route("sensor")]
    [Authorize]
    [ApiController]
    public class SensorController : BaseController
    {
        /// <summary>
        /// The logger.
        /// </summary>
        private readonly ILogger<SensorController> logger;

        /// <summary>
        /// The sensor service.
        /// </summary>
        private readonly ISensorService sensorService;

        /// <summary>
        /// Initializes a new instance of the <see cref="SensorController"/> class.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="sensorService">The sensor service.</param>
        public SensorController(ILogger<SensorController> logger, ISensorService sensorService)
        {
            this.logger = logger;
            this.sensorService = sensorService;
        }

        /// <summary>
        /// Get all sensors for an specified module.
        /// </summary>
        /// <param name="moduleId" example="1"> The module unique identifyer. </param>
        /// <returns>
        /// The <see cref="IActionResult"/>.
        /// </returns>
        /// <response code="200">Returns the sensor for the module.</response>
        /// <response code="500">An internal error occurred.</response>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<SensorResponse>> GetAll(int moduleId)
        {
            this.logger.LogDebug($"Get all sensors for the module with sensorId {moduleId} request received.");
            return this.Ok(this.sensorService.GetAllByModule(moduleId));
        }

        /// <summary>
        /// Get a sensor for an specified id.
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <returns>
        /// The <see cref="IActionResult"/>.
        /// </returns>
        /// <response code="200">Returns the sensor.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response> 
        /// <response code="500">An internal error occurred.</response>
        [HttpGet("{sensorId:int}")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<SensorResponse>> GetbyId(int sensorId)
        {
            this.logger.LogDebug($"Get the sensorId {sensorId} request received.");
            return this.Ok(this.sensorService.GetById(sensorId));
        }

        /// <summary>
        /// Create a new sensor for the specified module.
        /// </summary>
        /// <param name="moduleId" example="1">The module unique identifyer. </param>
        /// <param name="sensorName" example="Test">The sensor name.</param>
        /// <returns>
        /// The <see cref="IActionResult"/>.
        /// </returns>
        /// <response code="200">Returns the sensor for the module.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public ActionResult<SensorResponse> Add(int moduleId, string sensorName)
        {
            this.logger.LogDebug($"Get all sensors for the module with sensorId {moduleId} request received.");
            return this.Ok(this.sensorService.Add(moduleId, sensorName));
        }

        /// <summary>
        /// Delete the specifed sensor.
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <returns>The <see cref="IActionResult"/>.</returns> 
        /// <response code="200">Returns the sensor for the module.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpDelete("{sensorId:int}")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public IActionResult Delete(int sensorId)
        {
            this.logger.LogDebug($"Delete sensor with sensorId: {sensorId} request received.");
            this.sensorService.Delete(sensorId);
            return this.Accepted();
        }

        /// <summary>
        /// Get configuration for the specified sensor.
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <returns>The <see cref="IActionResult"/>.</returns>
        /// <response code="200">Returns the sensor for the module.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpGet("{sensorId:int}/config")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public ActionResult<ConfigResponse> Config(int sensorId)
        {
            this.logger.LogDebug($"Get the sensor configuration with sensorId: {sensorId} request received.");
            return this.Ok(this.sensorService.Config(sensorId));
        }

        /// <summary>
        /// Saves the configuration for a specified sensor. 
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <param name="request">The new configuration request.</param>
        /// <returns>
        /// The <see cref="IActionResult"/>.
        /// </returns>
        /// <response code="202">If the sensor configuration was saved.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpPut("{sensorId:int}/config")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateConfig(int sensorId, UpdateConfigRequest request)
        {
            this.logger.LogDebug($"Update the configuration for the sensor with sensorId: {sensorId} request received.");
            this.sensorService.Config(sensorId, request);
            return this.Accepted();
        }

        /// <summary>
        /// The get extrinsic calibration.
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <returns>The <see cref="IActionResult"/>.</returns>
        /// <response code="200">Returns the sensor for the module.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpGet("{sensorId:int}/extrinsic-calibration")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public ActionResult<ExtrinsicCalibResponse> ExtrinsicCalibration(int sensorId)
        {
            this.logger.LogDebug($"Get the extrinsic calibration for the sensor with sensorId: {sensorId} request received.");
            return this.Ok(this.sensorService.ExtrinsicCalibration(sensorId));
        }

        /// <summary>
        /// The set extrinsic calibration.
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <param name="request">The request.</param>
        /// <returns>The <see cref="IActionResult"/>.</returns>
        /// <response code="202">If the sensor configuration was saved.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpPut("{sensorId:int}/extrinsic-calibration")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateExtrinsicCalibration(int sensorId, UpdateExtrCalibRequest request)
        {
            this.logger.LogDebug($"Update the extrinsic calibration for the sensor with sensorId: {sensorId} request received.");
            this.sensorService.ExtrinsicCalibration(sensorId, request);
            return this.Accepted();
        }

        /// <summary>
        /// Get the current calibration reference.
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <returns>The <see cref="IActionResult"/>.</returns>
        /// <response code="200">Returns the sensor for the module.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpGet("{sensorId:int}/reference")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public ActionResult<ReferenceResponse> Reference(int sensorId)
        {
            this.logger.LogDebug($"Get the reference for the sensor with sensorId: {sensorId} request received.");
            return this.Accepted(this.sensorService.Reference(sensorId));
        }

        /// <summary>
        /// Send a request to vision module to validate and update the new reference.
        /// </summary> 
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <param name="request">The request.</param>
        /// <returns>
        /// If the reference is correct
        /// </returns>
        /// <response code="202">If the calibration is valid and updated.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpPut("{sensorId:int}/reference")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateReference(int sensorId, UpdateReferenceRequest request)
        {
            this.logger.LogDebug($"Get all module request received.");
            this.sensorService.Reference(sensorId, request);
            return this.Accepted();
        }

        /// <summary>
        /// Send a request to vision module to clear the reference calibration configured for the sensor.
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <returns>The <see cref="IActionResult"/>.</returns>
        /// <response code="202">If the reference was cleared.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpDelete("{sensorId:int}/reference")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public IActionResult ClearReference(int sensorId)
        {
            this.logger.LogDebug($"Clear references for the sensor with sensorId: {sensorId} request received.");
            this.sensorService.ClearReference(sensorId);
            return this.Accepted();
        }

        /// <summary>
        /// Send a request to vision to provide feedback of the current calibration.
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <returns>
        /// The <see cref="IActionResult"/>.
        /// </returns>
        /// <response code="202">If the calibration is valid and updated.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpPost("{sensorId:int}/check-calibration")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public ActionResult<bool> CheckCalibration(int sensorId)
        {
            this.logger.LogDebug($"Check calibration request received.");
            return this.Accepted(this.sensorService.CheckCalibration(sensorId));
        }

        /// <summary>
        /// The recalculate calibration. TODO: not sure about what does this method
        /// </summary>
        /// <param name="sensorId" example="1">The sensor unique identifyer.</param>
        /// <returns>
        /// The <see cref="IActionResult"/>.
        /// </returns>
        /// <response code="202">If the calibration is valid and updated.</response>
        /// <response code="404">If the sensor for the specified id does not exist.</response>  
        /// <response code="500">An internal error occurred.</response>
        [HttpPost("{sensorId:int}/recalculate-calibration")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public ActionResult<bool> RecalculateCalibration(int sensorId)
        {
            this.logger.LogDebug($"Get all module request received.");
            return this.Accepted(this.sensorService.RecalculateCalib(sensorId));
        }
    }
}
