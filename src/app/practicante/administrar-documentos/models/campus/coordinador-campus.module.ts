// campus.model.ts
export class Campus {
  id: number;
  sede: string;

  constructor(id: number = 0, sede: string = '') {
      this.id = id;
      this.sede = sede;
  }
  }