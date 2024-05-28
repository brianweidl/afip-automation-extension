//1 Cliquear regimen de Comprobantes en linea
export const paso1 = () => {
  const generarComprobantesBoton = document.getElementById('btn_gen_cmp');
  if (!generarComprobantesBoton) {
    throw new Error(
      'No se encontró el botón de "Generar Comprobantes - Paso 1"'
    );
  }
  generarComprobantesBoton.click();
};

//2 Selecciono punto de venta y tipo de comprobante
export const paso2 = () => {
  const puntoDeVentaSelect = document.getElementById(
    'puntodeventa'
  ) as HTMLSelectElement;
  if (!puntoDeVentaSelect) {
    throw new Error('No se encontró el select de "Punto de Venta"');
  }
  puntoDeVentaSelect.value = '1';
  puntoDeVentaSelect.dispatchEvent(new Event('change'));
  setTimeout(() => {
    const continuarButton = document.querySelector(
      'input[value="Continuar >"]'
    ) as HTMLInputElement;
    if (!continuarButton) {
      throw new Error('No se encontró el botón de "Continuar - Paso 2"');
    }
    continuarButton.click();
  }, 500);
};

//3 Datos de emision 1
export const paso3 = (fecha: string) => {
  // const fecha = '28/09/2023';
  if (!fecha) {
    throw new Error('Fecha no ingresada');
  }

  const datePattern =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

  if (!datePattern.test(fecha)) {
    throw new Error('Formato de fecha inválido');
  }

  //Chequear que sea de los ultimos 7 dias

  const fechaEmisionComprobanteSelect = document.querySelector(
    'input[name="fechaEmisionComprobante"]'
  ) as HTMLInputElement;
  fechaEmisionComprobanteSelect.value = fecha;

  const conceptosAIncluirSelect = document.getElementById(
    'idconcepto'
  ) as HTMLSelectElement;
  conceptosAIncluirSelect.value = '2'; //Servicios
  conceptosAIncluirSelect.dispatchEvent(new Event('change'));

  const periodoFacturadoDesde = document.querySelector(
    'input[name="periodoFacturadoDesde"]'
  ) as HTMLInputElement;
  periodoFacturadoDesde.value = fecha;

  const periodoFacturadoHasta = document.querySelector(
    'input[name="periodoFacturadoHasta"]'
  ) as HTMLInputElement;
  periodoFacturadoHasta.value = fecha;

  const actividadAsociada = document.getElementById(
    'actiAsociadaId'
  ) as HTMLInputElement;
  actividadAsociada.value = '854990';

  setTimeout(() => {
    const continuarButton2 = document.querySelector(
      'input[value="Continuar >"]'
    ) as HTMLInputElement;

    continuarButton2.click();
  }, 500);
};

//4 Datos de emision 2
export const paso4 = () => {
  const condicionIva = document.getElementById(
    'idivareceptor'
  ) as HTMLInputElement;
  condicionIva.value = '5'; //5 - Consumidor Final

  const formaDePago = document.getElementById(
    'formadepago1'
  ) as HTMLInputElement; //1 - Contado
  formaDePago.checked = true;

  setTimeout(() => {
    const continuarButton3 = document.querySelector(
      'input[value="Continuar >"]'
    ) as HTMLInputElement;
    continuarButton3.click();
  }, 500);
};

//5 Datos de emision 3
export const paso5 = (
  precioDecidido: string,
  cantidadDecidida: string,
  descripcion = 'Clase Particular Informatica - 1 Hora'
) => {
  //const precioDecidido = '4000';
  //const cantidadDecidida = '2';
  const codigo = document.querySelector(
    'input[name="detalleCodigoArticulo"]'
  ) as HTMLInputElement;
  codigo.value = '01';

  const detalleDescripcion = document.querySelector(
    'textarea[name="detalleDescripcion"]'
  ) as HTMLInputElement;
  detalleDescripcion.value = descripcion;

  const precioUnitario = document.querySelector(
    'input[name="detallePrecio"]'
  ) as HTMLInputElement;
  precioUnitario.value = precioDecidido;

  const cantidad = document.querySelector(
    'input[name="detalleCantidad"]'
  ) as HTMLInputElement;
  cantidad.value = cantidadDecidida;
  cantidad.dispatchEvent(new Event('change'));

  setTimeout(() => {
    const continuarButton4 = document.querySelector(
      'input[value="Continuar >"]'
    ) as HTMLInputElement;
    continuarButton4.click();
  }, 500);
};

//6 Resumen de datos
export const paso6 = () => {
  const confirmarDatosButon = document.getElementById(
    'btngenerar'
  ) as HTMLButtonElement;
  confirmarDatosButon.click();
};
