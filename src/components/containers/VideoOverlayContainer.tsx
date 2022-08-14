import { h, Fragment } from 'preact';
import { useRef, useState, useLayoutEffect } from 'preact/hooks';
import {aspectRatio, YouTube} from "../videoDrivers/YouTube";
import {overlayContainerStyle, videoContainerStyle, videoOverlayContainerStyle} from "../../style/shadowDom";
import {OverlayInterface} from "../../interfaces/OverlayInterface";

export const VideoOverlayContainer = (
    {
        fade = 0,
        fadein = 0,
        fadeout = 0,
        overlaystyle = "",
        video,              // slot
        overlays            // slot
    } : {
        fade : number,
        fadein : number,
        fadeout : number,
        overlaystyle : string,
        video : any,
        overlays : any
    }
) => {

    // Containing div reference for attaching events and getting container width for aspect ratio
    const ref : any = useRef<HTMLElement>(null);

    const [height, setHeight] = useState(0);
    const [fontSize, setFontSize] = useState(10);
    //console.log('Render VideoOverlayContainer ' + height);

    // Once per mount get the correct height for the container based on width
    useLayoutEffect(() => {
        setHeight(ref.current?.offsetWidth * aspectRatio);
        setFontSize(ref.current?.offsetWidth / 40);
    }, []);

    // Child gives us a card schedule
    ref.current?.addEventListener('setOverlayInterface', (e : any) => {
        const overlayInterface : OverlayInterface = e.detail.value;
        if (!overlayInterface.overlayStyle)
            overlayInterface.overlayStyle = overlaystyle ||
                "font-size: 1em; color: white; font-family: sans-serif; " +
                "text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000; " +
                "letter-spacing: 2px;";
        if (!overlayInterface.fadeTime)
            overlayInterface.fadeTime = fade;
        if (!overlayInterface.fadeInTime)
            overlayInterface.fadeInTime = fadein;
        if (!overlayInterface.fadeOutTime)
            overlayInterface.fadeOutTime = fadeout;
        if (!overlayInterface.activeStyle)
            overlayInterface.activeStyle = "display: block"
        if (!overlayInterface.inactiveStyle)
            overlayInterface.inactiveStyle = "display: hidden"
                "background-color:  #c0c0c0; color: #808080";

        console.log(`VideoOverlayContainer setOverlayInterface Event ${overlayInterface.fadeTime}`);
    });
    // The outter container is for event bubbling and global font size setting
    // Within that you have to containers one on top of the other.
    return height === 0 ? (<div  ref={ref}>waiting</div>) : (
        <div  ref={ref} id="app" style={{...videoOverlayContainerStyle, height: height, fontSize}}>
            <div style={{...videoContainerStyle}}>
                {video}
            </div>
            <div style={{...overlayContainerStyle}}>
                {overlays}
            </div>
        </div>
    );
}
