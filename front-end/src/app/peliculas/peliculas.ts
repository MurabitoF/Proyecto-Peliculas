import { ActorPeliculaDTO } from "../actores/actor";
import { CineDTO } from "../cines/cine";
import { GeneroDTO } from "../generos/genero";

export interface PeliculaCreacionDTO {
  titulo: string;
  enCines: boolean;
  resumen: string;
  fechaLanzamiento: Date;
  trailer: string;
  poster: File;
  generosIds: number[];
  cinesIds: number[];
  actores: ActorPeliculaDTO[];
}

export interface PeliculaDTO {
  id: number;
  titulo: string;
  enCines: boolean;
  resumen: string;
  fechaLanzamiento: Date;
  trailer: string;
  poster: string;
  generos: GeneroDTO[];
  actores: ActorPeliculaDTO[];
  cines: CineDTO[];
  promedioVotos: number;
  votoUsuario: number;
}

export interface PeliculaPostGet{
  generos: GeneroDTO[];
  cines: CineDTO[];
}

export interface PeliculaPutGet{
  pelicula: PeliculaDTO;
  generosSeleccionados: GeneroDTO[];
  generosNoSeleccionados: GeneroDTO[];
  cinesSeleccionados: CineDTO[];
  cinesNoSeleccionados: CineDTO[];
  actores: ActorPeliculaDTO[];
}

export interface LandingPageDTO{
  enCines: PeliculaDTO[];
  proximosEstrenos: PeliculaDTO[];
}
