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
  transform(url:string, autoplay?:boolean) {
      if (url == null) return null;
      let url_embed = url.replace("watch?v=", "embed/");
      if (autoplay) url_embed += '?autoplay=1';
      return this.sanitizer.bypassSecurityTrustResourceUrl(url_embed);
  }
} 

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

    transform(value: number, args: string):string {
        let hh = (value - (value % 3600)) / 3600;
        let mm = (value - (value % 60)) / 60;
        let ss = value % 60;

        let result = '';
        if (hh > 0) result += `${hh}h `;
        if (mm > 0) result += `${mm}m `;
        result += `${ss}s`;

        return result;
    }

}