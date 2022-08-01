window.onload = init;
let tabScore = [];
let nbScore = 0;

function init(){
	sortScore();
	scoreBoard();
}

function sortScore(){
	for(var i=1;i<localStorage.length;i++){
		if(localStorage.getItem('Score'+i)!=null){
			tabScore[nbScore]=parseInt(localStorage.getItem('Score'+i),10);
			nbScore++;
		}
	}
	var aide;
	for(var j=0;j<nbScore;j++){
		for(var k=0;k<nbScore-1;k++){
			if(tabScore[k]>tabScore[k+1]){
				aide=tabScore[k];
				tabScore[k]=tabScore[k+1];
				tabScore[k+1]=aide;
			}
		}
	}
}

function scoreBoard(){
	var place=1;
	var compte=10;
	if(nbScore<10){
		compte=nbScore-1;
	}
	else if(nbScore==0){
		compte=0;	
	}

	while(compte!=0){
			var e=document.createElement("div");
			e.innerHTML=""+place+" - score :"+tabScore[nbScore-(10-compte)-1];
			e.setAttribute('class','link_text uppercase play_link volume space_between_buttons');
			document.getElementById('score').appendChild(e);
			place++;
			compte--;
	}
}