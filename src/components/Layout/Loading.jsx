import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import logo from '../../images/logo.png'

export function LoadingScreen({ open }) {
    return (
        <Transition.Root show={open} as={Fragment} onClose={() => { }}>
            <Transition.Child
                as={Fragment}
                leave="duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="fixed bg-gray-200 bg-opacity-75 backdrop-blur flex flex-col top-0 left-0 items-center justify-center h-screen w-screen z-50">
                    <img className='opacity-75 w-72' src={logo} />
                    <LoadingSpin />
                </div>
            </Transition.Child>
        </Transition.Root>
    )
}

export function LoadingSpin({ className }) {
    return (
        <svg className={clsx('bg-transparent w-20', className)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 30 100 40" preserveAspectRatio="xMidYMid">
            <circle cx="17" cy="50" r="6" fill="#047857">
                <animate attributeName="cy" values="37;63;37" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="0s" repeatCount="indefinite"></animate>
            </circle><circle cx="30" cy="61.2583302491977" r="6" fill="#10b981">
                <animate attributeName="cy" values="37;63;37" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
            </circle><circle cx="43" cy="61.258330249197705" r="6" fill="#6ee7b7">
                <animate attributeName="cy" values="37;63;37" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
            </circle><circle cx="56" cy="50" r="6" fill="#10b981">
                <animate attributeName="cy" values="37;63;37" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.5s" repeatCount="indefinite"></animate>
            </circle><circle cx="69" cy="38.7416697508023" r="6" fill="#047857">
                <animate attributeName="cy" values="37;63;37" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
            </circle><circle cx="82" cy="38.7416697508023" r="6" fill="#10b981">
                <animate attributeName="cy" values="37;63;37" times="0;0.5;1" dur="1s" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
            </circle>
        </svg>
    )
}