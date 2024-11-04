const notasUsuarios = {};

function gestionarNotas() {
    let opcion = prompt(
        "Elige una opción:\n" +
        "1. Insertar nota\n" +
        "2. Eliminar una nota específica\n" +
        "3. Salir"
    );

    switch (opcion) {
        case "1":
            insertarNota();
            break;
        case "2":
            eliminarNota();
            break;
        case "3":
            alert("Saliendo del programa.");
            break;
        default:
            alert("Opción no válida. Inténtalo de nuevo.");
    }
}

function insertarNota() {
    let usuario = prompt("Introduce el nombre del usuario:");
    let nota = parseFloat(prompt("Introduce una nota entre 0 y 10:"));
    let mensaje;

    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert("Por favor, introduce un número válido entre 0 y 10.");
        return;
    }

    // Determinar el mensaje en función de la nota
    if (nota >= 0 && nota <= 2.99) {
        mensaje = "Muy deficiente";
    } else if (nota >= 3 && nota <= 4.99) {
        mensaje = "Insuficiente";
    } else if (nota >= 5 && nota <= 5.99) {
        mensaje = "Suficiente";
    } else if (nota >= 6 && nota <= 6.99) {
        mensaje = "Bien";
    } else if (nota >= 7 && nota <= 8.99) {
        mensaje = "Notable";
    } else if (nota >= 9 && nota <= 10) {
        mensaje = "Sobresaliente";
    }

    // Crear un objeto para la nota y el mensaje, y añadirlo al array del usuario
    if (!notasUsuarios[usuario]) {
        notasUsuarios[usuario] = [];
    }
    notasUsuarios[usuario].push({ nota, mensaje });
    alert(`Nota ${nota} (${mensaje}) añadida para el usuario ${usuario}.`);

    actualizarListado();
}

function eliminarNota() {
    let usuario = prompt("Introduce el nombre del usuario:");

    if (!notasUsuarios[usuario]) {
        alert(`No se encontraron notas para el usuario ${usuario}.`);
        return;
    }

    let indiceNota = parseInt(prompt(`Introduce el índice de la nota que quieres eliminar (0 a ${notasUsuarios[usuario].length - 1}):`));

    if (isNaN(indiceNota) || indiceNota < 0 || indiceNota >= notasUsuarios[usuario].length) {
        alert("Índice no válido.");
        return;
    }

    let notaEliminada = notasUsuarios[usuario].splice(indiceNota, 1);
    alert(`Nota ${notaEliminada[0].nota} (${notaEliminada[0].mensaje}) eliminada para el usuario ${usuario}.`);

    actualizarListado();
}

function actualizarListado() {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = ""; // Limpiar el contenido anterior

    for (const usuario in notasUsuarios) {
        const liUsuario = document.createElement("li");
        liUsuario.textContent = `${usuario}: `;

        // Crear el texto de las notas para cada usuario
        const notas = notasUsuarios[usuario].map((item, index) => `Nota: ${item.nota} (${item.mensaje})`);
        const notasTexto = notas.join(", ");
        liUsuario.textContent += notasTexto;

        listaUsuarios.appendChild(liUsuario);
    }
}
