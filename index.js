const socket = io();
$(()=>{
    console.log("Page loaded");
    $("#send").click(() => {
        // .val(): Get the current value of the first element in the set of matched elements
        const message = {name: $("#name").val(), message: $("#message").val()};
        postMessage(message)
    });
    getMessages();
});
socket.on('message', addMessage);

function addMessage(message){
    $("#messages").append( `<h4> ${message.name}</h4> <p>${message.message}`);
}

function getMessages(){
    $.get('http://localhost:3010/messages', (data) => {
        //data.forEach(addMessage);
        for (let i = 0; i <data.length; i++){
            addMessage(data[i]);
        }
    })
}

function postMessage(message){
    $.post('http://localhost:3010/messages', message);
}
