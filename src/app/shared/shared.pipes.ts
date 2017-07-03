import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 


@Pipe({ name: 'embed' })
export class EmbedPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(videoId:string, autoplay?:boolean) {
      if (videoId == null) return null;
      let url_embed = `https://www.youtube.com/embed/${videoId}`;
      if (autoplay) url_embed += '?autoplay=1';
      return this.sanitizer.bypassSecurityTrustResourceUrl(url_embed);
  }
} 

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {

    transform(value: number, args: string):string {
        let hh = (value - (value % 3600)) / 3600;        
        let mm = ((value % 3600) - (value % 60)) / 60;
        let ss = value % 60;

        let result = '';
        if (hh > 0) result += `${hh.toString().length > 1 ? '' : 0}${hh}h `;
        if (mm > 0) result += `${mm.toString().length > 1 ? '' : 0}${mm}m `;
        result += `${ss.toString().length > 1 ? '' : 0}${ss}s`;

        return result;
    }

}

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(items: any[], field : string, value : string): any[] {  
        if (!items) return [];        
        return items.filter(it => it[field] == value);
    }
}