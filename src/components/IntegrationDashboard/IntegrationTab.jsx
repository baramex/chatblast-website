import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import logo from '../../images/logo.png'
import { useState } from "react";
import { IncontentIntegrationIcon, MacaronIntegrationLeftIcon, MacaronIntegrationRightIcon, TriangleIcon } from "../Images/Icons";
import { RadioOptionCustom, RadioOptionRect } from "../Misc/Radio";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TextField } from "../Misc/Fields";

const types = [
    { id: "macaron", title: "Macaron", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc.", Icon: MacaronIntegrationRightIcon },
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

const places = [
    {
        id: "right", title: "En bas à droite",
        element: <MacaronIntegrationRightIcon />
    },
    {
        id: "left", title: "En bas à gauche",
        element: <MacaronIntegrationLeftIcon />
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
    const [place, setPlace] = useState(places[0]);

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
                <h3 className="text-lg font-medium">Emplacement</h3>
                <RadioGroup value={place} onChange={setPlace}>
                    <div className="mt-4 grid grid-cols-2 gap-x-12 justify-items-center">
                        {places.map((p) => <div className="flex flex-col items-center" key={p.id}>
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
                <div className="w-1/2 flex flex-col items-end mt-4">
                    <Bubble className="flex">
                        <input
                            type="text"
                            placeholder="Essaye de mettre un message"
                            className="text-sm transition-colors border border-transparent hover:border-gray-200 px-1.5 py-1 hover:ring-0 focus:ring-0 focus:outline-none focus:border-gray-300 placeholder:text-gray-400"
                        />
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
                <h3 className="text-lg font-medium">Apparition</h3>
            </div>
        </div>
    </>);
}