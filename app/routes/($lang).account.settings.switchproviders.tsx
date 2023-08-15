import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import FormInput from "../components/account/FormInput";
import FormCardWrapper from "../components/account/FormCardWrapper";
import {useState} from "react";
import ProductContainer from "../components/account/ProductContainer";


export default function SwitchProviders(){

    // const actionData = useActionData<ActionData>();
    const [nativePacError, setNativePacError] = useState<null | string>(null);
    const [nativePhoneError, setNativePhoneError] = useState<null | string>(null);
    const navigation = useNavigation()

    return(
        <div className="space-y-5">
            <div className="w-full h-[481px] justify-start items-start space-x-6 inline-flex">
                <div className="w-1/2 h-full p-5 bg-white rounded-xl border flex-col justify-start items-start gap-3.5 inline-flex">
                    <div className=" w-full h-[88px] px-5 py-[15px] bg-lightpink rounded-lg flex-col justify-start items-start gap-2.5 flex">
                        <div className="justify-start items-center gap-3.5 inline-flex">
                            <div className="w-[58px] h-[58px] relative">
                                <div className="w-[58px] h-[58px] left-0 top-0 absolute bg-rose-100 bg-opacity-60 rounded-full" />
                                <div className="w-5 h-5 left-[19px] top-[19px] absolute">
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.375 3.75C10.1497 3.75 10.8789 3.89648 11.5625 4.18945C12.2461 4.48242 12.8418 4.88607 13.3496 5.40039C13.8574 5.91471 14.2578 6.51042 14.5508 7.1875C14.8438 7.86458 14.9935 8.59375 15 9.375C15 9.78516 14.974 10.1693 14.9219 10.5273C14.8698 10.8854 14.7884 11.2272 14.6777 11.5527C14.5671 11.8783 14.4238 12.2005 14.248 12.5195C14.0723 12.8385 13.8639 13.1641 13.623 13.4961C13.4342 13.7565 13.2682 13.9909 13.125 14.1992C12.9818 14.4076 12.8646 14.6159 12.7734 14.8242C12.6823 15.0326 12.6139 15.2604 12.5684 15.5078C12.5228 15.7552 12.5 16.0449 12.5 16.377V18.125C12.5 18.3854 12.4512 18.6296 12.3535 18.8574C12.2559 19.0853 12.1224 19.2839 11.9531 19.4531C11.7839 19.6224 11.5853 19.7559 11.3574 19.8535C11.1296 19.9512 10.8854 20 10.625 20H8.125C7.86458 20 7.62044 19.9512 7.39258 19.8535C7.16471 19.7559 6.96615 19.6224 6.79688 19.4531C6.6276 19.2839 6.49414 19.0853 6.39648 18.8574C6.29883 18.6296 6.25 18.3854 6.25 18.125V16.3672C6.25 16.0352 6.22721 15.7487 6.18164 15.5078C6.13607 15.2669 6.06771 15.0423 5.97656 14.834C5.88542 14.6257 5.76823 14.4141 5.625 14.1992C5.48177 13.9844 5.31576 13.75 5.12695 13.4961C4.88607 13.1641 4.68099 12.8418 4.51172 12.5293C4.34245 12.2168 4.19922 11.8945 4.08203 11.5625C3.96484 11.2305 3.88021 10.8854 3.82812 10.5273C3.77604 10.1693 3.75 9.78516 3.75 9.375C3.75 8.60026 3.89648 7.87109 4.18945 7.1875C4.48242 6.50391 4.88607 5.9082 5.40039 5.40039C5.91471 4.89258 6.51042 4.49219 7.1875 4.19922C7.86458 3.90625 8.59375 3.75651 9.375 3.75ZM11.25 18.125V17.5H7.5V18.125C7.5 18.2943 7.56185 18.4408 7.68555 18.5645C7.80924 18.6882 7.95573 18.75 8.125 18.75H10.625C10.7943 18.75 10.9408 18.6882 11.0645 18.5645C11.1882 18.4408 11.25 18.2943 11.25 18.125ZM13.75 9.375C13.75 8.76953 13.6361 8.20312 13.4082 7.67578C13.1803 7.14844 12.8678 6.68294 12.4707 6.2793C12.0736 5.87565 11.6113 5.56315 11.084 5.3418C10.5566 5.12044 9.98698 5.00651 9.375 5C8.76953 5 8.20312 5.11393 7.67578 5.3418C7.14844 5.56966 6.68294 5.88216 6.2793 6.2793C5.87565 6.67643 5.56315 7.13867 5.3418 7.66602C5.12044 8.19336 5.00651 8.76302 5 9.375C5 9.95443 5.05859 10.4525 5.17578 10.8691C5.29297 11.2858 5.44596 11.6569 5.63477 11.9824C5.82357 12.3079 6.02214 12.6139 6.23047 12.9004C6.4388 13.1868 6.63737 13.4863 6.82617 13.7988C7.01497 14.1113 7.17122 14.4629 7.29492 14.8535C7.41862 15.2441 7.48698 15.7096 7.5 16.25H11.25C11.2565 15.7096 11.3216 15.2474 11.4453 14.8633C11.569 14.4792 11.7253 14.1276 11.9141 13.8086C12.1029 13.4896 12.3014 13.1901 12.5098 12.9102C12.7181 12.6302 12.9167 12.3242 13.1055 11.9922C13.2943 11.6602 13.4473 11.2858 13.5645 10.8691C13.6816 10.4525 13.7435 9.95443 13.75 9.375ZM9.375 2.5C9.20573 2.5 9.05925 2.43815 8.93555 2.31445C8.81185 2.19076 8.75 2.04427 8.75 1.875V0.625C8.75 0.455729 8.81185 0.309245 8.93555 0.185547C9.05925 0.061849 9.20573 0 9.375 0C9.54427 0 9.69075 0.061849 9.81445 0.185547C9.93815 0.309245 10 0.455729 10 0.625V1.875C10 2.04427 9.93815 2.19076 9.81445 2.31445C9.69075 2.43815 9.54427 2.5 9.375 2.5ZM1.875 9.0625H0.625C0.455729 9.0625 0.309245 9.00065 0.185547 8.87695C0.061849 8.75325 0 8.60677 0 8.4375C0 8.26823 0.061849 8.12175 0.185547 7.99805C0.309245 7.87435 0.455729 7.8125 0.625 7.8125H1.875C2.04427 7.8125 2.19076 7.87435 2.31445 7.99805C2.43815 8.12175 2.5 8.26823 2.5 8.4375C2.5 8.60677 2.43815 8.75325 2.31445 8.87695C2.19076 9.00065 2.04427 9.0625 1.875 9.0625ZM2.39258 11.6113C2.56185 11.6113 2.70833 11.6732 2.83203 11.7969C2.95573 11.9206 3.01758 12.0703 3.01758 12.2461C3.01758 12.3763 2.98177 12.4902 2.91016 12.5879C2.83854 12.6855 2.74089 12.7637 2.61719 12.8223C2.54557 12.8548 2.44792 12.8971 2.32422 12.9492C2.20052 13.0013 2.06706 13.0566 1.92383 13.1152C1.7806 13.1738 1.65039 13.2227 1.5332 13.2617C1.41602 13.3008 1.31185 13.3236 1.2207 13.3301C1.05143 13.3301 0.904948 13.2682 0.78125 13.1445C0.657552 13.0208 0.595703 12.8711 0.595703 12.6953C0.595703 12.5651 0.63151 12.4512 0.703125 12.3535C0.77474 12.2559 0.872396 12.1777 0.996094 12.1191C1.06771 12.0931 1.16536 12.0508 1.28906 11.9922C1.41276 11.9336 1.54622 11.8783 1.68945 11.8262C1.83268 11.7741 1.96289 11.7253 2.08008 11.6797C2.19727 11.6341 2.30143 11.6113 2.39258 11.6113ZM3.87695 5.3125C3.87695 5.48177 3.8151 5.62826 3.69141 5.75195C3.56771 5.87565 3.42122 5.9375 3.25195 5.9375C3.13477 5.9375 3.02734 5.9082 2.92969 5.84961L1.86523 5.19531C1.77409 5.13672 1.70247 5.06185 1.65039 4.9707C1.59831 4.87956 1.56901 4.77539 1.5625 4.6582C1.5625 4.48893 1.62435 4.34245 1.74805 4.21875C1.87174 4.09505 2.01823 4.0332 2.1875 4.0332C2.29167 4.0332 2.39909 4.06576 2.50977 4.13086L3.58398 4.77539C3.67513 4.82747 3.74674 4.90234 3.79883 5C3.85091 5.09766 3.87695 5.20182 3.87695 5.3125ZM4.6875 1.71875C4.6875 1.54948 4.74935 1.40299 4.87305 1.2793C4.99674 1.1556 5.14323 1.09375 5.3125 1.09375C5.42318 1.09375 5.52734 1.12305 5.625 1.18164C5.72266 1.24023 5.80078 1.31836 5.85938 1.41602L6.46484 2.50977C6.51693 2.60091 6.54297 2.69857 6.54297 2.80273C6.54297 2.97852 6.48112 3.12826 6.35742 3.25195C6.23372 3.37565 6.08724 3.4375 5.91797 3.4375C5.80729 3.4375 5.70312 3.4082 5.60547 3.34961C5.50781 3.29102 5.42969 3.21289 5.37109 3.11523L4.76562 2.02148C4.71354 1.93034 4.6875 1.82943 4.6875 1.71875ZM18.125 7.8125C18.2943 7.8125 18.4408 7.87435 18.5645 7.99805C18.6882 8.12175 18.75 8.26823 18.75 8.4375C18.75 8.60677 18.6882 8.75325 18.5645 8.87695C18.4408 9.00065 18.2943 9.0625 18.125 9.0625H16.875C16.7057 9.0625 16.5592 9.00065 16.4355 8.87695C16.3118 8.75325 16.25 8.60677 16.25 8.4375C16.25 8.26823 16.3118 8.12175 16.4355 7.99805C16.5592 7.87435 16.7057 7.8125 16.875 7.8125H18.125ZM18.1445 12.7051C18.1445 12.8743 18.0827 13.0208 17.959 13.1445C17.8353 13.2682 17.6888 13.3301 17.5195 13.3301C17.4479 13.3301 17.3503 13.3105 17.2266 13.2715C17.1029 13.2324 16.9694 13.1803 16.8262 13.1152C16.6829 13.0501 16.5527 12.9948 16.4355 12.9492C16.3184 12.9036 16.2174 12.8581 16.1328 12.8125C16.0156 12.7604 15.9212 12.6823 15.8496 12.5781C15.778 12.474 15.7389 12.3568 15.7324 12.2266C15.7324 12.0508 15.7943 11.9043 15.918 11.7871C16.0417 11.6699 16.1914 11.6081 16.3672 11.6016C16.4453 11.6016 16.5462 11.6243 16.6699 11.6699C16.7936 11.7155 16.9238 11.7676 17.0605 11.8262C17.1973 11.8848 17.3275 11.9434 17.4512 12.002C17.5749 12.0605 17.6758 12.1029 17.7539 12.1289C17.8711 12.181 17.9655 12.2559 18.0371 12.3535C18.1087 12.4512 18.1445 12.5684 18.1445 12.7051ZM15.498 5.9375C15.3288 5.9375 15.1823 5.87565 15.0586 5.75195C14.9349 5.62826 14.873 5.48177 14.873 5.3125C14.873 5.20182 14.8991 5.09766 14.9512 5C15.0033 4.90234 15.0749 4.82747 15.166 4.77539L16.2402 4.13086C16.3509 4.06576 16.4583 4.0332 16.5625 4.0332C16.7318 4.0332 16.8783 4.09505 17.002 4.21875C17.1257 4.34245 17.1875 4.48893 17.1875 4.6582C17.1875 4.76888 17.1615 4.86979 17.1094 4.96094C17.0573 5.05208 16.9824 5.13021 16.8848 5.19531L15.8203 5.84961C15.7227 5.9082 15.6152 5.9375 15.498 5.9375ZM12.207 2.80273C12.207 2.69857 12.2331 2.60091 12.2852 2.50977L12.8906 1.41602C12.9427 1.31836 13.0176 1.24023 13.1152 1.18164C13.2129 1.12305 13.3203 1.09375 13.4375 1.09375C13.6068 1.09375 13.7533 1.1556 13.877 1.2793C14.0007 1.40299 14.0625 1.54948 14.0625 1.71875C14.0625 1.82943 14.0365 1.93034 13.9844 2.02148L13.3789 3.11523C13.3268 3.21289 13.252 3.29102 13.1543 3.34961C13.0566 3.4082 12.9492 3.4375 12.832 3.4375C12.6628 3.4375 12.5163 3.37565 12.3926 3.25195C12.2689 3.12826 12.207 2.97852 12.207 2.80273Z" fill="#EF5DA8"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="w-[418px] flex-col justify-start font-gt-pro items-start inline-flex">
                                <div className="w-[408px] text-zinc-800 text-base font-bold leading-normal">
                                    Switch from another provider
                                </div>
                                <div className="w-[418px] text-zinc-600 text-sm font-normal leading-normal">
                                    See a walkthrough on how to switch Providers
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start font-gt-pro gap-3.5 flex">
                        <div className="p-2.5 bg-offwhite font-gt-pro rounded-lg justify-start items-start gap-2.5 inline-flex">
                            <div className="text-black text-sm font-bold leading-normal">Step 1</div>
                        </div>
                        <p className="text-zinc-600 text-sm font-gt-pro font-normal leading-tight">
                            Enter PAC code to keep your old number. Alternatively a STAC code for cancel your old number.
                        </p>
                    </div>
                    <div className="flex-col justify-start items-start gap-3.5 flex">
                        <div className="p-2.5 bg-offwhite font-gt-pro rounded-lg justify-start items-start gap-2.5 inline-flex">
                            <div className="text-black text-sm font-bold leading-normal">Step 2</div>
                        </div>
                        <p className="text-zinc-600 text-sm font-gt-pro font-normal leading-tight">
                            We need to confirm your old phone number to your previous provider that’s associated with this code.
                        </p>
                    </div>
                    <div className="flex-col justify-start items-start gap-3.5 flex">
                        <div className="p-2.5 bg-offwhite font-gt-pro rounded-lg justify-start items-start gap-2.5 inline-flex">
                            <div className="text-black text-sm font-bold leading-normal">Step 3</div>
                        </div>
                        <p className="text-zinc-600 text-sm font-gt-pro font-normal leading-tight">
                            Submit your request. This can take up to 2 business days. We will keep you updated via mail.
                        </p>
                    </div>
                </div>


                <div className="w-1/2 h-full p-5 bg-white rounded-xl border flex-col justify-start items-start gap-3.5 inline-flex">
                    <div className="h-12 flex-col justify-start items-start flex">
                        <div className="w-full text-zinc-800 text-base font-bold leading-normal">Switch from another provider</div>
                        <div className="w-full text-zinc-600 text-sm font-normal leading-normal">Fill the fields below to switch</div>
                    </div>

                    <div className="w-full">
                        <Form method="post" noValidate>
                            {/*{actionData?.formError && (*/}
                            {/*    <div className="mb-6 flex items-center justify-center rounded-sm border border-red p-4 text-sm text-red">*/}
                            {/*        <p>{actionData.formError}</p>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                            <div className="space-y-4">
                                <FormInput
                                    id="pacorstac"
                                    name="pacorstac"
                                    label="PAC or STAC code"
                                    placeholder="Enter Your PAC or STAC code"
                                    type="text"
                                    required
                                    error={nativePacError || ''}
                                    onBlur={(event) => {
                                        setNativePacError(
                                            event.currentTarget.value.length &&
                                            !event.currentTarget.validity.valid ? 'Invalid PAC or STAC code' : null,
                                        )}
                                    }
                                />

                                <FormInput
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    placeholder="Enter Your Phone Number"
                                    type="text"
                                    required
                                    minLength={12}
                                    error={nativePhoneError || ''}
                                    onBlur={(event) => {
                                        if (
                                            event.currentTarget.validity.valid ||
                                            !event.currentTarget.value.length
                                        ) {
                                            setNativePhoneError(null);
                                        } else {
                                            setNativePhoneError(
                                                event.currentTarget.validity.valueMissing
                                                    ? 'Please enter Phone Number'
                                                    : 'Phone Number must be at least 12 numbers',
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <button
                                    type="submit"
                                    className="w-44 h-12 inline-flex items-center justify-center border rounded-md bg-pink py-4 px-6 font-medium
                                    font-gt-pro text-white transition delay-150 duration-300 ease-in-out hover:bg-white hover:text-pink hover:border-pink"
                                    disabled={
                                        !!(
                                            nativePacError ||
                                            nativePhoneError ||
                                            navigation.state !== 'idle'
                                        )
                                    }
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>
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
