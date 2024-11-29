// Asegúrate de que el archivo tenga la extensión .ts y no .ts.ts o similar
export interface RoleAssignmentView {
  id: number;
  roleEnum: string;
  facultadNombre: string;
  escuelaNombre: string;
  permissions: string[];
  fechaCreacion: string;
  estado: string;
}
