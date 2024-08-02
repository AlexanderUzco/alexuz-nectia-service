import { RequestMethod } from '@nestjs/common';

const excludedRoutes = [
    { path: '/', method: RequestMethod.GET },
    { path: 'users/signup', method: RequestMethod.POST },
    { path: 'users/signin', method: RequestMethod.POST },
];

const AuthMiddlewareRoutes = {
    excludedRoutes,
};

export { AuthMiddlewareRoutes };
