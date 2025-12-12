import React, { PropsWithChildren } from 'react'
import { Text } from '@radix-ui/themes';


const ErrorMessage = ({children} : PropsWithChildren) => {
if(!children) return null;
  return (
    <div>
       <Text color="red" size="2">{children}</Text>
    </div>
  )
}

export default ErrorMessage
