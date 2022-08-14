// The OverlayInterface is passed to the player who will call the tick method
// The parent container will also set the style used for cards
export class OverlayInterface {

    constructor(startTime: number, endTime: number,
                fade: number, fadeIn: number, fadeOut: number,
                overlayStyle: string, activeStyle: string, inActiveStyle: string,
                setStyle: (style: string) => void, node : HTMLDivElement | null
    ) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.fadeTime = fade;
        this.fadeInTime = fadeIn;
        this.fadeOutTime = fadeOut;
        this.overlayStyle = overlayStyle;
        this.inactiveStyle = inActiveStyle;
        this.activeStyle = activeStyle;
        this.setStyle = setStyle;   // callback to set the visibility in useState
        this.node = node;
        //console.log(`Overlay Interface overlayStyle= ${this.overlayStyle} ${this.startTime}-${this.endTime}`);
    }

    // Set by constructor
    startTime: number;
    endTime: number;
    private active = false;
    private fading = false;
    private setStyle: (style: string) => void;
    node : HTMLDivElement | null;

    // Set by container
    overlayStyle = "";
    activeStyle = "";
    inactiveStyle = "";
    fadeInTime = 0;
    fadeOutTime = 0;
    fadeTime = 0;

    getFadeIn() {
        return this.fadeInTime || this.fadeTime || 0;
    }

    getFadeOut() {
        return this.fadeOutTime || this.fadeTime || 0;
    }

    doesFade () {
        return this.getFadeIn() || this.getFadeOut();
    }

    renderStyle () {
        this.setStyle(this.getStyle());
    }

    private getStyle() {
        //console.log(`getStyle for ${this.startTime}-${this.endTime} active=${this.active} fading=${this.fading} in/out = ${this.getFadeIn()} ${this.getFadeOut()}`);
        let style = "";
        if (this.doesFade()) {
            style = "@keyframes vidovlyFadeIn {0% {opacity: 0;} 100% {opacity: 1}} " +
                    "@keyframes vidovlyFadeOut {0% {opacity: 1;} 100% {opacity: 0}} "
            if (this.fading) {
                if (this.active)
                    style += `.vovlyOverlay {display: block; animation: vidovlyFadeIn ${this.getFadeIn()}s linear;}`;
                else
                    style += `.vovlyOverlay {display: block; opacity: 0; animation: vidovlyFadeOut ${this.getFadeOut()}s linear;}`;
            } else if (!this.active)
                style = `.vovlyOverlay {display: none;}`;
            else
                style = '.vovlyOverlay {display: block}';
        } else {
            style = this.active ? `.vovlyOverlay {${this.activeStyle}` : `.vovlyOverlay {${this.inactiveStyle}`;
        }
        return `.vovlyOverlay {${this.overlayStyle}} ${style}`;
    }

    tick(time: number) {
        if (time >= this.startTime && time <= this.endTime) {
            if (!this.active) { // Transition to active
                this.active = true;
                if (this.getFadeIn() > 0)
                    this.fading = true;
                setTimeout(() => {
                    this.fading = false;
                    this.renderStyle();
                }, (this.getFadeOut() || 0) * 1000);
                this.renderStyle();
            }
        } else if (this.active) {
            this.active = false;
            if (this.getFadeOut() > 0) {
                this.fading = true;
                setTimeout(() => {
                    this.fading = false;
                    this.renderStyle();
                }, (this.getFadeOut() || 0) * 1000);
            }
            this.renderStyle();
        }
    }
}
