let unitSum = 2; //ホーム発車標の台数
let lineSum = 2; //ホーム発車標の段数

function main() {
    //発車標の段数を設定する
    setUnitLine();
}

//発車標の段数を設定する
function setUnitLine(){
    //段数を読み込む
    lineSum = 2;

    //入力部を段数分つくる
    writeFormHTML();

    //デフォルトでデータをセットする
    setDefaultData();

    //入力を読み込む
    readForm();

    //日本語と英語の交互表示スタート
    intervalTimeSet();
    //2段目の設定反映
    for(let unit=0 ; unit<unitSum ; unit++){
        updateStatus(unit);
    }
}

//LEDの1段分のHTMLを出力する
function writeLineHTML(unit, line){
    let out = "";
    //種別
    out += "<div id='typeDiv"+unit+line+"' style='position:absolute; left:0; top:0; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img id='typeImg"+unit+line+"' style='position:absolute; left:0; top:-0px; ' src='/resource/img/main.png' alt='' />";
    out += "</div>";
    //行き先
    out += "<div id='destinationDiv"+unit+line+"' style='position:absolute; left:60px; top:0; width:120px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img id='destinationImg"+unit+line+"' style='position:absolute; left:0; top:-0px; ' src='/resource/img/main.png' alt='' />";
    out += "</div>";
    //時刻
    out += "<div id='timeDiv"+unit+line+"' style='position:absolute; left:180px; top:0; width:96px; height:24px; overflow:hidden; background-color:#000; z-index:1;' >";
    out += "  <div style='position:absolute; left:0; top:0; width:96px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-580px; top:-0px; ' id='departureTime0Img"+unit+line+"' src='/resource/img/main.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:10px; top:0; width:15px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-700px; top:-0px; ' id='departureTime4Img"+unit+line+"' src='/resource/img/main.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:26px; top:0; width:15px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-732px; top:-0px; ' id='departureTime3Img"+unit+line+"' src='/resource/img/main.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:54px; top:0; width:15px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-700px; top:-0px; ' id='departureTime2Img"+unit+line+"' src='/resource/img/main.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:70px; top:0; width:15px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-732px; top:-0px; ' id='departureTime1Img"+unit+line+"' src='/resource/img/main.png' alt='' />";
    out += "  </div>";
    out += "</div>";
    //両数
    out += "<div id='carCountDiv"+unit+line+"' style='position:absolute; left:288px; top:0; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img style='position:absolute; left:-0px; top:-0px; ' id='carCountImg"+unit+line+"' src='/resource/img/main.png' alt='' />";
    out += "</div>";
    //ドア数
    out += "<div id='doorCountDiv"+unit+line+"' style='position:absolute; left:336px; top:0; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img style='position:absolute; left:-464px; top:-0px; ' id='doorCountImg"+unit+line+"' src='/resource/img/main.png' alt='' />";
    out += "</div>";

    out += "";
    return out;
}

