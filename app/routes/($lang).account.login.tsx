import signInPage from '../../public/Images/signInPage.png';
import {SeoHandleFunction} from "@shopify/hydrogen";
import {ActionFunction, LoaderArgs, redirect} from "@shopify/remix-oxygen";
import FormCardWrapper from "../components/account/FormCardWrapper";
import {Form, Link, useNavigation} from "@remix-run/react";
import FormInput from "../components/account/FormInput";
import {useState} from "react";


const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
    title: 'Login',
});

export const handle = {
    seo,
    isPublic: true,
};

export async function loader({context, params}: LoaderArgs) {
    const customerAccessToken = await context.session.get('customerAccessToken');

    if(customerAccessToken){
        return redirect(params.lang ? `${params.lang}/account`:'/account');
    }

    return null;
}

type ActionData = {
    formError?: string;
};

export const action: ActionFunction = async ({request,params,context}) => {
    const formData = await request.formData();
}

export default function Login() {
    const [nativeEmailError, setNativeEmailError] = useState(null);
    const [nativePasswordError, setNativePasswordError] = useState(null);
    const navigation = useNavigation()

    return(

        <div className="max-w-screen flex min-h-screen flex-row">
            <div className="flex flex-row w-full max-h-screen">
                <div className="flex basis-1/2">
                    <img className=" w-full"
                        src={signInPage} alt={"signInPicture"}/>
                </div>

                <div className="flex justify-center items-center basis-1/2">
                    {/*<h1 className= "text-3xl font-bold underline font-gt-pro text-black">"Welcome to Talk4"</h1>*/}
                    <FormCardWrapper subtitle="Login to your dashboard to manage your account" title="Welcome back to Talk4">
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

                                <FormInput
                                    id="password"
                                    label="Password"
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
                            <div className="">
                                <p className="p-2 font-gt-pro text-grey text-right">
                                    <Link
                                        className="text-primary/50 inline-block align-baseline text-sm hover:text-pink"
                                        to="/account/recover"
                                    >
                                        Forgot password?
                                    </Link>
                                </p>
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
                                    {navigation.state !== 'idle' ? 'Logging in...' : 'Login'}
                                </button>
                            </div>

                            <div className="my-1">
                                <p className="text-sm text-center font-gt-pro">
                                    Don't have an account?&nbsp;
                                    <Link className="inline text-pink font-medium hover:underline" to="/account/register">
                                        Create Account
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