function mostrarSidebar() {
    document.getElementById("sidebar").style.left = "0px";
    document.getElementById("abrir").style.display = "none";
    ocultarVentanaEmergente();
}

function ocultarSidebar() {
    document.getElementById("sidebar").style.left = "-340px";
    document.getElementById("abrir").style.display = "inherit";
}

