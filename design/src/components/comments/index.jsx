import dayjs from 'dayjs'
import React from 'react'

const SharedComments = ({ PersonName, Time, Title, StarCount }) => {
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">{PersonName}</h3>
                <p className="text-gray-700 text-sm mb-2">Posted on {
                    dayjs(Time).format('DD MMM YYYY')
                }</p>


                <ul className='flex items-center gap-1'>
                    {
                        new Array(Math.ceil(StarCount)).fill(0).map((_, index) => (
                            <li key={index}>
                                <i className="ri-star-fill text-amber-300 text-2xl"></i>
                            </li>
                        ))
                    }
                </ul>

                <p className="text-gray-700">{Title}
                </p>



            </div>
        </>
    )
}

export default SharedComments