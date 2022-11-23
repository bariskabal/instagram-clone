export default function Button({type = 'button', children ,...props}) {
    return(
        <button type={type} className='h-[30px] w-full mt-1 flex items-center justify-center gap-x-2 px-2.5 rounded bg-brand font-medium text-white text-sm disabled:opacity-50' {...props}>{children}</button>
    )
}