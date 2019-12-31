export enum ServiceType {
  RUNTIME = 'runtime',
  REQUEST = 'request'
}

export abstract class Service {
  public static type: ServiceType = ServiceType.REQUEST
}

export function RuntimeService () {
  return function (target: any) {
    target.type = ServiceType.RUNTIME
  }
}

import { services } from '@services/services'
import { NextFunction, Response } from 'express'
import { Request } from 'express-serve-static-core'

export class ServiceFactory {

  static runtimeInstances: Service[] = []

  public static instantiateRuntimeServices () {
    services
      .filter(service => service.type === ServiceType.RUNTIME)
      .forEach(service => ServiceFactory.runtimeInstances.push(ServiceFactory.createService<Service>(service)))
  }

  public static serviceMiddleware (request: Request, response: Response, next: NextFunction) {
    request.services = { }

    ServiceFactory.runtimeInstances.forEach(service => {
      const serviceName = service.constructor.name
      request.services[serviceName.replace('Service', '').toLowerCase()] = service
    })

    services
      .filter(service => service.type === ServiceType.REQUEST)
      .forEach((service: any) => {
        const serviceInstance = ServiceFactory.createService<Service>(service)
        const serviceName = serviceInstance.constructor.name
        request.services[serviceName.replace('Service', '').toLowerCase()] = serviceInstance
      })
    next()
  }

  private static createService<T> (type: { new (): T }): T {
    return new type()
  }

}
