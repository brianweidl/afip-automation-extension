/*global chrome*/
import { paso1, paso2, paso3, paso4, paso5, paso6 } from './pasos';
import { isValidDateFormat } from './utils';

const MAXIMO_VALOR_CONSUMIDOR_FINAL = 90000;

function getFirstAndLastDayOfMonth() {
  let today = new Date();
  let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Format the dates as dd/mm/yyyy
  let formattedFirstDay = formatDate(firstDay);
  let formattedLastDay = formatDate(lastDay);

  return {
    firstDay: formattedFirstDay,
    lastDay: formattedLastDay,
  };
}

function formatDate(date: Date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // Pad day and month with leading zeros if necessary
  const parsedDay = day < 10 ? '0' + day : day;
  const parsedMonth = month < 10 ? '0' + month : month;

  return parsedDay + '/' + parsedMonth + '/' + year;
}

const validateAndFormatDate = (inputDate: string) => {
  // Split the input string into an array using '-'
  const dateArray = inputDate.split('-');

  // Reorder the array elements to the desired format (dd, mm, yyyy)
  const formattedDate = dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];

  const inputDateObject = new Date(inputDate);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 6); // Subtract 4 days from the current date

  if (inputDateObject < currentDate || inputDateObject > new Date()) {
    console.error('Error: La fecha debe ser de los ultimos 5 dias.');
    return null; // Or handle the error in a way suitable for your application
  }

  return formattedDate;
};

const validateValor = (inputValor: string) => {
  const valor = parseInt(inputValor);
  if (isNaN(valor)) {
    console.error('Error: Valor inválido');
    return null;
  }
  if (valor < 0 || valor > MAXIMO_VALOR_CONSUMIDOR_FINAL) {
    console.error(
      `Error: Valor debe estar entre 0 y ${MAXIMO_VALOR_CONSUMIDOR_FINAL}`
    );
    return null;
  }
  return valor;
};

const validateCantidad = (inputCantidad: string) => {
  const cantidad = parseInt(inputCantidad);
  if (isNaN(cantidad)) {
    console.error('Error: Cantidad inválida');
    return null;
  }
  if (cantidad < 1 || cantidad > 5) {
    console.error('Error: Cantidad debe ser mayor a 0 y menor que 5');
    return null;
  }
  return cantidad;
};

const facturarButton = document.getElementById('empezar-button');

facturarButton?.addEventListener('click', () => {
  const fechaElement = document.getElementById(
    'fecha-factura'
  ) as HTMLInputElement;
  const valorElement = document.getElementById(
    'valor-factura'
  ) as HTMLInputElement;

  const cantidadElement = document.getElementById(
    'cantidad'
  ) as HTMLInputElement;

  const error = document.getElementById('error') as HTMLParagraphElement;

  const formatFecha = validateAndFormatDate(fechaElement.value);
  const formatValor = validateValor(valorElement.value);
  const formatCantidad = validateCantidad(cantidadElement.value);

  if (!formatFecha) {
    error.textContent = 'Error: Fecha inválida, valor o cantidad inválido';
    console.error('Error: Fecha inválida, valor o cantidad inválido');
    return;
  }
  console.log('Fecha: ', formatFecha);
  console.log('Valor: ', formatValor);
  console.log('Cantidad: ', formatCantidad);
  error.textContent = '';

  // Facturar
  executeScriptInCurrentTab(paso1);
  setTimeout(() => {
    executeScriptInCurrentTab(paso2);
    setTimeout(() => {
      executeScriptInCurrentTab(paso3, [formatFecha]);
      setTimeout(() => {
        executeScriptInCurrentTab(paso4);
        setTimeout(() => {
          executeScriptInCurrentTab(paso5, [formatValor || '10000', formatCantidad || '2']);
          setTimeout(() => {
            executeScriptInCurrentTab(paso6);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
});

const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

const executeScriptInCurrentTab = async (
  executeFunction: (...args: any) => any,
  args?: any[]
) => {
  const tab = await getCurrentTab();
  await chrome.scripting.executeScript({
    target: { tabId: tab.id as number },
    func: executeFunction,
    args: args || [], // pass any parameters to function
  });
};

const clickConsultasButton = () => {
  const consultasButton = document.getElementById('btn_consultas');
  consultasButton?.click();
};

const selectDatesAndClickBuscar = (firstDay: string, lastDay: string) => {
  const fechaDesde = document.querySelector(
    'input[name="fechaEmisionDesde"]'
  ) as HTMLInputElement;
  const fechaHasta = document.querySelector(
    'input[name="fechaEmisionHasta"]'
  ) as HTMLInputElement;
  fechaDesde.value = firstDay;
  fechaHasta.value = lastDay;

  const buscarButton = document.querySelector(
    'input[value="Buscar"]'
  ) as HTMLButtonElement;
  buscarButton.click();
};

const getTotalDelMes = () => {
  const pesosCells = document.querySelectorAll(
    'td[title="Importe Total: Pesos Argentinos"]'
  );
  let suma = 0;
  pesosCells.forEach((celda) => (suma += parseInt(celda.textContent || '0')));
  console.log(suma);
};

const getFacturasTotalMesButton = document.getElementById('ver-total-button');

getFacturasTotalMesButton?.addEventListener('click', () => {
  const { firstDay, lastDay } = getFirstAndLastDayOfMonth();
  executeScriptInCurrentTab(clickConsultasButton);
  setTimeout(() => {
    executeScriptInCurrentTab(selectDatesAndClickBuscar, [firstDay, lastDay]);
    setTimeout(() => {
      executeScriptInCurrentTab(getTotalDelMes);
    }, 1000);
  }, 1000);
});
