import { MicroserviceName } from './microservice-name';

export interface RequestArguments {
  microservice: MicroserviceName;
  subPath?: string;
  body?: any;
}
