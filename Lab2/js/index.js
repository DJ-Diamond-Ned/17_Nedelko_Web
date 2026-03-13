function startGame(){
    var resultChoose = confirm("Желаете сыграть в игру?");
    if (resultChoose === false){
        alert("Ну и ладно (((");
        return;
    }
    alert("Сыграем в угадай число")
    randNum = randomNum();
    guessNumber(randNum);
}

function randomNum(){
    let min = 10;
    let max = 100;
    let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
}

function guessNumber(randNum){
    var flag = false;
    while(flag === false){
        let inputNum = prompt("Попробуй угадать какое число я загадал");
        if(inputNum === null){
            let endGame = confirm("Продолжаем игру?");
            if(!endGame){
                alert("Ну ладно(((");
                return;
            }
            continue;
        }
        if(isNaN(inputNum)){
            alert("Ты ввел не число!");
            continue;
        }
        inputNum = Number(inputNum);
        if(inputNum > randNum ){
            alert("Твое число больше чем то которое я загадал, попробуй еще раз");
        } else if(inputNum < randNum ){
            alert("Твое число меньше чем то которое я загадал, попробуй еще раз");
        } else if(inputNum === randNum ) {
            restart = confirm("Ура ты угадал!!! Сыграем еще раз?");
            flag = true;
            if (!restart){
                alert("Ну и ладно (((");
            } else{
                startGame();
            }
        } else{
            return;
        }
    }
    
}

