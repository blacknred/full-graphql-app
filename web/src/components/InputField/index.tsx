import { FormControl, FormErrorMessage, FormLabel, Input, Textarea, useColorModeValue } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik';

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label?: string,
  placeholder?: string,
  area?: boolean,
  rows?: number
}

const InputField: React.FC<IProps> = ({ label, size, area, ...props }) => {
  const color = useColorModeValue('gray.300', 'gray.600')
  const bg = useColorModeValue('gray.800', 'white')
  props.placeholder = props.placeholder || props.name;
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={field.name} color={color}>{label}</FormLabel>}
      {/* @ts-ignore */}
      {area ? <Textarea bgColor={bg} {...field} {...props} id={field.name} />
        : <Input bgColor={bg} {...field} {...props} id={field.name} />}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputField