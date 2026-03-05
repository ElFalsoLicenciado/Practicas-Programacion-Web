document.getElementById("btnVideo").addEventListener("click", abrirVideo);

function abrirVideo() {

    let ancho = 800;
    let alto = 450;

    let izquierda = (screen.width-ancho)/3 ;
    let arriba = (screen.height-alto)/3;

    window.open(
        "informes.html",
        "Informes",`
        width=${ancho},
        height=${alto},
        left=${izquierda},
        top=${arriba},
        resizable=yes`
    );

}