using AcademyModel.Entities;
using AcademyModel.Extensions;
using AutoMapper;
using CodeAcademyWeb.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeAcademyWeb.Profiles
{
	public class InstructorProfile : Profile
	{
		public InstructorProfile()
		{
			CreateMap<Instructor, InstructorDTO>()
        .ForMember(dto => dto.DateOfBirth, opt => opt.MapFrom(instructor => instructor.DateOfBirth.ToLocalDateString()));

			CreateMap<InstructorDTO, Instructor>()
        .ForMember(instructor => instructor.DateOfBirth, opt => opt.MapFrom(dto => dto.DateOfBirth.Parse()));
		}	
	}
}
