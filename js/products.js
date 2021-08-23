var carsArray = [];
let htmlContentToAppend = "";
function showCarsList(array){    
    for(let i = 0; i < array.length; i++){
        let obj = array[i];

        htmlContentToAppend += ` 
       <li class="list-group">  Nombre: ` + obj.name + `<hr>` + `Descripción: ` + obj.description +`<hr>` + `Costo: `+ obj.cost + `<hr>`+`</li>
       `       
        document.getElementById("list-group-item").innerHTML = htmlContentToAppend;
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carsArray = resultObj.data;
        
            showCarsList(carsArray);
            hideSpinner();
        }
    });
});
