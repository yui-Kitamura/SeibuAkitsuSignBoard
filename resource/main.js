let unitSum = 2; //ホーム発車標の台数
let lineSum = 2; //ホーム発車標の段数

let kudariTimeTable;
let noboriTimeTable;

function main() {
    //発車標の段数を設定する
    setUnitLine();
    drawClock();
    //データをセットする
    setTimeTableData().then(r => {

        let hour = new Date().getHours();
        let minute = new Date().getMinutes();

        updateFromTimeTableData(hour, minute);
        //日本語と英語の交互表示スタート
        intervalTimeSet();
        //2段目の設定反映
        for(let unit=0 ; unit<unitSum ; unit++){
            updateStatus(unit);
        }
    });
}

//発車標の段数を設定する
function setUnitLine(){
    //段数を読み込む
    lineSum = 2;

    //入力部を段数分つくる
    writeFormHTML();

}

//LEDの1段分のHTMLを出力する
function writeLineHTML(unit, line){
    let out = "";
    //種別
    out += "<div id='typeDiv"+unit+line+"' style='position:absolute; left:0; top:0; width:144px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img id='typeImg"+unit+line+"' class='led' style='position:absolute; left:0; top:-0px;' src='./resource/img/mainx8.png' alt='' />";
    out += "</div>";
    //行き先
    out += "<div id='destinationDiv"+unit+line+"' style='position:absolute; left:180px; top:0; width:360px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img id='destinationImg"+unit+line+"' class='led' style='position:absolute; left:0; top:-0px;' src='./resource/img/mainx8.png' alt='' />";
    out += "</div>";
    //時刻
    out += "<div id='timeDiv"+unit+line+"' style='position:absolute; left:540px; top:0; width:288px; height:72px; overflow:hidden; background-color:#000; z-index:1;' >";
    out += "  <div style='position:absolute; left:0; top:0; width:288px; height:72px; overflow:hidden;' id='' >";
    out += "    <img class='led' style='position:absolute; left:-4640px; top:-0px;' id='departureTime0Img"+unit+line+"' src='./resource/img/mainx8.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:30px; top:0; width:45px; height:72px; overflow:hidden;' id='' >";
    out += "    <img class='led' style='position:absolute; left:-5600px; top:-0px;' id='departureTime4Img"+unit+line+"' src='./resource/img/mainx8.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:78px; top:0; width:45px; height:72px; overflow:hidden;' id='' >";
    out += "    <img class='led' style='position:absolute; left:-5856px; top:-0px;' id='departureTime3Img"+unit+line+"' src='./resource/img/mainx8.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:162px; top:0; width:45px; height:72px; overflow:hidden;' id='' >";
    out += "    <img class='led' style='position:absolute; left:-5600px; top:-0px;' id='departureTime2Img"+unit+line+"' src='./resource/img/mainx8.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:210px; top:0; width:45px; height:72px; overflow:hidden;' id='' >";
    out += "    <img class='led' style='position:absolute; left:-5856px; top:-0px;' id='departureTime1Img"+unit+line+"' src='./resource/img/mainx8.png' alt='' />";
    out += "  </div>";
    out += "</div>";
    //両数
    out += "<div id='carCountDiv"+unit+line+"' style='position:absolute; left:864px; top:0; width:144px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img class='led' style='position:absolute; left:-0px; top:-0px;' id='carCountImg"+unit+line+"' src='./resource/img/mainx8.png' alt='' />";
    out += "</div>";
    //ドア数
    out += "<div id='doorCountDiv"+unit+line+"' style='position:absolute; left:1008px; top:0; width:144px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img class='led' style='position:absolute; left:-3712px; top:-0px;' id='doorCountImg"+unit+line+"' src='./resource/img/mainx8.png' alt='' />";
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
                out += "<option value='"+typeList[i].i+"'>"+typeList[i].t+"</option>";
            }
            out += "</select>";
            out += " ";
            //行き先
            out += "<select size='1' id='destinationInput"+unit+line+"' style='' onChange='readForm()'>";
            for(let i=0 ; i<destinationList.length ; i++){
                out += "<option value='"+destinationList[i].i+"'>"+destinationList[i].t+"</option>";
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
                out += "<option value='"+carCountList[i].i+"'>"+carCountList[i].t+"</option>";
            }
            out += "</select>";
            out += " ";
            //ドア数
            out += "<select size='1' id='doorCountInput"+unit+line+"' style='' onChange='readForm()'>";
            for(let i=0 ; i<doorCountList.length ; i++){
                out += "<option value='"+doorCountList[i].i+"'>"+doorCountList[i].t+"</option>";
            }
            out += "</select>";
            out += " ";

            // 制御用
            out += "<select id='control"+unit+line+"' onChange='readForm()'>"
            out += "<option value='lastTrain'>終電車</option>";
            out += "<option value='deptHere'>当駅始発</option>";
            out += "<option value='none' selected>----</option>";
            out += "</select>";
            out += "</div>";
        }

        out += "<hr />";
        out += "テロップ: <input id='bottomTelopInput"+unit+"' type='text' value='' size='80' style='text-align:left; ' onkeyup='readForm()' />";
        out += "<br />";

        out += "在線位置:<br />";
        out += "　<input id='approachPosition1Checkbox"+unit+"' type='checkbox' value='' onclick='updateStatus("+unit+")' checked><label for='approachPosition1Checkbox"+unit+"'>前駅〜当駅</label>";
        out += "　<input id='approachPosition2Checkbox"+unit+"' type='checkbox' value='' onclick='updateStatus("+unit+")'><label for='approachPosition2Checkbox"+unit+"'>前駅</label>";
        out += "　<input id='approachPosition3Checkbox"+unit+"' type='checkbox' value='' onclick='updateStatus("+unit+")'><label for='approachPosition3Checkbox"+unit+"'>前々駅〜前駅</label>";
        out += "　<input id='approachPosition4Checkbox"+unit+"' type='checkbox' value='' onclick='updateStatus("+unit+")'><label for='approachPosition4Checkbox"+unit+"'>前々駅</label><br/>";

        out += "<select size='1' id='statusInput"+unit+"' style='' onChange='updateStatus("+unit+")'>";
        out += "<option value=''>テロップ表示</option>";
        out += "<option value=''>接近位置表示</option>";
        out += "<option value=''>到着表示(停車)</option>";
        out += "<option value=''>到着表示(通過)</option>";
        out += "<option value=''>上り終電後</option>";
        out += "<option value=''>乗車不可</option>";
        out += "</select> ";

        out += "　<input type='button' value='　テロップ更新　' onclick='updateStatus("+unit+"); ' />";
        out += "<br />";
        out += "</div>";
        out += "</div>";
    }
    out += "<br style='clear:both;' />";

    eleId("inputFormDiv").innerHTML = out;
}

