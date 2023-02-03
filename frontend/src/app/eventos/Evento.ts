export class Evento {

  constructor(public id: number,public nombre: string, public categoria: Categoria, public lugar: string, public direccion: string, public fechaInic: Date, public fechaFina: Date,public modalidad: Modalidad,public usuario: number)
  {

  }
}

export class Categoria{
  llave: string;
  valor: number

  constructor(
      llave: string,
      valor:number
  ){
      this.llave = llave,
      this.valor = valor
  }
}

export class Modalidad{
  llave: string;
  valor: number

  constructor(
      llave: string,
      valor:number
  ){
      this.llave = llave,
      this.valor = valor
  }
}
