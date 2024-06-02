import { http, HttpResponse } from 'msw';

export const successSignout = [
  http.post(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/signout`,
    ({ request }) => {
      console.log('request', request);
      return new HttpResponse('is goood', {
        status: 200,
        statusText: '1234',
      });
    }
  ),
];
