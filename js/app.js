const form = document.querySelector('#add-mensaje')

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