import { h } from 'preact';
import {useEffect, useRef} from "preact/hooks";
import {VideoInterface}from "../../interfaces/VideoInterface";
import {OverlayInterface} from "../../interfaces/OverlayInterface";

export const aspectRatio = 360 / 640;

class YouTubeVideo implements VideoInterface {
    player : any
    constructor (player : any) {
        this.player = player;
    }
    goTo (time : number) {
        console.log(`Seek to ${time}`);
        this.player.seekTo(time);
    }
    getTime () {
        return this.player.getCurrentTime ? this.player?.getCurrentTime() * 1000 : -1;
    }
}

export const YouTube = (
    {
        id,
        playerVars = {playsinline: 1, autoplay: 1, modestbranding: true, start: 0, controls: 1},
    } :
    {
        id : string,
        tick? : (time : number) => void | undefined,
        playerVars? : unknown | undefined,
    }) => {

    const videoInterfaceRef = useRef<YouTubeVideo | undefined>(undefined);
    const overlayInterfacesRef = useRef<Array<OverlayInterface>>();
    const intervalIdRef = useRef<any>(undefined);
    const ref = useRef<HTMLDivElement>(null);

    useEffect( () => {

        // Ask for overlay interfaces
        ref.current?.dispatchEvent(new CustomEvent('getOverlayInterfaces', {composed: true, bubbles: true, detail: {value:
            (overlayInterfaces : Array<OverlayInterface>) => overlayInterfacesRef.current = overlayInterfaces}}));

             // Load the IFrame Player API code asynchronously.
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // When the API is ready and calls us, create the iFrame
        let player : any;
        (window as any)['onYouTubeIframeAPIReady'] = () => {

            console.log("Frame Ready " + id);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: id,
                playerVars: playerVars,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                    onError: (event : any) => console.log(`Error: ${event.data}`)
                }
            });
        }

        // Check the timestamp every quarter second and update the cardSchedule, hiding and showing blocks
        intervalIdRef.current = setInterval(() => {
            if (player && player.getCurrentTime && overlayInterfacesRef.current)
                overlayInterfacesRef.current.map(overlayInterface => overlayInterface.tick(player.getCurrentTime()));
        }, 250);

        // The API will call this function when the video player is ready.
        function onPlayerReady(event : any) {

            ref.current?.dispatchEvent(new CustomEvent('getOverlayInterfaces', {bubbles: true, detail: {value:
                        (overlayInterfaces : Array<OverlayInterface>) => overlayInterfacesRef.current = overlayInterfaces}}));
            console.log('Player Ready ' + id);


            const vi = new YouTubeVideo(player);
            videoInterfaceRef.current = vi;

            ref.current?.dispatchEvent(new CustomEvent('setVideoInterface', {composed: true, bubbles: true, detail: {value: vi}}));

        }

        //  The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        function onPlayerStateChange(event: any) {
            //console.log(`Player State: ${event.data}`);
        }

        return () => {
            if (intervalIdRef.current)
                clearInterval(intervalIdRef.current);
            intervalIdRef.current = undefined;
        }

    }, []);
    return (
        <div ref={ref} style={{width: '100%', height: '100%'}} >
            <div id="player" style={{width: '100%', height: '100%'}} />
        </div>
    );
}

