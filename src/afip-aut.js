//1 Regimen de Comprobantes en linea
const generarComprobantesBoton = document.getElementById('btn_gen_cmp');
generarComprobantesBoton.click();

//2 Selecciono punto de venta y tipo de comprobante
const puntoDeVentaSelect = document.getElementById('puntodeventa');
puntoDeVentaSelect.value = 1;
puntoDeVentaSelect.dispatchEvent(new Event('change'));
setTimeout(() => {
	const continuarButton = document.querySelector('input[value="Continuar >"]');
	continuarButton.click();
}, 500);

//3 Datos de emision 1
const fecha = '28/09/2023';
const fechaEmisionComprobanteSelect = document.querySelector('input[name="fechaEmisionComprobante"]');
fechaEmisionComprobanteSelect.value = fecha;
const conceptosAIncluirSelect = document.getElementById('idconcepto');
conceptosAIncluirSelect.value = 2; //Servicios
conceptosAIncluirSelect.dispatchEvent(new Event('change'));
const periodoFacturadoDesde = document.querySelector('input[name="periodoFacturadoDesde"]');
periodoFacturadoDesde.value = fecha;
const periodoFacturadoHasta = document.querySelector('input[name="periodoFacturadoHasta"]');
periodoFacturadoHasta.value = fecha;
const actividadAsociada = document.getElementById('actiAsociadaId');
actividadAsociada.value = 854990;
setTimeout(() => {
	const continuarButton2 = document.querySelector('input[value="Continuar >"]');
	continuarButton2.click();
}, 500);

// 4 Datos de emision 2
const condicionIva = document.getElementById('idivareceptor');
condicionIva.value = 5; //5 - Consumidor Final
const formaDePago = document.getElementById('formadepago1'); //1 - Contado
formaDePago.checked = true;
setTimeout(() => {
	const continuarButton3 = document.querySelector('input[value="Continuar >"]');
	continuarButton3.click();
}, 500);

//5 Datos de emision 3
const precioDecidido = '4000';
const cantidadDecidida = '2';
const codigo = document.querySelector('input[name="detalleCodigoArticulo"]');
codigo.value = '01';
const descripcion = document.querySelector('textarea[name="detalleDescripcion"]');
descripcion.value = 'Clase Particular Informatica - 1 Hora';
const precioUnitario = document.querySelector('input[name="detallePrecio"]');
precioUnitario.value = precioDecidido;
const cantidad = document.querySelector('input[name="detalleCantidad"]');
cantidad.value = cantidadDecidida;
cantidad.dispatchEvent(new Event('change'));
setTimeout(() => {
	const continuarButton4 = document.querySelector('input[value="Continuar >"]');
	continuarButton4.click();
}, 500);

//6 Resumen de datos Paso 4
const confirmarDatosButon = document.getElementById('btngenerar');
confirmarDatosButon.click();

//Calcular total declarado
const pesosCells = document.querySelectorAll('td[title="Importe Total: Pesos Argentinos"]');
let suma = 0;
pesosCells.forEach((celda) => (suma += parseInt(celda.textContent)));
console.log(suma);

//192000
