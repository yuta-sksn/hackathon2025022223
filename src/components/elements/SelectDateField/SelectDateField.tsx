'use client';

import { HTMLAttributes, ReactNode, useEffect } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './SelectDateField.module.scss';
import colors from '@/styles/colors.module.scss';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ja } from 'date-fns/locale/ja';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';
import { format } from 'date-fns';

type SelectDateFieldProps = {
  label: string;
  placeholder: string;
  control: Control<FieldValues>;
  controlName: string;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<any>;
} & HTMLAttributes<HTMLElement>;

const SelectDateField = ({
  label,
  placeholder,
  control,
  controlName,
  register,
  setValue,
  ...props
}: SelectDateFieldProps) => {
  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field, formState: { errors } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <DatePicker
            label={label}
            format="y年 MMMM"
            views={['year', 'month']}
            value={field.value ? new Date(field.value) : null}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderRadius: '8px',
                borderColor: colors.subColor,
              },
              '& .MuiInputBase-input.MuiOutlinedInput-input': {
                padding: '10px 14px',
              },
              '& .MuiInputBase-input.MuiOutlinedInput-input:focus': {
                boxShadow: 'none',
              },
              '& :not(.MuiInputLabel-shrink).MuiInputLabel-root.MuiInputLabel-animated':
                {
                  top: '-10%',
                },
              svg: { fill: colors.subColor },
              input: { color: colors.mainColor },
              label: { color: colors.subColor },
            }}
            slotProps={{
              textField: {
                placeholder: placeholder,
                inputProps: {
                  placeholder: placeholder,
                },
              },
            }}
            onChange={(value) => {
              const tempValue = new Date(format(value as Date, 'yyyy/MM/dd'));
              tempValue.setHours(tempValue.getHours() + 9);

              setValue(
                register.name,
                new Date(tempValue.toLocaleString().slice(0, -3)).toJSON(),
                {
                  shouldValidate: true,
                  shouldDirty: true,
                },
              );
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default SelectDateField;
