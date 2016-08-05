 //the $ here is simply a variable name for convenience. It’s not a reference to jquery
var $ = function(id){ 
    return document.getElementById(id);
}

var calc = function () {
    
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
     
    var idade = parseInt($("idade").value);
	var fbg = parseInt($("fbg").value);
	var isValid = true;
	
	// validate the entries
    if($("idade").value == ""){
        $("idade_error").firstChild.nodeValue = "Preencha a idade da paciente";
        isValid = false;
    }else if(idade <15 || idade >55){
        $("idade_error").firstChild.nodeValue = "A idade deve estar entre 15 e 55 anos";
        isValid = false;
    }else if($("fbg").value == ""){
        $("fbg_error").firstChild.nodeValue = "Informe a glicemia de jejum da paciente";
        isValid = false;
    }
    else if(fbg <92 || fbg >125){
        $("fbg_error").firstChild.nodeValue = "A glicemia de jejum deve estar entre 92 e 125mg/dL";
        isValid = false; 
    }
    

    
    // submit the form if all entries are valid
	if (isValid) {
        
        var score_DMG;
        var score_IMC;
        var score_idade = dict_Idade[idade];
        var score_FBG = dict_FBG[fbg];
        
        var dmgPrevioSim = document.getElementById("sim");
        var primigesta = document.getElementById("primigesta");
        var dmgPrevioNao = document.getElementById("nao");
            
        if(dmgPrevioNao.checked){
                score_DMG =0;
            }else if(primigesta.checked){
                score_DMG = 4;
            }else if (dmgPrevioSim.checked){
                score_DMG = 67;
            }
        
        var imcNormal = document.getElementById("menor25");
        var sobrepeso = document.getElementById("25a29");
        var obesa = document.getElementById("30ouMais");
            
        if(imcNormal.checked){
                score_IMC = 0;
            }else if(sobrepeso.checked){
                score_IMC = 19;
            }else if(obesa.checked){
                score_IMC = 32;
            }
            
        var score_total = score_DMG + score_FBG + score_idade + score_IMC;
        var probabilidade;
        
        if (score_total < 18){
            probabilidade = "0 a 10%";
        } else if (score_total < 50){
            probabilidade = "10 a 20%";
        }else if (score_total < 71){
            probabilidade = "20 a 30%";
        }else if (score_total < 89){
            probabilidade = "30 a 40%";
        }else if (score_total < 105){
            probabilidade = "40 a 50%";
        }else if (score_total < 121){
            probabilidade = "50 a 60%";
        }else if (score_total < 138){
            probabilidade = "60 a 70%";
        }else if (score_total < 160){
            probabilidade = "70 a 80%";
        }else if (score_total < 192){
            probabilidade = "80 a 90%";
        }else if (score_total < 222){
            probabilidade = "90 a 95%";
        }else if (score_total <= 223){
            probabilidade = "95 a 10%";
        }
        
        
        $("score_total").textContent = 'O score final é ' + score_total + ' e a probabilidade da paciente apresentar DMG é de ' + probabilidade;
    }
   
        
   
}

window.onload = function () {
    $("calcular").onclick = calc;

} 
    
    
    