import {useState} from "react";
import {Link, Outlet, useLocation} from "@remix-run/react";


export default function Setting(){

    const location = useLocation();

    const isActive = (pathname) => {
        return location.pathname === pathname ? 'text-black border-b-2 border-pink' : 'text-grey';
    };

    return(
        <div className="m-7 space-y-5">
            <h1 className="font-gt-pro font-bold text-2xl text-black">
                Settings
            </h1>
            <p className="font-gt-pro text-sm text-grey">
                Continue to manage your account.
            </p>

            <div className="py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <ul className="flex space-x-6 text-sm text-black font-medium font-gt-pro">
                        <li>
                            <Link to="switchproviders" className={`p-4 transition ${isActive('/account/settings/switchproviders')}`}>
                                Switch Providers
                            </Link>
                        </li>
                        <li>
                            <Link to="leavetalk4" className={`p-4 transition ${isActive('/account/settings/leavetalk4')}`}>
                               Leaving Talk4
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <Outlet></Outlet>
            </div>

        </div>
    )
}