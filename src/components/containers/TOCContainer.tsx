import { h, Fragment } from 'preact';
import { useRef, useState, useLayoutEffect } from 'preact/hooks';
import {aspectRatio, YouTube} from "../videoDrivers/YouTube";
import {overlayContainerStyle, videoContainerStyle, videoOverlayContainerStyle} from "../../style/shadowDom";
import {OverlayInterface} from "../../interfaces/OverlayInterface";

export const TOCContainer = (
    {
        commonstyle = "",
        activestyle = "",
        inactivestyle = "",
    } : {
        commonstyle? : string,
        activestyle? : string,
        inactivestyle? : string,
    }
) => {

    // Containing div reference for attaching events and getting container width for aspect ratio
    const ref : any = useRef<HTMLElement>(null);

    // List of interfaces for each overlay
    const overlayInterfacesRef = useRef<Array<OverlayInterface>>([]);

    // Once per mount override overlay interface from children and pass on to parent container
    useLayoutEffect(() => {
        ref.current.addEventListener('setOverlayInterface', (e : any) => {
            console.log(`TOCContainer setOverlayInterface Event ${activestyle} ${inactivestyle}`);
            const overlayInterface : OverlayInterface = e.detail.value;
            if (!overlayInterface.overlayStyle)
                overlayInterface.overlayStyle = commonstyle ||
                    "font-size: 2em; cursor: pointer; font-family: sans-serif; padding: .5em;margin: .5em; border-radius: 0.25em";
            if (!overlayInterface.activeStyle)
                overlayInterface.activeStyle = activestyle ||
                    "background-color: #c0c0c0; color: black;font-weight: bold;";
            if (!overlayInterface.inactiveStyle)
                overlayInterface.inactiveStyle = inactivestyle ||
                    "background-color:  #c0c0c0; color: #808080";
            overlayInterfacesRef.current.push(overlayInterface);
            fixEndTimes(overlayInterfacesRef.current);
        });
    }, []);

    // The outer container is for event bubbling and global font size setting
    // Within that you have to containers one on top of the other.
    return (
        <div ref={ref}>
            <slot />
        </div>
    );

    function fixEndTimes(ois : Array<OverlayInterface>) {
        ois.map((oi, ix) => {
            if (ix > 0 && ois[ix - 1].endTime > 99999999)
                ois[ix - 1].endTime = oi.startTime;
        });
    }
}
