import clsx from 'clsx';
import {InputHTMLAttributes} from "react";

type Props = {
    error?: string;
    label: string;
    id: string;
    type: string;
    placeholder: string;
    ref?: React.Ref<HTMLInputElement>;
}   & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({error,label,id,type,placeholder,...rest}:Props){
    return(
        <div className="w-full my-2 space-y-1">
            <label className="text-sm text-grey font-medium font-gt-pro" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...rest}
                className={clsx([
                    'w-full h-12 appearance-none rounded-md border px-3 py-2 text-sm font-gt-pro leading-field',
                    'disabled:bg-gray/50 disabled:opacity-50',
                    'focus:outline-1',
                    error ? 'border-red' : 'border-[#C0C0C1]',
                ])}
            />
            {error && <div className="text-sm text-red">{error}</div>}
        </div>
    )
}