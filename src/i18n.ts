import {getRequestConfig} from 'next-intl/server';
 
export const locales = ['en', 'hi', 'te', 'ne', 'sip', 'lep'];

export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));
