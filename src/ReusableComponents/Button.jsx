import React from 'react'

export default function Button({ text, link, icon, width, textColor, fontSize }) {
    return (
        <div className='flex justify-center items-center mt-5'>
            <a className={`bg-myprimecolor text-${textColor} flex text-xl justify-center items-center gap-2 p-3 py-2 rounded-lg  w-${width} text-${fontSize}`} href={link}>{text}{icon}</a>
        </div>
    )
}
