using AcademyModel.Entities;
using AcademyModel.Services;
using AutoMapper;
using CodeAcademyWeb.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeAcademyWeb.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class InstructorController : Controller
	{
		private IPeopleService service;
		private IMapper mapper;
		public InstructorController(IPeopleService service, IMapper mapper)
		{
			this.service = service;
			this.mapper = mapper;
		}
		[HttpGet]
		public IActionResult GetAllInstructors()
		{
			var instructor = service.GetInstructors();
			var instructorDTO = mapper.Map<IEnumerable<InstructorDTO>>(instructor);
			return Ok(instructorDTO);
		}

		[HttpPost]
		public IActionResult Create(InstructorDTO i)
		{
			var instructor = mapper.Map<Instructor>(i);
			service.CreateInstructor(instructor);
			var instructorDTO = mapper.Map<InstructorDTO>(instructor);
			return Created($"/api/Instructor/{instructorDTO.Id}", instructorDTO);
		}

		[HttpGet]
		[Route("{id}")]
		public IActionResult GetById(long id)
		{
			var instructor = service.GetInstructorById(id);
			var instructorDTO = mapper.Map<InstructorDTO>(instructor);
			return Ok(instructorDTO);
		}

		[HttpPut]
		public IActionResult UpdateInstructor(InstructorDTO instructorDTO)
		{
			var instructor = mapper.Map<Instructor>(instructorDTO);
			instructor = service.UpdateInstructor(instructor);
			var resDTO = mapper.Map<InstructorDTO>(instructor);
			return Created($"/api/courses/{resDTO.Id}", resDTO);
		}

		[HttpDelete]
		[Route("{id}")]
		public IActionResult RemoveInstructor(long id)
		{
			var instructor =service.GetInstructorById(id);
			service.DeleteInstructor(instructor);
			var resDTO = mapper.Map<InstructorDTO>(instructor);
			return Ok(resDTO);
		}
	}
}
