import { http, HttpResponse } from 'msw';

export const checkLogin = [
  http.get(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/login`,
    ({ request }) => {
      const accessToken = process.env.NEXT_PUBLIC_TEST_JWT;

      console.log('req:', request.headers.get('authorization'));

      if (request.headers.get('authorization') !== accessToken) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Out Of Apples',
        });
      }

      return new HttpResponse('is goood', {
        status: 200,
        statusText: 'is good',
      });
    }
  ),
];

/*--------------------random img------------------------------*/
export const randomeImage = [
  http.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/login`, () => {
    return HttpResponse.json({
      token: `${fetchRandomImage().then((data) => data.avatar_url)}`,
    });
  }),
];

async function fetchRandomImage() {
  const response = await fetch('https://api.github.com/users/octocat');
  const data = await response.json();
  return data;
}
