import signInPage from '../../public/Images/signInPage.png';
import {SeoHandleFunction} from "@shopify/hydrogen";
import {ActionFunction, AppLoadContext, LoaderArgs, redirect} from "@shopify/remix-oxygen";
import FormCardWrapper from "../components/account/FormCardWrapper";
import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import FormInput from "../components/account/FormInput";
import {useState} from "react";
import {badRequest} from "../../util";
import {CustomerAccessTokenCreatePayload} from "@shopify/hydrogen/dist/storefront-api-types";


// const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
//     title: 'Login',
// });
//
// export const handle = {
//     seo,
//     isPublic: true,
// };

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

    console.log(formData)

    const email = formData.get('email');
    const password = formData.get('password');

    console.log(email);
    console.log(password);

    if (
        !email ||
        !password ||
        typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return badRequest<ActionData>({
            formError: 'Please provide both an email and a password.',
        });
    }

    const {session, storefront} = context;

    try {
        const customerAccessToken = await doLogin(context, {email, password});
        session.set('customerAccessToken', customerAccessToken);

        // Also update the cart if necessary to add the customer token
        // const cartId = session.get('cartId');
        // if (cartId) {
        //     await cartUpdateBuyerIdentity({
        //         cartId,
        //         buyerIdentity: {
        //             customerAccessToken,
        //         },
        //         storefront: context.storefront,
        //     });
        // }

        return redirect(params.lang ? `/${params.lang}/account/dashboard` : '/account/dashboard', {
            headers: {
                'Set-Cookie': await session.commit(),
            },
        });
    } catch (error: any) {
        if (storefront.isApiError(error)) {
            return badRequest({
                formError: 'Something went wrong. Please try again later.',
            });
        }

        /**
         * The user did something wrong, but the raw error from the API is not super friendly.
         * Let's make one up.
         */
        return badRequest({
            formError:
                'Sorry. We did not recognize either your email or password. Please try to sign in again or create a new account.',
        });
    }
}

export default function Login() {
    const actionData = useActionData<ActionData>();
    const [nativeEmailError, setNativeEmailError] = useState<null | string>(null);
    const [nativePasswordError, setNativePasswordError] = useState<null | string>(null);
    const navigation = useNavigation()

    return(

        <div className="max-w-screen flex min-h-screen flex-row">
            <div className="flex flex-row w-full max-h-screen">
                <div className="flex basis-1/2">
                    <img className="w-full"
                        src={signInPage} alt={"signInPicture"}/>
                </div>

                <div className="flex justify-center items-center basis-1/2">
                    <FormCardWrapper subtitle="Login to your dashboard to manage your account" title="Welcome back to Talk4">
                        <Form method="post" noValidate>
                            {actionData?.formError && (
                                <div className="mb-6 flex items-center justify-center rounded-sm border border-red p-4 text-sm text-red">
                                    <p>{actionData.formError}</p>
                                </div>
                            )}
                            <div className="space-y-4">
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

const LOGIN_MUTATION = `#graphql
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export async function doLogin(
    {storefront}: AppLoadContext,
    {
        email,
        password,
    }: {
        email: string;
        password: string;
    },
) {
    const data = await storefront.mutate<{
        customerAccessTokenCreate: CustomerAccessTokenCreatePayload;
    }>(LOGIN_MUTATION, {
        variables: {
            input: {
                email,
                password,
            },
        },
    });

    if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
        return data.customerAccessTokenCreate.customerAccessToken.accessToken;
    }

    /**
     * Something is wrong with the user's input.
     */
    throw new Error(
        data?.customerAccessTokenCreate?.customerUserErrors.join(', '),
    );
}