//制御するフォームのHTMLを出力
function writeFormHTML(){
    let out = " ";
    out += "<div id='' style=''>";
    for(let unit=0 ; unit<unitSum ; unit++){
        out += "<div style='float:left; margin:0; padding:10px; border-right: solid 1px #999; border-bottom: solid 1px #999; '>";
        out += "【"+(unit+1)+"台目】";
        for(let line=0 ; line<lineSum ; line++){
            out += "<div style='white-space: nowrap; '>";
            out += " "+(line+1)+"本目 ";

            //種別
            out += "<select size='1' id='typeInput"+unit+line+"' style='' onChange='readForm()'>";
            for(let i=0 ; i<typeList.length ; i++){
                out += "<option value='"+i+"'>"+typeList[i][0]+"</option>";
            }
            out += "</select>";
            out += " ";
            //行き先
            out += "<select size='1' id='destinationInput"+unit+line+"' style='' onChange='readForm()'>";
            for(let i=0 ; i<destinationList.length ; i++){
                out += "<option value='"+i+"'>"+destinationList[i][0]+"</option>";
            }
            out += "</select>";
            out += " ";
            //時刻
            out += "<input id='departureHourInput"+unit+line+"' type='text' value='12' size='2' maxlength='2' style='text-align:right; ' onkeyup='readForm()' />";
            out += " : ";
            out += "<input id='departureMinuteInput"+unit+line+"' type='text' value='34' size='2' maxlength='2' style='text-align:right; ' onkeyup='readForm()' />";
            out += " ";
            //両数
            out += "<select size='1' id='carCountInput"+unit+line+"' style='' onChange='readForm()'>";
            for(let i=0 ; i<carCountList.length ; i++){
                out += "<option value='"+i+"'>"+carCountList[i][0]+"</option>";
            }
            out += "</select>";
            out += " ";
            //ドア数
            out += "<select size='1' id='doorCountInput"+unit+line+"' style='' onChange='readForm()'>";
            for(let i=0 ; i<doorCountList.length ; i++){
                out += "<option value='"+i+"'>"+doorCountList[i][0]+"</option>";
            }
            out += "</select>";
            out += " ";

            out += "</div>";
        }

        out += "<hr />";
        out += "テロップ: <input id='bottomTelopInput"+unit+"' type='text' value='' size='80' style='text-align:left; ' onkeyup='readForm()' />";
        out += "<br />";

        out += "在線位置:<br />";
        out += "　<input id='approachPosition4Checkbox"+unit+"' type='checkbox' value='' onclick='updateStatus("+unit+")'><label for='approachPosition4Checkbox"+unit+"'>前々駅</label>　";
        out += "　<input id='approachPosition3Checkbox"+unit+"' type='checkbox' value='' onclick='updateStatus("+unit+")' checked><label for='approachPosition3Checkbox"+unit+"'>前々駅〜前駅</label><br />";
        out += "　<input id='approachPosition2Checkbox"+unit+"' type='checkbox' value='' onclick='updateStatus("+unit+")'><label for='approachPosition2Checkbox"+unit+"'>前駅　</label>　";
        out += "　<input id='approachPosition1Checkbox"+unit+"' type='checkbox' value='' onclick='updateStatus("+unit+")'><label for='approachPosition1Checkbox"+unit+"'>前駅〜当駅　</label><br />";

        out += "<select size='1' id='statusInput"+unit+"' style='' onChange='updateStatus("+unit+")'>";
        out += "<option value=''>テロップ表示</option>";
        out += "<option value=''>接近位置表示</option>";
        out += "<option value=''>到着表示(停車)</option>";
        out += "<option value=''>到着表示(通過)</option>";
        out += "</select> ";

        out += "　<input type='button' value='　テロップ更新　' onclick='updateStatus("+unit+"); ' />";
        out += "<br />";
        out += "</div>";
        out += "</div>";
    }
    out += "<br style='clear:both;' />";

    document.getElementById("inputFormDiv").innerHTML = out;
}



