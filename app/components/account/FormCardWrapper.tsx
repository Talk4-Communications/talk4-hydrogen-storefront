import {ReactNode} from "react";
import Talk4Logo from '../../../public/talk4Logo.svg'

type Props = {
    children?: ReactNode
    title: string;
    subtitle: string;
}

export default function FormCardWrapper ({children, title, subtitle}: Props){
    return(
        <div>
            <div>
                <img src={Talk4Logo} alt={"Talk4Logo"}/>
            </div>
            <div>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
                {children}
            </div>
        </div>
    )
}