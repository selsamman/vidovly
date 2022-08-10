import {Fragment, h} from 'preact';
import { useRef, useState, useLayoutEffect } from 'preact/hooks';

// The OverlayInterface is passed to the player who will call the tick method
// The parent container will also set the style used for cards
export class OverlayInterface {

    constructor (startTime : number, endTime : number,
                 fade : number, fadeIn : number, fadeOut : number, style : string,
                 setVisible : (visible : boolean) => void, setClass : (className : string) => void
    ) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.fade = fade;
        this.fadeIn = fadeIn;
        this.fadeOut = fadeOut;
        this.style = style;
        this.setVisible = setVisible;   // callback to set the visibility in useState
        this.setClass = setClass;       // same for className
    }

    // Set by constructor
    private startTime : number;
    private endTime : number;
    private visible = false;
    private setVisible : (visible : boolean) => void;
    private setClass : (className : string) => void;
    private style = "";
    private fade = 0;
    private fadeIn = 0;
    private fadeOut = 0;

    // Set by container
    overlayStyle = "";
    fadeInTime = 0;
    fadeOutTime = 0;
    fadeTime = 0;

    getFadeIn () {return this.fadeIn || this.fade || this.fadeInTime || this.fadeTime || 0;}
    getFadeOut () {return this.fadeOut || this.fade || this.fadeOutTime || this.fadeTime || 0;}
    getStyle () { return this.style || this.overlayStyle;}

    tick (time : number) {
        if (time >= this.startTime && time <= this.endTime) {
            if (!this.visible) {
                this.visible = true;
                this.setVisible(true);
                if (this.getFadeIn())
                    setTimeout(() => this.setClass('fade-in'), 0);

            }
        } else if (this.visible) {

            setTimeout(() => {
                this.visible = false;
                this.setVisible(false);
            }, (this.getFadeOut() || 0) * 1000);
            if (this.getFadeOut())
                this.setClass('fade-out');
        }
    }
}

export const Overlay = (
    {
       time,        // Time in format start:end where start and end are times in milliseconds
       position,    // Position string either ltwh l=left, t=top w=width, h=height range 0-9
       fade = 0,
       fadein = 0,
       fadeout = 0,
       overlaystyle = ""
     } : {
        time : string,
        position : string,
        overlaystyle : string,
        fade : number,
        fadein : number,
        fadeout : number,
    }) => {

    const overlayListenerRef = useRef<OverlayInterface>();
    // Containing div reference for attaching events
    const ref = useRef<HTMLDivElement>(null);

    const [visible, setVisible] = useState(false);
    const [className, setClassName] = useState('');

    const positions = position.split("-");
    const positionStyle = {
        left: `${parseInt(positions[0], 10)  }%`,
        top: `${parseInt(positions[1], 10)  }%`,
        width: `${parseInt(positions[2], 10)  }%`,
        height: `${parseInt(positions[3], 10)  }%`,
        position: 'absolute',
        pointerEvents: 'auto'
    }

    useLayoutEffect(() => {

        const times = time.split(':');

        const overlayListener = new OverlayInterface(
            parseInt(times[0], 10),
            parseInt(times[1], 10) || 99999999999999,
            fade, fadein, fadeout, overlaystyle,
            setVisible, setClassName
        );
        overlayListenerRef.current = overlayListener;
        ref.current?.dispatchEvent(new CustomEvent('setOverlayInterface',
            {composed: true, bubbles: true, detail: {value: overlayListener}}));
    }, []);

    const fadeInTimeResolved = overlayListenerRef.current?.getFadeIn() || 0;

    const fadeOutTimeResolved = overlayListenerRef.current?.getFadeOut() || 0;

    const overlayStyleResolved = overlayListenerRef.current?.getStyle() ||
        "font-size: 1em; color: white; font-family: sans-serif; " +
        "text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000; " +
        "letter-spacing: 2px;";

    const styleLiteral = `.vovlyOverlay {${overlayStyleResolved}} ` +
        (fadeInTimeResolved ? `.vovlyOverlay {opacity: 0} ` : '') +
        `.fade-in {opacity: 1; transition: opacity ${fadeInTimeResolved}s !important;} ` +
        `.fade-out {opacity: 0; transition: opacity ${fadeOutTimeResolved}s !important;}`

    const classNameResolved = "vovlyOverlay" + (className ? ` ${className}` : "");

    //console.log(`${fade} ${classNameResolved} ${styleLiteral} ${visible}`);

    return (
        <div ref={ref} style={{width: '100%', height: '100%'}}>
            <style>{styleLiteral}</style>
            {visible &&
                <div className={classNameResolved} style={positionStyle}>
                    <slot />
                </div>
            }
        </div>
    );
}
