interface ISong {
    id: number,
    title: string,
    artist: string,
    url: string,
    length: number
}

export class Song implements ISong {
    constructor (public id:number, public title:string, public artist:string, public url:string, public length:number) {  
        
    }
    
}