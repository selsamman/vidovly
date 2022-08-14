import './style/shadowDom';
import register from 'preact-custom-element';
import {TopLevelContainer} from "./components/containers/TopLevelContainer";
import {VideoOverlayContainer} from "./components/containers/VideoOverlayContainer";
import {YouTube} from "./components/videoDrivers/YouTube";
import {HTMLContainer} from "./components/containers/HTMLContainer";
import {TOCEntry} from "./components/blocks/TOCEntry";
import {Overlay} from "./components/blocks/Overlay";
import {TOCContainer} from "./components/containers/TOCContainer";


register(TopLevelContainer, 'vidovly-container', [], { shadow: true });
register(VideoOverlayContainer, 'vidovly-video', [], { shadow: true });
register(HTMLContainer, 'vidovly-html', [], { shadow: true });
register(YouTube, 'vidovly-youtube-player', [], {shadow: false});
register(Overlay, 'vidovly-overlay', [], { shadow: true });
register(TOCEntry, 'vidovly-entry', [], { shadow: true });
register(TOCContainer, 'vidovly-toc', [], { shadow: true });


