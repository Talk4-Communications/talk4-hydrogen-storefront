import AccountMenu from "../components/account/AccountMenu";
import {AppLoadContext, defer, json, LoaderArgs, redirect} from "@shopify/remix-oxygen";
import {flattenConnection} from "@shopify/hydrogen";
import {Customer, MailingAddress, Order} from "@shopify/hydrogen/dist/storefront-api-types";
import {CACHE_NONE, routeHeaders} from "../data/cache";
import {Link, useLoaderData, useMatches, useOutlet} from "@remix-run/react";
import Talk4Logo from "../../public/talk4Logo.svg";
import AvatarPlaceholder from "../components/account/AvatarPlaceholder";
import avatar from '../../public/Images/avatar.png'
import ProductContainer from "../components/account/ProductContainer";
import OrderHistory from "../components/account/Orders";


type TmpRemixFix = ReturnType<typeof defer<{isAuthenticated: false}>>;

export const headers = routeHeaders;


export async function loader({request, context, params}: LoaderArgs) {
    // const {pathname} = new URL(request.url);
    // const lang = params.lang;
    const customerAccessToken = await context.session.get('customerAccessToken');
    // const isAuthenticated = Boolean(customerAccessToken);
    // const loginPath = lang ? `/${lang}/account/login` : '/account/login';
    // const isAccountPage = /\/account\/?$/.test(pathname);

    // if (!isAuthenticated) {
    //     if (isAccountPage) {
    //         return redirect(loginPath);
    //     }
    //     // pass through to public routes
    //     return json({isAuthenticated: false});
    // }

    const customer = await getCustomer(context, customerAccessToken);

    console.log(customer)

    const orders = flattenConnection(customer.orders) as Order[];
    console.log(orders)

    return defer(
        {
            customer,
            orders,
            addresses: flattenConnection(customer.addresses) as MailingAddress[],
        },
        {
            headers: {
                'Cache-Control': CACHE_NONE,
            },
        },
    );
}

interface Account {
    customer: Customer;
    orders: Order[];
    heading: string;
    addresses: MailingAddress[];
}

export default function Dashboard(){
    const data = useLoaderData();
    const outlet = useOutlet();
    const matches = useMatches();

    return <DashboardDetails {...(data as Account)}></DashboardDetails>
}

function DashboardDetails({customer, orders, addresses}:Account){

    const data = useLoaderData();


    return(

        <div className="m-7 space-y-5">
            <div>
                <h1 className="font-gt-pro font-bold text-2xl text-black">
                    {customer.firstName} {customer.lastName}
                </h1>
                <p className="font-gt-pro text-sm text-grey">
                    Welcome to your dashboard, continue to manage your account.
                </p>
            </div>
            <div className="flex space-x-3">
                <ProductContainer></ProductContainer>
                <ProductContainer></ProductContainer>

            </div>
            <div>
                <OrderHistory ></OrderHistory>
            </div>
        </div>

    )
}

export async function getCustomer(
    context: AppLoadContext,
    customerAccessToken: string,
) {
    const {storefront} = context;

    const data = await storefront.query<{
        customer: Customer;
    }>(CUSTOMER_QUERY, {
        variables: {
            customerAccessToken,
            country: context.storefront.i18n.country,
            language: context.storefront.i18n.language,
        },
    });

    /**
     * If the customer failed to load, we assume their access token is invalid.
     */
    if (!data || !data.customer) {
        // throw await doLogout(context);
    }

    return data.customer;
}

const CUSTOMER_QUERY = `#graphql
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
      phone
      email
      defaultAddress {
        id
        formatted
        firstName
        lastName
        company
        address1
        address2
        country
        province
        city
        zip
        phone
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            country
            province
            city
            zip
            phone
          }
        }
      }
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 100) {
              edges {
                node {
                  variant {
                    image {
                      url
                      altText
                      height
                      width
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;