//デフォルトでの列車データをセットする、引数numに0だったら、ランダム、1か2か3だったらデフォルトデータ挿入
function setDefaultData() {
    for(let unit=0 ; unit<unitSum ; unit++){
        for(let line=0 ; line<lineSum ; line++){
            ////////ドロップダウンリストにランダムな値をセットする
            let id = "typeInput"+unit+line;
            let randomNum = Math.floor(Math.random() * (document.getElementById(id).options.length - 2));
            document.getElementById(id).options[randomNum].selected = true;

            id = "destinationInput"+unit+line;
            randomNum = Math.floor(Math.random() * (document.getElementById(id).options.length - 4));
            document.getElementById(id).options[randomNum].selected = true;

            id = "carCountInput"+unit+line;
            randomNum = Math.floor(Math.random() * (document.getElementById(id).options.length - 1));
            document.getElementById(id).options[randomNum].selected = true;

            id = "doorCountInput"+unit+line;
            randomNum = Math.floor(Math.random() * (document.getElementById(id).options.length - 1));
            document.getElementById(id).options[randomNum].selected = true;

            ///////今より少し進んだ時刻を計算
            const nowDate = new Date(); //現在日時
            let baseSecond = nowDate.getTime(); //秒に変換
            baseSecond += line*7*60*1000 + Math.floor(Math.random() * 3*60*1000) ; //7分間隔(3分の揺らぎ付き)
            nowDate.setTime(baseSecond); //Date型に変換
            const hour = nowDate.getHours(); //時
            const minute = nowDate.getMinutes(); //分

            document.getElementById("departureHourInput"+unit+line).value = hour;
            document.getElementById("departureMinuteInput"+unit+line).value = minute;
        }
    }

    //テロップ文章
    document.getElementById("bottomTelopInput0").value = "<span style='color:#f80'>西所沢</span>で<span style='color:#f80'>西武球場前</span>ゆきに、<span style='color:#f80'>飯能</span>で<span style='color:#f80'>西武秩父</span>ゆきに接続します。";
    document.getElementById("bottomTelopInput1").value = "<span style='color:#f80'>練馬</span>で準急<span style='color:#f80'>飯能</span>ゆきにお乗継ぎができます。";

    //2行目の表示内容
    document.getElementById("statusInput0").options[0].selected = true;
    document.getElementById("statusInput1").options[1].selected = true;

}

let typeData = [[null, null, null], [null, null, null]];
let destinationData = [[null, null, null], [null, null, null]];
let departureHourData = [[null, null, null], [null, null, null]];
let departureMinuteData = [[null, null, null], [null, null, null]];
let carCountData = [[null, null, null], [null, null, null]];
let doorCountData = [[null, null, null], [null, null, null]];

//フォームから入力を読み込む
function readForm()
{
    for(let unit=0 ; unit<unitSum ; unit++){
        for(let line=0 ; line<lineSum ; line++){
            //////////ドロップダウンリストから選択状態を読み込み
            //種別
            typeData[unit][line] = document.getElementById("typeInput"+unit+line).selectedIndex;
            //行先
            destinationData[unit][line] = document.getElementById("destinationInput"+unit+line).selectedIndex;
            //両数
            carCountData[unit][line] = document.getElementById("carCountInput"+unit+line).selectedIndex;
            //ドア数
            doorCountData[unit][line] = document.getElementById("doorCountInput"+unit+line).selectedIndex;

            //////////テキストボックスから読み込み
            //時
            const inHour = document.getElementById("departureHourInput"+unit+line).value;
            departureHourData[unit][line] = inputTextNumCheck(inHour, 0); //値が数値かどうかチェック
            //分
            const inMinute = document.getElementById("departureMinuteInput"+unit+line).value;
            departureMinuteData[unit][line] = inputTextNumCheck(inMinute, 0); //値が数値かどうかチェック
        }
    }

    updateLED();
}

