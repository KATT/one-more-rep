import {Component} from 'react';

export default class NextJSPage extends Component<any, any> {
  public displayName?: string;
  public name?: string;

  public getInitialProps: (ctx: any) => Promise<any>;
}
