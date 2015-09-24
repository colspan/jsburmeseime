//////////////////////////////////
//
//    JS IM Burmese
//        by Colspan (Miyoshi)
//         http://colspan.net/
//        License : MIT license
//
// depend jsim_common.js,jsim_keycode.js,jsim_caret.js,jsim.js


// JSIM Method Sample
var JSIM_Burmese = {
  methodName : "burmese",
  version : "20130115",
  language : "Burmese",
  author : "Colspan",
  params : {
    displayString : 'မ',
    listBox : true,
    inlineInsertion : false
  },
  JSIM_Obj : null,
  localVars : {
    burmeseAutomataStmt:null,
    charTable : {
      "1":"၁",
      "2":"၂",
      "3":"၃",
      "4":"၄",
      "5":"၅",
      "6":"၆",
      "7":"၇",
      "8":"၈",
      "9":"၉",
      "0":"၀",
      "q":"်",
      "w":"ို",
      "e":"ေ",
      "r":"ရ",
      "t":"တ",
      "y":"ယ",
      "u":"ု",
      "i":"ိ",
      "o":"​​ော",
      "p":"ပ",
      219:"ံ",
      192:"ော်",// JIS配列用
      229:"ော်",
      "a":"ာ",
      "s":"သ",
      "d":"ဒ",
      "f":"္",
      "g":"ဂ",
      "h":"ဟ",
      "j":"ဇ",
      "k":"က",
      "l":"လ",
      186:"ဉ",
      221:"၎",
      "z":"င",
      "x":"အ",
      "c":"စ",
      "v":"ဝ",
      "b":"ဗ",
      "n":"န",
      "m":"မ",
      ",":"့",
      ".":"၊",
      "/":"။",
      "Q":"၏",
      "E":"ဲ",
      "R":"ြ",
      "T":"ထ",
      "Y":"ျ",
      "U":"ူ",
      "I":"ီ",
      "O":"ဩ",
      "P":"ဖ",
      "A":"ါ",
      "S":"ဿ",
      "D":"ဓ",
      "F":"်",
      "G":"ဃ",
      "H":"ှ",
      "J":"ဈ",
      "K":"ခ",
      "L":"ဠ",
      "Z":"င်္",
      "C":"ဆ",
      "V":"ွ",
      "B":"ဘ",
      "N":"ဏ",
      "M":"ံ",
      "<":",",
      ">":"."
    }
  },
  commands : {
    accept : function( stmtObj ){
      stmtObj.returnObj.ignoreEvent = false;
      return stmtObj;
    },
    getConsonant : function( stmtObj ){
      var inputChar = stmtObj.keyStatus.inputChar;
      var inputCode = stmtObj.keyStatus.inputCode;
      var charTable = stmtObj.JSIM_Obj.methodObj.localVars.charTable;
      var key = inputChar == null ? inputCode : inputChar;
      console.log(inputCode);
      var outputStr = charTable[key];
      bufferViewerUpdate( inputChar + " : " +  outputStr ); /* 入力文字表示 */
      if( !outputStr ){ // 対応しない文字はそのままスルーする
        stmtObj.returnObj.ignoreEvent = false;
      }
      else{
        stmtObj.returnObj.outputStr = outputStr;
      }
      return stmtObj;
    },
    backspace : function( stmtObj ){
      stmtObj.returnObj.ignoreEvent = false;
      return stmtObj;
    }
  },
  utils :{

  },
  init : function(){
    this.JSIM_Obj.mode = 'input'
  },
  statementGenerator : function( eventObj ){
    var JSIM_Obj = this.JSIM_Obj;

    var statement = {
      commands : [],
      keyStatus : eventObj.keyStatus,
      calledObj : eventObj.calledObj,
      JSIM_Obj : this.JSIM_Obj,
      extJSON : null,
      returnObj : {outputStr:"",ignoreEvent:true,inlineBuffer:"",mode:""},
      errorFlag : false
    };

    switch( JSIM_Obj.mode ){
      case 'init' : // 初期化直後
      case 'input_consonant' : // 入力モード
      default://debug
        if( ! eventObj.keyStatus.inputChar ) switch( eventObj.keyStatus.inputCode ){
          case 8: // Back Space
            statement.commands = [
                                  this.commands.backspace
                                  ];
            break;
          case 27 : // ESC
            statement.commands = [
                                  this.commands.cancel
                                  ];
            break;
          case 32 : // Space
          case 10 : // Enter
          case 13 : // Enter
            statement.commands = [
                                  this.commands.accept
                                  ];
            break;
          default: // 数字や記号など
            statement.commands = [
                                this.commands.getConsonant
                                ];
            break;
        }
        else{
          statement.commands = [
                                this.commands.getConsonant
                                ];
        }
        break;
    }
    return statement;
  }
}
