import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import logo from '../../images/logo.png'
import { useState } from "react";
import { IncontentIntegrationIcon, MacaronIntegrationIcon, MacaronIntegrationSideIcon } from "../Images/Icons";
import { RadioOptionCustom, RadioOptionRect } from "../Misc/Radio";
import { XMarkIcon } from "@heroicons/react/24/outline";

const types = [
    { id: "macaron", title: "Macaron", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc.", Icon: MacaronIntegrationIcon },
    { id: "incontent", title: "Dans le contenu", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc.", Icon: IncontentIntegrationIcon }
];

const shapes = [
    {
        id: "round", title: "Rond", className: "bg-white border-gray-300 border rounded-full p-3.5",
        element: <img src={logo} className="w-16 h-16" />
    },
    {
        id: "square", title: "Carré",
        element: <img src={logo} className="w-16 h-16" />
    },
];

const appearances = [
    {
        id: "block", title: "En bloc",
        element: <MacaronIntegrationIcon />
    },
    {
        id: "side", title: "Semi-caché sur le côté",
        element: <MacaronIntegrationSideIcon />
    }
];

const colors = [
    {
        id: "white-emerald",
        color1: "white",
        color2: "emerald-500"
    }
]

function Bubble({ children, className }) {
    return (
        <div className={clsx("relative py-2 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-2xl mb-3",
            "before:content-[''] before:w-0 before:h-0 before:absolute before:border-[4px] before:border-r-gray-300 before:border-t-gray-300 before:border-l-transparent before:border-b-transparent before:translate-x-1/2 befpre:translate-y-full before:right-[46px] before:-bottom-2",
            "after:content-[''] after:w-0 after:h-0 after:absolute after:border-[3.5px] after:border-t-white after:border-r-white after:border-l-transparent after:border-b-transparent after:translate-x-1/2 after:translate-y-full after:right-[47px] after:bottom-0.5",
            className)}>
            {children}
        </div>
    );
}

export default function IntegrationTab() {
    const [type, setType] = useState(types[0]);
    const [shape, setShape] = useState(shapes[0]);
    const [appearance, setAppearance] = useState(appearances[0]);
    const [color, setColor] = useState(colors[0]);

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Intégration</h2>
        </div>
        <div className="px-6 mt-5 grid grid-cols-1 lg:grid-cols-2 text-gray-900 gap-12 max-w-7xl">
            <div className="col-span-full">
                <h3 className="text-lg font-medium">Type</h3>
                <div>
                    <RadioGroup value={type} onChange={setType}>
                        <div className="mt-4 grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-12">
                            {types.map((p) => <RadioOptionRect key={p.id} options={p} />)}
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium">Forme</h3>
                <div>
                    <RadioGroup value={shape} onChange={setShape}>
                        <div className="mt-4 grid grid-cols-2 gap-x-12 justify-items-center">
                            {shapes.map((p) => <div className="flex flex-col items-center" key={p.id}>
                                <RadioOptionCustom value={p} className={p.className}>
                                    {p.element}
                                </RadioOptionCustom>
                                <p className="text-sm text-center mt-2">{p.title}</p>
                            </div>)}
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium">Apparition</h3>
                <RadioGroup value={appearance} onChange={setAppearance}>
                    <div className="mt-4 grid grid-cols-2 gap-x-12 justify-items-center">
                        {appearances.map((p) => <div className="flex flex-col items-center" key={p.id}>
                            <RadioOptionCustom value={p} className="rounded-lg">
                                {p.element}
                            </RadioOptionCustom>
                            <p className="text-sm text-center mt-2">{p.title}</p>
                        </div>)}
                    </div>
                </RadioGroup>
            </div>
            <div>
                <h3 className="text-lg font-medium">Bulle message</h3>
                <div className="xl:w-1/2 sm:w-3/4 flex flex-col items-end mt-4">
                    <Bubble className="flex">
                        <div className="relative py-1">
                            <span aria-hidden="true" className="invisible px-2 whitespace-nowrap">Écrivez quelque chose...</span>
                            <input
                                type="text"
                                className="left-0 top-0 absolute w-full text-sm transition-colors border border-transparent hover:border-gray-200 px-1.5 py-1 hover:ring-0 focus:ring-0 focus:outline-none focus:border-gray-300 placeholder:text-gray-400"
                                onInput={e => e.target.parentElement.querySelector("span").innerText = e.target.value || e.target.placeholder}
                                placeholder="Écrivez quelque chose..."
                                maxLength={52}
                            />
                        </div>
                        <button className="outline-none" disabled>
                            <XMarkIcon className="text-gray-500 w-5 ml-2" />
                        </button>
                    </Bubble>
                    <div className={shape.className || "bg-white border-gray-300 border p-3.5 rounded-3xl"}>
                        {shape.element}
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium">Couleur</h3>
                <RadioGroup value={color} onChange={setColor}>
                    <div className="mt-4 grid gap-x-12 justify-items-center">
                        {colors.map((p) => <div className="flex flex-col items-center" key={p.id}>
                            <RadioOptionCustom value={p} className="rounded-full w-12 h-12">
                                <div className="rotate-45 w-full h-full rounded-full overflow-hidden border border-gray-300">
                                    <div className="inline-block overflow-hidden w-1/2 h-full">
                                        <div className={clsx("w-12 h-full", p.color1 === "white" ? "bg-white" : "")}></div>
                                    </div>
                                    <div className="inline-block overflow-hidden w-1/2 h-full">
                                        <div className={clsx("-ml-6 w-12 h-full", p.color2 === "emerald-500" ? "bg-emerald-500" : "")}></div>
                                    </div>
                                </div>
                            </RadioOptionCustom>
                        </div>)}
                    </div>
                </RadioGroup>
            </div>
        </div>
    </>);
}

function setCaretPosition(elem, caretPos) {
    if (elem != null) {
        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if (elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}