"use client";

import Room from '@/components/Room Components/Room';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {

    const {id} = useParams();

    return (
        <div>
            <Room id={id}/>
        </div>
    )
}

export default page
