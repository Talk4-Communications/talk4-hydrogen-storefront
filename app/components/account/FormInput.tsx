import {InputHTMLAttributes} from "react";

type Props = {
    error?: string;
    label: string;
    id: string;
    type: string;
    placeholder: string;
    // ref?: React.Ref<HTMLInputElement>;
}   & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({error,label,id,type,placeholder,...rest}:Props){
    return(
        <div>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...rest}
            />
            {error && <div className="text-sm text-red">{error}</div>}
        </div>
    )
}