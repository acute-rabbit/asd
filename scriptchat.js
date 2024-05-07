topico = "cedup/texto"
    
    //cria um cliente para se conectar ao servidor MQTT na porta 8000
    client= new Paho.MQTT.Client("broker.hivemq.com", Number(8000), "")
    client.connect( {onSuccess:Conectou} )

    function Conectou (){
        //Envia o tópico variavel lida por todos os computadores
        client.subscribe(topico)
        message = new Paho.MQTT.Message('')
        message.destinationName = topico
    }

    client.onConnectionLost= Conexao_Perdida
    client.onMessageArrived= Mensagem_Chegou

    function Conexao_Perdida(responseObject){
        if(responseObject.errorCode !== 0){
            resposta.innerHTML += "Desconectado: "+ responseObject.errorMessage
        }
    }

    function Mensagem_Chegou(message){
        resposta.innerHTML += "<br>"
        resposta.innerHTML += message.payloadString
    }
    function Enviar(){
        valor= apelido.value + ": "+texto.value
        message = new Paho.MQTT.Message(valor)
        message.destinationName = topico
        client.send(message)
    }
    function EnviarBeijo(){
        valor= apelido.value + ": "+"<img src='' width='200px'>"
        message = new Paho.MQTT.Message(valor)
        message.destinationName = topico
        client.send(message)
    }