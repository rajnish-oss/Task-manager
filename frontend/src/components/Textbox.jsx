import React from 'react'
import clsx from 'clsx'

const Textbox = React.forwardRef(
    ({type,placeholder,label,name,register,className,error},ref)=>{
    return(
        <div className="">
            {label && (
                <label htmlFor={name} ></label>
            )}
        <div className="">
            <input type={type}
             name={name}
             placeholder={placeholder}
             ref={ref}
             {...register}
             aria-invalid={error?'true':'false'}
             className={clsx("bg-transparent px-3 py-2.5 md:px-3 md:py-2.5 border border-gray-900 placeholder-gray-400 outline-none text-base focus:ring-2 ring-blue-300",className)}
            />
        </div>
        {error && (
            <span className='text-red-500 text-xs mt-0.5'>
                {error}
            </span>
        )}
        </div>
    )
})

export default Textbox