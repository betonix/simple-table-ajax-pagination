
function preenchePaginacao(data) {
    var num_paginas = (data.recordsTotal / data.recordsFiltered);
    num = (Math.ceil(num_paginas)) + 1;
    array = [];
    cont = 0
    cont2 = 0;
    array[cont] = []

    for (let index = 1; index < num; index++) {
        array[cont].push('<button  onclick="(function(){getPage(' + index + ');})()"" class="click-pagina mdl-button" aria-controls="example" data-dt-idx="2" tabindex="0">' + index + '</button>');
        cont2 += 1;
        if (cont2 == 10) {
            cont += 1;
            array[cont] = []
            cont2 = 0;
        }
    }
}

function pagina(num = 0) {
    console.log(num)
    $('.pagination').html("");
    for (let index = 0; index < array[num].length; index++) {
        $('.pagination').append(array[num][index]);

    }
}

function next() {
    pagina_atual += 1;
    pagina(pagina_atual);
    verifica_next(pagina_atual);
    verifica_prev(pagina_atual);
}

function prev() {
    pagina_atual -= 1;
    pagina(pagina_atual);
    verifica_next(pagina_atual);
    verifica_prev(pagina_atual);
}

function verifica_next(num) {
    if (array[num + 1] == undefined) {
        $('#next').prop("disabled", true);
    } else {
        $('#next').prop("disabled", false);
    }

}

function verifica_prev(pagina_atual) {
    if (pagina_atual == 0) {
        $('#prev').prop("disabled", true);
    } else {
        $('#prev').prop("disabled", false);
    }
}


function preencheColunas(id,data){
    var table   = document.getElementById(id);
    var columns = []
    var body = document.getElementsByTagName('tbody')[0]

    for (let index = 0; index < table.rows.item(0).cells.length; index++) {
        var x = document.querySelectorAll("#"+id+" > thead > tr > th")[index].getAttribute("data");
        columns.push(x);
    }
    
    for (let item = 0; item < data.length; item++) {
        var row = body.insertRow(item); 
        for (let colum = 0; colum < columns.length; colum++) {   

            var cell1 = row.insertCell(colum);  
            var objeto = columns[colum].split(".");
                keys_n2 = returnObj( data[item],objeto)
                cell1.innerHTML = keys_n2;

    }
}
}

function returnObj(data,objeto,ps=0){
    var obj = verifica_array(objeto[ps])
    var coluna = data[obj]
    if(objeto[ps+1]==undefined){
        return coluna
    }else{
        ps+=1;
        return returnObj(coluna,objeto,ps)
    }
}

function verifica_array(data){
    var str = data; 
    var n = str.match(/\[(.*)\]/);
    if(n != null && parseInt(n[1])){
        var obj = str.match(/(.*?)\[/);
        return obj[n[1]];
    }else{
        return str
    }
}

function getkeyJson(json){
    return Object.keys(json);
}

function getData(url,page){
    let url_final = url;
    if(page){
        url_final = url+"/"+page
    }
    return new Promise(function(resolve,reject){
        $.ajax({
            type: "GET",
            url: url_final,
            success: function(data) {
                resolve(data)
            }
        });
    })
}


function initSimpleTablePagination(id,modify_data_function){
    return new Promise (function(resolve,reject){

    var start_page  =  document.getElementById(id).getAttribute("start-page");
    var url_page    =  document.getElementById(id).getAttribute("url");

    var new_data = {};

        getData(url_page,start_page).then(function(data){
            
            if(typeof modify_data_function === 'function' ){
                new_data =  modify_data_function(data);
            }else{
                new_data = data;
            }
            
            preencheColunas(id,new_data);
            resolve("sucess table");

        });

    })
}

//initSimpleTablePagination('table',trata_data);