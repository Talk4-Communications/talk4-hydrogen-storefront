import {useState} from "react";
import signInPage from '../../public/Images/signInPage.png';
import {Form, Link, useNavigation} from "@remix-run/react";
import FormCardWrapper from "../components/account/FormCardWrapper";
import FormInput from "../components/account/FormInput";


export default function Recover(){
    const [nativeEmailError, setNativeEmailError] = useState(null);
    const navigation = useNavigation()

    return(
        <div className="max-w-screen flex min-h-screen flex-row">
            <div className="flex flex-row max-h-screen w-full">

                <div className="flex basis-1/2">
                    <img className=" w-full"
                         src={signInPage} alt={"signInPicture"}/>
                </div>

                <div className="flex justify-center items-center basis-1/2">

                    <FormCardWrapper title="Forgot your Password?" subtitle="Please enter your email address. You will receive an OTP via email.">
                        <Form method="post" noValidate>
                            <div className="space-y-4">

                                <FormInput
                                    id="email"
                                    label="Email Address"
                                    placeholder="Enter Email Address"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    error={nativeEmailError || ''}
                                    onBlur={(event) => {
                                        setNativeEmailError(
                                            event.currentTarget.value.length &&
                                            !event.currentTarget.validity.valid ? 'Invalid email address' : null,
                                        )}
                                    }
                                />
                            </div>
                            <div className="my-4">
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center border rounded-md bg-pink py-4 px-6 font-medium
                                    font-gt-pro text-white transition delay-150 duration-300 ease-in-out hover:bg-white hover:text-pink hover:border-pink"
                                    disabled={
                                        !!(
                                            nativeEmailError ||
                                            navigation.state !== 'idle'
                                        )
                                    }
                                >
                                    {navigation.state !== 'idle' ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                            <div className="my-1">
                                <p className="text-sm text-center font-gt-pro">
                                    Back to&nbsp;
                                    <Link className="inline text-pink font-medium hover:underline" to="/account/login">
                                        Login
                                    </Link>
                                </p>
                            </div>

                        </Form>

                    </FormCardWrapper>
                </div>
            </div>
        </div>
    )
}