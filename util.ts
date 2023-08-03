import {json} from "@shopify/remix-oxygen";


export const badRequest = <T>(data: T) =>
    json(data, {status: 400, statusText: 'Bad Request'});
