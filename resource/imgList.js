//種別
const typeList = [
    {i:0,t:"各停"},
    {i:1,t:"区準"},
    {i:2,t:"準急"},
    {i:3,t:"通準"},
    {i:4,t:"快速"},
    {i:5,t:"通急"},
    {i:6,t:"急行"},
    {i:7,t:"快急"},
    {i:8,t:"F快急"},
    {i:9,t:"特急"},
    {i:10,t:"S-TRAIN"},
    {i:11,t:"回送"},
    {i:12,t:"臨時"},
    {i:13,t:"----"},
    {i:14,t:"通過"}
];
const getTypeI = function(name){
    for(const obj of typeList){
        if(obj.t === name){
            return obj.i;
        }
    }
    return getTypeI("----");
}

//行き先
const destinationList = [
    {i:0,t:"池袋"},
    {i:1,t:"小竹向原"},
    {i:2,t:"練馬"},
    {i:3,t:"豊島園"},
    {i:4,t:"石神井公園"},
    {i:5,t:"保谷"},
    {i:6,t:"ひばりヶ丘"},
    {i:7,t:"清瀬"},
    {i:8,t:"所沢"},
    {i:9,t:"西所沢"},
    {i:10,t:"西武新宿"},
    {i:11,t:"本川越"},
    {i:12,t:"西武球場前"},
    {i:13,t:"小手指"},
    {i:14,t:"狭山ヶ丘"},
    {i:15,t:"入間市"},
    {i:16,t:"仏子"},
    {i:17,t:"飯能"},
    {i:18,t:"高麗"},
    {i:19,t:"西吾野"},
    {i:20,t:"横瀬"},
    {i:21,t:"西武秩父"},
    {i:22,t:"三峰口"},
    {i:23,t:"長瀞 三峰口"},
    {i:24,t:"豊洲"},
    {i:25,t:"新木場"},
    {i:26,t:"渋谷"},
    {i:27,t:"武蔵小杉"},
    {i:28,t:"元住吉"},
    {i:29,t:"菊名"},
    {i:30,t:"横浜"},
    {i:31,t:"元町・中華街"},
    {i:32,t:"府中本町"},
    {i:33,t:"東所沢"},
    {i:34,t:"南越谷"},
    {i:35,t:"西船橋"},
    {i:36,t:"大宮"},
    {i:37,t:"八王子"},
    {i:38,t:"東京"},
    {i:39,t:"南船橋"},
    {i:40,t:"新習志野"},
    {i:41,t:"海浜幕張"},
    {i:42,t:"当駅止まり"},
    {i:43,t:"通過", e: "Passing"},
    {i:44,t:"通過(旧)", e: "Passing"},
    {i:45,t:"通過(旧英)", e: "Non-Stop"},
    {i:46,t:"降車専用"},
    {i:47,t:"----"}
];
const getDestI = function(name, passing){
    if(passing == true){
        name = "通過";
    }
    for(const obj of destinationList){
        if(obj.t === name){
            return obj.i;
        }
    }
    return getTypeI("----");
}

//両数
const carCountList = [
    {i:0, v:4, t:"4両"},
    {i:1, v:7, t:"7両"},
    {i:2, v:8, t:"8両"},
    {i:3, v:10, t:"10両"},
    {i:4, v:null, t:"----"}
];
const getCarI = function(value){
    for(const obj of carCountList){
        if(obj.v === value || obj.t === value){
            return obj.i;
        }
    }
    return getCarI("----");
}

//ドア数
const doorCountList = [
    {i:0, v:2, t:"2ドア"},
    {i:1, v:3, t:"3ドア"},
    {i:2, v:4, t:"4ドア"},
    {i:3, v:9, t:"全席指定"},
    {i:4, v:null, t:"----"}
];
const getDoorI = function(value){
    for(const obj of doorCountList){
        if(obj.v === value || obj.t === value){
            return obj.i;
        }
    }
    return getDoorI("----");
}
const controlInfoList = [
    {i:0, v:"終電車"},
    {i:1, v:"当駅始発"},
    {i:2, v:"----"}
]
const getControlInfo = function(dataObj){
    let findValue = "----";
    if(dataObj.info) {
        if (dataObj.info.lastTrain === true) {
            findValue = "終電車";
        }
        if (dataObj.info.deptHere === true) {
            findValue = "当駅始発";
        }
    }
    for(const obj of controlInfoList){
        if(obj.v === findValue){
            return obj.i;
        }
    }
}

//のりば
const platformList = [
    ["1", ""],
    ["2", ""],
    ["3", ""],
    ["4", ""],
    ["5", ""],
    ["6", ""],
    ["7", ""],
    ["8", ""],
    ["特", ""],
    ["→", ""],
    ["←", ""],
    ["", ""]
];

