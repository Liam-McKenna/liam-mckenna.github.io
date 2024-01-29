import React from 'react'
import Image from 'next/image'
import { Collapse } from 'react-collapse'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { FaLocationDot } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { GiDuration } from "react-icons/gi";




const AccordionItem = ({ open, toggle, item }) => {


    const SkillTag = ({ skill }) => {
        return (
            <div className='inline-block bg-[#673591] text-white py-.8 px-2 rounded-full opacity-70'>
                {skill}
            </div>
        )
    }

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
                    <div className="text-container">
                        <div className="flex gap-5 pb-5">
                            <div className="location flex items-center gap-2">
                                <FaLocationDot color='#BB77FF' />
                                {item.location}</div>
                            <div className="website flex items-center gap-2">
                                <CgWebsite color='#BB77FF' />
                                {item.website}</div>
                            <div className="duration flex items-center gap-2">
                                <GiDuration color='#BB77FF' />
                                <div className="duration">{item.duration}</div>

                            </div>
                        </div>
                        <p className=' flex-wrap '>{item.description}</p>
                        <div className="skills pt-5 flex gap-2">{item.skills.map((skill, index) => { return <SkillTag key={index} skill={skill} /> })}</div>
                    </div>
                    <div className="w-[150px] min-w-[150px] h-[150px] rounded-full bg-gradient-to-r from-green-400 to-blue-500">Logo
                        <Image src="/images/NuritasLogo.png" alt="Description of image" width={500} height={500} />
                    </div>
                </div>
            </Collapse >

        </div >
    );
}

export default AccordionItem