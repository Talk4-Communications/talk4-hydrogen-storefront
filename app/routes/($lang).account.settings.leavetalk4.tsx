import ProductContainer from "../components/account/ProductContainer";


export default function LeaveTalk4(){

    return(
        <div className="space-y-5">

            <div className="flex space-x-3">
                <div className="w-1/2">
                    <ProductContainer></ProductContainer>
                </div>
                <div className="w-1/2">
                    <ProductContainer></ProductContainer>
                </div>
            </div>
        </div>
    )
}

