import { http, HttpResponse } from 'msw';

export const validateEmail = [
  http.post(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/email`,
    ({ request }) => {
      const accessToken = process.env.NEXT_PUBLIC_TEST_JWT;

      console.log('mock accessToken', request.headers.get('authorization'));
      console.log('mock email:', request.body);

      if (request.headers.get('authorization') !== accessToken) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'invalid token',
        });
      }

      return new HttpResponse('is goood', {
        status: 200,
        statusText: '1234',
      });
    }
  ),
];
