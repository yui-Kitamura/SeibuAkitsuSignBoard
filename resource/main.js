var unitSum = 2; //ホーム発車標の台数
var lineSum = 3; //ホーム発車標の段数


function main()
{
    //発車標の段数を設定する
    setUnitLine();

    //現在時刻表示を開始
    //updateNowTime();
}

//発車標の段数を設定する
function setUnitLine()
{
    //段数を読み込む
    var id = "lineCountInput";
    var index = document.getElementById(id).selectedIndex;
    lineSum = document.getElementById(id).options[index].value;

    //筐体を段数分描く
    writeUnitHTML();
    //入力部を段数分つくる
    writeFormHTML();

    //デフォルトでデータをセットする
    setDefaultData();

    //入力を読み込む
    readForm();

    //日本語と英語の交互表示スタート
    intervalTimeSet();
    //2段目の設定反映
    for(unit=0 ; unit<unitSum ; unit++)
    {
        updateStatus(unit);
    }
}

//筐体のHTMLを出力する
function writeUnitHTML()
{
    var out = "";
    out += "";
    out += "";
    out += "<div id='' style='position:relative; top:0px; left:0px; height:"+(130+lineSum*24)+"px; width:1050px; '>";
    for(unit=0 ; unit<unitSum ; unit++)
    {
        out += "";

        out += "<div id='' style='position:absolute; top:20px; left:"+(20+unit*550)+"px; width:550px; '>";
        out += "  <div id='kyotaiMainDiv"+unit+"' style='position:absolute; '>";
        out += "    <div id='' style='position:absolute; top:0px; left:0px; width:500px; height:"+(98+lineSum*24)+"px; background-color:#777; '>";
        //方面ラベル
        out += "      <img id='' style='position:absolute; top:0px; left:0px; width:500px; height:43px; ' src='img/label/title-"+unit+".png' alt='' />";
        out += "      <div id='' style='position:absolute; top:43px; left:11px; width:479px; height:"+(47+lineSum*24)+"px; background-color:#222; '>";
        //項目名ラベル
        out += "        <img id='' style='position:absolute; top:0px; left:81px; width:384px; height:14px; ' src='img/label/header.png' alt='' />";
        out += "        <img id='' style='position:absolute; top:14px; left:0px; width:81px; height:96px; ' src='img/label/order.png' alt='' />";
        //LED描画部
        out += "        <div id='mainLEDDiv"+unit+"' style='position:absolute; top:14px; left:81px; width:384px; height:"+(24+lineSum*24)+"px; background-color:#000; '>"; //
        out += "          <div id='mainLEDDiv"+unit+"' style='position:absolute; top:0px; left:0px; width:384px; height:"+(24+lineSum*24)+"px; background-color:#000; '>"; //
        for(line=0 ; line<lineSum ; line++)
        {
            //縦位置
            if(line == 0)
                var topBuff = 0;
            else
                var topBuff = (line+1)*24;
            //発車時刻、種別、行き先、両数
            out += "                <div id='' style='position:absolute; top:"+topBuff+"px; left:0px; width:384px; height:24px; overflow:hidden; '>";
            //out += "              <div id='' style='position:absolute; top:1px; left:1px; width:336px; height:24px; background-color:#222; overflow:hidden; '>";
            out += writeLineHTML(unit, line);
            //out += "              </div>";
            out += "                </div>";
        }
        //最下段のテロップor到着表示
        out += "            <div id='bottomLineDiv"+unit+"' style='position:absolute; top:24px; left:0px; width:384px; height:24px; background-color:#000; z-index:1; '>";
        out += "            </div>";
        out += "          </div>";
        out += "        </div>";
        out += "      </div>";
        out += "    </div>";
        out += "  </div>";
        out += "</div>";
    }
    out += "</div>";

    var id = "LEDUnitDiv";
    document.getElementById(id).innerHTML = out;
}

