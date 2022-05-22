function Delet() {
    let fs = require('fs');
    // Especificamos o nome e extensão do arquivo a ser deletado
    fs.unlink('../img/inicio.png', function (err){
        if (err) throw err;
        console.log('Arquivo deletado!');
    })
}