async function setTimeTableData(){
    await fetch('./resource/data/forHanno.json')
        .then(response => response.json())
        .then(data => {
            kudariTimeTable = data;
        })
        .catch(error => console.error(error));
    await fetch('./resource/data/forIkebukuro.json')
        .then(response => response.json())
        .then(data => {
            noboriTimeTable = data;
        })
        .catch(error => console.error(error));
}

function updateFromTimeTableData(hour, minute){
    const now = hour +""+ minute;
    const nowObj = getHhMm(100*hour+minute);
    const plcHld = {time: null, type:"----", goto:"----", cars:"----", doors:"----", control:"----"};
    let kudariOne = null;
    let kudariTwo = null;
    let noboriOne = null;
    let noboriTwo = null;

    //kudari
    const kudariTT = kudariTimeTable.timeTable.list;
    for(const tt of kudariTT){
        const hhMm = getHhMm(tt.time);
        if(hhMm.h > nowObj.h || hhMm.h == nowObj.h && hhMm.m >= nowObj.m){
            //指定時刻より後の列車データ
            if(kudariOne == null) {
                kudariOne = tt;
            }else{
                //既に行データが存在している場合の比較と投入
                if(kudariOne.time > tt.time){
                    //1行目より前の列車なので、ずらして挿入
                    kudariTwo = kudariOne;
                    kudariOne = tt;
                }else{
                    if(kudariTwo == null || kudariTwo.time > tt.time){
                        //2行目より前の列車なので挿入
                        kudariTwo = tt;
                    }
                }
            }
        }
    }
    if(!kudariOne){
        kudariOne = plcHld;
    }
    if(!kudariTwo){
        kudariTwo = plcHld;
    }

    //nobori
    const noboriTT = noboriTimeTable.timeTable.list;
    for(const tt of noboriTT){
        const hhMm = getHhMm(tt.time);
        if(hhMm.h > nowObj.h || hhMm.h == nowObj.h && hhMm.m >= nowObj.m){
            //指定時刻より後の列車データ
            if(noboriOne == null) {
                noboriOne = tt;
            }else{
                //既に行データが存在している場合の比較と投入
                if(noboriOne.time > tt.time){
                    //1行目より前の列車なので、ずらして挿入
                    noboriTwo = noboriOne;
                    noboriOne = tt;
                }else{
                    if(noboriTwo == null || noboriTwo.time > tt.time){
                        //2行目より前の列車なので挿入
                        noboriTwo = tt;
                    }
                }
            }
        }
    }
    if(!noboriOne){
        noboriOne = plcHld;
    }
    if(!noboriTwo){
        noboriTwo = plcHld;
    }

    //into form
    const dispVal00 = convertTtDataToDispData(kudariOne);
    const dispVal01 = convertTtDataToDispData(kudariTwo);
    const dispVal10 = convertTtDataToDispData(noboriOne);
    const dispVal11 = convertTtDataToDispData(noboriTwo);
    //result
    console.log(dispVal00);
    console.log(dispVal01);
    console.log(dispVal10);
    console.log(dispVal11);

    writeForm(0, 0, dispVal00);
    writeForm(0, 1, dispVal01);
    writeForm(1, 0, dispVal10);
    writeForm(1, 1, dispVal11);

    readForm();
}

