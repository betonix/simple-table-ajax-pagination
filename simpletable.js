var URL_CALL_PAGE = ""
var pagina_atual = 0;
var modify_data_function = null;

array = [

    {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
     {
        nome: "beto",
        idade: 25
    },
    {
        nome: "beto",
        idade: 25
    },
    
]

var datatable ={
    
    data:array,
    recordsTotal:502,
    recordsFiltered :3
}
array = []
function preenchePaginacao(recordsTotal,recordsFiltered) {
    var num_paginas = (recordsTotal / recordsFiltered);
    num = (Math.ceil(num_paginas)) + 1;
    array = [];
    cont = 0
    cont2 = 0;
    array[cont] = []

    for (let index = 1; index < num; index++) {
        array[cont].push('<button  onclick="(function(){getData(' + index + ');})()"" class="click-pagina mdl-button" aria-controls="example" data-dt-idx="2" tabindex="0">' + index + '</button>');
        cont2 += 1;
        if (cont2 == 10) {
            cont += 1;
            array[cont] = []
            cont2 = 0;
        }
    }
}

function pagina(num = 0) {
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
    console.log(data);
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

function getData(page){
    let url_final = URL_CALL_PAGE;
    if(page){
        url_final = URL_CALL_PAGE+"/"+page
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

function addFooter(id){
    $('#'+id).append(
    '<div class="dataTables_paginate paging_simple_numbers roda-pe-paginacao" id="example_paginate">'+
      '<button onclick="prev()"  id="prev"  disabled="disabled">Voltar</button>'+
    '<div class="pagination">'+                  
      '</div>'+
      '<button id = "next" onclick="next()">Avançar</button>'+
 '</div>')
    
}

function pagina(num = 0) {
    $('.pagination').html("");
    for (let index = 0; index < array[num].length; index++) {
        $('.pagination').append(array[num][index]);

    }
}


function initSimpleTablePagination(id,modify){
    return new Promise (function(resolve,reject){

    var start_page  =  document.getElementById(id).getAttribute("start-page");
    URL_CALL_PAGE    =  document.getElementById(id).getAttribute("url");
    modify_data_function = modify;
    getPageSucess(id,start_page)
    addFooter(id);

    })
}

function getPageSucess(id,start_page){
    var new_data = {};
    getData(start_page).then(function(data){
            
        if(typeof modify_data_function === 'function' ){
            new_data =  modify_data_function(data);
        }else{
            new_data = data;
        }
        preencheColunas(id,new_data);
        preenchePaginacao(new_data.recordsTotal,new_data.recordsFiltered);
        pagina();
        verifica_next(0);
    });

}
//initSimpleTablePagination('table',trata_data);