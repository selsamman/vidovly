import { h } from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import {VideoInterface} from "../../interfaces/VideoInterface";
import {OverlayInterface} from "../../interfaces/OverlayInterface";

export type ConditionalBlockType =   {
    time : string,
    position : string,
    overlaystyle : string,
    activestyle : string,
    inactivestyle : string,
    fade : number,
    fadein : number,
    fadeout : number,
    onclick? : (videoInterface : VideoInterface, overlayInterface : OverlayInterface) => void
}

export const ConditionalBlock = (props : ConditionalBlockType) => {

    const     {
        time,        // Time in format start:end where start and end are times in milliseconds
        position,    // Position string either ltwh l=left, t=top w=width, h=height range 0-9
        fade = 0,
        fadein = 0,
        fadeout = 0,
        overlaystyle = "",
        activestyle = "",
        inactivestyle = "",
        onclick,
    } = props;

    const overlayInterfaceRef = useRef<OverlayInterface>();
    const videoInterfaceRef = useRef<VideoInterface>();


    // Containing div reference for attaching events
    const ref = useRef<HTMLDivElement>(null);

    const [style, setStyle] = useState("");

    const coreStyle = {
        pointerEvents: 'auto'
    }
    let positionStyle = {};

    if (position) {
        const positions = position?.split("-");
        positionStyle = {
            left: `${parseInt(positions[0], 10)  }%`,
            top: `${parseInt(positions[1], 10)  }%`,
            width: `${parseInt(positions[2], 10)  }%`,
            height: `${parseInt(positions[3], 10)  }%`,
            position: 'absolute',

        }
    }
    useEffect(() => {
        const times = time.split('-').map(t => t.split(':'));

        // Create an overlay interface and pass up to the container
        const overlayInterface = new OverlayInterface(
            times[0] ? (parseInt(times[0][0], 10) || 0) * 60 + (parseInt(times[0][1], 10) || 0) : 0, times[1] ? (parseInt(times[1][0], 10) || 0) * 60 + (parseInt(times[1][1], 10) || 0) : 9999999999,
            fade, fadein, fadeout,
            overlaystyle, activestyle, inactivestyle,
            setStyle, ref.current
        );
        overlayInterfaceRef.current = overlayInterface;
        ref.current?.dispatchEvent(new CustomEvent('setOverlayInterface',
            {composed: true, bubbles: true, detail: {value: overlayInterface}}));

        // Request the video interface from the container

        ref.current?.dispatchEvent(new CustomEvent('getVideoInterface',
            {composed: true, bubbles: true, detail: {value : (videoInterface : VideoInterface) => {
                videoInterfaceRef.current = videoInterface;
                console.log(`videoInterfaceRef.current = ${videoInterfaceRef.current}`)
            }}}));


    }, []);

    //console.log(`render overlay style=${style} at ${time} ${onclick}`);


    return (
        <div ref={ref} style={{width: '100%', height: '100%'}}
             onClick={() => onclick && console.log(videoInterfaceRef.current)}>
            <style>{style}</style>
            <div className="vovlyOverlay" style={{...coreStyle, ...positionStyle}}
                 onClick={() => onclick && videoInterfaceRef.current && overlayInterfaceRef.current && onclick(videoInterfaceRef.current, overlayInterfaceRef.current)}>
                <slot />
            </div>
        </div>
    );
}
