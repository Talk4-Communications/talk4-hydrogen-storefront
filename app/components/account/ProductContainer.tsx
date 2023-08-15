


const ProductContainer = () =>{
    return (
        <div className="w-full h-[166px] justify-start items-center inline-flex">
            <div className=" w-full h-full p-5 bg-white rounded-xl border justify-start items-center flex">
                <div className="w-3/4 py-3 justify-start items-center flex">
                    <div className="flex-col justify-center items-start gap-2 inline-flex">
                        <div className="h-[81px] flex-col justify-center items-start gap-[7px] flex">
                            <div className="h-8 flex-col justify-center items-start gap-[34px] flex">
                                <div className="text-black text-base font-bold font-gt-pro leading-loose">Samsung Galaxy A54 5G</div>
                            </div>
                            <div className="w-72 text-zinc-600 text-sm font-normal leading-tight">Save £144 on an 8GB Airtime Plan. <br/> Offer ends 25 April.</div>
                        </div>
                        <div className=" bg-pink-400 rounded-md flex-col justify-center flex">
                            <button
                                type="submit"
                                className="w-28 h-10 inline-flex items-center justify-center border rounded-md bg-pink py-4 px-6 font-medium text-sm
                                    font-gt-pro text-white transition delay-150 duration-300 ease-in-out hover:bg-white hover:text-pink hover:border-pink"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className=" w-1/4">
                    <img className="w-[130px] h-[130px]" src="https://via.placeholder.com/130x130" />
                </div>

            </div>
        </div>
    );
}

export default ProductContainer;