//LEDの1段分のHTMLを出力する
function writeLineHTML(unit, line)
{
    var out = "";
    out += "";

    //種別
    out += "<div id='typeDiv"+unit+line+"' style='position:absolute; left:0px; top:0px; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img id='typeImg"+unit+line+"' style='position:absolute; left:0px; top:-0px; ' src='img/main.png' alt='' />";
    out += "</div>";
    //行き先
    out += "<div id='destinationDiv"+unit+line+"' style='position:absolute; left:60px; top:0px; width:120px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img id='destinationImg"+unit+line+"' style='position:absolute; left:0px; top:-0px; ' src='img/main.png' alt='' />";
    out += "</div>";
    //時刻
    out += "<div id='timeDiv"+unit+line+"' style='position:absolute; left:180px; top:0px; width:96px; height:24px; overflow:hidden; background-color:#000; z-index:1;' >";
    out += "  <div style='position:absolute; left:0px; top:0px; width:96px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-580px; top:-0px; ' id='departureTime0Img"+unit+line+"' src='img/main.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:10px; top:0px; width:15px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-700px; top:-0px; ' id='departureTime4Img"+unit+line+"' src='img/main.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:26px; top:0px; width:15px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-732px; top:-0px; ' id='departureTime3Img"+unit+line+"' src='img/main.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:54px; top:0px; width:15px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-700px; top:-0px; ' id='departureTime2Img"+unit+line+"' src='img/main.png' alt='' />";
    out += "  </div>";
    out += "  <div style='position:absolute; left:70px; top:0px; width:15px; height:24px; overflow:hidden;' id='' >";
    out += "    <img style='position:absolute; left:-732px; top:-0px; ' id='departureTime1Img"+unit+line+"' src='img/main.png' alt='' />";
    out += "  </div>";
    out += "</div>";
    //両数
    out += "<div id='carCountDiv"+unit+line+"' style='position:absolute; left:288px; top:0px; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img style='position:absolute; left:-0px; top:-0px; ' id='carCountImg"+unit+line+"' src='img/main.png' alt='' />";
    out += "</div>";
    //ドア数
    out += "<div id='doorCountDiv"+unit+line+"' style='position:absolute; left:336px; top:0px; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
    out += "  <img style='position:absolute; left:-464px; top:-0px; ' id='doorCountImg"+unit+line+"' src='img/main.png' alt='' />";
    out += "</div>";

    out += "";
    return out;
}

