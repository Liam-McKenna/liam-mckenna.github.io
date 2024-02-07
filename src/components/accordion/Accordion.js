"use client";

import React, { useState } from 'react'
import AccordionItem from "./AccordionItem"


const Accordion = ({ data }) => {

    const [open, setOpen] = useState(false)

    const toggle = (index) => {
        if (open === index) {
            return setOpen(false)
        }
        setOpen(index)
    }

    return (
        <div className='h-100 grid gap-5 place-items-center m-5 max-w-4xl'>
            {data.map((item, index) => {
                return <AccordionItem key={index} item={item} open={index === open} toggle={() => toggle(index)} />
            })}
        </div>
    )
}

export default Accordion;
