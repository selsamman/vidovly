import { h } from 'preact';
import { useRef, useLayoutEffect } from 'preact/hooks';
import {VideoInterface} from "../../interfaces/VideoInterface";
import {videoOverlayContainerStyle} from "../../style/shadowDom";
import {OverlayInterface} from "../../interfaces/OverlayInterface";

export const TopLevelContainer = () => {

    // Containing div reference for attaching events and getting container width for aspect ratio
    const ref : any = useRef<HTMLElement>(null);

    // List of interfaces for each overlay
    const overlayInterfacesRef = useRef<Array<OverlayInterface>>([]);

    // Video Interface once player gets started
    const videoInterfaceRef = useRef<VideoInterface>();

    const setVideoInterfaceRef = useRef<Array<(video : VideoInterface) => void>>([]);


    // Once per mount get the correct height for the container based on width
    // and listen for overlay registration which will provide video interface setting callback
    // and a card schedule which can be used by the video driver to hide show at a particular time
    useLayoutEffect(() => {

         // Child gives us a card schedule
        ref.current.addEventListener('setOverlayInterface', (e : any) => {

            const overlayInterface : OverlayInterface = e.detail.value;
            const oix = -1;//overlayInterfacesRef.current.findIndex(vi => vi.node?.innerHTML === overlayInterface.node?.innerHTML);
            console.log('TopLevelContainer setOverlayInterface Event ' + oix);
            if (oix >= 0)
                overlayInterfacesRef.current[oix] = overlayInterface;
            else
                overlayInterfacesRef.current.push(overlayInterface);
            overlayInterface.renderStyle();
          });

        // Child requests the list of overlay interfaces, so we give them the array which may or may not be fully populated
        ref.current.addEventListener('getOverlayInterfaces', (e : any) => {
            //console.log('getOverlayInterfaces');
            const setOverlayInterfaces : (interfaces : Array<OverlayInterface>) => void = e.detail.value;
            setOverlayInterfaces(overlayInterfacesRef.current);
         });

        // Child provides us with a video interface so we send it to any child who requested it
        ref.current.addEventListener('setVideoInterface', (e : any) => {
            console.log('setVideoInterface');
            const video : VideoInterface = e.detail.value;
            setVideoInterfaceRef.current.forEach(setVideoInterface => setVideoInterface(video));
            setVideoInterfaceRef.current = [];
            videoInterfaceRef.current = video;
        });

        // Child requests a video interface so we provide it if we have it or keep callback until we do.
        ref.current.addEventListener('getVideoInterface', (e : any) => {
            const setVideoInterface : (video : VideoInterface) => void = e.detail.value;
            if (videoInterfaceRef.current)
                setVideoInterface(videoInterfaceRef.current)
            else
                setVideoInterfaceRef.current.push(setVideoInterface);
        });
    }, []);

    // The outer container is for event bubbling and global font size setting
    return (
        <div  ref={ref} id="app" style={{...videoOverlayContainerStyle}}>
             <slot> </slot>
        </div>

    );
}
