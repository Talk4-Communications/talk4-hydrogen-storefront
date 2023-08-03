import signInPage from '../../public/Images/signInPage.png';
import FormCardWrapper from "../components/account/FormCardWrapper";
import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import FormInput from "../components/account/FormInput";
import {useState} from "react";
import {ActionFunction, LoaderArgs, redirect} from "@shopify/remix-oxygen";
import {badRequest} from "../../util";
import {CustomerCreatePayload} from "@shopify/hydrogen/dist/storefront-api-types";
import {doLogin} from "./($lang).account.login";


export async function loader({params, context}: LoaderArgs){
    const customerAccessToken = await context.session.get('customerAccessToken');

    if (customerAccessToken) {
        return redirect(params.lang ? `${params.lang}/account` : '/account');
    }

    return null;
}

type ActionData = {
    formError?: string;
};

export const action: ActionFunction = async ({params,request,context}) =>{

    const {storefront,session} = context
    const formData = await request.formData();

    const email = formData.get('email');
    const password = formData.get('password');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const confirmPassword = formData.get('confirmPassword');

    if(!email || !password || typeof email != 'string' || typeof password != 'string'){
        return badRequest<ActionData>({formError: 'Please provide missing details'})
    }

    if (password && confirmPassword && password !== confirmPassword){
        return badRequest<ActionData>({formError: 'Passwords do not match'})
    }

    try{
        const data = await storefront.mutate<{
            customerCreate: CustomerCreatePayload;
        }>(CUSTOMER_CREATE_MUTATION, {
            variables: {
                input: {firstName, lastName, email, password},
            },
        });

        if(!data?.customerCreate?.customer?.id){
            throw new Error(data?.customerCreate?.customerUserErrors.join(', '));
        }

        const customerAccessToken = await doLogin(context, {email, password});
        session.set('customerAccessToken', customerAccessToken);

        return redirect(params.lang ? `/${params.lang}/account` : '/account', {
            headers: {
                'Set-Cookie': await session.commit(),
            },
        });

    }
    catch (error: any){
        if (storefront.isApiError(error)) {
            return badRequest({
                formError: 'Something went wrong. Please try again later.',
            });
        }

        return badRequest({
            formError:
                'Sorry. We could not create an account with this email. User might already exist, try to login instead.',
        });
    };

}

export default function Register(){
    const actionData = useActionData();
    const [nativeEmailError, setNativeEmailError] = useState(null);
    const [nativePasswordError, setNativePasswordError] = useState(null);
    const [nativeFirstNameError, setNativeFirstNameError] = useState(null);
    const [nativeLastNameError, setNativeLastNameError] = useState(null);

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
                            {actionData?.formError && (
                                <div className="mb-6 flex items-center justify-center rounded-sm border border-red p-4 text-sm text-red">
                                    <p>{actionData.formError}</p>
                                </div>
                            )}
                            <div className="space-y-4">
                                <FormInput
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    type="text"
                                    autoComplete="first name"
                                    required
                                    error={nativeFirstNameError || ''}
                                    onBlur={(event) => {
                                        setNativeFirstNameError(
                                            event.currentTarget.value.length &&
                                            !event.currentTarget.validity.valid ? 'Input First Name' : null,
                                        )}
                                    }
                                />

                                <FormInput
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    type="text"
                                    autoComplete="last name"
                                    required
                                    error={nativeLastNameError || ''}
                                    onBlur={(event) => {
                                        setNativeLastNameError(
                                            event.currentTarget.value.length &&
                                            !event.currentTarget.validity.valid ? 'Input Last Name' : null,
                                        )}
                                    }
                                />

                                <FormInput
                                    id="email"
                                    name="email"
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
                                    name="password"
                                    label="Password"
                                    placeholder="Enter Password"
                                    type="password"
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
                                    name="confirmPassword"
                                    label=" Confirm Password"
                                    placeholder="Enter Password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    minLength={8}
                                    error={''}
                                    // onBlur={(event) => {
                                    //     if (
                                    //         event.currentTarget.validity.valid ||
                                    //         !event.currentTarget.value.length
                                    //     ) {
                                    //         setNativePasswordError(null);
                                    //     } else {
                                    //         setNativePasswordError(
                                    //             event.currentTarget.validity.valueMissing
                                    //                 ? 'Please enter a password'
                                    //                 : 'Passwords must be at least 8 characters',
                                    //         );
                                    //     }
                                    // }}
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

const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;