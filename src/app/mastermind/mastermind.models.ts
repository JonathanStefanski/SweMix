interface IGuess {
    id: number;
    color: Color;
}

interface IColor {
    index: number;
    color: string;
    code: string;
}

export class Color implements IColor {
    constructor(obj?: IColor) { 
        if (obj == null) return this;
        this.index = obj.index;
        this.color = obj.color;
        this.code = obj.code;
    }

    public index : number;
    public color : string;
    public code : string;  

    getCode(){
        return this.code || "#FFF";
    }
}

export class Guess implements IGuess {
    constructor(obj: IGuess) {
        this.id = obj.id;
        this.color = obj.color;
    }
    public id: number;
    public color: Color;

    static create(id: number, color: Color): Guess {
        let guess: IGuess = { id, color };
        return new Guess(guess);
    }
}

