import User from '@modules/user/infra/typeorm/entities/User';

import Course from '@modules/course/infra/typeorm/entities/Course';

export default interface ICreateOrderDTO {
  user: User;
  courses: Course[];
}
