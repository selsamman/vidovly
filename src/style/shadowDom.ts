export const videoOverlayContainerStyle = {
    position: 'relative',
    fontSize: '25%'
}
const containersCommonStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
}
export const videoContainerStyle = Object.assign({}, containersCommonStyle);
export const overlayContainerStyle = Object.assign({pointerEvents: 'none'}, containersCommonStyle);


