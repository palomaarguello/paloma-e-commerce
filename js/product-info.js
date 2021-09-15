var product = {};
var comentarios = [];

function showProductsGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
// función para ordenar los comentarios por fecha:

function meses(a,b){

    let fechaA = new Date(a.dateTime);
    let fechaB = new Date(b.dateTime);
    if(fechaA.getMonth()+1 > fechaB.getMonth()+1){return -1;}
    if(fechaA.getMonth()+1 < fechaB.getMonth()+1){return 1;}
    return 0;
};

// función para mostrar los comentarios:

function showCommentsGallery(){
     
    let htmlContentToAppend = "";
    comentarios = comentarios.sort(meses);

    for(let i = 0; i < comentarios.length; i++){ 
        let comment = comentarios[i];
        let estrellasOn = `<span class="fa fa-star checked"></span>`;
        let estrellasOff = `<span class="fa fa-star"></span>`;
        let score = estrellasOn.repeat(comment.score);
        let noScore = estrellasOff.repeat(5-comment.score);

        htmlContentToAppend += `<a class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <dt>` + comment.user + `</dt>
                <p class="mb-1">` + comment.description + `</p>
                <p>` + score + `` + noScore + `</p>
            </div>
            <small class="mb-6 text-muted">` + comment.dateTime + `</small>
        </div>
        </div>
    </a>`
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}
    
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productRelatedHTML = document.getElementById("relatedProducts");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productRelatedHTML.innerHTML = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showProductsGallery(product.images);

        }
    });
});
    
    function agregarComentario(){
        let inner = "";
        var usuario = document.getElementById("usuario");
        var nuevoComentario = document.getElementById("nuevoComentario");
        var usuarioScore = document.getElementsByClassName("checkear").length;
        let starsOn = `<span class="fa fa-star checked"></span>`
        let starsOff = `<span class="fa fa-star"></span>`
        let score = starsOn.repeat(usuarioScore);
        let scoreNo = starsOff.repeat(5 - usuarioScore);
        var fecha = new Date();
        var date = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
        if (usuario.value !== "" && nuevoComentario.value !== "" && usuarioScore !== 0) {
            inner += `
            <a class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <dt>` + usuario.value + `</dt>
                        <p class="mb-1">` + nuevoComentario.value + `</p>
                        <p>` + score + `` + scoreNo + `</p>
                </div>
                <small class="mb-6 text-muted">` + date + `</small>
            </div>
            </div>
        </a>`
        var espacio = document.getElementById("comentarios");
        espacio.innerHTML = inner +  espacio.innerHTML;

        usuario.classList.remove("error");
        nuevoComentario.classList.remove("error");
    } else {
        usuario.classList.add("error");
        nuevoComentario.classList.add("error");
    }
};

$(".clasificacion").find("input").change(function() {
    var valor = $(this).val()
    $(".clasificacion").find("input").removeClass("checkear")
    $(".clasificacion").find("input").each(function(index) {
        if (index + 1 <= valor) {
            $(this).addClass("checkear")
        }
    })
})
$(".clasificacion").find("label").mouseover(function() {
    var valor = $(this).prev("input").val()
    $(".clasificacion").find("input").removeClass("checkear")
    $(".clasificacion").find("input").each(function(index) {
        if (index + 1 <= valor) {
            $(this).addClass("checkear")
        }
    })
})
                    
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj.data;
            showCommentsGallery();
        }
    });

