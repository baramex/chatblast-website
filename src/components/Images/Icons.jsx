import clsx from "clsx";

export function PaypalIcon(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg"
        aria-label="PayPal"
        viewBox="0 0 512 512"
        {...props}>
        <rect
            width="512" height="512"
            rx="15%"
            fill="#fff" /><path fill="#002c8a" d="M377 184.8L180.7 399h-72c-5 0-9-5-8-10l48-304c1-7 7-12 14-12h122c84 3 107 46 92 112z" /><path fill="#009be1" d="M380.2 165c30 16 37 46 27 86-13 59-52 84-109 85l-16 1c-6 0-10 4-11 10l-13 79c-1 7-7 12-14 12h-60c-5 0-9-5-8-10l22-143c1-5 182-120 182-120z" /><path fill="#001f6b" d="M197 292l20-127a14 14 0 0 1 13-11h96c23 0 40 4 54 11-5 44-26 115-128 117h-44c-5 0-10 4-11 10z" />
    </svg>);
}

export function PaypalLabel(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 89 33" xmlSpace="preserve" {...props}>
        <path fill="#253B80" d="M10.552 6.749h-6.839c-.468 0-.866.34-.939.802l-2.766 17.537c-.055.346.213.658.564.658h3.265c.468 0 .866-.34.939-.803l.746-4.73c.072-.463.471-.803.938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415C14.565 7.353 12.841 6.749 10.552 6.749zM11.341 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583c.043-.277.283-.481.563-.481h.473c1.235 0 2.4 0 3.002.704C11.368 11.668 11.478 12.292 11.341 13.154z" />
        <path fill="#253B80" d="M30.995 13.075h-3.275c-.279 0-.52.204-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91c-.055.348.213.66.562.66h2.95c.469 0 .865-.34.939-.803l1.77-11.209C31.612 13.388 31.345 13.075 30.995 13.075zM26.43 19.449c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892C26.375 17.721 26.573 18.543 26.43 19.449z" />
        <path fill="#253B80" d="M48.437 13.075h-3.291c-.314 0-.609.156-.787.417l-4.539 6.686-1.924-6.425c-.121-.402-.492-.678-.912-.678h-3.234c-.393 0-.666.384-.541.754l3.625 10.638-3.408 4.811c-.268.379.002.9.465.9h3.287c.312 0 .604-.152.781-.408L48.905 13.97C49.167 13.592 48.898 13.075 48.437 13.075z" />
        <path fill="#179BD7" d="M59.333 6.749h-6.84c-.467 0-.865.34-.938.802l-2.766 17.537c-.055.346.213.658.562.658h3.51c.326 0 .605-.238.656-.562l.785-4.971c.072-.463.471-.803.938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415C63.345 7.353 61.622 6.749 59.333 6.749zM60.122 13.154c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583c.043-.277.281-.481.562-.481h.473c1.234 0 2.4 0 3.002.704C60.15 11.668 60.259 12.292 60.122 13.154z" />
        <path fill="#179BD7" d="M79.775 13.075h-3.273c-.281 0-.52.204-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91c-.055.348.213.66.564.66h2.949c.467 0 .865-.34.938-.803l1.771-11.209C80.394 13.388 80.126 13.075 79.775 13.075zM75.21 19.449c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892C75.157 17.721 75.355 18.543 75.21 19.449z" />
        <path fill="#179BD7" d="M83.636 7.23l-2.807 17.858c-.055.346.213.658.562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536c.055-.346-.213-.659-.562-.659h-3.16C83.919 6.749 83.679 6.953 83.636 7.23z" />
    </svg>)
}

export function MacaronIntegrationIcon({ className, ...props }) {
    return (<object className={clsx("h-fit", className)} {...props}>
        <div className="rounded-lg border border-gray-200 bg-slate-50 aspect-[7/10] p-2 flex flex-col justify-between relative h-20">
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="absolute bottom-1 right-1">
                <div className="rounded-full h-2.5 w-2.5 bg-emerald-200 flex items-center justify-center">
                    <div className="h-0.5 w-0.5 bg-white" />
                </div>
            </div>
        </div>
    </object>);
}

export function IncontentIntegrationIcon({className, ...props}) {
    return (<object className={clsx("h-fit", className)} {...props}>
        <div className="rounded-lg border border-gray-200 bg-slate-50 aspect-[7/10] p-2 flex flex-col justify-between relative h-20">
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-emerald-200 w-full h-4 rounded-sm" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
            <div className="bg-slate-200 w-full h-0.5 rounded-md" />
        </div>
    </object>);
}