 class BaseResult{
    constructor({code, message, result}){
        this.code = code ?? 500;
        this.message = message ?? 'error';
        this.result = result ?? {};

    }

    setCode(code){
        this.code = code;
    }

    setMessage(message){
        this.message = message;
    }

    setResult(result){
        this.result = result;
    }

    getCode(){
        return this.code;
    }

    getMessage(){
        return this.message;
    }

    getResult(){
        return this.result;
    }
}

module.exports = BaseResult;