import { register, read } from './modules/operaciones.js';

const [operacion] = process.argv.slice(2);

if (operacion === 'register') {  
  const [nombreAnimal, edad, tipo, color, enfermedad] = process.argv.slice(3);
  register({ nombreAnimal, edad, tipo, color, enfermedad });
}
if(operacion === 'read') {
  read();
}
if (operacion !== 'register' && operacion !== 'read') { 
  console.error('Operación no válida');
}
