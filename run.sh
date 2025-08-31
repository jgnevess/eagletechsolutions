#! /bin/bash

backend() {
    cd /home/joao/Documentos/eagletechsolution/eagletechapi || exit
    dotnet run &
    echo $! > backend.pid
}

frontend() {
    cd /home/joao/Documentos/eagletechsolution/eagletechclient || exit
    npm start &
    echo $! > frontend.pid
}

backend
frontend

wait
