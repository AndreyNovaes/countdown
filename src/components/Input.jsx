import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

// utilização da api 'unform' para a captura dos valores 'minutes' e 'seconds'
// referencia https://www.youtube.com/watch?v=P65RJTTqkN4&ab_channel=Rocketseat

function Input({ name, ...rest }) {
    const inputRef = useRef(null)
    const { fieldName, registerField } = useField(name)

    useEffect(()=> {
        registerField({
            name:fieldName,
            ref: inputRef.current,
            path: 'value',
            
        })
    }, [registerField, fieldName])

  return (
    <input ref={inputRef} {... rest} />
  )
}

export default Input
