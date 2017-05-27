import { InMemoryDbService, InMemoryBackendConfig } from "angular-in-memory-web-api";
import { Song } from "./song.models";

export class SongData implements InMemoryDbService, InMemoryBackendConfig {
    createDb(): {} {
        let songs: Song[] = [
            new Song(1, 'Somebody that I used to know', 'Gotye ft Kimbra', "https://www.youtube.com/watch?v=8UVNT4wvIGY", 243),
            new Song(2, 'Thrift Shop', 'Macklemore & Ryan Lewis', "https://www.youtube.com/watch?v=QK8mJJJvaes", 233),
            new Song(3, 'Puff The Magic Dragon', 'Peter Paul & Mary', "https://www.youtube.com/watch?v=Y7lmAc3LKWM", 207),
            new Song(4, 'Last Friday Night (T.G.I.F.)', 'Katy Perry', "https://www.youtube.com/watch?v=KlyXNRrsk4A", 490),
            new Song(5, 'California Dreaming', 'The Mamas & The Papas', "https://www.youtube.com/watch?v=N-aK6JnyFmk", 157),
            new Song(6, 'Dream On', 'Ronnie James Dio', "https://www.youtube.com/watch?v=H7KTRpmeTdM", 266),
            new Song(7, 'Teenage Dirtbag', 'Wheatus', "https://www.youtube.com/watch?v=FC3y9llDXuM", 247),
            new Song(8, 'She Hates Me', 'Puddle Of Mud', "https://www.youtube.com/watch?v=BYE4CVhVkhw", 210)
        ];
        return { songs };
    }


}