import { classNames } from '@/helpers/classNames';

import classes from './ProfessorName.module.scss';
import { HTMLAttributes } from 'react';

type ProfessorNameProps = {
  name?: string;
  faculties?: string;
} & HTMLAttributes<HTMLDivElement>;

const ProfessorName = ({ name, faculties, className }: ProfessorNameProps) => {
  return (
    <div className={classNames(classes.professorName, className)}>
      <h2 className={classes.professorNameTitle}>{name}</h2>
      <p className={classes.professorNameFaculties}>{faculties}</p>
    </div>
  );
};

export default ProfessorName;
