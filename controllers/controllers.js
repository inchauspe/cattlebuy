export function abreIndex(req,res){
    res.render('index.ejs')
}

export function olaMundo(req,res){
    var nome = req.body.nome
    var cor = req.body.cor
    var turno = req.body.turno
    res.render('ola.ejs',{"nome":nome, "cor":cor, "turno":turno})
}

export function abreCalculadora(req,res,next){
    res.render('calculadora.ejs')
}

export function calculadora(req,res){
    var num1 = parseFloat(req.body.num1)
    var num2 = parseFloat(req.body.num2)
    var operacao = req.body.operacao
    var resultado = 0
    if (operacao == "somar"){
        resultado = num1 + num2
    } else if (operacao == "subtrair"){
        resultado = num1 - num2
    } else if (operacao == "multiplicar"){
        resultado = num1 * num2
    } else if (operacao == "dividir"){
        resultado = num1 / num2
    }
    res.render('resultado.ejs',{"resultado":resultado, "num1":num1, "num2":num2, "operacao":operacao})
}

export function abreTabuada(req,res){
    res.render('tabuada.ejs', {"num":"a"})
}

export function tabuada(req,res){
    var num = parseFloat(req.body.num)
    res.render('tabuada.ejs', {"num":num})
}

export function abreaddusuario(req,res){
    res.render('addusuario.ejs')
}


