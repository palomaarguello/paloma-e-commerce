//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    sessionStorage.removeItem('login');
});
   function validarInicioSesion(){
       var idemail, password1;
       idemail= document.getElementById("exampleInputEmail1").value;
       password1= document.getElementById("exampleInputPassword1").value;
       if((idemail=="")&&(password1=="")){
           alert("Todos los campos son obligatorios.");
           return false;
           } else {
            sessionStorage.setItem('login', idemail);
            location.replace('index.html');
           }
        }
