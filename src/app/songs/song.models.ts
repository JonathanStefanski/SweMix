interface ISong {
    id: number,
    title: string,
    artist: string,
    url: string,
    length: number,
    downloaded: boolean,
    fileLocation: string;
}

export class Song implements ISong {    
    constructor (
        public id:number, 
        public title:string, 
        public artist:string, 
        public url:string, 
        public length:number, 
        public downloaded : boolean = false,
        public fileLocation : string = null
    ) { }
}