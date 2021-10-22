using AcademyModel.BuisnessLogic;
using AcademyModel.Entities;
using AcademyModel.Extensions;
using AutoMapper;
using CodeAcademyWeb.DTOs;

namespace CodeAcademyWeb.Profiles
{
	public class StudentProfile : Profile
	{
		public StudentProfile()
		{
			CreateMap<Student, StudentDTO>()
        .ForMember(dto => dto.DateOfBirth, opt => opt.MapFrom(student => student.DateOfBirth.ToLocalDateString()));

			CreateMap<StudentDTO, Student>()
        .ForMember(student => student.DateOfBirth, opt => opt.MapFrom(dto => dto.DateOfBirth.Parse()));
			
			CreateMap<EnrollData, EnrollDataDTO>();
			CreateMap<EnrollDataDTO, EnrollData>();

			CreateMap<Enrollment, EnrollmentDTO>();
			CreateMap<EnrollmentDTO, Enrollment>();
		}		
	}
}
