var dict_Idade = {
    "15" : 0,
    "16" : 2,
    "17" : 4,
    "18" : 6,
    "19" : 9,
    "20" : 11,
    "21" : 13,
    "22" : 15,
    "23" : 17,
    "24" : 19,
    "25" : 21,
    "26" : 23,
    "27" : 26,
    "28" : 28,
    "29" : 30,
    "30" : 32,
    "31" : 34,
    "32" : 36,
    "33" : 38,
    "34" : 41,
    "35" : 43,
    "36" : 45,
    "37" : 47,
    "38" : 49,
    "39" : 51,
    "40" : 53,
    "41" : 55,
    "42" : 58,
    "43" : 60,
    "44" : 62,
    "45" : 64,
    "46" : 66,
    "47" : 68,
    "48" : 70,
    "49" : 73,
    "50" : 75,
    "51" : 56,
    "52" : 58,
    "53" : 59,
    "54" : 61,
    "55" : 63
    };


var dict_FBG = {
    "92" : 0,
    "93" : 3,
    "94" : 6,
    "95" : 9,
    "96" : 12,
    "97" : 15,
    "98" : 18,
    "99" : 21,
    "100" : 24,
    "101" : 27,
    "102" : 30,
    "103" : 33,
    "104" : 36,
    "105" : 39,
    "106" : 42,
    "107" : 45,
    "108" : 48,
    "109" : 52,
    "110" : 55,
    "111" : 58,
    "112" : 61,
    "113" : 64,
    "114" : 67,
    "115" : 70,
    "116" : 73,
    "117" : 76,
    "118" : 79,
    "119" : 82,
    "120" : 85,
    "121" : 88,
    "122" : 91,
    "123" : 94,
    "124" : 97,
    "125" : 100        
    };
     
function clearErrorMsgs(){
      $(".error").html('');
}

function validate(){

    var checkNonEmpty = function(id, msg){
        var isValid = true;
        if($('#'+id).val() == ""){
            $('#' + id +'_error').html(msg);
            isValid = false;
        }
        return isValid;
    }
    
    var checkRange = function(id, min, max, msg){
        var isValid = true;
        var value = parseInt($("#"+id).val());
        if (value < min || value > max){
            $('#' + id + '_error').html(msg);
            isValid = false;
        }
        return isValid;
    }
    
    var checkRadio = function(name, msg){
        var isValid = true;
        if($('input[name='+name+']:checked').length == 0){
            $('#' + name + '_error').html(msg);
            isValid = false;
        }
        return isValid;
    }
    
    clearErrorMsgs();
    
    return checkRadio("DMGanterior", "Escolha uma das opções")&&
        checkRadio("imc", "Escolha uma das opções") &&
        checkNonEmpty("idade", "Preencha a idade da paciente") &&
        checkNonEmpty("fbg", "Informe a glicemia de jejum da paciente") &&
        checkRange("idade", 15, 55, "A idade deve estar entre 15 e 55 anos") &&
        checkRange("fbg", 92, 125, "A glicemia de jejum deve estar entre 92 e 125mg/dL");
}

var calc = function () {
	if (validate()) {
        
        var score_DMG = parseInt($("input[name='DMGanterior']:checked").val());
        var score_IMC = parseInt($("input[name='imc']:checked").val());
        var score_idade = dict_Idade[$("#idade").val()];
        var score_FBG = dict_FBG[$("#fbg").val()];
        
        var score_total = score_DMG + score_FBG + score_idade + score_IMC;
        var probabilidade = getProbability(score_total);
        
        $("#score_total").html('O score final é ' + score_total + ' e a probabilidade da paciente apresentar DMG após o TTOG é de ' + probabilidade[0] + ' - ' + probabilidade[1] + '%');
    }
}

function getProbability(score){
    var probability;
    if (score < 18){
        probability = [0, 10];
    }else if (score < 50){
        probability = [10, 20];
    }else if (score < 71){
        probability = [20, 30];
    }else if (score < 89){
        probability = [30, 40];
    }else if (score < 105){
        probability = [40, 50];
    }else if (score < 121){
        probability = [50, 60];
    }else if (score < 138){
        probability = [60, 70];
    }else if (score < 160){
        probability = [70, 80];
    }else if (score < 192){
        probability = [80, 90];
    }else if (score < 222){
        probability = [90, 95];
    }else if (score <= 223){
        probability = [95, 100];
    }
    return probability;
}

window.onload = function () {
    $("#calcular").click(calc);
    $("#clear").click(function(){
        $("#calculadora")[0].reset(); 
        clearErrorMsgs();
    });
} 
    
    
    