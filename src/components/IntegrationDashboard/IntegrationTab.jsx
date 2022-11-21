import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { IncontentIntegrationIcon, MacaronIntegrationIcon } from "../Images/Icons";

function RadioOptionRect({ options }) {
    return (
        <RadioGroup.Option
            value={options}
            className={({ checked, disabled }) =>
                clsx(
                    checked ? 'border-emerald-500' : !disabled && 'border-gray-300',
                    disabled ? "bg-gray-100 border-gray-200 cursor-not-allowed" : "bg-white hover:border-gray-400 cursor-pointer",
                    'relative transition-colors group flex rounded-lg border p-5 shadow-sm focus:outline-none'
                )
            }
        >
            {({ checked, disabled }) => (<>
                <span className="flex flex-1">
                    <span className="flex flex-col">
                        <RadioGroup.Label as="span" className={clsx("block text-md font-medium", disabled ? "text-gray-500" : "text-gray-900")}>
                            {options.title}
                        </RadioGroup.Label>
                        <div className="mt-1">
                            <options.Icon className="float-left mr-4 mt-2" />
                            <RadioGroup.Description as="span" className={clsx("text-sm", disabled ? "text-gray-400" : "text-gray-500")}>
                                {options.description}
                            </RadioGroup.Description>
                        </div>
                    </span>
                </span>
                <CheckCircleIcon
                    className={clsx(!checked ? 'invisible' : '', 'h-5 w-5 text-emerald-600')}
                    aria-hidden="true"
                />
                <span
                    className={clsx(
                        checked ? 'border-emerald-500' : 'border-transparent',
                        'pointer-events-none absolute border-2 -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                />
            </>)
            }
        </RadioGroup.Option >
    );
}

const types = [
    { id: "macaron", title: "Macaron", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc.", Icon: MacaronIntegrationIcon },
    { id: "incontent", title: "Dans le contenu", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc. Sed euismod, nunc sit amet ultricies lacinia, nulla nunc tincidunt augue, eget ultricies lorem ipsum eu nunc.", Icon: IncontentIntegrationIcon }
];

export default function IntegrationTab() {
    const [type, setType] = useState(types[0]);

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Intégration</h2>
        </div>
        <div className="px-6 mt-5 grid grid-cols-1 sm:grid-cols-2 text-gray-900 gap-6">
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
            </div>
            <div>
                <h3 className="text-lg font-medium">Emplacement</h3>
            </div>
            <div>
                <h3 className="text-lg font-medium">Bulle message</h3>
            </div>
            <div>
                <h3 className="text-lg font-medium">Apparition</h3>
            </div>
        </div>
    </>);
}