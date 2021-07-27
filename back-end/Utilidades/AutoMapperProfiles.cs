using AutoMapper;
using back_end.DTOs;
using back_end.Entidades;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Utilidades
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<Genero, GeneroDTO>().ReverseMap();
            CreateMap<GeneroCreacionDTO, Genero>();
            CreateMap<Actor, ActorDTO>().ReverseMap();
            CreateMap<ActorCreacionDTO, Actor>()
                .ForMember(x => x.Foto, options => options.Ignore());
            CreateMap<CineCreacionDTO, Cine>()
                .ForMember(x => x.Ubicacion, x => x.MapFrom(dto =>
                    geometryFactory.CreatePoint(new Coordinate(dto.Longitud, dto.Latitud))
                ));
            CreateMap<Cine, CineDTO>()
                .ForMember(x => x.Latitud, dto => dto.MapFrom(campo => campo.Ubicacion.Y))
                .ForMember(x => x.Longitud, dto => dto.MapFrom(campo => campo.Ubicacion.X))
                .ReverseMap();

            CreateMap<PeliculaCreacionDTO, Pelicula>()
                .ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.PeliculasGeneros, options => options.MapFrom(MappearPeliculasGeneros))
                .ForMember(x => x.PeliculasCines, options => options.MapFrom(MappearPeliculasCines))
                .ForMember(x => x.PeliculasActores, options => options.MapFrom(MappearPeliculasActores));

            CreateMap<Pelicula, PeliculaDTO>()
                .ForMember(x => x.Generos, options => options.MapFrom(MappearPeliculasGeneros))
                .ForMember(x => x.Actores, options => options.MapFrom(MappearPeliculaActores))
                .ForMember(x => x.Cines, options => options.MapFrom(MappearPeliculasCines));

            CreateMap<IdentityUser, UsuarioDTO>();

        }

        private List<CineDTO> MappearPeliculasCines(Pelicula pelicula, PeliculaDTO peliculaDTO)
        {
            var cines = new List<CineDTO>();

            if (pelicula.PeliculasCines != null)
            {
                foreach (var cine in pelicula.PeliculasCines)
                {
                    cines.Add(new CineDTO() { 
                        Id = cine.CineId,
                        Nombre = cine.Cine.Nombre,
                        Latitud = cine.Cine.Ubicacion.Y,
                        Longitud = cine.Cine.Ubicacion.X
                    });
                }
            }

            return cines;
        }

        private List<PeliculaActorDTO> MappearPeliculaActores(Pelicula pelicula, PeliculaDTO peliculaDTO)
        {
            var actores = new List<PeliculaActorDTO>();

            if (pelicula.PeliculasActores != null)
            {
                foreach (var actor in pelicula.PeliculasActores)
                {
                    actores.Add(new PeliculaActorDTO() { 
                        Id = actor.ActorId,
                        Nombre = actor.Actor.Nombre,
                        Foto = actor.Actor.Foto,
                        Personaje = actor.Personaje,
                        Orden = actor.Orden
                    });
                }
            }

            return actores;
        }

        private List<GeneroDTO> MappearPeliculasGeneros(Pelicula pelicula, PeliculaDTO peliculaDTO)
        {
            var generos = new List<GeneroDTO>();

            if(pelicula.PeliculasGeneros != null)
            {
                foreach (var genero in pelicula.PeliculasGeneros)
                {
                    generos.Add(new GeneroDTO() { Id = genero.GeneroId, Nombre = genero.Genero.Nombre });
                }
            }

            return generos;
        }

        private List<PeliculasGeneros> MappearPeliculasGeneros(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasGeneros>();

            if(peliculaCreacionDTO.GenerosIds == null) { return resultado; }

            foreach (var id in peliculaCreacionDTO.GenerosIds)
            {
                resultado.Add(new PeliculasGeneros { GeneroId = id });
            }

            return resultado;
        }

        private List<PeliculasCines> MappearPeliculasCines(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasCines>();

            if (peliculaCreacionDTO.CinesIds == null) { return resultado; }

            foreach (var id in peliculaCreacionDTO.CinesIds)
            {
                resultado.Add(new PeliculasCines { CineId = id });
            }

            return resultado;
        }

        private List<PeliculasActores> MappearPeliculasActores(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasActores>();

            if (peliculaCreacionDTO.Actores == null) { return resultado; }

            foreach (var actor in peliculaCreacionDTO.Actores)
            {
                resultado.Add(new PeliculasActores { ActorId = actor.Id, Personaje = actor.Personaje });
            }

            return resultado;
        }
    }
}
