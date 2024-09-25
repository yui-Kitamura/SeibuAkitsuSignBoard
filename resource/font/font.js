/**
 *
 * @param origin 変換元テキスト
 * @returns {string} spanタグで囲った変換後テキスト
 */
function getHtmlFromText(origin){
    let res = '<span style="width:fit-content;height:72px;font-size:72px;' +
        'animation-duration:'+ (origin.length>16?(origin.length>32?origin.length:32):0)/16*6.2 +'s;'+
        'position:absolute;display:inline-block;background-color:black;color:white" class="d16sqf">';
    origin += "";
    const inLen = origin.length;
    if(inLen === 0) {
        res += "　</span>";
        return res;
    }
    let colorMode = 'green';
    let di = 0;
    for(let i=0; i<inLen; i++){
        if(origin.charAt(i)+origin.charAt(i+1) === '&g'){
            colorMode = 'green';
            i++; continue;
        }
        if(origin.charAt(i)+origin.charAt(i+1) === '&r'){
            colorMode = 'red';
            i++; continue;
        }
        if(origin.charAt(i)+origin.charAt(i+1) === '&o'){
            colorMode = 'orange';
            i++; continue;
        }
        const cvt = findChar(origin.charAt(i));
        res += '<span style="width:72px;height:72px;position:absolute;overflow:hidden;display:inline-block;' +
            ' left:'+ di*72 +'px" class="led color '+ colorMode +'">'
        if(cvt == null){
            res += '<span class="char color '+ colorMode +'">';
            res += origin.charAt(i);
            res += '</span>';
        }else{
            res +=  '<img src="./resource/font/charX8.png" class="led color '+colorMode+'"' +
                    ' style="top:'+cvt.getImgPos().h*-8+'px;left:'+cvt.getImgPos().w*-8 +'px;' +
                    ' position:absolute;' +
                    '" alt="'+origin.charAt(i)+'" />';
        }
        res += '</span>';
        di++;
    }
    res += "</span>"
    return res;
}


function charInfo() {
    return {
        c: "", row: 0, idx: 0,
        getImgPos: function () {
            return {h: 1 + this.row * 25, w: 1 + this.idx * 24}
        }
    }
}
charList = [];
function findChar(c){
    if(c == null || (c + "").length !== 1 ){
        return null;
    }
    const listLen = charList.length;
    for(let i=0; i<listLen; i++){
        if(charList[i].c === c){
            return charList[i];
        }
    }
    return null;
}
async function initCharFont(){
     await fetch("./resource/font/char.txt")
        .then(response => response.text())
        .then(text => {
            const lines = text.split("\n")
            let r = 0;
            lines.forEach((line, rowIdx) => {
                const lineLen = line.length;
                for(let idx=0; idx < lineLen; idx++){
                    if(line[idx] === '　'){ //全角スペース無視
                        continue;
                    }
                    const myCharInfo = charInfo();
                    myCharInfo.c = line[idx]; myCharInfo.row = r; myCharInfo.idx = idx;
                    charList.push(myCharInfo);
                }
                r++;
            });
        })
        .catch(error => {
            console.error('char file fetch error', error);
        });
}
