type Props = {
    image:string;
    height: string;
    width: string;
}
export default function AvatarPlaceholder({height, width, image}:Props){

    return(
        <div>
            <img className={`${height} ${width} p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 shadow-2xl`}
                 src={image} alt="Bordered avatar"/>
        </div>
    )
}
