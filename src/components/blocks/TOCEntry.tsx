import { h } from 'preact';
import {ConditionalBlock, ConditionalBlockType} from "./ConditionalBlock";
import {VideoInterface} from "../../interfaces/VideoInterface";
import {OverlayInterface} from "../../interfaces/OverlayInterface";

export const TOCEntry = (props: ConditionalBlockType) => {
    return <ConditionalBlock {...props} onclick={onclick} />

    function onclick(vi : VideoInterface, oi : OverlayInterface) {
        console.log('click');
        vi.goTo(oi.startTime);
    }
}