//LEDの画像を変更する
let updateLEDCount = 0;
function updateLED(){
    for(let unit=0 ; unit<unitSum ; unit++){
        for(let line=0 ; line<lineSum ; line++){
            //言語
            let langId = updateLEDCount%2;

            //////////画像を変更する
            //種別
            document.getElementById("typeImg"+unit+line).style.top = -25 * typeData[unit][line] + "px";
            //行き先
            document.getElementById("destinationImg"+unit+line).style.top = -25 * destinationData[unit][line] + "px";
            //両数
            document.getElementById("carCountImg"+unit+line).style.top = -25 * carCountData[unit][line] + "px";
            //ドア数
            document.getElementById("doorCountImg"+unit+line).style.top = -25 * doorCountData[unit][line] + "px";

            //////////時刻を変更する
            //時
            const departureHourBuff = departureHourData[unit][line];
            document.getElementById("departureTime4Img"+unit+line).style.top = -25 * digitDivision(departureHourBuff,   10, 10) + "px";
            document.getElementById("departureTime3Img"+unit+line).style.top = -25 * digitDivision(departureHourBuff,    1, 0) + "px";
            //分
            const departureMinuteBuff = departureMinuteData[unit][line];
            document.getElementById("departureTime2Img"+unit+line).style.top = -25 * digitDivision(departureMinuteBuff,   10, 0) + "px";
            document.getElementById("departureTime1Img"+unit+line).style.top = -25 * digitDivision(departureMinuteBuff,    1, 0) + "px";

            //コロンの有無
            if(departureHourBuff == "" && departureMinuteBuff == ""){
                document.getElementById("departureTime0Img"+unit+line).style.top = -0 + "px";
            } else {
                document.getElementById("departureTime0Img"+unit+line).style.top = -25 + "px";
            }

            ////////日本語/英語を切り替える
            const typeImgLeft = [-0, -49];
            const destinationImgLeft = [-202, -323];
            const carCountImgLeft = [-763, -812];
            const doorCountImgLeft = [-868, -917];

            //種別
            document.getElementById("typeImg"+unit+line).style.left = typeImgLeft[langId] + "px";
            //行き先
            document.getElementById("destinationImg"+unit+line).style.left = destinationImgLeft[langId] + "px";
            //両数
            document.getElementById("carCountImg"+unit+line).style.left = carCountImgLeft[langId] + "px";
            //ドア数
            document.getElementById("doorCountImg"+unit+line).style.left = doorCountImgLeft[langId] + "px";

        }

    }
}

//表示切り替え間隔の設定
function intervalTimeSet(){
    //表示更新
    updateLED();

    //次の更新設定
    let nextTime; //秒->ms
    if(updateLEDCount % 2 == 0) {
        nextTime = 6.7; //日本語表示時間
    } else {
        nextTime = 3.0; //英語表示時間
    }

    nextTime = inputTextNumCheck(nextTime, 1); //入力された値のチェック
    nextTime *= 1000;

    clearTimeout(LEDUpdateTimeout);
    LEDUpdateTimeout = setTimeout("updateLEDCount++; intervalTimeSet();", nextTime);
}
let LEDUpdateTimeout;

