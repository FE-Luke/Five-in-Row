/**
 * Created by 刘志超 on 11/3/2015.
 */


window.onload = function () {

    /*画棋盘*/
    var ROW = 20;
    document.getElementById('scene').style.padding = 600/ROW/2+'px';
    for(i=0;i<(ROW);i++){
        for(j=0;j<ROW;j++){
            var pos = i + "_" + j;
            var blockEl = document.createElement('div');
            var line1 = document.createElement('div');
            line1.setAttribute('class','line1');
            var line2 = document.createElement('div');
            line2.setAttribute('class','line2');
            blockEl.style.width = ((800)/ROW) + 'px';
            blockEl.style.height = ((800)/ROW) + 'px';
            blockEl.setAttribute("class","block");
            blockEl.setAttribute("id",pos);
            blockEl.appendChild(line1);
            blockEl.appendChild(line2);
            document.getElementById('scene').appendChild(blockEl);
        }
    }
    var el1 = document.getElementsByClassName('block');
    var switch1 = true;
    var dict1 = {};
    var dict2 = {};
    /*判断输赢函数*/
    var panduan = function(position,dictName){
        var x = Number(position.split("_")[0]); //获取当前下棋子的X坐标
        var y = Number(position.split("_")[1]); //获取当前下棋子的y坐标
        var hang = 1; //初始化计数器因为当前下的旗子参与判断所以计数器初始为1
        var tx,ty;//临时判断的x和y
        tx = x,ty = y;
        while(dictName[tx + '_' + (ty+1)]){hang++;ty++;} /*当当前棋子的y+1(向右判断)存在时计数器+1*/
        tx = x,ty=y;//重新初始化临时x和y
        while(dictName[tx + '_' + (ty-1)]){hang++;ty--;} /*当当前棋子的y-1(向左判断)存在时计数器+1*/
        if(hang >= 5){return 1;/*如果计数器>5即有一方赢*/
        }else{
            hang = 1,tx = x,ty = y;//重新还原计数器,临时x和y的值
            while(dictName[(tx+1) + '_' + ty]){hang++;tx++;}/*当当前棋子的x+1(向下判断)存在时计数器+1*/
            tx = x,ty = y;//重新初始化临时x和y
            while(dictName[(tx-1) + '_' + ty]){hang++;tx--;}/*当当前棋子的x-1(向上判断)存在时计数器+1*/
            if(hang>=5){return 1;}/*如果计数器>5即有一方赢*/
            else{
                hang = 1,tx = x,ty = y;//重新初始化临时x和y
                while(dictName[(tx-1) + '_' + (ty+1)]){hang++;tx--;ty++;}/*当当前棋子的x-1,y+1(右上判断)存在时计数器+1*/
                tx = x,ty = y;//重新初始化临时x和y
                while(dictName[(tx+1) + '_' + (ty-1)]){hang++;tx++;ty--;}/*当当前棋子的x+1,y-1(左下判断)存在时计数器+1*/
                if(hang>=5){
                    return 1;/*如果计数器>5即有一方赢*/
                }else{
                    hang = 1,tx = x,ty = y;//重新初始化临时x和y
                    while(dictName[(tx+1) + '_' + (ty+1)]){hang++;tx++;ty++;}/*当当前棋子的x+1,y+1(右下判断)存在时计数器+1*/
                    tx = x,ty = y;//重新初始化临时x和y
                    while(dictName[(tx-1) + '_' + (ty-1)]){hang++;tx--;ty--;}/*当当前棋子的x-1,y-1(左上判断)存在时计数器+1*/
                    if(hang >= 5){
                        return 1;
                    }
                }
            }
        }
    };

    var showWin = function(txt){
        document.getElementById('result').style.display = 'block';
        document.getElementById('win').innerHTML = txt;
        document.getElementById('again').onclick = function(){
            location.reload();
        }
    };
    for(k=0;k<el1.length;k++){
        el1[k].onclick = function () {
            if(this.hasAttribute("hasColor")){
                return;
            }
            if(switch1){
                var chess = document.createElement('div');
                chess.setAttribute('class','chess');
                chess.style.background = 'url("./images/bq.png")';
                chess.style.width = (((800)/ROW)-4) + 'px';
                chess.style.height = (((800)/ROW)-4) + 'px';
                chess.style.margin = "2px";

                this.appendChild(chess);
                this.setAttribute('hasColor','true');
                dict1[this.getAttribute("id")] = true;
                switch1 = false;
                document.getElementById('audio').src='./sound/drop.ogg';
                document.getElementById('audio').play();
                if(panduan(this.getAttribute('id'),dict1)){
                    showWin("白棋胜!");
                }
            }else{
                var chess = document.createElement('div');
                chess.setAttribute('class','chess');
                chess.style.background = 'url("./images/hq.png")';
                chess.style.width = (((800-ROW)/ROW)-4) + 'px';
                chess.style.height = (((800-ROW)/ROW)-4) + 'px';
                chess.style.margin = "2px";
                this.appendChild(chess);
                this.setAttribute('hasColor','true');
                dict2[this.getAttribute("id")] = true;
                switch1 = true;
                document.getElementById('audio').src='./sound/drop.ogg';
                document.getElementById('audio').play();
                if(panduan(this.getAttribute('id'),dict2)){
                    showWin("黑棋胜!");
                }

            }
        }
    }


};



//
