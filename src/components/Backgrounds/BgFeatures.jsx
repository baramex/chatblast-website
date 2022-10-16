export default function BgFeatures(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 450" opacity="0.5" {...props}>
        <defs><filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="74" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter></defs><g filter="url(#bbblurry-filter)"><ellipse rx="126" ry="114.5" cx="181.41719610040838" cy="179.79340709339488" fill="hsla(141, 84%, 21%, 1)"></ellipse><ellipse rx="126" ry="114.5" cx="565.2695645419034" cy="163.6035322709517" fill="hsla(145, 80%, 87%, 1)"></ellipse><ellipse rx="126" ry="114.5" cx="79.42858678644353" cy="419.4891163219105" fill="hsla(145, 55%, 90%, 1)"></ellipse></g>
    </svg>);
}