let timeOrderSelectData = [null, null];
let statusData = [null, null];
let trackData = [null, null];
let directionData = [null, null];
let bottomTelopData = [null, null];
let approachPosition4Data = [null, null];
let approachPosition3Data = [null, null];
let approachPosition2Data = [null, null];
let approachPosition1Data = [null, null];
const approachBaseLeft = -481;
const approachBaseTop = -425;
/** 発車標の状態を更新する */
function updateStatus(unit){
    //フォームから設定読み込み

    //点滅している場合は止める
    clearTimeout(switchImgTimeout[unit]);

    statusData[unit] = document.getElementById("statusInput"+unit).selectedIndex;

    //テロップ
    if(statusData[unit] == 0) {
        bottomTelopData[unit] = document.getElementById("bottomTelopInput"+unit).value;

        //環境によってフォントの縦位置を設定
        let topBuff;
        if(os == "Windows") {
            topBuff = -1; //Windows
        } else if(uaName == "gecko") {
            topBuff = -3; //MacのFirefox
        }else {
            topBuff = -6; //Macのchrome
        }

        let out = "";
        out += "  <div style=\"position:absolute; top:"+topBuff+"px; left:0; width:384px; height:24px; font-size:24px; color:#0f0; font-family:'ＭＳ ゴシック', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif; \">";
        out += "    <marquee scrollamount='5' >"; //現地のテロップは6.2秒
        out += bottomTelopData[unit];
        out += "    </marquee>";
        out += "  </div>";

        document.getElementById("bottomLineDiv"+unit).innerHTML = out;
    }
    //接近位置表示
    if(statusData[unit] == 1){
        //接近位置を読み込む
        approachPosition4Data[unit] = document.getElementById("approachPosition4Checkbox"+unit).checked
        approachPosition3Data[unit] = document.getElementById("approachPosition3Checkbox"+unit).checked
        approachPosition2Data[unit] = document.getElementById("approachPosition2Checkbox"+unit).checked
        approachPosition1Data[unit] = document.getElementById("approachPosition1Checkbox"+unit).checked

        let out = "";
        //当駅
        out += "<div id='approachPosition0Div"+unit+"' style='position:absolute; left:0; top:0; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition0Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+approachBaseTop+"px; ' src='/resource/img/main.png' alt='' />";
        out += "</div>";
        //当駅〜前駅
        out += "<div id='approachPosition1Div"+unit+"' style='position:absolute; left:48px; top:0; width:120px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition1Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft-147)+"px; top:"+approachBaseTop+"px; ' src='/resource/img/main.png' alt='' />";
        out += "</div>";
        //前駅
        out += "<div id='approachPosition2Div"+unit+"' style='position:absolute; left:168px; top:0; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition2Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft-49)+"px; top:"+approachBaseTop+"px; ' src='/resource/img/main.png' alt='' />";
        out += "</div>";
        //前駅〜前々駅
        out += "<div id='approachPosition3Div"+unit+"' style='position:absolute; left:216px; top:0; width:120px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition3Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft-147)+"px; top:"+approachBaseTop+"px; ' src='/resource/img/main.png' alt='' />";
        out += "</div>";
        //前々駅
        out += "<div id='approachPosition4Div"+unit+"' style='position:absolute; left:336px; top:0; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition4Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft-98)+"px; top:"+approachBaseTop+"px; ' src='/resource/img/main.png' alt='' />";
        out += "</div>";

        document.getElementById("bottomLineDiv"+unit).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
    //接近表示「電車がまいります。ご注意下さい。」
    if(statusData[unit] == 2){
        let out = "";
        out += "<div id='arrivingDiv"+unit+"' style='position:absolute; left:0; top:0; width:384px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='arrivingImg"+unit+"' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+(approachBaseTop-25*3)+"px; ' src='/resource/img/main.png' alt='' />";
        out += "</div>";

        document.getElementById("bottomLineDiv"+unit).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
    //接近表示「電車が通過します。ご注意下さい。」
    if(statusData[unit] == 3){
        let out = "";
        out += "<div id='arrivingDiv"+unit+"' style='position:absolute; left:0; top:0; width:384px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='arrivingImg"+unit+"' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+(approachBaseTop-25*4)+"px; ' src='/resource/img/main.png' alt='' />";
        out += "</div>";

        document.getElementById("bottomLineDiv"+unit).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
}

let switchCount = [0, 0];
let switchImgTimeout = [null, null];
/** 接近表示を点滅させる */
function switchImg(unit){
    let switchStatus = switchCount[unit] % 2;

    if(statusData[unit] == 1){
        //前々駅
        if(approachPosition4Data[unit]){
            document.getElementById("approachPosition4Img"+unit).style.top =  approachBaseTop-25 - 25*switchStatus + "px";
        }
        //前々駅〜前駅
        if(approachPosition3Data[unit]){
            document.getElementById("approachPosition3Img"+unit).style.top =  approachBaseTop-25 - 25*switchStatus + "px";
        }
        //前駅
        if(approachPosition2Data[unit]){
            document.getElementById("approachPosition2Img"+unit).style.top =  approachBaseTop-25 - 25*switchStatus + "px";
        }
        //前駅〜当駅
        if(approachPosition1Data[unit]){
            document.getElementById("approachPosition1Img"+unit).style.top =  approachBaseTop-25 - 25*switchStatus + "px";
        }
    }
    //「電車がまいります。ご注意下さい。」
    if(statusData[unit] == 2){
        document.getElementById("arrivingImg"+unit).style.left =  approachBaseLeft - 1000*switchStatus + "px";
    }
    //「電車が通過します。ご注意下さい。」
    if(statusData[unit] == 3){
        document.getElementById("arrivingImg"+unit).style.left =  approachBaseLeft - 1000*switchStatus + "px";
    }

    //点滅間隔
    switchImgTimeout[unit] = setTimeout("switchCount["+unit+"]++; switchImg("+unit+")", 500);
}

