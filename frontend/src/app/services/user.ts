export interface User {
    id: number;
    nombre_usuario: string;
    nombre: string;
    apellido?: string;
    correo: string;
    tipo: string;
    mensaje?: string;
    logeado: boolean
}