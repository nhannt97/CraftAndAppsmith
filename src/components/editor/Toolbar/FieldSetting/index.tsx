import React, { FC } from 'react';
import ArrayFieldSetting from './ArrayFieldSetting';
import TextFieldSetting from './TextFieldSetting';
import DateFieldSetting from './DateFieldSetting';

const FieldSetting = ({type, ...rest}) => {
  return (
    type === 'array' ? <ArrayFieldSetting {...rest} /> :
    type === 'text' ? <TextFieldSetting {...rest} /> :
    type === 'date' ? <DateFieldSetting {...rest} /> :
    <></>
  );
};

export default FieldSetting;
