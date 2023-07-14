import signInPage from '../../public/Images/signInPage.png';
import FormCardWrapper from "../components/account/FormCardWrapper";
import {Form, Link, useNavigation} from "@remix-run/react";
import FormInput from "../components/account/FormInput";
import {useState} from "react";




export default function Register(){
    const [nativeEmailError, setNativeEmailError] = useState(null);
    const [nativePasswordError, setNativePasswordError] = useState(null);
    const navigation = useNavigation()

    return(
        <div className="max-w-screen flex min-h-screen flex-row">
            <div className="flex flex-row max-h-screen w-full">

                <div className="flex basis-1/2">
                    <img className=" w-full"
                         src={signInPage} alt={"signInPicture"}/>
                </div>

                <div className="flex justify-center items-center basis-1/2">

                    <FormCardWrapper title="Create an Account on Talk4" subtitle="Complete the form fields below to get started">
                        <Form method="post" noValidate>
                            <div className="space-y-4">
                                <FormInput
                                    id="firstName"
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    type="text"
                                    autoComplete="first name"
                                    required
                                    // error={nativeEmailError || ''}
                                    // onBlur={(event) => {
                                    //     setNativeEmailError(
                                    //         event.currentTarget.value.length &&
                                    //         !event.currentTarget.validity.valid ? 'Invalid email address' : null,
                                    //     )}
                                    // }
                                />

                                <FormInput
                                    id="lastName"
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    type="text"
                                    autoComplete="last name"
                                    required
                                    // error={nativeEmailError || ''}
                                    // onBlur={(event) => {
                                    //     setNativeEmailError(
                                    //         event.currentTarget.value.length &&
                                    //         !event.currentTarget.validity.valid ? 'Invalid email address' : null,
                                    //     )}
                                    // }
                                />

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

                                <FormInput
                                    id="createPassword"
                                    label=" Create Password"
                                    placeholder="Enter Password"
                                    type="text"
                                    autoComplete="current-password"
                                    required
                                    minLength={8}
                                    error={nativePasswordError || ''}
                                    onBlur={(event) => {
                                        if (
                                            event.currentTarget.validity.valid ||
                                            !event.currentTarget.value.length
                                        ) {
                                            setNativePasswordError(null);
                                        } else {
                                            setNativePasswordError(
                                                event.currentTarget.validity.valueMissing
                                                    ? 'Please enter a password'
                                                    : 'Passwords must be at least 8 characters',
                                            );
                                        }
                                    }}
                                />

                                <FormInput
                                    id="confirmPassword"
                                    label=" Confirm Password"
                                    placeholder="Enter Password"
                                    type="text"
                                    autoComplete="current-password"
                                    required
                                    minLength={8}
                                    error={nativePasswordError || ''}
                                    onBlur={(event) => {
                                        if (
                                            event.currentTarget.validity.valid ||
                                            !event.currentTarget.value.length
                                        ) {
                                            setNativePasswordError(null);
                                        } else {
                                            setNativePasswordError(
                                                event.currentTarget.validity.valueMissing
                                                    ? 'Please enter a password'
                                                    : 'Passwords must be at least 8 characters',
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center border rounded-md bg-pink py-4 px-6 font-medium
                                    font-gt-pro text-white transition delay-150 duration-300 ease-in-out hover:bg-white hover:text-pink hover:border-pink"
                                    disabled={
                                        !!(
                                            nativePasswordError ||
                                            nativeEmailError ||
                                            navigation.state !== 'idle'
                                        )
                                    }
                                >
                                    {navigation.state !== 'idle' ? 'Creating...' : 'Create Account'}
                                </button>
                            </div>

                            <div className="my-1">
                                <p className="text-sm text-center font-gt-pro">
                                    Already have an account?&nbsp;
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