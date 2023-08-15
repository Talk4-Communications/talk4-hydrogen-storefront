import {useLoaderData} from "@remix-run/react";
import ProductContainer from "../components/account/ProductContainer";
import {Customer, MailingAddress, Order} from "@shopify/hydrogen/dist/storefront-api-types";
import {AppLoadContext, defer, LoaderArgs, redirect} from "@shopify/remix-oxygen";
import {flattenConnection} from "@shopify/hydrogen";
import {CACHE_NONE} from "../data/cache";

export async function loader({context, params}: LoaderArgs) {

    const customerAccessToken = await context.session.get('customerAccessToken');

    if (!customerAccessToken) {
        return redirect(
            params.lang ? `${params.lang}/account/login` : '/account/login',
        );
    }

    const customer = await getCustomer(context, customerAccessToken);

    console.log("Customer is loaded");
    console.log(customer);

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

export default function AccountHome(){

    const data = useLoaderData();

    return <Dashboard {...(data as Account)}></Dashboard>
}

interface Account {
    customer: Customer;
    orders: Order[];
    heading: string;
    addresses: MailingAddress[];
}

function Dashboard({customer, orders, addresses}:Account){

    console.log("Look here",customer)
    const columnDef = [
        { headerName: 'Num', field: 'Number', width:140 },
        { field: 'OrderId', width:140 },
        { field: 'Date', width:140 },
        { field: 'OrderDetails', width:140 },
        { field: 'Status', width:140 },
        { field: 'Total', width:140 },
        { field: 'Action', width:140 },
    ]
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
                <div className="w-1/2">
                    <ProductContainer></ProductContainer>
                </div>
                <div className="w-1/2">
                    <ProductContainer></ProductContainer>
                </div>
            </div>
            <div>
                {/*<OrderHistory></OrderHistory>*/}
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