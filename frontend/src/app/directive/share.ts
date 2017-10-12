import { Directive, HostListener, Input } from '@angular/core';
import { FacebookParams } from './facebookParams'
import { TwitterParams } from './twitterParams';

@Directive({
  selector: '[ceiboShare]'
})
export class CeiboShare {
    @Input() facebook : FacebookParams;
    @Input() twitter : TwitterParams;
    @Input() shareWidth: string;
    @Input() shareHeight: string;


  private sharers = {
                    facebook: {
                        shareUrl: 'https://www.facebook.com/sharer/sharer.php',
                        //params: {u: this.url}
                    },
                    
                    twitter: {
                        shareUrl: 'https://twitter.com/intent/tweet/',
                        /*params: {
                            text: this.title,
                            url: this.url,
                            hashtags: this.hashtags,
                            via: this.via
                        }*/
                    }
                }

                  constructor() {}


  private urlSharer(sharer: any) {
            var p = sharer.params || {},
                keys = Object.keys(p),
                i: any,
                str = keys.length > 0 ? '?' : '';
            for (i = 0; i < keys.length; i++) {
                if (str !== '?') {
                    str += '&';
                }
                if (p[keys[i]]) {
                    str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
                }
            }

            var url = sharer.shareUrl + str;

            if (!sharer.isLink) {
                var popWidth = sharer.width || 600,
                    popHeight = sharer.height || 480,
                    left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
                    top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
                    popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
                    newWindow = window.open(url, '', popParams);

                if (window.focus) {
                    newWindow.focus();
                }
            } else {
                window.location.href = url;
            }
        }


private getSharer(){
    var _sharer: any = {};
    if(this.facebook){
        _sharer= this.sharers['facebook']
        _sharer.params = this.facebook
    }
    if(this.twitter){
        _sharer = this.sharers['twitter'];
        _sharer.params = this.twitter;
    }


    return _sharer;

}

  @HostListener('click') share(){
        

            var s = this.getSharer()
            // custom popups sizes
            if (s) {
                s.width = this.shareWidth;
                s.height = this.shareHeight
            }
            return s !== undefined ? this.urlSharer(s) : false;

  }

   

}