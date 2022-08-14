import { h } from 'preact';
import {ConditionalBlock, ConditionalBlockType} from "./ConditionalBlock";

export const Overlay = (props: ConditionalBlockType) => {
    return <ConditionalBlock {...props} />
}
