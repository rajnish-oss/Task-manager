import React from 'react'
import clsx from 'clsx'

const Button = ({className,icon,label,type,onClick = ()=>{}}) =>{
          return(
            <button type={type} className={clsx("outline-none rounded",className)}>
                {icon && icon}
                <span>{label} </span>
                
            </button>
          )
}

export default Button;