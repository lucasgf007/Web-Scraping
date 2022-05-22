const { text } = require('express')
const { links } = require('express/lib/response')
const pup = require('puppeteer')

const Rasp = async (req, res) => {

    // let login = req.body.login
    // let senha = req.body.senha
    let dados = req.body

    let urlRaspagem = dados.urlpag
    let select = dados.select
    let atributo = dados.atributo
    let print = dados.print
    let multi = dados.multi
    let urllog = dados.urllog
    let login = dados.login
    let senha = dados.senha
    let selectLogin = dados.selectlogin
    let selectSenha = dados.selectsenha
    let botao = dados.botao

    console.log(dados)

    const browser = await pup.launch({ headless: false });


    const page = await browser.newPage(); // abre a page
    console.log('iniciou');

    if(urllog !== '' && login !== '' && senha !== ''){

        await page.goto(`${urllog}`); // abre a url que inserimos
        await page.waitForSelector(`${botao}`); // vai esperar até o item aparece

        await page.type(`${selectLogin}`, login);
        await page.type(`${selectSenha}`, senha);

        // click
        await Promise.all([
            page.waitForNavigation(),
            page.click(`${botao}`)

        ]);


    }

    await page.goto(`${urlRaspagem}`); // abre a url que inserimos
    await page.waitForSelector(`${select}`); // vai esperar até o item aparece

    // SELECIONA OS ELEMENTOS DE LOGIN
    

    // print 
    if(print){
        await page.screenshot( {path: 'src/assets/img/inicio.png'} )
        print = true
    } else {
        print = false
    }

    if(multi){
        console.log('multi')
        let data = await page.$$eval(`${select}`, tags => { return tags.map(tag => tag.innerHTML) });

        await page.waitForTimeout(3000);
    
        await browser.close(); // fecha a page
    
        res.render( 'tabela', {
            data,
            print
        })
    } else {
        let data = await page.$eval(`${select}`, el => el.innerText);

        await page.waitForTimeout(3000);
    
        await browser.close(); // fecha a page
    
        res.render( 'tabela', {
            data,
            print
        })
    }

}

module.exports.Rasp = Rasp