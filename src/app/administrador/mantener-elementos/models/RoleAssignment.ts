export interface RoleAssignment {
  roleEnum: string;
  facultadId: number;  // Quitamos el null
  escuelaId: number;   // Quitamos el null
  permissions: Set<string>;
}