/** 時刻表JSONデータをフォームindex値に変換 */
function convertTtDataToDispData(jsonTtDataItem){
    const isPassingTrain = jsonTtDataItem.type==="通過";
    return {
        type: getTypeI(jsonTtDataItem.type),
        dest: getDestI(jsonTtDataItem.goto, isPassingTrain),
        onHh: getHhMm(jsonTtDataItem.time, isPassingTrain).h,
        onMm: getHhMm(jsonTtDataItem.time, isPassingTrain).m,
        car: getCarI(jsonTtDataItem.cars),
        door: getDoorI(jsonTtDataItem.doors),
        control: getControlInfo(jsonTtDataItem)
    };
}

function writeForm(unit, line, dataObj){
    eleId("typeInput"+unit+line).selectedIndex = dataObj.type;
    eleId("destinationInput"+unit+line).selectedIndex = dataObj.dest;
    eleId("carCountInput"+unit+line).selectedIndex = dataObj.car;
    eleId("doorCountInput"+unit+line).selectedIndex = dataObj.door;
    eleId("departureHourInput"+unit+line).value = dataObj.onHh;
    eleId("departureMinuteInput"+unit+line).value = dataObj.onMm;
    eleId("control"+unit+line).selectedIndex = dataObj.control;
}

let typeData = [[null, null], [null, null]];
let destinationData = [[null, null], [null, null]];
let departureHourData = [[null, null], [null, null]];
let departureMinuteData = [[null, null], [null, null]];
let carCountData = [[null, null], [null, null]];
let doorCountData = [[null, null], [null, null]];
let controlInfoData = [[null, null], [null, null]];
let motChuFunc = [[null, null], [null, null]];

