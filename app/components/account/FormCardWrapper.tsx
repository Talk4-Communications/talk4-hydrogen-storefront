import {ReactNode} from "react";
import Talk4Logo from '../../../public/talk4Logo.svg'

type Props = {
    children?: ReactNode
    title: string;
    subtitle: string;
}

export default function FormCardWrapper ({children, title, subtitle}: Props){
    return(
        <div className="w-2/3">

            <div className="flex w-full justify-center items-center my-5">
                <img src={Talk4Logo} alt={"Talk4Logo"}/>
            </div>

            <div className="my-5">
                <h1 className="text-2xl/[2.5rem] font-bold font-gt-pro text-black text-center py-1">{title}</h1>
                <h3 className="text-base font-gt-pro text-grey text-center py-1">{subtitle}</h3>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}