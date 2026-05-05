export interface RespuestaAuth {
  message: string;
  usuario?: {
    _id: string;
    codigo: string;
    nombre: string;
    email: string;
    perfil: string;
  };
}

export interface RespuestaPerfil {
  message: string;
  user: {
    _id: string;
    codigo: string;
    nombre: string;
    email: string;
    perfil: string;
    estado: string;
    fechaUltimoAcceso: string;
  };
}