/** フォームから入力を読み込む */
function readForm()
{
    for(let unit=0 ; unit<unitSum ; unit++){
        for(let line=0 ; line<lineSum ; line++){
            //////////ドロップダウンリストから選択状態を読み込み
            //種別
            typeData[unit][line] = eleId("typeInput"+unit+line).selectedIndex;
            //行先
            destinationData[unit][line] = eleId("destinationInput"+unit+line).selectedIndex;
            //両数
            carCountData[unit][line] = eleId("carCountInput"+unit+line).selectedIndex;
            //ドア数
            doorCountData[unit][line] = eleId("doorCountInput"+unit+line).selectedIndex;

            //////////テキストボックスから読み込み
            //時
            const inHour = eleId("departureHourInput"+unit+line).value;
            departureHourData[unit][line] = inputTextNumCheck(inHour, ""); //値が数値かどうかチェック
            //分
            const inMinute = eleId("departureMinuteInput"+unit+line).value;
            departureMinuteData[unit][line] = inputTextNumCheck(inMinute, ""); //値が数値かどうかチェック

            controlInfoData[unit][line] = eleId("control"+unit+line).selectedIndex;
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
            eleId("typeImg"+unit+line).style.top = -25 * 8 * typeData[unit][line] + "px";
            //行き先
            eleId("destinationImg"+unit+line).style.top = -25 * 8 * destinationData[unit][line] + "px";
            //両数
            eleId("carCountImg"+unit+line).style.top = -25 * 8 * carCountData[unit][line] + "px";
            //ドア数
            eleId("doorCountImg"+unit+line).style.top = -25 * 8 * doorCountData[unit][line] + "px";

            if(langId == 0 && destinationData[unit][line] == getDestI("元町・中華街")){
                motChuFunc[unit][line] = setTimeout(() => {
                    eleId("destinationImg"+unit+line).style.top = "0";
                    eleId("destinationImg"+unit+line).style.left = -450 * 8 + "px";
                }, 4500)
            }else{
                eleId("destinationImg"+unit+line).style.left = -202 * 8 + "px";
                clearTimeout(motChuFunc[unit][line]);
            }

            //////////時刻を変更する
            //時
            const departureHourBuff = departureHourData[unit][line];
            eleId("departureTime4Img"+unit+line).style.top = -25 * 8 * digitDivision(departureHourBuff,10, 10, 10) + "px";
            eleId("departureTime3Img"+unit+line).style.top = -25 * 8 * digitDivision(departureHourBuff,1, 10, 0) + "px";
            //分
            const departureMinuteBuff = departureMinuteData[unit][line];
            eleId("departureTime2Img"+unit+line).style.top = -25 * 8 * digitDivision(departureMinuteBuff,10, 10,0) + "px";
            eleId("departureTime1Img"+unit+line).style.top = -25 * 8 * digitDivision(departureMinuteBuff,1, 10, 0) + "px";

            //コロンの有無
            if(departureHourBuff == "" && departureMinuteBuff == ""){
                eleId("departureTime0Img"+unit+line).style.top = -0 * 8 + "px";
            } else {
                eleId("departureTime0Img"+unit+line).style.top = -25 * 8 + "px";
            }

            ////////日本語/英語を切り替える
            let typeImgLeft = [0, -49 * 8];
            let destinationImgLeft = [-202 * 8, -323 * 8];
            let carCountImgLeft = [-763 * 8, -812 * 8];
            let doorCountImgLeft = [-868 * 8, -917 * 8];
            //切り替え判定（終電車・当駅始発）
            switch (controlInfoData[unit][line]){
                case getControlInfo({info:{lastTrain:"true"}}):
                    typeImgLeft[1] = typeImgLeft[0];
                    destinationImgLeft[1] = -450 * 8;
                    if(langId == 1) {
                        eleId("destinationImg" + unit + line).style.top = -25 * 8 * 2 + "px";
                    }
                    carCountImgLeft[1] = carCountImgLeft[0];
                    doorCountImgLeft[1] = doorCountImgLeft[0];
                    break;
                case getControlInfo({info:{deptHere:"true"}}):
                    typeImgLeft[1] = typeImgLeft[0];
                    destinationImgLeft[1] = -450 * 8;
                    if(langId == 1) {
                        eleId("destinationImg" + unit + line).style.top = -25 * 8 * 1 + "px";
                    }
                    carCountImgLeft[1] = carCountImgLeft[0];
                    doorCountImgLeft[1] = doorCountImgLeft[0];
                    break;
                case getControlInfo({}):
                    //英語
                    break;
                }
            //種別
            eleId("typeImg"+unit+line).style.left = typeImgLeft[langId] + "px";
            //行き先
            eleId("destinationImg"+unit+line).style.left = destinationImgLeft[langId] + "px";
            //両数
            eleId("carCountImg"+unit+line).style.left = carCountImgLeft[langId] + "px";
            //ドア数
            eleId("doorCountImg"+unit+line).style.left = doorCountImgLeft[langId] + "px";
        }

    }
}

