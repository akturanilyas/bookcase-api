import { IRoute } from './IRoute.interface';
import { UserController } from '../controllers/UserController';
import { HttpMethodEnum } from '../enums/httpMethod.enum';
import { UserValidation } from '../validations/UserValidation';
import { ENDPOINT } from '../constants/endpoint.constant';

const userController = new UserController();
const userValidation = new UserValidation();

export const routes: Array<IRoute> = [
  {
    handler: userController.store,
    method: HttpMethodEnum.POST,
    path: `${ENDPOINT.USERS}`,
    validate: userValidation.createUserValidation(),
  },
  {
    handler: userController.index,
    method: HttpMethodEnum.GET,
    path: `${ENDPOINT.USERS}`,
  },
  {
    handler: userController.show,
    method: HttpMethodEnum.GET,
    path: `${ENDPOINT.USERS}/:userId`,
    validate: userValidation.showUserValidation(),
  },
];
