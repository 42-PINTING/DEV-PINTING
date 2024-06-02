import { server } from '../mocks/node.js';
import Sidebar from '@/_globalComponents/Sidebar';

server.listen();

//TODO: server side Props 만들기

export default function main() {
  return <Sidebar>main</Sidebar>;
}