//表示切り替え間隔の設定
let LEDUpdateTimeout;
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

let timeOrderSelectData = [null, null];
let statusData = [null, null];
let trackData = [null, null];
let directionData = [null, null];
let bottomTelopData = [null, null];
let approachPosition4Data = [null, null];
let approachPosition3Data = [null, null];
let approachPosition2Data = [null, null];
let approachPosition1Data = [null, null];
const approachBaseLeft = -481 * 8;
const approachBaseTop = -425 * 8;
/** 発車標の状態を更新する */
function updateStatus(unit){
    //フォームから設定読み込み

    //点滅している場合は止める
    clearTimeout(switchImgTimeout[unit]);

    statusData[unit] = eleId("statusInput"+unit).selectedIndex;

    //テロップ
    if(statusData[unit] == 0) {
        bottomTelopData[unit] = eleId("bottomTelopInput"+unit).value;

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
        out += "  <div style=\"position:absolute; top:"+topBuff+"px; left:0; width:1152px; height:72px; font-size:72px; color:#0f0; font-family:'ＭＳ ゴシック', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif; \">";
        out += "    <marquee scrollamount='5' >"; //現地のテロップは6.2秒
        out += bottomTelopData[unit];
        out += "    </marquee>";
        out += "  </div>";

        eleId("bottomLineDiv"+unit).innerHTML = out;
    }
    //接近位置表示
    if(statusData[unit] == 1){
        //接近位置を読み込む
        approachPosition4Data[unit] = eleId("approachPosition4Checkbox"+unit).checked
        approachPosition3Data[unit] = eleId("approachPosition3Checkbox"+unit).checked
        approachPosition2Data[unit] = eleId("approachPosition2Checkbox"+unit).checked
        approachPosition1Data[unit] = eleId("approachPosition1Checkbox"+unit).checked

        let out = "";
        //当駅
        out += "<div id='approachPosition0Div"+unit+"' style='position:absolute; left:0; top:0; width:144px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition0Img"+unit+"' class='led' " +
                "style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+approachBaseTop+"px; ' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";
        //当駅〜前駅
        out += "<div id='approachPosition1Div"+unit+"' style='position:absolute; left:144px; top:0; width:360px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition1Img"+unit+"' class='led' " +
                "style='position:absolute; left:"+(approachBaseLeft-1176)+"px; top:"+approachBaseTop+"px;' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";
        //前駅
        out += "<div id='approachPosition2Div"+unit+"' style='position:absolute; left:504px; top:0; width:144px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition2Img"+unit+"' class='led' " +
                "style='position:absolute; left:"+(approachBaseLeft-392)+"px; top:"+approachBaseTop+"px;' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";
        //前駅〜前々駅
        out += "<div id='approachPosition3Div"+unit+"' style='position:absolute; left:648px; top:0; width:360px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition3Img"+unit+"' class='led' " +
                "style='position:absolute; left:"+(approachBaseLeft-1176)+"px; top:"+approachBaseTop+"px;' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";
        //前々駅
        out += "<div id='approachPosition4Div"+unit+"' style='position:absolute; left:1008px; top:0; width:144px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition4Img"+unit+"' class='led' " +
                "style='position:absolute; left:"+(approachBaseLeft-784)+"px; top:"+approachBaseTop+"px;' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";

        eleId("bottomLineDiv"+unit).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
    //接近表示「電車がまいります。ご注意下さい。」
    if(statusData[unit] == 2){
        let out = "";
        out += "<div id='arrivingDiv"+unit+"' style='position:absolute; left:0; top:0; width:1152px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='arrivingImg"+unit+"' class='led' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+(approachBaseTop-25*3*8)+"px;' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";

        eleId("bottomLineDiv"+unit).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
    //接近表示「電車が通過します。ご注意下さい。」
    if(statusData[unit] == 3){
        let out = "";
        out += "<div id='arrivingDiv"+unit+"' style='position:absolute; left:0; top:0; width:1152px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='arrivingImg"+unit+"' class='led' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+(approachBaseTop-25*4*8)+"px;' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";

        eleId("bottomLineDiv"+unit).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
    //「上り電車は終了いたしました。」
    if(statusData[unit] == 4){
        let out = "";
        out += "<div id='arrivingDiv"+unit+"' style='position:absolute; left:0; top:0; width:1152px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='arrivingImg"+unit+"' class='led' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+(approachBaseTop-25*6*8)+"px;' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";

        eleId("bottomLineDiv"+unit).innerHTML = out;
    }
    //「お乗りになれません」
    if(statusData[unit] == 5){
        let out = "";
        out += "<div id='arrivingDiv"+unit+"' style='position:absolute; left:0; top:0; width:1152px; height:72px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='arrivingImg"+unit+"' class='led' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+(approachBaseTop-25*7*8)+"px;' src='./resource/img/mainx8.png' alt='' />";
        out += "</div>";

        eleId("bottomLineDiv"+unit).innerHTML = out;
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
            eleId("approachPosition4Img"+unit).style.top =  approachBaseTop-25*8 - 25*8*switchStatus + "px";
        }
        //前々駅〜前駅
        if(approachPosition3Data[unit]){
            eleId("approachPosition3Img"+unit).style.top =  approachBaseTop-25*8 - 25*8*switchStatus + "px";
        }
        //前駅
        if(approachPosition2Data[unit]){
            eleId("approachPosition2Img"+unit).style.top =  approachBaseTop-25*8 - 25*8*switchStatus + "px";
        }
        //前駅〜当駅
        if(approachPosition1Data[unit]){
            eleId("approachPosition1Img"+unit).style.top =  approachBaseTop-25*8 - 25*8*switchStatus + "px";
        }
    }
    //「電車がまいります。ご注意下さい。」
    if(statusData[unit] == 2){
        eleId("arrivingImg"+unit).style.left =  approachBaseLeft - 1000*8*switchStatus + "px";
    }
    //「電車が通過します。ご注意下さい。」
    if(statusData[unit] == 3){
        eleId("arrivingImg"+unit).style.left =  approachBaseLeft - 1000*8*switchStatus + "px";
    }

    //点滅間隔
    switchImgTimeout[unit] = setTimeout("switchCount[" + unit + "]++; switchImg(" + unit + ")", 500);
}


/** 時計の描画 */
let analogClock = {
    canvas: null,
    context: null,
    w: null,
    h: null,
    o: {x: null, y: null},
    r: null
}
function drawClock() {
    /* デジタル */
    //：
    eleId("currentTime0Img").style.top = -25 * 8 + "px";

    /* アナログ */ //ref https://www.yoheim.net/blog.php?q=20111122
    analogClock.canvas = eleId("analogClock");
    analogClock.context = analogClock.canvas.getContext("2d");
    analogClock.w = analogClock.canvas.clientWidth;
    analogClock.h = analogClock.canvas.clientHeight;
    analogClock.o.x = analogClock.w/2 +3;
    analogClock.o.y = analogClock.h/2 - 3;
    analogClock.r= analogClock.h * 0.8 / 2;

    analogClock.context.fillStyle = "#99ff33";
    analogClock.context.strokeStyle = "#99ff33";
    analogClock.context.font = "24px 'メイリオ'";

    updateClock(true);
    setInterval(updateClock, 1000);
}

function updateClock(isInit){
    //時
    const now = new Date();
    const departureHourBuff = now.getHours();
    eleId("currentTime4Img").style.top = -25 * 8 * digitDivision(departureHourBuff, 10, 10,10) + "px";
    eleId("currentTime3Img").style.top = -25 * 8 * digitDivision(departureHourBuff, 1, 10,0) + "px";
    //分
    const departureMinuteBuff = now.getMinutes();
    eleId("currentTime2Img").style.top = -25 * 8 * digitDivision(departureMinuteBuff, 10, 10,0) + "px";
    eleId("currentTime1Img").style.top = -25 * 8 * digitDivision(departureMinuteBuff, 1, 10,0) + "px";

    /* アナログ時計 */
    const curSec = now.getSeconds();
    if(isInit || 58 < curSec || curSec === 0 || (28 < curSec && curSec <= 30) ) {
        //clear
        analogClock.context.clearRect(0, 0, analogClock.w, analogClock.h);
        //number
        for(let i=1; i<=60; i++){
            const r = 6 * Math.PI / 180 * i - Math.PI;
            analogClock.context.save();
            analogClock.context.translate(analogClock.o.x, analogClock.o.y);
            analogClock.context.rotate(r);
            if(i % 5 === 0) {
                analogClock.context.lineWidth = 4;
            }else {
                analogClock.context.lineWidth = 2;
            }
            analogClock.context.beginPath();
            analogClock.context.moveTo(0, analogClock.r);
            analogClock.context.lineTo(0, analogClock.r + 4);
            analogClock.context.stroke();
            analogClock.context.restore();
        }
        analogClock.context.moveTo(analogClock.o.x, analogClock.o.y);
        for(let num=1; num<=12; num++){
            const nRad = (360/12) * num * Math.PI / 180;
            let dx = 8;
            if(num === 10){ dx += 2; }
            if(num === 11){ dx += 4; }
            if(num === 12){ dx += 6; }
            analogClock.context.fillText(""+num, calcDrawPoint(nRad, 0.85).x - dx, calcDrawPoint(nRad, 0.85).y + 8);
        }
        //clock
        const hhRad = (360 * now.getHours() / 12 + (360 / 12) * (now.getMinutes() / 60)) * Math.PI / 180;
        analogClock.context.beginPath();
        analogClock.context.moveTo(analogClock.o.x, analogClock.o.y);
        analogClock.context.lineWidth = 6;
        analogClock.context.lineTo(calcDrawPoint(hhRad, 0.6).x, calcDrawPoint(hhRad, 0.6).y);
        analogClock.context.stroke();
        const mmRad = (360 * now.getMinutes() / 60 + (360 / 60) * (now.getSeconds() / 60)) * Math.PI / 180;
        analogClock.context.beginPath();
        analogClock.context.moveTo(analogClock.o.x, analogClock.o.y);
        analogClock.context.lineWidth = 4;
        analogClock.context.lineTo(calcDrawPoint(mmRad).x, calcDrawPoint(mmRad).y);
        analogClock.context.stroke();
    }


}

function calcDrawPoint(rad, length=1){
    return {
        x: analogClock.o.x + analogClock.r * length * Math.sin(rad),
        y: analogClock.o.y - analogClock.r * length * Math.cos(rad)
    };
}

