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


function button(){
    document.getElementById("rickroll").style.display = "block";
    document.getElementById("rickroll").play();
    setTimeout(function(){
        window.onclick = function(){
            document.getElementById("copyright").innerHTML = "You have no control over this situation.";
        }
    }, 100);
}