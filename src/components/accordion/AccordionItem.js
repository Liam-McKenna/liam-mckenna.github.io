import React from 'react'
import { Collapse } from 'react-collapse'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

const AccordionItem = ({ open, toggle, item }) => {
    return (
        <div className='pt-[10px]'>

            <div onClick={toggle} className=" bg-[#740CDC] rounded-md p-5 w-full flex justify-between items-center cursor-pointer">
                <p className='text-[22px] font-semibold '>{item.title} @ {item.company}</p>
                <div className='flex items-center'>
                    <div className="">{item.time}</div>
                    <div className='text-[30px]'>{open ? <AiOutlineMinus /> : <AiOutlinePlus />}</div>
                </div>
            </div>

            <Collapse isOpened={open}>
                <div className="bg-[#241D41] rounded-md mt-2 p-6 flex items-center">
                    <p className=' flex-wrap '>{item.description}</p>
                    <div className="w-[150px] min-w-[150px] h-[150px] rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                </div>
            </Collapse >

        </div >
    );
}

export default AccordionItem