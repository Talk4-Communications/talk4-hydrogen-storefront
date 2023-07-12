import {InputHTMLAttributes} from "react";

type Props = {

}& InputHTMLAttributes<HTMLButtonElement>;

export default function Button(){
    return(
        <button
            type="submit"
            className="inline-flex items-center justify-center rounded bg-primary py-4 px-6 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-dark"
        >
            Send Message
        </button>
    )
}