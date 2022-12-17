$(()=>{
    console.log("Page loaded");
    $("#send").click(() => {
        addMessage({name: "John", message: "Hello world"});
    });
    getMessage();
});

function addMessage(message){
    $("#messages").append( `<h4> ${message.name}</h4> <p>${message.message}`);
}

function getMessage(){
    $.get('http://localhost:3000/messages', (data) => {
        //data.forEach(addMessage);
        for (let i = 0; i <data.length; i++){
            addMessage(data[i]);
        }
    })
}
