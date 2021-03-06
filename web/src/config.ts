import { BrowserRouter, HashRouter } from 'react-router-dom';

export const title = process.env.REACT_APP_TITLE;
export const wsServer =
  process.env.REACT_APP_SERVER ||
  'ws://82.157.168.130:5000/ws';
export const fileServer = 'http://82.157.168.130:5001/download/';
export const nameCharacterSet = 'CEFGHJKMNPQRTVWXY';
export const nameLength = 5;
export const Router: any = process.env.REACT_APP_USE_BROWSER_ROUTER
  ? BrowserRouter
  : HashRouter;
export const abuseEmail = process.env.REACT_APP_ABUSE_EMAIL || null;
export const showCliToolInfo = process.env.REACT_APP_SHOW_CLI_TOOL_INFO === '1';
