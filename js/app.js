const form = document.querySelector('#add-mensaje')

function addMessages(doc,i){
    var $log = $( "#mensajes_fire" )
    str = "<div class=\"card-header\" id=\"heading"+i+"\"><h5 class=\"mb-0\"><button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse"+i+"\" aria-expanded=\"true\"aria-controls=\"collapse"+i+"\">Invitado:" +(i+1)+" - "+doc.data().name+"</button></h5></div><div id=\"collapse"+i+"\" class=\"collapse\" aria-labelledby=\"heading"+i+"\" data-parent=\"#accordion\"><div class=\"card-body\">Nombre: "+doc.data().name+" <br>Email: "+doc.data().email+" <br>Mensaje: "+doc.data().message+" <br></div></div>";
    html = $.parseHTML( str )
    $log.append( html );
}

db.collection('mensaje').get().then( (snapshot) => {
    var i = 0
    snapshot.docs.forEach(doc => {
        addMessages(doc,i);
        i++;
    });
}  ); 


//Mandar mensajes
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('mensaje').add({
        name: form.name.value,
        email : form.email.value,  
        message : form.message.value       
    });
    form.name.value = '';
    form.email.value = '';
    form.message.value = '';
    window.alert("!Gracias por confirmar!");
     
})


//Acceso
function access() {
    var user = prompt("Username");
    var passwd = prompt("Password");
    getAccess(user,passwd)
}

//Auth
function getAccess(user,passwd){
   
    let userAdmin = ''
    let passwdAdmin = ''
    
    db.collection('account').doc('C6AzzZdRfJyavvt3kosO').get()
        .then(snapshot => {
            userAdmin = snapshot.data().user
            passwdAdmin = snapshot.data().passwd
            
            if(user == userAdmin){
                if(passwd == passwdAdmin){
                    console.log('sucess')
                }else{
                    console.log('contraseña erronea')
                    document.location.href="/";
                }
            }else{
                console.log('user erroneo')
                document.location.href="/";
            }

        })
}

