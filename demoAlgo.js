var n = 0, correct = true, asked_ques=[];
var next_level_true=[0,0,0];
var next_level_false=[0,0,0];
var db,ref,questionArr;

function renderQuestion(c){
	level = selectLevel(scores[c],correct);
	switch(c){
	case 0: 
		if(level === 0){
			while (inArray(r,asked_ques) || (questionArr[r].Difficulty != 0) || (questionArr[r].category != 'linguistic')){
				r = getRndInt(0,94);
			}
		}
		else if(level === 1){
			while (inArray(r,asked_ques) || (questionArr[r].Difficulty != 1) || (questionArr[r].category != 'linguistic')){
				r = getRndInt(0,94);
			}
		}
		else{
			while(inArray(r,asked_ques) || (questionArr[r].Difficulty != 2) || (questionArr[r].category != 'linguistic')){
				r = getRndInt(0,94);
			}
		}
		break;
	case 1:
		if(level === 0){
			while (inArray(r,asked_ques) || (questionArr[r].Difficulty != 0) || (questionArr[r].category != 'logic')){
				r = getRndInt(0,94);
			}
		}
		else if(level === 1){
			while (inArray(r,asked_ques) || (questionArr[r].Difficulty != 1) || (questionArr[r].category != 'logic')){
				r = getRndInt(0,94);
			}
		}
		else{
			while(inArray(r,asked_ques) || (questionArr[r].Difficulty != 2) || (questionArr[r].category != 'logic')){
				r = getRndInt(0,94);
			}
		}
		break;
	case 2:
		if(level === 0){
			while (inArray(r,asked_ques) || (questionArr[r].Difficulty != 0) || (questionArr[r].category != 'naturalist')){
				r = getRndInt(0,94);
			}
		}
		else if(level === 1){
			while (inArray(r,asked_ques) || (questionArr[r].Difficulty != 1) || (questionArr[r].category != 'naturalist')){
				r = getRndInt(0,94);
			}
		}
		else{
			while(inArray(r,asked_ques) || (questionArr[r].Difficulty != 2) || (questionArr[r].category != 'naturalist')){
				r = getRndInt(0,94);
			}
		}
		break;
	}
	console.log("Ques level "+questionArr[r].Difficulty);
	console.log("r "+r);
	console.log("keys1 "+keys1[r]);
	return keys1[r];
}


function inArray(r,asked_ques){
	var count = asked_ques.length;
	for( var i=0; i<count; i++){
		if(asked_ques[i]===r){
			return true;
		}
	}
	return false;
}


function getRndInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function stopping_criteria(score, number_of_questions) {
	if (high_score===score || number_of_questions===20 || min_score===score) {
		return true;
	} else {
		return false;
	}
}


function calculateProbability(score,level){
		var deno = level-score;
		var ftheta=(1)/(1 + Math.exp(1.7*deno));
        var ptheta=ftheta;
        var qtheta=1-ptheta;
        var itemTheta=1.7*ptheta*qtheta;
        return itemTheta;
}


function updateProbability(score,correct){
        if (correct==true){
            next_level_true[0]=0.25*next_level_true[0]+calculateProbability(score,0);
            next_level_true[1]=0.5*next_level_true[1]+calculateProbability(score,1);
            next_level_true[2]=0.75*next_level_true[2]+calculateProbability(score,2);
            // print(self.next_level_true)
            var maximum = indexOfMax(next_level_true);
         }
        else{
            next_level_false[0]=calculateProbability(score,0);   
            next_level_false[1]=calculateProbability(score,1);
            next_level_false[2]=calculateProbability(score,2); 
            // print(self.next_level_false)
            var maximum = indexOfMax(next_level_false);            
        }
        console.log("Max "+maximum);
        return maximum;
}


function indexOfMax(arr){
	var max = arr[0];
	var maxIndex = 0;
	for(var i=1; i<3; i++){
		if(arr[i]>max){
			maxIndex = i;
			max = arr[i];
		}
	}
	return maxIndex;
}


function selectLevel(score,correct){
    var max=updateProbability(score,correct);
    return max;
}


function calculateScore(score, correct) {
		if (correct==true) {
			if (level==2) {
				score=score+0.55;
			} 
			else if (level==1) {
				score=score+0.35;
			} 
			else {
				score=score+0.25;
			}
		} 
		else if (correct==false) {
			if (level==2) {
				score=score-0.75;
			} else if (level==1) {
				score=score-0.5;
			} else {
				score=score-0.25;
			}
		}  
		console.log("Score: "+score);
		return score;	
}