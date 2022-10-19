export default function BgCallToAction(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 450" opacity="0.65" {...props}>
        <defs><filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="41" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter></defs><g filter="url(#bbblurry-filter)"><ellipse rx="114.5" ry="74" cx="183.01694003018463" cy="259.20727261629963" fill="hsla(139, 96%, 18%, 1)"></ellipse><ellipse rx="114.5" ry="74" cx="626.5574007901279" cy="248.64899652654478" fill="hsla(105, 88%, 95%, 1)"></ellipse><ellipse rx="114.5" ry="74" cx="334.6560557972301" cy="140.14842848344284" fill="hsla(150, 71%, 90%, 1)"></ellipse></g>
    </svg>);
}