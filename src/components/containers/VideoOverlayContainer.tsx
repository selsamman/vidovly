import { h, Fragment } from 'preact';
import { useRef, useState, useLayoutEffect } from 'preact/hooks';
import {aspectRatio, YouTube} from "../videoDrivers/YouTube";
import {overlayContainerStyle, videoContainerStyle, videoOverlayContainerStyle} from "../../style/shadowDom";

export const VideoOverlayContainer = ({video, overlays} : {video : any, overlays : any}) => {



    // Containing div reference for attaching events and getting container width for aspect ratio
    const ref : any = useRef<HTMLElement>(null);

    const [height, setHeight] = useState(0);
    const [fontSize, setFontSize] = useState(10);
    console.log('Render VideoOverlayContainer ' + height);

    // Once per mount get the correct height for the container based on width
    useLayoutEffect(() => {
        setHeight(ref.current?.offsetWidth * aspectRatio);
        setFontSize(ref.current?.offsetWidth / 60);
    }, []);


    // The outter container is for event bubbling and global font size setting
    // Within that you have to containers one on top of the other.
    return height === 0 ? (<div  ref={ref}>waiting</div>) : (
        <div  ref={ref} id="app" style={{...videoOverlayContainerStyle, height: height, fontSize}}>
            <div style={{...videoContainerStyle}}>
                <style>{`.overlay{ background-color: red;}`}</style>
                {video}
            </div>
            <div style={{...overlayContainerStyle}}>
                {overlays}
            </div>
        </div>
    );
}
