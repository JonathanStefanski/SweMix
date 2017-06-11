interface ISong {
    id: number,
    title: string,
    artist: string,
    youtubeCode: string,
    length: number,
    downloaded: boolean,
    fileLocation: string;

    getUrl(): string;
}

export class Song implements ISong  {      
    constructor (        
        public id:number, 
        public title:string, 
        public artist:string, 
        public youtubeCode:string, 
        public length:number, 
        public downloaded : boolean = false,
        public fileLocation : string = null,
        public previousId? : number,
        public nextId? : number
    ) { }

    getUrl():string {
        return `https://www.youtube.com/watch?v=${this.youtubeCode}`;
    }
}

interface IVideo {
    videoId: string,
    title: string,
    description: string,
    thumbnail: string,
    duration: string

    getLength():number;
}

export class Video implements IVideo {
    constructor (
        public videoId:string, 
        public title:string, 
        public description:string, 
        public thumbnail:string,         
        public duration : string = null
    ) { }

    getLength(): number {
        let x = this.duration;

        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;

        if (reptms.test(x)) {
            var matches = reptms.exec(x);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            totalseconds = hours * 3600 + minutes * 60 + seconds;
        }

        return totalseconds;
    }
}