//制御するフォームのHTMLを出力
function writeFormHTML()
{
    var out = "";
    out += "";
    out += " ";

    out += "<div id='' style=''>";
    for(unit=0 ; unit<unitSum ; unit++)
    {
        out += "<div style='float:left; margin:0px; padding:10px; border-right: solid 1px #999; border-bottom: solid 1px #999; '>";
        out += "【"+(unit+1)+"台目】";
        for(line=0 ; line<lineSum ; line++)
        {
            out += "<div style='white-space: nowrap; '>";
            out += " "+(line+1)+"本目 ";

            //種別
            out += "<select size='1' id='typeInput"+unit+line+"' style='' onChange='readForm()'>";
            for(i=0 ; i<typeList.length ; i++)
            {
                out += "<option value='"+i+"'>"+typeList[i][0]+"</option>";
            }
            out += "</select>";
            out += " ";
            //行き先
            out += "<select size='1' id='destinationInput"+unit+line+"' style='' onChange='readForm()'>";
            for(i=0 ; i<destinationList.length ; i++)
            {
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
            for(i=0 ; i<carCountList.length ; i++)
            {
                out += "<option value='"+i+"'>"+carCountList[i][0]+"</option>";
            }
            out += "</select>";
            out += " ";
            //ドア数
            out += "<select size='1' id='doorCountInput"+unit+line+"' style='' onChange='readForm()'>";
            for(i=0 ; i<doorCountList.length ; i++)
            {
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


        out += "";
        out += "";
        out += "";
        out += "";
        out += "";


        out += "</div>";
        out += "</div>";

        out += "";
    }
    out += "<br style='clear:both;' />";
    out += "";

    var id = "inputFormDiv";
    document.getElementById(id).innerHTML = out;
}



//デフォルトでの列車データをセットする、引数numに0だったら、ランダム、1か2か3だったらデフォルトデータ挿入
function setDefaultData()
{
    for(unit=0 ; unit<unitSum ; unit++)
    {
        for(line=0 ; line<lineSum ; line++)
        {
            ////////ドロップダウンリストにランダムな値をセットする
            var id = "typeInput"+unit+line;
            var randomNum = Math.floor(Math.random() * (document.getElementById(id).options.length - 2));
            document.getElementById(id).options[randomNum].selected = true;

            var id = "destinationInput"+unit+line;
            var randomNum = Math.floor(Math.random() * (document.getElementById(id).options.length - 4));
            document.getElementById(id).options[randomNum].selected = true;

            var id = "carCountInput"+unit+line;
            var randomNum = Math.floor(Math.random() * (document.getElementById(id).options.length - 1));
            document.getElementById(id).options[randomNum].selected = true;

            var id = "doorCountInput"+unit+line;
            var randomNum = Math.floor(Math.random() * (document.getElementById(id).options.length - 1));
            document.getElementById(id).options[randomNum].selected = true;

            ///////今より少し進んだ時刻を計算
            var nowDate = new Date(); //現在日時
            var baseSecond = nowDate.getTime(); //秒に変換
            baseSecond += line*7*60*1000 + Math.floor(Math.random() * 3*60*1000) ; //7分間隔(3分の揺らぎ付き)
            nowDate.setTime(baseSecond); //Date型に変換
            var hour = nowDate.getHours(); //時
            var minute = nowDate.getMinutes(); //分

            var id = "departureHourInput"+unit+line;
            document.getElementById(id).value = hour;

            var id = "departureMinuteInput"+unit+line;
            document.getElementById(id).value = minute;

        }
    }

    //テロップ文章
    document.getElementById("bottomTelopInput0").value = "<span style='color:#f80'>西所沢</span>で<span style='color:#f80'>西武球場前</span>ゆきに、<span style='color:#f80'>飯能</span>で<span style='color:#f80'>西武秩父</span>ゆきに接続します。";
    document.getElementById("bottomTelopInput1").value = "<span style='color:#f80'>練馬</span>で準急<span style='color:#f80'>飯能</span>ゆきにお乗継ぎができます。";

    //2行目の表示内容
    document.getElementById("statusInput0").options[0].selected = true;
    document.getElementById("statusInput1").options[1].selected = true;

}

var typeData = [[null, null, null], [null, null, null]];
var destinationData = [[null, null, null], [null, null, null]];
var departureHourData = [[null, null, null], [null, null, null]];
var departureMinuteData = [[null, null, null], [null, null, null]];
var carCountData = [[null, null, null], [null, null, null]];
var doorCountData = [[null, null, null], [null, null, null]];

//フォームから入力を読み込む
function readForm()
{
    for(unit=0 ; unit<unitSum ; unit++)
    {
        for(line=0 ; line<lineSum ; line++)
        {
            //////////ドロップダウンリストから選択状態を読み込み
            //種別
            var id = "typeInput"+unit+line;
            typeData[unit][line] = document.getElementById(id).selectedIndex;
            //行先
            var id = "destinationInput"+unit+line;
            destinationData[unit][line] = document.getElementById(id).selectedIndex;
            //両数
            var id = "carCountInput"+unit+line;
            carCountData[unit][line] = document.getElementById(id).selectedIndex;
            //ドア数
            var id = "doorCountInput"+unit+line;
            doorCountData[unit][line] = document.getElementById(id).selectedIndex;

            //////////テキストボックスから読み込み
            //時
            var id = "departureHourInput"+unit+line;
            departureHourData[unit][line] = document.getElementById(id).value;
            departureHourData[unit][line] = inputTextNumCheck(departureHourData[unit][line], 0); //値が数値かどうかチェック
            //分
            var id = "departureMinuteInput"+unit+line;
            departureMinuteData[unit][line] = document.getElementById(id).value;
            departureMinuteData[unit][line] = inputTextNumCheck(departureMinuteData[unit][line], 0); //値が数値かどうかチェック
        }
    }

    updateLED();
}

//LEDの画像を変更する
var updateLEDCount = 0;
function updateLED()
{
    for(unit=0 ; unit<unitSum ; unit++)
    {
        for(line=0 ; line<lineSum ; line++)
        {
            //言語
            langId = updateLEDCount%2;


            //////////画像を変更する
            //種別
            var id = "typeImg" + unit+line;
            document.getElementById(id).style.top = -25 * typeData[unit][line] + "px";
            //行き先
            var id = "destinationImg" + unit+line;
            document.getElementById(id).style.top = -25 * destinationData[unit][line] + "px";
            //両数
            var id = "carCountImg" + unit+line;
            document.getElementById(id).style.top = -25 * carCountData[unit][line] + "px";
            //ドア数
            var id = "doorCountImg" + unit+line;
            document.getElementById(id).style.top = -25 * doorCountData[unit][line] + "px";



            //////////時刻を変更する
            //時
            var departureHourBuff = departureHourData[unit][line];
            var id = "departureTime4Img" + unit+line;
            document.getElementById(id).style.top = -25 * digitDivision(departureHourBuff,   10, 10) + "px";
            var id = "departureTime3Img" + unit+line;
            document.getElementById(id).style.top = -25 * digitDivision(departureHourBuff,    1, 0) + "px";
            //分
            var departureMinuteBuff = departureMinuteData[unit][line];
            var id = "departureTime2Img" + unit+line;
            document.getElementById(id).style.top = -25 * digitDivision(departureMinuteBuff,   10, 0) + "px";
            var id = "departureTime1Img" + unit+line;
            document.getElementById(id).style.top = -25 * digitDivision(departureMinuteBuff,    1, 0) + "px";

            //コロンの有無
            if(departureHourBuff == "" && departureMinuteBuff == "")
            {
                var id = "departureTime0Img" + unit+line;
                document.getElementById(id).style.top = -0 + "px";
            }
            else
            {
                var id = "departureTime0Img" + unit+line;
                document.getElementById(id).style.top = -25 + "px";
            }

            ////////日本語/英語を切り替える
            typeImgLeft = [-0, -49];
            destinationImgLeft = [-202, -323];
            carCountImgLeft = [-763, -812];
            doorCountImgLeft = [-868, -917];

            //種別
            var id = "typeImg" + unit+line;
            document.getElementById(id).style.left = typeImgLeft[langId] + "px";
            //行き先
            var id = "destinationImg" + unit+line;
            document.getElementById(id).style.left = destinationImgLeft[langId] + "px";
            //両数
            var id = "carCountImg" + unit+line;
            document.getElementById(id).style.left = carCountImgLeft[langId] + "px";
            //ドア数
            var id = "doorCountImg" + unit+line;
            document.getElementById(id).style.left = doorCountImgLeft[langId] + "px";

        }

    }
}

//表示切り替え間隔の設定
var updateLEDCount = 0;
function intervalTimeSet()
{
    //表示更新
    updateLED();

    //次の更新設定
    if(updateLEDCount % 2 == 0)
        var nextTime = document.getElementById("intervalInput0").value;
    if(updateLEDCount % 2 == 1)
        var nextTime = document.getElementById("intervalInput1").value;

    nextTime = inputTextNumCheck(nextTime, 1); //入力された値のチェック

    nextTime *= 1000;

    clearTimeout(LEDUpdateTimeout);
    LEDUpdateTimeout = setTimeout("updateLEDCount++; intervalTimeSet();", nextTime);
}
var LEDUpdateTimeout;

//発車標の状態を更新する
var timeOrderSelectData = [null, null];
var statusData = [null, null];
var trackData = [null, null];
var directionData = [null, null];
var bottomTelopData = [null, null];
var approachPosition4Data = [null, null];
var approachPosition3Data = [null, null];
var approachPosition2Data = [null, null];
var approachPosition1Data = [null, null];
function updateStatus(unit)
{
    //フォームから設定読み込み

    //点滅している場合は止める
    clearTimeout(switchImgTimeout[unit]);



    var id = "statusInput"+unit;
    statusData[unit] = document.getElementById(id).selectedIndex;

    //テロップ
    if(statusData[unit] == 0)
    {
        var id = "bottomTelopInput"+unit;
        bottomTelopData[unit] = document.getElementById(id).value;

        //環境によってフォントの縦位置を設定
        if(os == "Windows")
            var topBuff = -1; //Windows
        else if(uaName == "gecko")
            var topBuff = -3; //MacのFirefox
        else
            var topBuff = -6; //Macのchrome

        var out = "";
        out += "  <div style=\"position:absolute; top:"+topBuff+"px; left:0px; width:384px; height:24px; font-size:24px; color:#0f0; font-family:'ＭＳ ゴシック', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif; \">";
        out += "    <marquee scrollamount='5' >"; //現地のテロップは6.2秒
        out += bottomTelopData[unit];
        out += "    </marquee>";
        out += "  </div>";
        out += "";
        out += "";
        out += "";
        out += "";

        var id = "bottomLineDiv" + unit;
        document.getElementById(id).innerHTML = out;
    }
    //接近位置表示
    if(statusData[unit] == 1)
    {
        //接近位置を読み込む
        var id = "approachPosition4Checkbox"+unit;
        approachPosition4Data[unit] = document.getElementById(id).checked
        var id = "approachPosition3Checkbox"+unit;
        approachPosition3Data[unit] = document.getElementById(id).checked
        var id = "approachPosition2Checkbox"+unit;
        approachPosition2Data[unit] = document.getElementById(id).checked
        var id = "approachPosition1Checkbox"+unit;
        approachPosition1Data[unit] = document.getElementById(id).checked

        var out = "";
        out += "";
        out += "";
        out += "";
        out += "";
        out += "";

        approachBaseLeft = -481;
        approachBaseTop = -425;

        //当駅
        out += "<div id='approachPosition0Div"+unit+"' style='position:absolute; left:0px; top:0px; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition0Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+approachBaseTop+"px; ' src='img/main.png' alt='' />";
        out += "</div>";
        //当駅〜前駅
        out += "<div id='approachPosition1Div"+unit+"' style='position:absolute; left:48px; top:0px; width:120px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition1Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft-147)+"px; top:"+approachBaseTop+"px; ' src='img/main.png' alt='' />";
        out += "</div>";
        //前駅
        out += "<div id='approachPosition2Div"+unit+"' style='position:absolute; left:168px; top:0px; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition2Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft-49)+"px; top:"+approachBaseTop+"px; ' src='img/main.png' alt='' />";
        out += "</div>";
        //前駅〜前々駅
        out += "<div id='approachPosition3Div"+unit+"' style='position:absolute; left:216px; top:0px; width:120px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition3Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft-147)+"px; top:"+approachBaseTop+"px; ' src='img/main.png' alt='' />";
        out += "</div>";
        //前々駅
        out += "<div id='approachPosition4Div"+unit+"' style='position:absolute; left:336px; top:0px; width:48px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='approachPosition4Img"+unit+"' style='position:absolute; left:"+(approachBaseLeft-98)+"px; top:"+approachBaseTop+"px; ' src='img/main.png' alt='' />";
        out += "</div>";

        var id = "bottomLineDiv" + unit;
        document.getElementById(id).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
    //接近表示「電車がまいります。ご注意下さい。」
    if(statusData[unit] == 2)
    {
        var out = "";
        out += "";
        out += "<div id='arrivingDiv"+unit+"' style='position:absolute; left:0px; top:0px; width:384px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='arrivingImg"+unit+"' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+(approachBaseTop-25*3)+"px; ' src='img/main.png' alt='' />";
        out += "</div>";

        var id = "bottomLineDiv" + unit;
        document.getElementById(id).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
    //接近表示「電車が通過します。ご注意下さい。」
    if(statusData[unit] == 3)
    {
        var out = "";
        out += "";
        out += "<div id='arrivingDiv"+unit+"' style='position:absolute; left:0px; top:0px; width:384px; height:24px; overflow:hidden; background-color:#000; z-index:1;'>";
        out += "  <img id='arrivingImg"+unit+"' style='position:absolute; left:"+(approachBaseLeft)+"px; top:"+(approachBaseTop-25*4)+"px; ' src='img/main.png' alt='' />";
        out += "</div>";

        var id = "bottomLineDiv" + unit;
        document.getElementById(id).innerHTML = out;

        //点滅表示スタート
        switchImg(unit);
    }
}

//接近表示を点滅させる
var switchCount = [0, 0];
var switchImgTimeout = [null, null];
function switchImg(unit)
{
    swicthStatus = switchCount[unit] % 2;

    if(statusData[unit] == 1)
    {
        //前々駅
        if(approachPosition4Data[unit])
        {
            var id = "approachPosition4Img" + unit;
            document.getElementById(id).style.top =  approachBaseTop-25 - 25*swicthStatus + "px";
        }
        //前々駅〜前駅
        if(approachPosition3Data[unit])
        {
            var id = "approachPosition3Img" + unit;
            document.getElementById(id).style.top =  approachBaseTop-25 - 25*swicthStatus + "px";
        }
        //前駅
        if(approachPosition2Data[unit])
        {
            var id = "approachPosition2Img" + unit;
            document.getElementById(id).style.top =  approachBaseTop-25 - 25*swicthStatus + "px";
        }
        //前駅〜当駅
        if(approachPosition1Data[unit])
        {
            var id = "approachPosition1Img" + unit;
            document.getElementById(id).style.top =  approachBaseTop-25 - 25*swicthStatus + "px";
        }
    }
    //「電車がまいります。ご注意下さい。」
    if(statusData[unit] == 2)
    {
        var id = "arrivingImg" + unit;
        document.getElementById(id).style.left =  approachBaseLeft - 1000*swicthStatus + "px";
    }
    //「電車が通過します。ご注意下さい。」
    if(statusData[unit] == 3)
    {
        var id = "arrivingImg" + unit;
        document.getElementById(id).style.left =  approachBaseLeft - 1000*swicthStatus + "px";
    }

    //点滅間隔をフォームから読み込む
    var id = "switchIntervalInput";
    switchInterval = document.getElementById(id).value;
    switchInterval = inputTextNumCheck(switchInterval, 1); //入力された値のチェック

    switchImgTimeout[unit] = setTimeout("switchCount["+unit+"]++; switchImg("+unit+")", switchInterval*1000);
}


//現在時刻表示を更新する
var nowTimeUpdateCount = 0;
var nowTimeUpdateTimeout;
function updateNowTime()
{
    //フォームから読み込み
    var id = "nowHourInput";
    nowHour = document.getElementById(id).value;
    nowHour = inputTextNumCheck(nowHour, 0); //値が数値かどうかチェック
    var id = "nowMinuteInput";
    nowMinute = document.getElementById(id).value;
    nowMinute = inputTextNumCheck(nowMinute, 0); //値が数値かどうかチェック

    for(unit=0 ; unit<unitSum ; unit++)
    {
        //時
        var id = "nowHourImg1" + unit;
        document.getElementById(id).style.top = -17 * digitDivision(nowHour,   10, "10") + "px"; //空欄にしたい場合は10と設定する
        var id = "nowHourImg0" + unit;
        document.getElementById(id).style.top = -17 * digitDivision(nowHour,   1, "0") + "px";
        //分
        var id = "nowMinuteImg1" + unit;
        document.getElementById(id).style.top = -17 * digitDivision(nowMinute,   10, "0") + "px";
        var id = "nowMinuteImg0" + unit;
        document.getElementById(id).style.top = -17 * digitDivision(nowMinute,   1, "0") + "px";

        //コロンの有無
        if((nowHour != "" || nowMinute != "") && nowTimeUpdateCount % 2 == 0)
        {
            //コロンあり
            var id = "nowTimeColon" + unit;
            document.getElementById(id).style.top = -17 + "px";
        }
        else //時も分も入力されていない場合
        {
            //コロンなし
            var id = "nowTimeColon" + unit;
            document.getElementById(id).style.top = -0 + "px";
        }
    }

    //点滅間隔をフォームから読み込む
    var id = "switchIntervalInput";
    switchInterval = document.getElementById(id).value;
    switchInterval = inputTextNumCheck(switchInterval, 1); //入力された値のチェック

    //0.5秒後に更新
    clearTimeout(nowTimeUpdateTimeout);
    nowTimeUpdateTimeout = setTimeout("nowTimeUpdateCount++;updateNowTime();", switchInterval * 1000);
}

