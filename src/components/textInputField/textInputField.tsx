import React, { ForwardedRef, forwardRef } from "react";
import { BaseTextFieldProps, OutlinedTextFieldProps } from "@mui/material";

import { useTextInputFieldController } from "./textInputField.controller";
import {
  ITextInputFieldData,
  ITextInputFieldRef,
  IValidationResponse,
} from "./interface/textInputField.interface";
import { StyledTextField } from "./textInputField.style";

export type TranslationFunctionType = (value: string) => string;

interface IProps extends BaseTextFieldProps {
  onChange: (event: ITextInputFieldData) => void;
  value: string;
  validation: (value: string) => IValidationResponse;
  InputProps?: OutlinedTextFieldProps["InputProps"];
}

/**
 * @component {Text Input Field}
 * @param {IProps}
 * @param {ForwardedRef<ITextInputFieldRef>}
 * @return {ForwardRefExoticComponent}
 */
export const TextInputField = forwardRef(
  (props: IProps, ref: ForwardedRef<ITextInputFieldRef>) => {
    const { value, multiline, InputProps, onChange, validation, ...rest } =
      props;
    const { getters, handlers } = useTextInputFieldController({
      value,
      ref,
      onChange,
      validation,
    });
    const { helperText, isError } = getters;
    const { onChangeLocal } = handlers;

    return (
      <StyledTextField
        value={value}
        helperText={helperText}
        variant="outlined"
        error={isError}
        size="medium"
        multiline={multiline}
        InputProps={{ ...InputProps }}
        {...rest}
        onChange={onChangeLocal}
      />
    );
  }
);

export default TextInputField;
