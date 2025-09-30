import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
 
export const locales = ['en', 'hi', 'te', 'ne', 'sip', 'lep'];

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale)) notFound();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
