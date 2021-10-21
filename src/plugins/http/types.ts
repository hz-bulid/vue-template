/*
 * @Author: your name
 * @Date: 2021-03-27 13:53:16
 * @LastEditTime: 2021-03-27 14:47:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finance\src\plugins\http\types.ts
 */
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface IAxiosRequest<T = any> {
  baseURL?: string;
  url: string;
  data?: T;
  params?: T;
  method?: Method;
  headers?: any;
  timeout?: number;
  responseType?: ResponseType;
}

export interface IAxiosResponse {
  data: any;
  headers: any;
  request?: any;
  status: number;
  statusText: string;
  config: IAxiosRequest;
}
export interface IResult<T = any> {
  code: number;
  message: string;
  data: T;
}
export interface ICustomResponse {
  readonly status: boolean;
  readonly message: string;
  data: any;
  code: string;
  origin?: any;
}
