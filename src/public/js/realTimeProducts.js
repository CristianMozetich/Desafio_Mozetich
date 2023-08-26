


//FORMULARIO
const form = document.getElementById('form')
const btn_prods = document.getElementById('btn_prods')



form.addEventListener('submit', (e)=>{
    const socket = io()
    e.preventDefault()

    const datForm = new FormData(e.target)//Obtiene la información del input de un formulario

    const prod = Object.fromEntries(datForm)// De un objeto iterable genero un objeto simple

    socket.emit('nuevoProducto', prod)
    e.target.reset()
})




