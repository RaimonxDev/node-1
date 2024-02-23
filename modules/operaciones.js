import fs from 'fs';
const RUTA_DB = './db.json';

export const register = async ({ nombreAnimal, edad, tipo, color, enfermedad }) => {

  const animal = {
    nombre: nombreAnimal,
    edad: edad,
    tipo: tipo,
    color: color,
    enfermedad: enfermedad
  }

  Object.keys(animal).forEach(key => { 
    if (!animal[key]) {
      throw new Error(`El campo "${key}" es obligatorio`);
    }
  });

  const data = await getData();

  try {
    let body = []
    data ? body = [...data, animal] : body = [animal];
    await fs.promises.writeFile(RUTA_DB, JSON.stringify(body, null, 2));
    console.log('El animal ha sido registrado con éxito');
  }
  catch (error) {
    console.error('Error al guardar el archivo', error);
  }

}

export const read = async () => {
  try {
    const data = await getData()
    data.length && data.forEach(data => {
      console.table(`
      Nombre: ${data.nombre}, 
      Edad: ${data.edad}, 
      Tipo: ${data.tipo}, 
      Color: ${data.color}, 
      Enfermedad: ${data.enfermedad}`
      );
    });
  }
  catch (error) {
    console.error('No existe ningun registro creado', error);
  }
}

const getData = async () => { 
  try {
    const data = await fs.promises.readFile(RUTA_DB);
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}