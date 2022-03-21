class Tools{

    constructor(){

    }

    binaryToStr(str){
        var result = [];
        var list = str.split(" ");
        for(var i=0;i<list.length;i++){
             var item = list[i];
             var asciiCode = parseInt(item,2);
             var charValue = String.fromCharCode(asciiCode);
             result.push(charValue);
        }
        return result.join("");
      }
}

module.exports = Tools;
