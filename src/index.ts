import './style/shadowDom';
import register from 'preact-custom-element';
import {Container} from "./components/containers/Container";
import {Overlay} from "./components/containers/Overlay";
import {VideoOverlayContainer} from "./components/containers/VideoOverlayContainer";
import {YouTube} from "./components/videoDrivers/YouTube";

register(Container, 'vidovly-container', [], { shadow: true });
register(VideoOverlayContainer, 'vidovly-video', [], { shadow: true });
register(YouTube, 'vidovly-youtube-player', [], {shadow: false});
register(Overlay, 'vidovly-overlay', [], { shadow: true });
