import { h } from 'preact';
import { useRef, useState, useLayoutEffect } from 'preact/hooks';
import {videoOverlayContainerStyle} from "../../style/shadowDom";
import {OverlayInterface} from "../../interfaces/OverlayInterface";

export const HTMLContainer = ({commonstyle = ""} : {commonstyle : string}) => {

    // Containing div reference for attaching events and getting container width for aspect ratio
    const ref : any = useRef<HTMLElement>(null);

    const [fontSize, setFontSize] = useState(10);

    // Once per mount get the correct height for the container based on width
    // An override the overlay interface from children and pass on to parent container
      useLayoutEffect(() => {
        setFontSize(ref.current?.offsetWidth / 20);
        ref.current.addEventListener('setOverlayInterface', (e : any) => {
            console.log('HTMLContainer setOverlayInterface Event');
            const overlayInterface : OverlayInterface = e.detail.value;
            if (!overlayInterface.overlayStyle)
                overlayInterface.overlayStyle = commonstyle;
        });
    }, []);
    // The outer container is for event bubbling and global font size setting
    // Within that you have to containers one on top of the other.
    return (
        <div  ref={ref} style={{...videoOverlayContainerStyle, fontSize}}>
            <slot />
        </div>
    );
}
