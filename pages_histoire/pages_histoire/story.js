window.onload = init;

function init(){

	let continue_button = document.getElementById("continue");
	continue_button.onclick = dialogue;
}
let i=0;
let j=0;

let dialogue_end = [[["AC/DC", "wow merci de nous avoir sauver de notre autoroute vers l'enfer !"], 
					["AC/DC", "nous entedions déjà les cloches de l'enfer sonner quand vous nous avez sauver !"],
					["buffaman", "il n'y a pas de quoi !"],
					["AC/DC", "mais qui êtes-vous ?"],
					["buffaman", "je suis Michel Buffa ! mais on me connait mieux sous le nom de ..."],
					["buffaman", "buffaman !!"]],
					[["Guns N' Roses", "wow merci de nous avoir sauver alors que nous étions perdu dans la froide pluie de novembre !"], 
					["Guns N' Roses", "nous allons pouvoir retourner dans la ville du paradis !"],
					["Guns N' Roses", "merci buffaman !"],
					["buffaman", "vous sauver, c'est mon métier !"]],
					[["led zepplin", "wow merci de nous avoir sauver alors même que nous pensions prendre l'escalier du paradis !"], 
					["buffaman", "il n'y a pas de quoi !"],
					["led zepplin", "merci buffaman !"],
					["led zepplin", "mais pourquoi ces gens sont-ils méchants alors que tout ce que nous voulons, c'est tout plein d'amour ?"],
					["buffaman", "je ne sais pas ..."],
					["buffaman", "mais ce que je sais, c'est qu'il faut que j'y mette un terme !"]],
					[["the rolling stones", "buffaman ! quelle satisfaction !"],
					["the rolling stones", "merci de nous sauver ! dans nos têtes, tout était déjà peint en noir !"], 
					["buffaman", "je vous en prie !"],
					["the rolling stones", "nous commencions même à ressentir de la sympathie pour le diable !"],
					["the rolling stones", "merci buffaman !"],
					["buffaman", "vous êtes en sécurité maintenant !"]],
					[["pink floyd", "nous étions comfortablement engourdi mais tu nous as sauvé !"], 
					["buffaman", "je sais !"],
					["pink floyd", "tu es un rempart contre le mal et tu l'as encore prouvé en nous sauvant ! c'est encore une brique dans le mur pour toi !"],
					["pink floyd", "merci buffaman !"],
					["buffaman", "Je suis là maintenant!"],
					["buffaman", "Je vais mettre un terme à cette mascarade!"]],
					[["queen", "buffama ! avec toi, nous sommes les champions mon ami !"], 
					["buffaman", "vous êtes sauvés !"],
					["queen", "merci buffaman !"],
					["queen", "tu sais, on avait l'habitude de m'appeler monsieur fahrenheit, mais tu peux m'appeler freddie ! ce titre te revient maintenant !"],
					["buffaman", "c'est un honneur !"],
					["buffaman", "maintenant que tout est terminé, rentrez chez vous, le sepctacle doit continuer !"]]];

/*let dialogue_end1 = [["AC/DC", "wow merci de nous avoir sauver de notre autoroute vers l'enfer !"], 
					["AC/DC", "nous entedions déjà les cloches de l'enfer sonner quand vous nous avez sauver !"],
					["buffaman", "il n'y a pas de quoi !"],
					["AC/DC", "mais qui êtes-vous ?"],
					["buffaman", "je suis Michel Buffa ! mais on me connait mieux sous le nom de ..."],
					["buffaman", "buffaman !!"]];

let dialogue_end2 = [["Guns N' Roses", "wow merci de nous avoir sauver alors que nous étions perdu dans la froide pluie de novembre !"], 
					["Guns N' Roses", "nous allons pouvoir retourner dans la ville du paradis !"],
					["Guns N' Roses", "merci buffaman !"],
					["buffaman", "vous sauver, c'est mon métier !"]];

let dialogue_end3 = [["led zepplin", "wow merci de nous avoir sauver alors même que nous pensions prendre l'escalier du paradis !"], 
					["buffaman", "il n'y a pas de quoi !"],
					["led zepplin", "merci buffaman !"],
					["led zepplin", "mais pourquoi ces gens sont-ils méchants alors que tout ce que nous voulons, c'est tout plein d'amour ?"],
					["buffaman", "je ne sais pas ..."],
					["buffaman", "mais ce que je sais, c'est qu'il faut que j'y mette un terme !"]];

let dialogue_end4 = [["the rolling stones", "buffaman ! quelle satisfaction !"],
					["the rolling stones", "merci de nous sauver ! dans nos têtes, tout était déjà peint en noir !"], 
					["buffaman", "je vous en prie !"],
					["the rolling stones", "nous commencions même à ressentir de la sympathie pour le diable !"],
					["the rolling stones", "merci buffaman !"],
					["buffaman", "vous êtes en sécurité maintenant !"]];

let dialogue_end5 = [["pink floyd", "nous étions comfortablement engourdi mais tu nous as sauvé !"], 
					["buffaman", "je sais !"],
					["pink floyd", "tu es un rempart contre le mal et tu l'as encore prouvé en nous sauvant ! c'est encore une brique dans le mur pour toi !"],
					["pink floyd", "merci buffaman !"],
					["buffaman", "Je suis là maintenant!"],
					["buffaman", "Je vais mettre un terme à cette mascarade!"]];

let dialogue_end6 = [["queen", "buffama ! avec toi, nous sommes les champions mon ami !"], 
					["buffaman", "vous êtes sauvés !"],
					["queen", "merci buffaman !"],
					["queen", "tu sais, on avait l'habitude de m'appeler monsieur fahrenheit, mais tu peux m'appeler freddie ! ce titre te revient maintenant !"],
					["buffaman", "c'est un honneur !"],
					["buffaman", "maintenant que tout est terminé, rentrez chez vous, le sepctacle doit continuer !"]]; */

function dialogue(){
	document.getElementById("text_character").innerHTML =  dialogue_end[j][i][0] ;
	document.getElementById("text_txt").innerHTML =  dialogue_end[j][i][1] ;	
	i++; 
	if (i>=dialogue_end[j].length)
	{
		i=0;
		j++;		
	}	
}

/*function dialogue2(){
	document.getElementById("text_character2").innerHTML =  dialogue_end2[i][0] ;
	document.getElementById("text_txt2").innerHTML =  dialogue_end2[i][1] ;	
	i++
}

function dialogue3(){
	document.getElementById("text_character3").innerHTML =  dialogue_end3[i][0] ;
	document.getElementById("text_txt3").innerHTML =  dialogue_end3[i][1] ;	
	i++
}

function dialogue4(){
	document.getElementById("text_character4").innerHTML =  dialogue_end4[i][0] ;
	document.getElementById("text_txt4").innerHTML =  dialogue_end4[i][1] ;	
	i++
}

function dialogue5(){
	document.getElementById("text_character5").innerHTML =  dialogue_end5[i][0] ;
	document.getElementById("text_txt5").innerHTML =  dialogue_end5[i][1] ;	
	i++
}

function dialogue6(){
	document.getElementById("text_character6").innerHTML =  dialogue_end6[i][0] ;
	document.getElementById("text_txt6").innerHTML =  dialogue_end6[i][1] ;	
	i++
}*/

//test